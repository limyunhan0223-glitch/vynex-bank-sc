import json,math
from pathlib import Path
r=Path(__file__).resolve().parent.parent
t=json.loads((r/'analysis/transcript.json').read_text())
d=14708340/44100
starts=[0,36.08,56.64,102.98,129.14,147.76,172.6,200.4,222.92,249.82,279.64,308.02]
names=['The challenge','One governed AI helpdesk','Customer journey','AI-ready knowledge','Controlled learning','Grounded AI','Controlled workflow','Ticketing integration','Level 2 escalation','Governance','10-week MVP roadmap','Executive close']
heroes=[(33.26,'People have become the integration layer.'),(50.44,'One governed support workflow'),(83.46,'Continue from the right point'),(125.1,'Approved AI knowledge base'),(144.7,'Human expertise stays in control'),(169.7,'Escalate. Don’t guess.'),(197,'AI communicates. Workflow controls.'),(220.32,'Integrate. Not replace.'),(246.3,'Continue from where Level One stopped'),(276.6,'Governed by design'),(305.5,'Evidence before deployment'),(326.28,'One connected support journey')]
scenes=[]
for i,(start,name) in enumerate(zip(starts,names)):
 end=starts[i+1] if i<11 else d
 sf=round(start*60);ef=round(end*60) if i<11 else math.ceil(end*60)
 words=[w for s in t for w in s['words'] if start<=w['start']<end]
 scenes.append(dict(id=f'{i+1:02}',name=name,startTime=start,endTime=end,startFrame=sf,endFrame=ef,durationInFrames=ef-sf,narrationText=''.join(w['word'] for w in words).strip(),majorNarrationBeats=[dict(time=s['start'],frame=round(s['start']*60),text=s['text'].strip()) for s in t if start<=s['start']<end],heroMoment=dict(time=heroes[i][0],frame=round(heroes[i][0]*60),message=heroes[i][1]),transitionWindow=dict(startFrame=ef-36,endFrame=ef),timingStatus='ASR detected; playback review required',implemented=i==0))
(r/'helpdesk-pitch/src/timeline.ts').write_text('// End frames exclusive. Detected ASR timing; not sample-accurate speech alignment.\nexport const FPS=60;\nexport const MASTER_DURATION_SECONDS='+repr(d)+';\nexport const MASTER_DURATION_FRAMES='+str(math.ceil(d*60))+';\nexport const timeline='+json.dumps(scenes,indent=2,ensure_ascii=False)+' as const;\nexport const scene01Cues={email:217,whatsapp:271,telephone:324,understand:746,search:850,troubleshoot:954,update:1019,classify:1111,route:1164,escalate:1212,knowledge:1285,burden:1696,hero:1996,transitionStart:2129} as const;\n',encoding='utf-8')
(r/'analysis/scene-boundaries.json').write_text(json.dumps(scenes,indent=2),encoding='utf-8')

