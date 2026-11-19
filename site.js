(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  function setTheme(theme) {
    root.dataset.theme = theme;
    if (themeButton) {
      themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeButton.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeButton.innerHTML = theme === 'dark'
        ? '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
        : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.98 13.01A9 9 0 0 1 10.99 3.02a9 9 0 1 0 9.99 9.99Z"/></svg>';
    }
    try { localStorage.setItem('sz-theme', theme); } catch (e) { /* storage optional */ }
  }
  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('sz-theme') || 'light'; } catch (e) { /* storage optional */ }
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const navButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  navButton?.addEventListener('click', () => {
    const expanded = navButton.getAttribute('aria-expanded') === 'true';
    navButton.setAttribute('aria-expanded', String(!expanded));
    if (nav) nav.classList.toggle('is-open', !expanded);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navButton?.setAttribute('aria-expanded', 'false');
  }));

  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pubs = window.PUBLICATIONS || [];
  const labels = {
    'responsible-ai':'Responsible AI', 'explainable-ai':'Explainable AI',
    'forecasting':'Forecasting', 'multi-agent':'Multi-agent systems',
    'computer-vision':'Computer vision', 'applied-ml':'Applied ML'
  };
  function paperMarkup(p, compact=false) {
    return `<article class="paper ${compact ? 'paper-compact' : ''}">
      <span class="paper-index" aria-hidden="true">${String(p.year).slice(-2)}</span>
      <div class="paper-body">
        <div class="paper-meta"><span>${escapeHTML(p.type)}</span><span class="meta-dot" aria-hidden="true"></span><span>${p.year}</span></div>
        <h3><a href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(p.title)} <span class="title-arrow" aria-hidden="true">↗</span></a></h3>
        <p class="paper-authors">${escapeHTML(p.authors)}</p>
        <p class="paper-venue">${escapeHTML(p.venue)}</p>
        ${compact ? '' : `<div class="paper-bottom"><div class="paper-tags">${p.categories.slice(0,2).map(c=>`<span>${labels[c] || c}</span>`).join('')}</div><a class="paper-link" href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="Read ${escapeHTML(p.title)} on publisher website">Paper <span aria-hidden="true">↗</span></a></div>`}
      </div>
    </article>`;
  }
  const featured = document.querySelector('[data-featured-papers]');
  if (featured) featured.innerHTML = pubs.filter(p=>p.selected).slice(0,4).map(p=>paperMarkup(p,true)).join('');

  const publicationList = document.querySelector('[data-publication-list]');
  if (publicationList) {
    const search = document.querySelector('[data-search]');
    const category = document.querySelector('[data-category]');
    const year = document.querySelector('[data-year]');
    const count = document.querySelector('[data-results-count]');
    const reset = document.querySelector('[data-reset]');
    const knownYears = [...new Set(pubs.map(p=>p.year))].sort((a,b)=>b-a);
    if (year) year.innerHTML = '<option value="all">All years</option>' + knownYears.map(y=>`<option value="${y}">${y}</option>`).join('');
    const queryTopic = new URLSearchParams(window.location.search).get('topic');
    if (category && [...category.options].some(opt => opt.value === queryTopic)) category.value = queryTopic;
    function render() {
      const q = (search?.value || '').trim().toLowerCase();
      const cat = category?.value || 'all';
      const yr = year?.value || 'all';
      const filtered = pubs.filter(p => (yr === 'all' || String(p.year) === yr)
        && (cat === 'all' || p.categories.includes(cat))
        && (!q || [p.title, p.authors, p.venue, String(p.year), p.summary].some(s => s.toLowerCase().includes(q))));
      if (count) count.textContent = `${filtered.length} ${filtered.length === 1 ? 'publication' : 'publications'}`;
      if (reset) reset.hidden = !(q || cat !== 'all' || yr !== 'all');
      if (!filtered.length) {
        publicationList.innerHTML = '<div class="empty-state"><h3>No publications found</h3><p>Try a different keyword, year, or research area.</p></div>';
        return;
      }
      const years = [...new Set(filtered.map(p=>p.year))].sort((a,b)=>b-a);
      publicationList.innerHTML = years.map(y => `<section class="publication-year" aria-labelledby="year-${y}">
        <div class="year-head"><h2 id="year-${y}">${y}</h2><span>${filtered.filter(p=>p.year===y).length} papers</span></div>
        <div class="paper-stack">${filtered.filter(p=>p.year===y).map(p=>paperMarkup(p)).join('')}</div>
      </section>`).join('');
    }
    [search, category, year].forEach(el=>el?.addEventListener(el === search ? 'input' : 'change', render));
    reset?.addEventListener('click', () => { if(search) search.value=''; if(category) category.value='all'; if(year) year.value='all'; render(); search?.focus(); });
    render();
  }

  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = String(new Date().getFullYear()));
})();
