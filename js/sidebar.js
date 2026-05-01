document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.sidebar-link[href^="#"]'));
  const headings = Array.from(document.querySelectorAll('.content h2[id]'));
  if (!links.length || !headings.length) return;

  function setActive(id) {
    links.forEach(link => {
      const active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', active);
    });
  }

  // Initialise to first section
  if (headings[0]) setActive(headings[0].id);

  const observer = new IntersectionObserver(entries => {
    // Find the topmost heading currently intersecting
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    if (visible.length) {
      setActive(visible[0].target.id);
    }
  }, {
    // Account for sticky site-nav (56px) + chapter-nav (~46px) + buffer
    rootMargin: '-112px 0px -55% 0px',
    threshold: 0
  });

  headings.forEach(h => observer.observe(h));
});
