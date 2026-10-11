// DOM behavior tests. Install jsdom in your QA environment; not a runtime dependency.
const fs=require('fs'),assert=require('assert');
const {JSDOM}=require(process.env.JSDOM_PATH || '../.transfer/jsdom/node_modules/jsdom');
const root=require('path').resolve(__dirname,'..');
const script=fs.readFileSync(root+'/src/app.js','utf8');
function open(path,query=''){
 const dom=new JSDOM(fs.readFileSync(root+'/dist/'+path+'/index.html','utf8'),{url:'https://douglasopan.github.io/digiquality-preview/'+path+'/'+query,runScripts:'outside-only'});
 const w=dom.window;w.HTMLElement.prototype.scrollIntoView=function(opts){this._scroll=opts};w.matchMedia=()=>({matches:true});
 return dom;
}
(async()=>{
 const cases=[];
 const catalog=open('catalogo'); const w=catalog.window,d=w.document;w.eval(script);
 const search=d.querySelector('#catalog-search'),filter=d.querySelector('#catalog-filter');
 const count=()=>[...d.querySelectorAll('[data-search]')].filter(x=>!x.hidden).length;
 const run=(text,fun='')=>{search.value=text;filter.value=fun;search.dispatchEvent(new w.Event('input'));return count()};
 assert.equal(count(),6);assert.equal(run('porta-fusíveis'),1);assert.equal(run('porta-fusível'),1);assert.equal(run('SIDACtor','sobretensao'),1);assert.equal(run('fusível 5x20'),2);assert.equal(run('triac','controle'),1);assert.equal(run('componenteinexistente'),0);assert.equal(d.querySelector('#empty-results').hidden,false);d.querySelector('#clear-search').click();assert.equal(count(),6);cases.push('search: initial, accents, hyphens, plural, function, multi-function, no-results and reset');
 const menu=d.querySelector('.menu-toggle');menu.click();assert.equal(menu.getAttribute('aria-expanded'),'true');w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(menu.getAttribute('aria-expanded'),'false');assert.equal(d.activeElement,menu);cases.push('menu: toggle, Escape and focus return');
 const quote=open('contato','?categoria=PTC%20reset%C3%A1veis');const q=quote.window,qd=q.document;
 assert.equal(qd.querySelector('#prepare-quote').disabled,true);q.eval(script);assert.equal(qd.querySelector('#prepare-quote').disabled,false);const form=qd.querySelector('#quote-form');assert.equal(form.elements.category.value,'PTC resetáveis');
 Object.entries({part:'FUS-123 & <teste>',quantity:'50 unidades',name:'Teste de qualidade',email:'qa@example.com',application:'Teste local; nada enviado'}).forEach(([k,v])=>form.elements[k].value=v);
 const evt=new q.Event('submit',{bubbles:true,cancelable:true});form.dispatchEvent(evt);assert.equal(evt.defaultPrevented,true);assert.equal(qd.querySelector('#quote-output').hidden,false);const url=qd.querySelector('#open-email').href;assert.ok(url.startsWith('mailto:vendas@digiquality.com.br?'));const params=new URLSearchParams(url.split('?')[1]);assert.equal(params.get('body'),qd.querySelector('#quote-message').value);assert.ok(params.get('subject').includes('FUS-123 & <teste>'));assert.ok(qd.querySelector('#copy-status').textContent.includes('Nada foi enviado'));assert.equal(qd.querySelector('#quote-output')._scroll.behavior,'auto');
 qd.querySelector('#copy-message').click();await new Promise(r=>setTimeout(r,0));assert.ok(qd.querySelector('#copy-status').textContent.includes('manualmente'));cases.push('quote: no-JS disabled, category query, prevented submit, mailto escaping, body match, no false send, clipboard fallback, reduced motion');
 const html=fs.readFileSync(root+'/dist/contato/index.html','utf8');assert.ok(!html.includes('fetch('));assert.ok(!script.includes('fetch('));assert.ok(!script.includes('localStorage'));cases.push('privacy: no fetch or persistent storage in site script');
 console.log(JSON.stringify({status:'pass',cases},null,2));
 catalog.window.close();quote.window.close();
})().catch(e=>{console.error(e);process.exit(1)});
