import sys,json
from pathlib import Path
r=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(r/'.tools'))
import av
p=r/'helpdesk-pitch/out'/ (sys.argv[1] if len(sys.argv)>1 else 'Scene01-Challenge.mp4')
c=av.open(str(p));v=c.streams.video[0];a=c.streams.audio[0]
metadata={'codec':v.codec_context.name,'width':v.width,'height':v.height,'fps':str(v.average_rate),'frames':v.frames,'videoDuration':float(v.duration*v.time_base),'audioCodec':a.codec_context.name,'audioSampleRate':a.rate,'audioChannels':a.channels,'audioDuration':float(a.duration*a.time_base),'bytes':p.stat().st_size}
assert v.width==1920 and v.height==1080 and v.average_rate==60 and v.frames==2165 and v.codec_context.name=='h264'
assert a.channels==2 and abs(metadata['audioDuration']-metadata['videoDuration'])<.05
count=0
for f in c.decode(video=0):
 count+=1
assert count==2165
metadata['decodedFrameCount']=count
(r/'analysis'/ (p.stem+'-verification.json')).write_text(json.dumps(metadata,indent=2))
print(json.dumps(metadata,indent=2))
