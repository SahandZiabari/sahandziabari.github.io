/*
 * Paper-to-code audit, November 2026.
 * Public GitHub metadata and README text are checked in the visitor's browser.
 * Only title/DOI/arXiv evidence is considered a confirmed paper association.
 * Co-author name matches are visible as candidates, NEVER as confirmed implementations.
 * A fork of software is not evidence of the author's contribution to that code.
 */
(() => {
  'use strict';
  const OWNER='SahandZiabari', API='https://api.github.com';
  const PAPERS=window.PUBLICATIONS || [];
  const VERSION='v11-all-forks-author-and-paper-evidence';
  const CACHE_KEY='sz-paper-fork-audit-'+VERSION;
  const CACHE_AGE=6*60*60*1000;
  const STOP=new Set('a an and the of for in on at to via from through under based study studies using towards among within with approach novel new efficient robust predicting prediction learning machine model models framework analysis classification deep intelligent intelligence neural artificial graph enhanced explainable multi multiple system systems data network networks paper research algorithm algorithms'.split(' '));
  const html=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>String(s||'').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  const flat=s=>norm(s).replace(/\s/g,'');
  const tokens=s=>new Set(norm(s).split(' ').filter(v=>v.length>2 && !STOP.has(v)));
  const githubUrl=s=>/^https:\/\/github\.com\/[^/]+\/[^/?#]+\/?$/i.test(String(s||''));
  const validRepo=r=>r && r.full_name?.toLowerCase().startsWith(OWNER.toLowerCase()+'/') && githubUrl(r.html_url);
  const doi=p=>(String(p.url||'').match(/doi\.org\/(.+)$/i)?.[1]||'').toLowerCase();
  const arxiv=p=>(String(p.url||'').match(/arxiv\.org\/abs\/([\d.]+)/i)?.[1]||'');
  const statusEls=document.querySelectorAll('[data-github-status]');
  const showStatus=s=>statusEls.forEach(e=>e.textContent=s);
  const meta=[];
  const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  async function fetchJson(url) {
    const r=await fetch(url,{headers:{Accept:'application/vnd.github+json'}});
    if(!r.ok)throw new Error('GitHub API returned '+r.status);
    return r.json();
  }
  async function getRepos(){
    const all=[];
    for(let page=1;page<=4;page++){
      const arr=await fetchJson(`${API}/users/${OWNER}/repos?per_page=100&page=${page}&type=all&sort=updated`);
      if(!Array.isArray(arr))throw new Error('Unexpected API response');
      all.push(...arr.map(v=>({name:v.name,full_name:v.full_name,html_url:v.html_url,
        description:v.description||'',language:v.language||'',fork:!!v.fork,
        archived:!!v.archived,default_branch:v.default_branch||'main',updated_at:v.updated_at||''})).filter(validRepo));
      if(arr.length<100)break;
    }
    return [...new Map(all.map(r=>[r.full_name.toLowerCase(),r])).values()];
  }
  // First-authors/coauthors whose full names are grounded by the paper's metadata.
  // These are merely discovery clues, not proof of a repository's connection.
  const MANUAL_AUTHOR_CLUES={
    elkacemi26:['yasmina','yasmina el kacemi','elkacemi'],
    lin26:['bo yi lin','bo yi','boyilin'],
    zhu25:['chaoxiang zhu','chaoxiang'],
    braa26:['nina may braakman','nina braakman','nina'],
    brak26:['brent brakenhoff','brent'],
    lena26:['ties leneman','ties'],
    asht25:['duaa ashtar','duaa'],
    curi25:['ruben curiel','ruben'],
    sype25:['luka van de sype','luka'],
    ahma26:['milad ahmadian','milad'],
    // Name expansions are based on publicly credited paper authors.
    // Name-only matches remain unverified candidate links.
  };
  function authorClues(p){
    const names=(MANUAL_AUTHOR_CLUES[p.id]||[]).map(norm);
    // First-author surname from an initialed citation: "N. M. Braakman".
    const first=String(p.authors||'').split(',')[0];
    const surname=first.match(/(?:[A-Z]\.\s*){1,4}([\wÀ-ÿ'-]+)\s*$/)?.[1];
    if(surname && surname.length>=5)names.push(norm(surname));
    return [...new Map(names.filter(v=>v.length>=4 && !['ziabari','alsahag','chen'].includes(v)).map(v=>[flat(v),v])).values()];
  }
  const clueMap=new Map(PAPERS.map(p=>[p.id,authorClues(p)]));
  function nameClue(repo,p){
    const r=flat(repo.name);
    const names=clueMap.get(p.id)||[];
    const matches=names.filter(s=>flat(s)===r || (flat(s).length>=8 && r.startsWith(flat(s)) && r.length<=flat(s).length+12));
    if(!matches.length)return null;
    const global=[...new Set(Array.from(clueMap.values()).flat().filter(s=>flat(s)===r).map(flat))];
    return {strong:global.length===1 && r.length>=4, ambiguous:global.length>1, clue:matches[0]};
  }
  function analyze(repo,p,readme=''){
    const rtitle=norm(repo.name), title=norm(p.title), desc=norm(repo.description), rn=flat(repo.name), tn=flat(p.title);
    const body=norm(readme), combined=norm([repo.description,readme].join(' '));
    const ref=doi(p), ax=arxiv(p);
    const haveDoi=ref && (repo.description.toLowerCase().includes(ref) || readme.toLowerCase().includes(ref));
    const haveArxiv=ax && (repo.description.includes(ax)||readme.includes(ax)) && ax.length>=7;
    if(haveDoi) return {score:130, confirmed:true, proof:'Repository description/README explicitly names the paper DOI'};
    if(haveArxiv) return {score:127, confirmed:true, proof:'Repository description/README explicitly names the paper arXiv identifier'};
    if(title.length>=28 && (desc.includes(title) || body.includes(title)))
      return {score:125, confirmed:true, proof:'Repository description/README explicitly names the full publication'};
    if(rn.length>=22 && rn===tn)return {score:113, confirmed:true, proof:'Repository name exactly matches the paper title'};
    const core=flat(p.title.split(':')[0]);
    if(core.length>=24 && core===rn)return {score:107, confirmed:true, proof:'Repository name exactly matches the distinctive paper-title prefix'};
    const words=tokens(p.title), rw=tokens(repo.name), mw=tokens(repo.description+' '+readme);
    let commonTitle=0;for(const t of rw)if(words.has(t))commonTitle++;
    let commonMeta=0;for(const t of mw)if(words.has(t))commonMeta++;
    const author=nameClue(repo,p);
    if(author){
      const evidence=commonMeta>=2;
      return {score:(author.strong?75:67)+(evidence?8:0),confirmed:false,
        proof:`Name resembles ${author.clue}, a named co-author${evidence?' and project terminology overlaps':''}; this does not prove the code implements the paper`};
    }
    if(commonTitle>=4 && commonTitle/Math.max(words.size,1)>=.38)
      return {score:70+Math.min(commonTitle,10),confirmed:false,proof:'Multiple distinctive words in the repository name resemble the paper title'};
    if(commonTitle>=2 && commonMeta>=2 && commonTitle/Math.max(rw.size,1)>=.65)
      return {score:67,confirmed:false,proof:'Some research-topic terms match the repository name and description'};
    return null;
  }
  // All *public* forks are examined; this is not a sample of the first eight.
  async function getReadme(repo){
    try{
      const raw=await fetchJson(`${API}/repos/${encodeURIComponent(OWNER)}/${encodeURIComponent(repo.name)}/readme`);
      if(raw?.encoding==='base64' && raw.content){
        const bytes=Uint8Array.from(atob(raw.content.replace(/\s/g,'')),c=>c.charCodeAt(0));
        return new TextDecoder().decode(bytes).slice(0,120000);
      }
    }catch(_){}
    // raw.githubusercontent.com permits CORS in most browsers, not GitHub REST API quotas.
    const base=`https://raw.githubusercontent.com/${OWNER}/${encodeURIComponent(repo.name)}/${encodeURIComponent(repo.default_branch||'main')}`;
    for(const name of ['README.md','readme.md']){
      try{const r=await fetch(base+'/'+name);if(r.ok)return (await r.text()).slice(0,120000);}catch(_){}
    }
    return '';
  }
  async function fetchReadmes(repos){
    const out=new Map();let pos=0;
    const workers=Array.from({length:4},async()=>{
      while(pos<repos.length){const r=repos[pos++];out.set(r.full_name,await getReadme(r));}
    });
    await Promise.all(workers);return out;
  }
  const state={repos:[],matches:[],candidates:[],readmeChecked:0,readmeFailed:0};
  function candidatePaperCard(match,tentative){
    const r=match.repo,p=match.paper;
    return `<article class="repo-card"><div class="repo-meta"><span>${r.fork?'Forked repository':'Public repository'}</span>${r.language?`<span>${html(r.language)}</span>`:''}</div>
     <h3><a href="${html(r.html_url)}" target="_blank" rel="noopener noreferrer">${html(r.name)} ↗</a></h3>
     <p>${html(r.description||'Public repository associated with the account.')}</p>
     <div class="repo-paper">${tentative?'Possible co-author/topic association — unverified':'Paper identified by repository evidence'}: <a href="${html(p.url)}" target="_blank" rel="noopener noreferrer">${html(p.title)}</a><br><small>${html(match.proof)}</small></div></article>`;
  }
  function plainCard(r){return `<article class="repo-card"><div class="repo-meta"><span>${r.fork?'Fork':'Original repository'}</span><span>${html(r.language)}</span></div>
   <h3><a href="${html(r.html_url)}" target="_blank" rel="noopener noreferrer">${html(r.name)} ↗</a></h3>
   ${r.description?`<p>${html(r.description)}</p>`:''}</article>`;}
  function renderCodePage(){
    const matched=document.querySelector('[data-paper-code-matches]');
    if(matched){
      const verified=state.matches.filter(x=>!x.explicit).map(x=>candidatePaperCard(x,false));
      const cand=state.candidates.map(x=>candidatePaperCard(x,true));
      matched.innerHTML=(verified.length?verified.join(''):'<p class="small-note">No additional paper-verified links in public GitHub metadata.</p>')+
        (cand.length?`<div class="repo-candidate-heading"><h3>Co-author-name / title candidates to check</h3><p>These are clickable repositories, but do not assume they contain the publication’s code.</p></div>${cand.join('')}`:'');
    }
    const list=document.querySelector('[data-repo-list]');if(!list)return;
    const input=document.querySelector('[data-repo-search]'),only=document.querySelector('[data-forks-only]');
    function display(){
      const q=norm(input?.value);const subset=state.repos.filter(r=>(!only?.checked||r.fork)&&(!q||norm(r.name+' '+r.description+' '+r.language).includes(q)));
      const count=document.querySelector('[data-repo-count]');if(count)count.textContent=`${subset.length} of ${state.repos.length} public repositories · ${state.repos.filter(x=>x.fork).length} forks`;
      const byRepo=new Map([...state.matches,...state.candidates].sort((a,b)=>a.confirmed===b.confirmed?0:a.confirmed?-1:1).map(x=>[x.repo.full_name,x]));
      list.innerHTML=subset.length?subset.map(r=>{const m=byRepo.get(r.full_name);return m?candidatePaperCard(m,!m.confirmed):plainCard(r);}).join(''):'<p class="small-note">No repositories match this filter.</p>';
    }
    input?.addEventListener('input',display);only?.addEventListener('change',display);display();
  }
  function choose(matches){
    // A single fork can reference multiple publications (e.g. multi-paper codebase).
    const byPaper=new Map();
    for(const m of matches){if(!byPaper.has(m.paper.id))byPaper.set(m.paper.id,[]);byPaper.get(m.paper.id).push(m);}
    for(const p of PAPERS){
      const all=(byPaper.get(p.id)||[]).sort((a,b)=>b.score-a.score);
      const confirmed=all.filter(x=>x.confirmed);
      const tentative=all.filter(x=>!x.confirmed);
      // Existing author-supplied links always remain as stated by the author.
      if(confirmed.length){
        const best=confirmed[0];
        if(!p.code){p.code=best.repo.html_url;p.codeLabel=best.repo.fork?'Paper-linked fork':'Paper-linked repository';p.codeNote=best.proof;}
        p.additionalCodeLinks=confirmed.filter(x=>x.repo.html_url!==p.code).slice(0,3).map(x=>({url:x.repo.html_url,label:x.repo.name,proof:x.proof}));
      }else if(!p.code && tentative.length){
        const best=tentative[0],runner=tentative[1];
        const secondPaperForRepo=matches.filter(m=>m.repo.full_name===best.repo.full_name && m.paper.id!==p.id).sort((a,b)=>b.score-a.score)[0];
        // Strong *unique* co-author-name clue or strong title similarity,
        // but NEVER mark it as verified publication code.
        if(best.score>=73 && (!runner || runner.score<=best.score-9) && (!secondPaperForRepo || secondPaperForRepo.score<=best.score-9)){
          p.codeCandidate=best.repo.html_url;p.codeCandidateReason=best.proof;
        }
      }
    }
    return byPaper;
  }
  async function load(force=false){
    try{
      let cached=null;
      if(!force)try{cached=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');}catch(_){}
      if(cached && Date.now()-cached.time<CACHE_AGE){state.repos=cached.repos;state.readmeChecked=cached.readmeChecked;state.readmeFailed=cached.readmeFailed;
        const readmes=new Map(cached.readmes);
        evaluate(readmes);return;}
      showStatus('Loading public GitHub repositories…');
      state.repos=await getRepos();
      const forks=state.repos.filter(r=>r.fork);
      // Read README files for every public fork, not just the 8 best name matches.
      showStatus(`Checking documentation for ${forks.length} public forks against ${PAPERS.length} papers…`);
      const readmes=await fetchReadmes(forks);
      state.readmeChecked=readmes.size;state.readmeFailed=[...readmes.values()].filter(s=>!s).length;
      try{localStorage.setItem(CACHE_KEY,JSON.stringify({time:Date.now(),repos:state.repos,readmes:[...readmes],readmeChecked:state.readmeChecked,readmeFailed:state.readmeFailed}));}catch(_){}
      evaluate(readmes);
    }catch(e){
      showStatus('GitHub public API could not be reached or is rate-limited; author-supplied repository links remain available.');
      const m=document.querySelector('[data-paper-code-matches]');if(m)m.innerHTML='<p class="small-note">Automated audit unavailable in this browser session. Existing explicitly supplied paper–code links remain. Use the repository listing and JSON export once GitHub access recovers.</p>';
      const l=document.querySelector('[data-repo-list]');if(l)l.innerHTML='<p><a href="https://github.com/SahandZiabari?tab=repositories" target="_blank" rel="noopener noreferrer">Browse repositories on GitHub ↗</a></p>';
    }
  }
  function evaluate(readmes){
    const pool=[];
    for(const repo of state.repos){
      const readme=readmes.get(repo.full_name)||'';
      for(const paper of PAPERS){const candidate=analyze(repo,paper,readme);if(candidate)pool.push({...candidate,repo,paper});}
    }
    // Ambiguous same-repo name clues: these stay on Code page as candidates only.
    const confirmed=pool.filter(m=>m.confirmed),candidates=pool.filter(m=>!m.confirmed);
    state.matches=confirmed;state.candidates=candidates;
    choose(pool);
    showStatus(`${state.repos.length} repositories (${state.repos.filter(r=>r.fork).length} forks) checked · ${confirmed.length} paper-repository citations verified by title/DOI · ${candidates.length} associations need manual review. Readme checks: ${state.readmeChecked-state.readmeFailed}/${state.readmeChecked}.`);
    renderCodePage();
    window.dispatchEvent(new CustomEvent('sahand-code-updated',{detail:{matches:confirmed.length,candidates:candidates.length,repos:state.repos.length}}));
  }
  document.querySelector('[data-export-forks]')?.addEventListener('click',()=>{
    if(!state.repos.length){showStatus('Repository list unavailable for export; please retry.');return;}
    const data={exported_at:new Date().toISOString(),account:OWNER,public_repositories:state.repos,
      matched_repositories:state.matches.map(x=>({paper:x.paper.title,repo:x.repo.full_name,evidence:x.proof})),
      candidates_needing_review:state.candidates.map(x=>({paper:x.paper.title,repo:x.repo.full_name,evidence:x.proof})),
      note:'A name-only fork association is not proof that the repository implements the publication.'};
    const object=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=object;a.download='SahandZiabari-forks-paper-audit.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(object),2000);
  });
  document.querySelector('[data-github-refresh]')?.addEventListener('click',()=>{
    try{localStorage.removeItem(CACHE_KEY);}catch(_){}window.location.reload();
  });
  load();
})();
