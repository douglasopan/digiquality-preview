#!/usr/bin/env python3
import json,re,sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
ROOT=Path(__file__).resolve().parents[1]/'dist'
class Doc(HTMLParser):
 def __init__(self,text):
  super().__init__(); self.tags=[];self.feed(text)
 def handle_starttag(self,tag,attrs): self.tags.append((tag,dict(attrs)))
errors=[];checked=0;titles=[];descs=[]
for f in ROOT.rglob('*.html'):
 text=f.read_text();d=Doc(text); checked+=1
 def err(m): errors.append(f'{f.relative_to(ROOT)}: {m}')
 if len([1 for t,a in d.tags if t=='h1'])!=1:err('requires exactly one h1')
 if not re.search('<html lang="pt-BR"',text):err('missing lang')
 for tag,att in d.tags:
  if tag=='img' and any(x not in att for x in ['alt','width','height']):err('image missing accessible sizing')
  if tag=='input' and att.get('id') and not any(t=='label' and a.get('for')==att['id'] for t,a in d.tags):err('input missing label')
  if tag=='meta' and att.get('name')=='robots' and att.get('content')!='noindex, follow':err('preview must be noindex')
  for key in ('href','src'):
   link=att.get(key,'');split=urlsplit(link)
   if split.scheme or not link or link.startswith('#'):continue
   if not split.path.startswith('/digiquality-preview/'):err('incorrect Pages base: '+link);continue
   target=ROOT/unquote(split.path[len('/digiquality-preview/'):])
   if target.is_dir():target=target/'index.html'
   if not target.exists():err('missing local link: '+link)
   elif split.fragment and target.suffix=='.html' and f'id="{split.fragment}"' not in target.read_text():err('missing anchor: '+link)
 for js in re.findall('<script type="application/ld\\+json">(.*?)</script>',text,re.S):
  try:json.loads(js)
  except:err('invalid schema JSON')
 title=re.search('<title>(.*?)</title>',text).group(1);titles.append(title)
 desc=next(a['content'] for t,a in d.tags if t=='meta' and a.get('name')=='description');descs.append(desc)
 if any(s in text for s in ['file:///','api_key','localhost','lorem ipsum']):err('unexpected placeholder/private value')
if len(titles)!=len(set(titles)):errors.append('Duplicate titles')
if len(descs)!=len(set(descs)):errors.append('Duplicate descriptions')
assert len(list(ROOT.glob('produtos/*/index.html')))==6
assert len(list(ROOT.glob('guias/*/index.html')))==3
assert (ROOT/'assets/manrope-latin.woff2').stat().st_size>1000
assert 'Sitemap:' not in (ROOT/'robots.txt').read_text()
print(json.dumps({'html_pages':checked,'errors':errors,'total_bytes':sum(f.stat().st_size for f in ROOT.rglob('*') if f.is_file())},indent=2,ensure_ascii=False))
sys.exit(bool(errors))
