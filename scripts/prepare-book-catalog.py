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
unique={};occurrences=[]
for e in raw['artworks']:
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
 new.append(dict(id=e['id'],slug=e['id'],title=e['title'],type='painting',artist='TJ Murphy',bookGallery=True,eyebrow=section['title'],description=e['title']+' from TJ Murphy’s watercolor art books.',image=dict(src=e['previewUrl'],fullSrc=e['masterUrl'],alt=e['title']),listing=dict(status='not-for-sale'),facts=facts,story=[],back=dict(href='/book-galleries/'+section['id']+'/',label='← Back to '+section['title']),inquiry=dict(label='Contact the artist',note=''),bookSources=e['sources']))
(root/'catalog/book-products.json').write_text(json.dumps(new,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'galleries':len(groups),'artworks':len(artworks),'printCandidates':sum(e['printCandidate'] for e in artworks)}))
