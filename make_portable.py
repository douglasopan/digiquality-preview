#!/usr/bin/env python3
"""Produce one offline, self-contained approval preview. Does not change Pages output."""
import base64,html,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parent
DIST=ROOT/'dist'
BASE='/digiquality-preview/'
assets={}
def datauri(path):
 p=DIST/path
 if path not in assets:
  mime={'.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2'}[p.suffix]
  assets[path]='data:'+mime+';base64,'+base64.b64encode(p.read_bytes()).decode()
 return assets[path]
css=(ROOT/'src/style.css').read_text().replace("url('manrope-latin.woff2')", "url('"+datauri('assets/manrope-latin.woff2')+"')")
pages={}
for f in sorted(DIST.rglob('*.html')):
 if f.name=='404.html':continue
 path=f.parent.relative_to(DIST).as_posix()
 route='/' if path=='.' else '/'+path+'/'
 text=f.read_text()
 title=html.unescape(re.search(r'<title>(.*?)</title>',text).group(1))
 body=re.search(r'<body>(.*)</body>',text,re.S).group(1)
 def asset(m):return 'src="'+datauri(m.group(1))+'"'
 body=re.sub(r'src="'+re.escape(BASE)+r'(assets/[^"]+)"',asset,body)
 body=body.replace('href="'+BASE,'href="#/').replace('href="#conteudo"','href="#" data-scroll="conteudo"')
 body=body.replace('PRÉVIA PARA APROVAÇÃO','PRÉVIA LOCAL PARA APROVAÇÃO').replace('Novo site Digiquality · ','Arquivo para avaliação · ')
 pages[route]={'title':title,'body':body}
app=(ROOT/'src/app.js').read_text().replace('window.location.search','window.previewQuery')
# Remove persistent document/window listeners before rendering another route.
app=app.replace("document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } });", "document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } }, {signal: pageController.signal});")
app=app.replace("window.addEventListener('resize', () => { if (window.innerWidth > 850) close(); });", "window.addEventListener('resize', () => { if (window.innerWidth > 850) close(); }, {signal: pageController.signal});")
payload=json.dumps(pages,ensure_ascii=False).replace('<','\\u003c')
script='''const PAGES=PAYLOAD;
let pageController;
function initPage(){APPJS}
function render(){
 if(pageController)pageController.abort();pageController=new AbortController();
 const route=(location.hash.startsWith('#/') ? location.hash.slice(1) : '/');
 const parsed=new URL(route,'https://offline.invalid');
 const page=PAGES[parsed.pathname]||PAGES['/'];
 window.previewQuery=parsed.search;
 document.title=page.title+' · prévia local';
 document.querySelector('#app').innerHTML=page.body;
 initPage();
 window.scrollTo(0,0);
 if(parsed.hash){requestAnimationFrame(()=>document.getElementById(parsed.hash.slice(1))?.scrollIntoView());}
}
document.addEventListener('click',event=>{const a=event.target.closest('a[data-scroll]');if(a){event.preventDefault();const target=document.getElementById(a.dataset.scroll);target?.scrollIntoView();target?.setAttribute('tabindex','-1');target?.focus();}});
window.addEventListener('hashchange',render);
render();'''.replace('PAYLOAD',payload).replace('APPJS',app)
output='''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#008000"><title>Digiquality · prévia local completa</title><link rel="icon" href="__DQ_FAVICON__"><style>__DQ_STYLE__</style></head><body><div id="app"></div><noscript>Esta prévia completa usa JavaScript local para navegar. Abra o arquivo em um navegador com JavaScript habilitado. Não é preciso instalar nada nem iniciar um servidor.</noscript><script>__DQ_SCRIPT__</script></body></html>'''.replace('__DQ_FAVICON__',datauri('assets/favicon.svg')).replace('__DQ_STYLE__',css).replace('__DQ_SCRIPT__',script)
path=ROOT/'Digiquality-ABRA-ESTE-ARQUIVO.html';path.write_text(output)
# Guard against the exact dependency failure seen in the user's screenshot.
assert not re.search(r'<script[^>]+src=',output)
assert not re.search(r'<link[^>]+rel="stylesheet"',output)
assert '/digiquality-preview/assets/' not in output
assert 'src="/digiquality-preview/' not in output
assert "url('manrope-latin.woff2')" not in output
assert len(pages)==15
print(json.dumps({'file':str(path),'pages':len(pages),'size_bytes':path.stat().st_size,'external_render_dependencies':0},ensure_ascii=False,indent=2))
