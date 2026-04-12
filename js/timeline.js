const STAGES = [
  {
    id: 'monolith',
    number: '1',
    label: 'Monolith',
    chapter: 'Chapter 1',
    colour: '#6366f1',
    tech: ['Django', 'Aurora PostgreSQL', 'S3', 'ECS'],
    tagline: '"Built to be broken apart"',
    summary: 'A Django monolith originally built for a certification project — containerised and deployed to AWS ECS. Deliberately imperfect, deliberately real. The starting point for everything that followed.',
    docLink: 'docs/chapter-1-monolith.html',
    adrLink: null
  },
  {
    id: 'decomposition',
    number: '2–4',
    label: 'Decomposition',
    chapter: 'Chapters 2–4',
    colour: '#0ea5e9',
    tech: ['FastAPI', 'ECS', 'DynamoDB', 'SNS/SQS', 'Stripe'],
    tagline: '"Why, not just how"',
    summary: 'Extracted Catalogue, Cart, Order, and Notification as independent FastAPI microservices using the Strangler Fig pattern. Zero-downtime migration with the monolith still running in parallel throughout.',
    docLink: 'docs/chapter-2-4-decomposition.html',
    adrLink: 'docs/chapter-2-4-decomposition.html#decision-record'
  },
  {
    id: 'maturity',
    number: '5–7',
    label: 'Maturity',
    chapter: 'Chapters 5–7',
    colour: '#10b981',
    tech: ['FastAPI', 'RS256 JWT', 'SSE', 'CodeBuild', 'CloudFormation'],
    tagline: '"Production-ready thinking"',
    summary: 'Added an operations console with real-time order queue (SSE), a JWT identity service, integration tests, and a fully automated CI/CD pipeline across all services.',
    docLink: 'docs/chapter-5-7-maturity.html',
    adrLink: 'docs/chapter-5-7-maturity.html#decision-record'
  },
  {
    id: 'mobile',
    number: '9',
    label: 'Mobile',
    chapter: 'Chapter 9',
    colour: '#f59e0b',
    tech: ['React Native', 'Expo', 'EAS Build', 'CodeBuild', 'Stripe SDK'],
    tagline: '"API-first pays off"',
    summary: 'A React Native / Expo mobile client built with zero backend changes required. Every API design decision made in earlier chapters paid off — the mobile app consumed existing endpoints without modification.',
    docLink: 'docs/chapter-9-mobile.html',
    adrLink: 'docs/chapter-9-mobile.html#decision-record'
  }
];

let activeStage = null;

function buildTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;

  const label = document.createElement('div');
  label.className = 'section-label';
  label.textContent = 'Engineering Journey';
  container.appendChild(label);

  const track = document.createElement('div');
  track.className = 'timeline-track';

  STAGES.forEach(stage => {
    const node = document.createElement('div');
    node.className = 'stage-node';
    node.dataset.id = stage.id;
    node.setAttribute('role', 'button');
    node.setAttribute('aria-label', `View ${stage.label} details`);

    const dot = document.createElement('div');
    dot.className = 'stage-dot';
    dot.style.background = stage.colour;
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

  const cardContainer = document.createElement('div');
  cardContainer.id = 'stage-card-container';
  container.appendChild(cardContainer);
}

function toggleStage(id) {
  const stage = STAGES.find(s => s.id === id);
  const container = document.getElementById('stage-card-container');
  const nodes = document.querySelectorAll('.stage-node');

  if (activeStage === id) {
    activeStage = null;
    container.innerHTML = '';
    nodes.forEach(n => n.classList.remove('active'));
    return;
  }

  activeStage = id;
  nodes.forEach(n => {
    n.classList.toggle('active', n.dataset.id === id);
  });

  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'stage-card visible';
  card.style.borderColor = stage.colour;

  const tags = stage.tech.map(t =>
    `<span class="tag">${t}</span>`
  ).join('');

  const adrBtn = stage.adrLink
    ? `<a href="${stage.adrLink}" class="card-link" style="color:${stage.colour}">Decision record →</a>`
    : '';

  card.innerHTML = `
    <div class="stage-card-header">
      <h3 style="color:${stage.colour}">${stage.label}</h3>
      <span class="chapter-badge">${stage.chapter}</span>
    </div>
    <div class="tagline" style="color:${stage.colour}">${stage.tagline}</div>
    <p class="summary">${stage.summary}</p>
    <div class="tech-tags">${tags}</div>
    <div class="card-links">
      <a href="${stage.docLink}" class="card-link primary" style="color:${stage.colour}">
        <span>Read chapter →</span>
      </a>
      ${adrBtn}
    </div>
  `;

  container.appendChild(card);
}

document.addEventListener('DOMContentLoaded', buildTimeline);
