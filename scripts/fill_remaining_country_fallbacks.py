import json, pathlib
ROOT=pathlib.Path(r'C:\Users\DELL\Documents\Codex\EDUCONNECT-main'); REPORT=ROOT/'frontend/src/data/university-image-sources.json'; DIR=ROOT/'frontend/src/data/study-abroad-university-directory.json'; report=json.loads(REPORT.read_text(encoding='utf-8')); data=json.loads(DIR.read_text(encoding='utf-8')); rows=report['entries']; inst_by_code={i['code']:i for c in data['countries'] for i in c['institutions']}; country_by_code={i['code']:c for c in data['countries'] for i in c['institutions']}; bycode={r['code']:r for r in rows}
# Verified, location-specific Australian fallback for the country, since Commons did not return city matches during the previous pass.
bycode['AU-1']={'code':'AU-1','name':'Australian National University','path':'/images/universities/sydney-destination.jpg','sourcePage':'https://commons.wikimedia.org/wiki/File:Sydney_Opera_House_-_Dec_2008.jpg','license':'CC BY-SA 3.0','licenseUrl':'https://creativecommons.org/licenses/by-sa/3.0','attribution':'Diliff · Australia destination photo from Sydney, not campus','sourceTitle':'Sydney Opera House - Dec 2008.jpg','imageDescription':'Sydney Opera House viewed from Sydney Harbour Bridge.','verification':'country-photo-not-campus'}
# Preserve directly verified institution photos. For remaining records, use the closest available real city image in that country and disclose the location in the photo credit.
for country in data['countries']:
 members=country['institutions']; codes={i['code'] for i in members}
 candidates=[bycode[i['code']] for i in members if bycode.get(i['code'],{}).get('path') and bycode[i['code']].get('verification')=='city-photo-not-campus']
 if country['code']=='AU':
  candidates=[bycode['AU-1']]
 if not candidates: continue
 for inst in members:
  entry=bycode.get(inst['code'],{})
  if entry.get('path'):continue
  # Prefer a city photo within the same state/province/region when one exists.
  same_region=[c for c in candidates if inst.get('state') and inst_by_code.get(c['code'],{}).get('state')==inst.get('state')]
  source=(same_region or candidates)[0]
  source_inst=inst_by_code.get(source['code'],{})
  source_city=(source_inst.get('city') or country['name']).split('/')[0].strip()
  attribution=source.get('attribution','Wikimedia Commons contributor').split(' · ')[0]+f' · Destination photo from {source_city}, not this campus'
  bycode[inst['code']]={'code':inst['code'],'name':inst['name'],'path':source['path'],'sourcePage':source.get('sourcePage',''),'license':source.get('license',''),'licenseUrl':source.get('licenseUrl',''),'attribution':attribution,'sourceTitle':source.get('sourceTitle',''),'imageDescription':source.get('imageDescription',''),'verification':'same-country-location-fallback'}
report['entries']=[bycode.get(i['code'],{'code':i['code'],'name':i['name'],'path':'','verification':'no-relevant-open-license-photo'}) for c in data['countries'] for i in c['institutions']]
report['source']='Wikimedia Commons; photos are either institution campus images or attributed country/city location photos clearly labeled as not that institution campus.'
REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print('photos',sum(bool(r.get('path')) for r in report['entries']),'of',len(report['entries'])); print('uncovered',[r['name'] for r in report['entries'] if not r.get('path')])
