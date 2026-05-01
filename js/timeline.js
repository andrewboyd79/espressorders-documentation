const STAGES = [
  {
    id: 'monolith',
    number: '1',
    label: 'Monolith',
    chapter: 'Chapter 1',
    tech: ['Django', 'Aurora PostgreSQL', 'S3', 'ECS'],
    tagline: '"Built to be broken apart"',
    summary: 'A Django monolith originally built as a Code Institute Diploma project — containerised and deployed to AWS ECS. Deliberately imperfect, deliberately real. The starting point for everything that followed.',
    docLink: 'docs/chapter-1-monolith.html',
    adrLink: null
  },
  {
    id: 'decomposition',
    number: '2',
    label: 'Decomposition',
    chapter: 'Chapter 2',
    tech: ['FastAPI', 'ECS', 'DynamoDB', 'SNS/SQS', 'Stripe'],
    tagline: '"Why, not just how"',
    summary: 'Extracted Catalogue, Cart, Order, and Notification as independent FastAPI microservices using the Strangler Fig pattern. Zero-downtime migration with the monolith still running in parallel throughout.',
    docLink: 'docs/chapter-2-4-decomposition.html',
    adrLink: 'docs/chapter-2-4-decomposition.html#decision-record'
  },
  {
    id: 'maturity',
    number: '3',
    label: 'Maturity',
    chapter: 'Chapter 3',
    tech: ['FastAPI', 'RS256 JWT', 'SSE', 'CodeBuild', 'CloudFormation'],
    tagline: '"Production-ready thinking"',
    summary: 'Added an operations console with real-time order queue (SSE), a JWT identity service, integration tests, and a fully automated CI/CD pipeline across all services.',
    docLink: 'docs/chapter-5-7-maturity.html',
    adrLink: 'docs/chapter-5-7-maturity.html#decision-record'
  },
  {
    id: 'mobile',
    number: '4',
    label: 'Mobile',
    chapter: 'Chapter 4',
    tech: ['React Native', 'Expo', 'EAS Build', 'CodeBuild', 'Stripe SDK'],
    tagline: '"API-first pays off"',
    summary: 'A React Native / Expo mobile client built with zero backend changes required. Every API design decision made in earlier chapters paid off — the mobile app consumed existing endpoints without modification.',
    docLink: 'docs/chapter-9-mobile.html',
    adrLink: 'docs/chapter-9-mobile.html#decision-record'
  }
];

let activeStage = null;

function buildTimeline() {
  const section = document.getElementById('timeline');
  if (!section) return;
  const fallback = document.getElementById('timeline-static-fallback');
  if (fallback) fallback.style.display = 'none';
  const container = section.querySelector('.container') || section;

  const label = document.createElement('div');
  label.className = 'eyebrow';
  label.textContent = 'Engineering Journey';
  container.appendChild(label);

  const track = document.createElement('div');
  track.className = 'timeline-track';

  STAGES.forEach((stage, index) => {
    const node = document.createElement('div');
    node.className = 'stage-node';
    node.dataset.id = stage.id;
    node.setAttribute('role', 'button');
    node.setAttribute('aria-label', `View ${stage.label} details`);
    node.setAttribute('tabindex', '0');
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleStage(stage.id);
      }
    });

    const dot = document.createElement('div');
    dot.className = `stage-dot dot-${index + 1}`;
    dot.textContent = stage.number;

    const lbl = document.createElement('div');
    lbl.className = 'stage-label';
    lbl.textContent = stage.label;

    const ch = document.createElement('div');
    ch.className = 'stage-chapter';
    ch.textContent = stage.chapter;

    node.appendChild(dot);
    node.appendChild(lbl);
    node.appendChild(ch);

    node.addEventListener('click', () => toggleStage(stage.id));
    track.appendChild(node);
  });

  container.appendChild(track);

  const hint = document.createElement('p');
  hint.className = 'timeline-hint';
  hint.id = 'timeline-hint';
  hint.textContent = 'Click any stage to explore';
  container.appendChild(hint);

  const cardContainer = document.createElement('div');
  cardContainer.id = 'stage-card-container';
  container.appendChild(cardContainer);

  // Auto-expand first stage so the interaction is immediately obvious
  toggleStage(STAGES[0].id);
}

function toggleStage(id) {
  const stage = STAGES.find(s => s.id === id);
  const container = document.getElementById('stage-card-container');
  const nodes = document.querySelectorAll('.stage-node');

  const hint = document.getElementById('timeline-hint');

  if (activeStage === id) {
    activeStage = null;
    container.innerHTML = '';
    nodes.forEach(n => n.classList.remove('active'));
    if (hint) hint.style.display = '';
    return;
  }

  if (hint) hint.style.display = 'none';
  activeStage = id;
  nodes.forEach(n => {
    n.classList.toggle('active', n.dataset.id === id);
  });

  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'stage-card visible';

  const tags = stage.tech.map(t =>
    `<span class="tag">${t}</span>`
  ).join('');

  const adrBtn = stage.adrLink
    ? `<a href="${stage.adrLink}" class="btn-gray btn-sm">Decision record →</a>`
    : '';

  card.innerHTML = `
    <div class="stage-card-header">
      <h3>${stage.label}</h3>
      <span class="chapter-badge">${stage.chapter}</span>
    </div>
    <div class="tagline">${stage.tagline}</div>
    <p class="summary">${stage.summary}</p>
    <div class="tech-tags">${tags}</div>
    <div class="card-actions">
      <a href="${stage.docLink}" class="btn-black btn-sm">Read chapter →</a>
      ${adrBtn}
    </div>
  `;

  container.appendChild(card);
}

document.addEventListener('DOMContentLoaded', buildTimeline);
