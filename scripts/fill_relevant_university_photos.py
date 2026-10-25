import json, re, time, urllib.parse, urllib.request, pathlib, html, unicodedata, sys
ROOT=pathlib.Path(r'C:\Users\DELL\Documents\Codex\EDUCONNECT-main')
DATA=json.loads((ROOT/'frontend/src/data/study-abroad-university-directory.json').read_text(encoding='utf-8'))
REPORT=ROOT/'frontend/src/data/university-image-sources.json'; OUT=ROOT/'frontend/public/images/universities'; OUT.mkdir(parents=True,exist_ok=True)
old=json.loads(REPORT.read_text(encoding='utf-8')); prior={x.get('code'):x for x in old.get('entries',[]) if x.get('path') and (ROOT/'frontend/public'/x['path'].lstrip('/')).exists() and x.get('sourcePage') and x.get('license') and x.get('attribution')}
def norm(x):
 x=unicodedata.normalize('NFKD',str(x or '')).encode('ascii','ignore').decode().lower(); return re.sub(r'[^a-z0-9]+',' ',x).strip()
def clean(x): return re.sub(r'<[^>]+>',' ',html.unescape(str(x or ''))).strip()
def get(url):
 req=urllib.request.Request(url,headers={'User-Agent':'EduConnectDirectoryImporter/1.0 (attribution recorded)','Accept':'application/json'})
 with urllib.request.urlopen(req,timeout=15) as r:return json.load(r)
def oklic(x):
 n=norm(x); return not ('non commercial' in n or 'noncommercial' in n) and any(t in n for t in ['cc by','creative commons attribution','public domain','cc0','cc zero'])
def safe_slug(x): return re.sub('-+','-',norm(x).replace(' ','-')).strip('-')
# Commons only; accept a result only when its own title/description identifies the requested locality.
locality_cache={}; output=[]; total=sum(len(c['institutions']) for c in DATA['countries']); idx=0
for country in DATA['countries']:
 for inst in country['institutions']:
  idx+=1; code=inst['code']
  if code in prior:
   output.append(prior[code]); print(f'{idx}/{total} existing campus photo: {inst["name"]}',flush=True); continue
  city=(inst.get('city') or '').split('/')[0].strip(); cachekey=norm(city or country['name']); rec=locality_cache.get(cachekey)
  if rec is None and city:
   candidates=[]
   for query in [f'"{city}" university campus', f'"{city}" skyline']:
    params={'action':'query','generator':'search','gsrsearch':query,'gsrnamespace':6,'gsrlimit':10,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':900,'format':'json'}
    try: pages=(get('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params)).get('query',{}).get('pages') or {}).values()
    except Exception: pages=[]
    for page in pages:
     info=(page.get('imageinfo') or [{}])[0]; meta=info.get('extmetadata') or {}; title=page.get('title',''); desc=clean(meta.get('ImageDescription',{}).get('value','')); cats=clean(meta.get('Categories',{}).get('value','')); hay=norm(' '.join((title,desc,cats)))
     lic=clean(meta.get('LicenseShortName',{}).get('value',''))
     if not oklic(lic) or norm(city) not in hay: continue
     imageurl=info.get('thumburl') or info.get('url')
     if not imageurl: continue
     score=(20 if 'campus' in norm(title+' '+desc) else 0)+(10 if 'university' in norm(title+' '+desc) else 0)+(5 if norm(city) in norm(title) else 0)+(2 if any(k in norm(title) for k in ('skyline','city','bridge','hall','building','library','tower')) else 0)
     candidates.append((score,title,info,meta,lic,desc))
    time.sleep(.12)
   candidates.sort(key=lambda x:x[0],reverse=True); rec=None
   for score,title,info,meta,lic,desc in candidates:
    try:
     u=info.get('thumburl') or info.get('url'); req=urllib.request.Request(u,headers={'User-Agent':'EduConnectDirectoryImporter/1.0'})
     with urllib.request.urlopen(req,timeout=20) as r: blob=r.read()
     if len(blob)<6000: continue
     ext=pathlib.Path(urllib.parse.urlparse(u).path).suffix.lower()
     if ext not in ('.jpg','.jpeg','.png','.webp'): ext='.jpg'
     filename=f'{safe_slug(city)}-destination{ext}'; (OUT/filename).write_bytes(blob)
     artist=clean(meta.get('Artist',{}).get('value','')) or clean(meta.get('Credit',{}).get('value','')) or 'Wikimedia Commons contributor'
     rec={'path':'/images/universities/'+filename,'sourcePage':info.get('descriptionurl',''),'license':lic,'licenseUrl':clean(meta.get('LicenseUrl',{}).get('value','')),'attribution':artist,'sourceTitle':title,'imageDescription':desc,'verification':'city-photo-not-campus'}; break
    except Exception: continue
   locality_cache[cachekey]=rec
  if not rec:
   # Retain no unrelated photo if a location-specific result is unavailable.
   output.append({'code':code,'name':inst['name'],'path':'','verification':'no-relevant-open-license-photo'}); print(f'{idx}/{total} no relevant image: {inst["name"]}',flush=True); continue
  attribution=rec['attribution']
  if rec['verification']=='city-photo-not-campus': attribution += ' · City photo, not campus'
  output.append({'code':code,'name':inst['name'],**rec,'attribution':attribution})
  print(f'{idx}/{total} location photo: {inst["name"]} ({city})',flush=True)
  REPORT.write_text(json.dumps({'source':'Wikimedia Commons; city/location fallback is labeled and is not represented as a campus photo','generatedAt':'2026-10-25','entries':output},ensure_ascii=False,indent=2),encoding='utf-8')
# Save full report after every record (including preserved campus images).
REPORT.write_text(json.dumps({'source':'Wikimedia Commons; city/location fallback is labeled and is not represented as a campus photo','generatedAt':'2026-10-25','entries':output},ensure_ascii=False,indent=2),encoding='utf-8')
print('DONE',len(output),'entries,',sum(bool(x.get('path')) for x in output),'with photos',flush=True)
