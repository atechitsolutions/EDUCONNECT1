import json, re, time, urllib.parse, urllib.request, pathlib, html, unicodedata
ROOT=pathlib.Path(__file__).resolve().parents[1]
SRC=ROOT/'frontend/src/data/study-abroad-university-directory.json'
OUT=ROOT/'frontend/public/images/universities'
REPORT=ROOT/'frontend/src/data/university-image-sources.json'
OUT.mkdir(parents=True,exist_ok=True)
DATA=json.loads(SRC.read_text(encoding='utf-8'))
UA='EduConnectDirectoryImporter/1.0 (campus image import; attribution recorded)'

def norm(x):
    x=unicodedata.normalize('NFKD',str(x or '')).encode('ascii','ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+',' ',x).strip()
def slug(x): return re.sub(r'-+','-',norm(x).replace(' ','-')).strip('-')
def text(x): return re.sub(r'<[^>]+>',' ',html.unescape(str(x or ''))).strip()
def getjson(url):
    req=urllib.request.Request(url,headers={'User-Agent':UA,'Accept':'application/json'})
    with urllib.request.urlopen(req,timeout=35) as r: return json.load(r)
def accepted(lic):
    n=norm(lic)
    if 'non commercial' in n or 'noncommercial' in n: return False
    return ('cc by' in n or 'creative commons attribution' in n or 'public domain' in n or 'cc0' in n or 'cc zero' in n)
entries=[i for c in DATA['countries'] for i in c['institutions']]
report={'source':'Wikimedia Commons API','generatedAt':time.strftime('%Y-%m-%d'),'entries':[]}
for idx,inst in enumerate(entries,1):
    name=inst['name']; city=inst.get('city','')
    tokens=[w for w in norm(name).split() if w not in {'university','universities','college','colleges','of','the','and','at','in','institute','school','schools'}]
    q='"'+name+'" campus'
    params={'action':'query','generator':'search','gsrsearch':q,'gsrnamespace':6,'gsrlimit':10,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':1100,'format':'json'}
    candidates=[]; error=''
    try:
        payload=getjson('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params))
        for page in (payload.get('query',{}).get('pages') or {}).values():
            info=(page.get('imageinfo') or [{}])[0]; meta=info.get('extmetadata') or {}
            title=page.get('title',''); desc=text(meta.get('ImageDescription',{}).get('value','')); cats=text(meta.get('Categories',{}).get('value',''))
            hay=norm(' '.join((title,desc,cats))); matched=[t for t in tokens if t in hay]; frac=len(matched)/max(1,len(tokens))
            license_name=text(meta.get('LicenseShortName',{}).get('value',''))
            if not accepted(license_name): continue
            if tokens and (frac<0.66 or len(matched)<min(2,len(tokens))): continue
            if not any(w in norm(title+' '+desc+' '+cats) for w in ('campus','university','college','building','school','institute','hall','library','academy')): continue
            image_url=info.get('thumburl') or info.get('url')
            if image_url:
                score=frac*10+(2 if 'campus' in norm(title) else 0)+(1 if norm(name) in norm(title) else 0)+(0.2 if city and norm(city) in hay else 0)
                candidates.append((score,title,info,meta,desc,license_name))
        candidates.sort(key=lambda x:x[0],reverse=True)
        record=None
        for _,title,info,meta,desc,lic in candidates:
            image_url=info.get('thumburl') or info.get('url')
            try:
                req=urllib.request.Request(image_url,headers={'User-Agent':UA})
                with urllib.request.urlopen(req,timeout=35) as r: content=r.read()
                if len(content)<8000: continue
                ext=pathlib.Path(urllib.parse.urlparse(image_url).path).suffix.lower()
                if ext not in ('.jpg','.jpeg','.png','.webp'): ext='.jpg'
                filename=slug(name)+ext; (OUT/filename).write_bytes(content)
                artist=text(meta.get('Artist',{}).get('value','')); attrib=text(meta.get('Attribution',{}).get('value','')) or artist
                record={'code':inst['code'],'name':name,'path':'/images/universities/'+filename,'sourcePage':info.get('descriptionurl',''),'license':lic,'licenseUrl':text(meta.get('LicenseUrl',{}).get('value','')),'artist':artist,'attribution':attrib,'sourceTitle':title,'imageDescription':desc,'verification':'commons-metadata-name-match'}
                break
            except Exception: continue
        if record is None: record={'code':inst['code'],'name':name,'path':'','verification':'no-verified-open-license-match','candidates':len(candidates)}
    except Exception as exc:
        record={'code':inst['code'],'name':name,'path':'','verification':'lookup-error','error':str(exc)}
    report['entries'].append(record)
    REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f'{idx:03}/{len(entries)} {"IMAGE" if record.get("path") else "NO IMAGE"}: {name}',flush=True)
    time.sleep(0.15)
print('RESULT',len(entries),'records,',sum(bool(r.get('path')) for r in report['entries']),'images; missing',sum(not r.get('path') for r in report['entries']),flush=True)
