/*
 * Public GitHub repository discovery and conservative paper-to-code matching.
 * No GitHub access token, private data, or author-contribution claims.
 * Browser fetches the public API, and avoids assigning ambiguous forks to papers.
 */
(() => {
  'use strict';
  const OWNER = 'SahandZiabari';
  const PAPERS = window.PUBLICATIONS || [];
  const CACHE_KEY = 'sahand-public-repositories-v5';
  const MAX_CACHE_AGE = 12 * 60 * 60 * 1000;
  const STOP = new Set('a an and in of for on the with to under through from using use via by at as new based towards toward across its into an approach framework model models system study analysis learning network networks'.split(' '));
  const $ = sel => document.querySelector(sel);
  const norm = s => String(s || '').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
  const flat = s => norm(s).replace(/ /g, '');
  const tok = s => new Set(norm(s).split(' ').filter(w => w.length > 2 && !STOP.has(w)));
  const html = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = s => /^https:\/\/github\.com\/[^/]+\/[^/]+\/?(?:#.*)?$/i.test(String(s || '')) ? s : '';
  const doi = p => (p.url || '').match(/doi\.org\/(.+)$/i)?.[1]?.toLowerCase() || '';
  const paperCore = p => p.title.includes(':') ? p.title.split(':')[0] : '';
  const paperName = p => norm(p.title);
  const statusEls = document.querySelectorAll('[data-github-status]');
  function status(msg) { statusEls.forEach(e => e.textContent = msg); }

  // A name-only match is a *candidate*. Never call it confirmed without the
  // publication title/DOI in metadata/README, or an exact normalized title.
  function scoreFor(repo, paper) {
    const title = paperName(paper);
    const rname = norm(repo.name);
    const rn = flat(repo.name), tn = flat(paper.title);
    const description = norm(repo.description || '');
    const identifier = doi(paper);
    if (identifier && String(repo.description || '').toLowerCase().includes(identifier))
      return { score: 115, proof:'DOI stated in repository description', confirmed: true };
    if (title.length >= 26 && description.includes(title))
      return { score: 111, proof:'Full paper title in repository description', confirmed: true };
    if (rname.length >= 18 && rn === tn)
      return { score: 108, proof:'Exact normalized publication title', confirmed: true };
    const core = flat(paperCore(paper));
    if (core.length >= 7 && core === rn)
      return { score: 81, proof:'Distinctive title abbreviation matches repository', confirmed: false };
    if (rn.length >= 20 && tn.includes(rn) && rn.length / tn.length >= .32)
      return { score: 79, proof:'Repository name is a long fragment of the paper title', confirmed: false };
    const rt = tok(repo.name), pt = tok(paper.title);
    let common=0;
    for(const w of rt) if(pt.has(w)) common++;
    if (common >= 4 && common / Math.max(rt.size,1) >= .82 && common / Math.max(pt.size,1) >= .42)
      return { score: 72, proof:'Several distinctive title words match', confirmed: false };
    return {score:0};
  }
  function readmeConfirmed(repo,paper,readme) {
    if(!readme) return false;
    const normalized = norm(readme);
    const title = paperName(paper);
    const d = doi(paper);
    return (title.length > 24 && normalized.includes(title)) || !!(d && readme.toLowerCase().includes(d));
  }
  function bestCandidate(repo, paper) {return scoreFor(repo,paper);}

  async function fetchRepos() {
    try {
      const saved = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if(saved && Date.now() - saved.time < MAX_CACHE_AGE && Array.isArray(saved.repos)) return saved.repos;
    } catch (_) { /* storage is optional */ }
    const merged=[];
    for(let page=1;page<=3;page++) {
      const r = await fetch(`https://api.github.com/users/${OWNER}/repos?per_page=100&page=${page}&sort=updated&type=all`, {
        headers: {'Accept':'application/vnd.github+json'}
      });
      if (!r.ok) throw Error(`GitHub API returned ${r.status}`);
      const batch=await r.json();
      if(!Array.isArray(batch)) throw Error('Invalid GitHub API response');
      merged.push(...batch.map(v => ({
        name:String(v.name || ''),html_url:String(v.html_url || ''),
        description:String(v.description || ''),language:String(v.language || ''),
        fork:!!v.fork,updated_at:v.updated_at || '', default_branch:v.default_branch || 'main',
        full_name:String(v.full_name || ''), archived:!!v.archived,
      })).filter(v=>v.full_name.toLowerCase().startsWith(OWNER.toLowerCase()+'/') && url(v.html_url)));
      if(batch.length < 100) break;
    }
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({time:Date.now(),repos:merged})); }catch (_){}
    return merged;
  }
  async function getReadme(repo) {
    try {
      const r = await fetch(`https://api.github.com/repos/${OWNER}/${encodeURIComponent(repo.name)}/readme`, {
        headers:{'Accept':'application/vnd.github+json'}
      });
      if (!r.ok) return '';
      const data=await r.json();
      if(!data?.content || data.encoding !== 'base64') return '';
      const bytes=Uint8Array.from(atob(data.content.replace(/\s/g,'')),c=>c.charCodeAt(0));
      return new TextDecoder('utf-8',{fatal:false}).decode(bytes).slice(0,120000);
    } catch(_) {return '';}
  }
  function card(repo, paper, proof, isCandidate=false) {
    return `<article class="repo-card">
      <div class="repo-meta"><span>${repo.fork ? 'Forked repository' : 'Public repository'}</span>${repo.language ? `<span>${html(repo.language)}</span>` : ''}${repo.archived ? '<span>Archived</span>' : ''}</div>
      <h3><a href="${html(repo.html_url)}" target="_blank" rel="noopener noreferrer">${html(repo.name)} ↗</a></h3>
      ${repo.description ? `<p>${html(repo.description)}</p>` : ''}
      ${paper ? `<div class="repo-paper">${isCandidate?'Possible match, not verified':'Matched to publication'}: <a href="${html(paper.url)}" target="_blank" rel="noopener noreferrer">${html(paper.title)}</a><br><small>${html(proof)}</small></div>` : ''}
    </article>`;
  }
  let data={repos:[],matches:[],candidates:[]};
  function renderCodePage() {
    const matched=$('[data-paper-code-matches]');
    if(matched){
      const confirmed = data.matches.map(m=>card(m.repo,m.paper,m.proof));
      const candidate = data.candidates.map(m=>card(m.repo,m.paper,m.proof,true));
      matched.innerHTML=confirmed.length ? confirmed.join('') : '<div class="repo-empty">No further uniquely confirmed paper–repository links were found using the available public metadata. This does not mean that no code exists.</div>';
      if(candidate.length) matched.insertAdjacentHTML('beforeend',`<div class="repo-candidate-heading"><h3>Names requiring review</h3><p>These repos resemble paper titles but their README/DOI could not confirm the connection. They are not automatically added to publication code buttons.</p></div>${candidate.join('')}`);
    }
    const list=$('[data-repo-list]');
    if(!list)return;
    const input=$('[data-repo-search]');
    const forksOnly=$('[data-forks-only]');
    function render(){
      const q=norm(input?.value || '');
      const filtered=data.repos.filter(r=>(!forksOnly?.checked || r.fork) && (!q || norm([r.name,r.description,r.language].join(' ')).includes(q)));
      const count=$('[data-repo-count]');if(count)count.textContent=`${filtered.length} of ${data.repos.length} public repositories`;
      const byRepo=new Map(data.matches.concat(data.candidates).map(m=>[m.repo.full_name,m]));
      list.innerHTML=filtered.length ? filtered.map(r=>{
        const m=byRepo.get(r.full_name);
        return card(r,m?.paper,m?.proof, m ? !m.confirmed : false);
      }).join('') : '<div class="repo-empty">No matching public repositories in this view.</div>';
    }
    input?.addEventListener('input',render);
    forksOnly?.addEventListener('change',render);
    render();
  }
  async function load(){
    try {
      const repos=await fetchRepos();
      data.repos=repos;
      if(!repos.length) {
        status('No public repositories were returned by GitHub.');renderCodePage();return;
      }
      // For each publication, calculate possible matches, then selectively verify
      // up to eight of the strongest names via README content and DOI/title checks.
      const pool=[];
      for(const p of PAPERS) for(const r of repos){
        const s=bestCandidate(r,p);
        if(s.score>=70) pool.push({paper:p,repo:r,...s});
      }
      const readmeRepos=[...new Map(pool.filter(m=>!m.confirmed).sort((a,b)=>b.score-a.score).map(m=>[m.repo.full_name,m.repo])).values()].slice(0,8);
      const readmes=new Map();
      await Promise.all(readmeRepos.map(async r=>readmes.set(r.full_name, await getReadme(r))));
      for(const m of pool) {
        const content=readmes.get(m.repo.full_name) || '';
        if(readmeConfirmed(m.repo,m.paper,content)) {
          m.confirmed=true;m.score=120;m.proof='Full paper title or DOI appears in the repository README';
        }
      }
      // A single paper cannot link to ambiguous repositories; a single repo
      // cannot be automatically attached to multiple different papers.
      const chosen=[];
      for(const paper of PAPERS) {
        const possible=pool.filter(m=>m.paper.id===paper.id).sort((a,b)=>b.score-a.score);
        if(!possible.length)continue;
        const first=possible[0], runner=possible[1];
        if(runner && runner.score >= first.score - 9) {
          chosen.push({...first,confirmed:false,proof:'Ambiguous repository candidates — manual review required'});
          continue;
        }
        chosen.push(first);
      }
      const used=new Set();
      for(const match of chosen.sort((a,b)=>b.score-a.score)){
        if(used.has(match.repo.full_name)) {
          match.confirmed=false;match.proof='Repository appears relevant to multiple papers — manual review required';
        }else used.add(match.repo.full_name);
      }
      data.matches=chosen.filter(m=>m.confirmed);
      data.candidates=chosen.filter(m=>!m.confirmed);
      for(const m of data.matches) {
        if (!m.paper.code) { m.paper.code=m.repo.html_url; m.paper.codeLabel=m.repo.fork ? 'GitHub fork' : 'GitHub code'; }
      }
      status(`${repos.length} public GitHub repositories found · ${data.matches.length} publication links matched${data.candidates.length ? ` · ${data.candidates.length} candidates to review` : ''}.`);
      renderCodePage();
      window.dispatchEvent(new CustomEvent('sahand-code-updated',{detail:{matches:data.matches.length,candidates:data.candidates.length,repos:repos.length}}));
    }catch(err){
      status('Live GitHub lookup is temporarily unavailable. Open the public repositories on GitHub; existing paper and PDF links still work.');
      const matched=$('[data-paper-code-matches]');if(matched)matched.innerHTML='<div class="repo-empty">Could not retrieve repositories from GitHub. No code matches have been assumed.</div>';
      const list=$('[data-repo-list]');if(list)list.innerHTML='<div class="repo-empty"><a href="https://github.com/SahandZiabari?tab=repositories" target="_blank" rel="noopener noreferrer">Browse public repositories on GitHub ↗</a></div>';
    }
  }
  const exportButton = document.querySelector('[data-export-forks]');
  exportButton?.addEventListener('click', () => {
    if (!data.repos.length) {
      status('No public repository data is available to export. Refresh this page when GitHub API access is available.');
      return;
    }
    const exported = {
      generated_at: new Date().toISOString(), source: 'public GitHub REST API',
      github_account: OWNER,
      repositories: data.repos,
      matched_papers: data.matches.map(m => ({paper_id:m.paper.id, paper_title:m.paper.title, repo:m.repo.full_name, proof:m.proof})),
      candidate_matches: data.candidates.map(m => ({paper_id:m.paper.id,paper_title:m.paper.title,repo:m.repo.full_name,reason:m.proof}))
    };
    const blob = new Blob([JSON.stringify(exported, null, 2)], {type:'application/json'});
    const objectUrl=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=objectUrl;
    a.download='SahandZiabari-public-repositories.json';
    document.body.append(a);a.click();a.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
  });
  const refresh = document.querySelector('[data-github-refresh]');
  refresh?.addEventListener('click', () => {
    try { localStorage.removeItem(CACHE_KEY); } catch (_) {}
    window.location.reload();
  });
  load();
})();
