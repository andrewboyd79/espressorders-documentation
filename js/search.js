document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav .container');
  if (!nav) return;

  // Search icon trigger
  const trigger = document.createElement('button');
  trigger.className = 'search-trigger';
  trigger.setAttribute('aria-label', 'Search documentation');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  nav.appendChild(trigger);

  // Search input
  const wrapper = document.createElement('div');
  wrapper.className = 'search-wrapper';

  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'search-input';
  input.placeholder = 'Search chapters…';
  input.setAttribute('aria-label', 'Search documentation');
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('spellcheck', 'false');
  wrapper.appendChild(input);

  // Results panel
  const results = document.createElement('div');
  results.className = 'search-results';
  results.setAttribute('role', 'list');
  results.setAttribute('aria-label', 'Search results');
  wrapper.appendChild(results);

  nav.appendChild(wrapper);

  let open = false;

  function openSearch() {
    open = true;
    wrapper.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    input.focus();
  }

  function closeSearch() {
    open = false;
    wrapper.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    input.value = '';
    results.innerHTML = '';
  }

  trigger.addEventListener('click', () => {
    open ? closeSearch() : openSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      closeSearch();
    }
    // Cmd/Ctrl + K to open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.innerHTML = '';
      return;
    }

    const entries = window.SEARCH_INDEX || [];
    const matched = entries
      .filter(entry => {
        const haystack = [
          entry.section,
          entry.chapterTitle,
          ...(entry.terms || [])
        ].join(' ').toLowerCase();
        return query.split(' ').every(word => haystack.includes(word));
      })
      .slice(0, 6);

    if (!matched.length) {
      results.innerHTML = '<div class="search-no-results">No results for "' + escapeHtml(query) + '"</div>';
      return;
    }

    results.innerHTML = matched.map(entry => {
      const url = 'docs/' + entry.chapter + '#' + entry.id;
      const chapterLabel = entry.chapterTitle.replace('Chapter ', '').replace('Infrastructure', 'Infra');
      return '<a href="' + url + '" class="search-result-item">' +
        '<span class="search-result-chapter">' + escapeHtml(chapterLabel) + '</span>' +
        '<span class="search-result-section">' + escapeHtml(entry.section) + '</span>' +
      '</a>';
    }).join('');
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (open && !wrapper.contains(e.target) && !trigger.contains(e.target)) {
      closeSearch();
    }
  });
});