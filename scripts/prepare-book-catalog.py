"""Apply the visual review to extracted artwork/caption provenance."""
import json,pathlib,sys,re,hashlib
root=pathlib.Path(__file__).resolve().parents[1];work=pathlib.Path(sys.argv[1]);raw=json.load(open(work/'extracted.json'))
# Explicit display titles where a raster heading supplies the only name.
names={('watercolor-portraits',111):'Chase Toole',('watercolor-portraits',135):'Daniel — portrait 1',('watercolor-portraits',145):'Daniel — portrait 2',('watercolor-portraits',1197):'Dorian Nakamoto',('watercolor-landscapes',1050):'Dorian Nakamoto'}
# The caption describes the entire dance series, not the dimensions of each pose.
for n,x in enumerate([222,220,224,226],1):names['watercolor-portraits',x]=f'Catherine dance series — study {n}'
for n,x in enumerate([300,298,301],1):names['watercolor-landscapes',x]=f'Larches in the North Cascades — study {n}'
for book,refs in [('watercolor-landscapes',[977,1003]),('watercolor-portraits',[1148,1174])]:
 names[book,refs[0]]='Myself, my mother Ruth, my grandpa Howard';names[book,refs[1]]='Myself in a Tam'
# Shared captions are ambiguous in these collages; keep numbered works without guessing names.
for n,x in enumerate([1037,1036,1034,1038],1):names['watercolor-portraits',x]=f'Benny and Kermit, P, Culhane, Bob — portrait {n}'
corrections={c['key']:c for c in json.load(open(root/'catalog/book-photo-corrections.json'))['corrections']}
unique={};occurrences=[]
removed={('watercolor-landscapes',300),('watercolor-landscapes',298),('watercolor-landscapes',301),('watercolor-landscapes',317),('watercolor-landscapes',315),('watercolor-landscapes',318)}
for e in raw['artworks']:
 if (e['book'],e['xref']) in removed:continue
 title=names.get((e['book'],e['xref']),e['title']);title=title if title!='____' else ''
 if not title:title=f"Untitled — {next(s['title'] for s in raw['sections'] if s['id']==e['sectionIds'][-1])}, page {e['pages'][0]}"
 # Deduplicate byte-identical images across both books, retaining all source references.
 key=e['key'];identity=e['masterSha256']
 if identity in unique:
  unique[identity]['sources'].append({k:e[k] for k in ['book','pages','xref','captions','measurements']});occurrences.append((key,unique[identity]['id']));continue
 id='book-art-'+key
 base='https://media.vermillionaurora.com/images/book-galleries/v1/'
 measurements=list(dict.fromkeys(re.sub(r'\s*[x×]\s*',' × ',m) for m in e['measurements']))
 if e['xref'] in [220,222,224,226] and e['book']=='watercolor-portraits':measurements=['96 × 24 (complete series)']
 # Biographical images and known photographs stay gallery-only. No new original stock is created.
 eligible=min(e['widthPx'],e['heightPx'])>=900 and max(e['widthPx'],e['heightPx'])>=1200
 if 'about-the-author' in '|'.join(e['sectionIds']):eligible=False
 ent={**e,'id':id,'title':title,'measurements':measurements,'printCandidate':eligible,'masterUrl':base+key+'.jpg','previewUrl':base+key+'.webp','sources':[{k:e[k] for k in ['book','pages','xref','captions','measurements']} ]}
 # Perspective-corrected display photos (scripts/book_photo_corrections.py) replace the raw desk photo on the site.
 c=corrections.get(key)
 if c:ent.update(masterUrl=c['masterUrl'],previewUrl=c['previewUrl'],photoCorrection={'widthPx':c['widthPx'],'heightPx':c['heightPx'],'masterSha256':c['masterSha256'],'previewSha256':c['previewSha256'],'config':'catalog/book-photo-corrections.json'})
 unique[identity]=ent;occurrences.append((key,id))
lookup=dict(occurrences);artworks=list(unique.values());groups=[]
for s in raw['sections']:
 ids=list(dict.fromkeys(lookup[k] for k in s['artworks']))
 if ids:groups.append({**s,'artworks':ids})
# Disambiguate untitled items on the same page without claiming an artist-given title.
seen={}
for e in artworks:
 t=e['title'];seen[t]=seen.get(t,0)+1
 if seen[t]>1:e['title']=t+' — '+str(seen[t])
