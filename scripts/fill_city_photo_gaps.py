import json, re, time, urllib.parse, urllib.request, pathlib, html, unicodedata
ROOT=pathlib.Path(r'C:\Users\DELL\Documents\Codex\EDUCONNECT-main'); DATA=json.loads((ROOT/'frontend/src/data/study-abroad-university-directory.json').read_text(encoding='utf-8')); REPORT=ROOT/'frontend/src/data/university-image-sources.json'; OUT=ROOT/'frontend/public/images/universities'; report=json.loads(REPORT.read_text(encoding='utf-8')); bycode={x['code']:x for x in report['entries']}; cache={};
def norm(x): return re.sub(r'[^a-z0-9]+',' ',unicodedata.normalize('NFKD',str(x or '')).encode('ascii','ignore').decode().lower()).strip()
def clean(x): return re.sub(r'<[^>]+>',' ',html.unescape(str(x or ''))).strip()
def get(url):
 req=urllib.request.Request(url,headers={'User-Agent':'EduConnect/1.0 (photo credit recorded)','Accept':'application/json'})
 with urllib.request.urlopen(req,timeout=20) as r:return json.load(r)
def licensed(s):
 n=norm(s);return not ('non commercial' in n or 'noncommercial' in n) and any(t in n for t in ['cc by','creative commons attribution','public domain','cc0','cc zero'])
def slug(s):return re.sub('-+','-',norm(s).replace(' ','-')).strip('-')
allinst=[(c,i) for c in DATA['countries'] for i in c['institutions']]
todo=[(c,i) for c,i in allinst if not bycode.get(i['code'],{}).get('path')]
for n,(country,inst) in enumerate(todo,1):
 city=(inst.get('city') or '').split('/')[0].strip(); key=norm(city)
 if not city:continue
 rec=cache.get(key)
 if rec is None:
  p={'action':'query','generator':'search','gsrsearch':city,'gsrnamespace':6,'gsrlimit':10,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':850,'format':'json'}
  try: pages=(get('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(p)).get('query',{}).get('pages') or {}).values()
  except Exception: pages=[]
  cands=[]
  for page in pages:
   info=(page.get('imageinfo') or [{}])[0]; meta=info.get('extmetadata') or {}; title=page.get('title',''); desc=clean(meta.get('ImageDescription',{}).get('value','')); cats=clean(meta.get('Categories',{}).get('value','')); hay=norm(' '.join((title,desc,cats))); lic=clean(meta.get('LicenseShortName',{}).get('value',''))
   if not licensed(lic) or key not in hay:continue
   url=info.get('thumburl') or info.get('url')
   if not url:continue
   score=(10 if key in norm(title) else 0)+(5 if any(t in norm(title+' '+desc) for t in ('skyline','city','town','bridge','building','university','campus','cathedral','station','harbour','harbor')) else 0)
   cands.append((score,title,info,meta,lic,desc))
  cands.sort(key=lambda z:z[0],reverse=True); rec=None
  for _,title,info,meta,lic,desc in cands:
   try:
    url=info.get('thumburl') or info.get('url'); req=urllib.request.Request(url,headers={'User-Agent':'EduConnect/1.0'})
    with urllib.request.urlopen(req,timeout=20) as r: blob=r.read()
    if len(blob)<6000:continue
    ext=pathlib.Path(urllib.parse.urlparse(url).path).suffix.lower(); ext=ext if ext in ('.jpg','.jpeg','.png','.webp') else '.jpg'; fn=slug(city)+'-destination'+ext; (OUT/fn).write_bytes(blob)
    artist=clean(meta.get('Artist',{}).get('value','')) or clean(meta.get('Credit',{}).get('value','')) or 'Wikimedia Commons contributor'
    rec={'path':'/images/universities/'+fn,'sourcePage':info.get('descriptionurl',''),'license':lic,'licenseUrl':clean(meta.get('LicenseUrl',{}).get('value','')),'attribution':artist+' · City photo, not campus','sourceTitle':title,'imageDescription':desc,'verification':'city-photo-not-campus'};break
   except Exception:continue
  cache[key]=rec; time.sleep(.1)
 if rec:
  bycode[inst['code']]={'code':inst['code'],'name':inst['name'],**rec}; print(f'{n}/{len(todo)} {inst["name"]}: {city}',flush=True)
 else: print(f'{n}/{len(todo)} no photo: {inst["name"]}',flush=True)
report['entries']=[bycode.get(i['code'],{'code':i['code'],'name':i['name'],'path':'','verification':'no-relevant-open-license-photo'}) for _,i in allinst]
report['source']='Wikimedia Commons; fallback images are real locality photos, clearly attributed and not represented as campus photos'; REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8'); print('DONE',sum(bool(x.get('path')) for x in report['entries']),'of',len(report['entries']),'with images',flush=True)
