import json,re,subprocess,collections
# Read-only tail. Do not print request URLs, headers, console logs, or bodies.
run=subprocess.run(['timeout','95s','npx','--yes','wrangler@4.143.0','tail','vermillion-commissions','--format','json','--status','error'],capture_output=True,text=True)
decoder=json.JSONDecoder()
raw=run.stdout
events=[]
for match in re.finditer(r'\{',raw):
    try:
        event,_=decoder.raw_decode(raw[match.start():])
        if isinstance(event,dict) and 'exceptions' in event: events.append(event)
    except ValueError: pass
def safe(value):
    text=str(value)
    text=re.sub(r'https?://\S+','[url]',text)
    text=re.sub(r'[\w.+-]+@[\w.-]+','[email]',text)
    text=re.sub(r'(?i)(token|bearer)\s+\S+',r'\1 [redacted]',text)
    text=re.sub(r'[A-Za-z0-9+/=_-]{24,}','[identifier]',text)
    return text[:800]
counts=collections.Counter()
for event in events:
    for error in event.get('exceptions',[]):
        counts[(safe(error.get('name','')),safe(error.get('message','')))]+=1
print(json.dumps({'events':len(events),'exceptions':[{'name':n,'message':m,'count':c} for (n,m),c in counts.items()],'tailExitCode':run.returncode}))
if not events and run.returncode not in [0,124]: print(safe(run.stderr))