# Corrected display titles (spelling and place names); the book captions keep the printed text.
title_fixes={"book-art-1708a7dca996aca40e6c": "Girl Tuning Guitar", "book-art-85d951d0a1ea09ef4aa6": "Mt. Shuksan from the Mt. Baker Trail", "book-art-5e4eb881d89ae9f5c635": "Sunset in the Strait of Juan de Fuca, Sucia Island", "book-art-f56007f6a7d6ee955caf": "Sunset in the Strait of Juan de Fuca, Patos Island 1", "book-art-d1399111a441ed91feaa": "Sunset in the Strait of Juan de Fuca, Patos Island 2", "book-art-9c7b9d41bee5615f1d7f": "Dawn in hammock at sunset in Zihuatanejo", "book-art-b7410a9f4340e559e4f4": "Dawn in Zihuatanejo", "book-art-159503a8e82d7b91c293": "Joaquim in Zihuatanejo", "book-art-87cf2a732259b313f5ab": "Sunrise in Puerto Vallarta", "book-art-471daf14a8bb7883f114": "Myself in Skandasana on Playa de los Muertos at Dawn in Puerto Vallarta", "book-art-c198f09bc8ddad18ed1e": "Sunrise at Bass Coast, Merritt, BC 2", "book-art-9a4b9331f62350fa36fc": "Sunrise at Bass Coast, Merritt, BC 1", "book-art-7718008765132b8bc17f": "Brekkie @BVBTC hoisting a sculpture in progress", "book-art-4bf5a04e40e7d8341378": "Laura in Maui at Ahihi Kinau natural reserve", "book-art-56e40e02275a8767a802": "Sunset on Camps Bay from Lion's Head", "book-art-fe853b565936ef8b2e73": "Sunset on Lion's Head", "book-art-164299ae97e7b62137f5": "Moonrise over lake in the North Cascades", "book-art-7a3ad7bacdb71faac1b8": "Lake in the North Cascades", "book-art-ffffb682294d4b12c35e": "Meditating in Gas Works Park on Solstice 2016", "book-art-614d5b68dbe5052e302a": "Devo at Bass Coast", "book-art-54ff45104a57a68d4beb": "Neil at Bass Coast", "book-art-4350a257e5a6a5e75a31": "Michael at Bass Coast", "book-art-f367882aaeb0e32471eb": "Jennica at Bass Coast", "book-art-19d9a8360c1f1df745d6": "Myself at Denny Blaine"}
for e in artworks:e['title']=title_fixes.get(e['id'],e['title'])
manifest={'schemaVersion':1,'minimumDpi':300,'books':[], 'sections':groups,'artworks':artworks}
products=json.load(open(root/'catalog/products.json'))
for p in products:
 if p['id'] in ['watercolor-landscapes','watercolor-portraits']:
  manifest['books'].append({'id':p['id'],'title':p['title'],'pdfUrl':p['book']['pdfUrl'],'sha256':hashlib.sha256((pathlib.Path(sys.argv[2])/(p['id']+'.pdf')).read_bytes()).hexdigest()})
(root/'catalog/book-galleries.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
new=[]
for e in artworks:
 facts=[{'label':'Book measurements','value':'; '.join(e['measurements'])+' — unit not specified in book'}] if e['measurements'] else []
 section=next(s for s in groups if e['id'] in s['artworks'])
 new.append(dict(id=e['id'],slug=e['id'],title=e['title'],type='painting',artist='TJ Murphy',bookGallery=True,eyebrow=section['title'],description=e['title']+' from TJ Murphy’s watercolor art books.',image=dict(src=e['previewUrl'],alt=e['title'],fullSrc=e['masterUrl'],**({'width':e['photoCorrection']['widthPx'],'height':e['photoCorrection']['heightPx']} if e.get('photoCorrection') else {})),listing=dict(status='not-for-sale'),facts=facts,story=[],back=dict(href='/book-galleries/'+section['id']+'/',label='← Back to '+section['title']),inquiry=dict(label='Contact the artist',note=''),bookSources=e['sources']))
(root/'catalog/book-products.json').write_text(json.dumps(new,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'galleries':len(groups),'artworks':len(artworks),'printCandidates':sum(e['printCandidate'] for e in artworks)}))
