import urllib.parse,urllib.request,json
for q in ['Sydney','Paris','Milan','Dubai','Budapest']:
 p={'action':'query','generator':'search','gsrsearch':q,'gsrnamespace':6,'gsrlimit':5,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':600,'format':'json'}
 u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(p)
 try:
  req=urllib.request.Request(u,headers={'User-Agent':'EduConnect/1.0 (image attribution)'}); d=json.load(urllib.request.urlopen(req,timeout=15)); print(q,[(x.get('title')) for x in d.get('query',{}).get('pages',{}).values()])
 except Exception as e: print(q,repr(e))
