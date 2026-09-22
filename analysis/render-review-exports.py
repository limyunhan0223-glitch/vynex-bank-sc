"""Finalize review audio and derive frame-exact standalone Scene 02/03 previews.

Run only after Remotion finishes Scenes01-03-Review.mp4.
No gain, fades, remix, speed change, or narration edits are applied.
"""
import sys, subprocess, json
from pathlib import Path
root=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(root/'.tools'))
import imageio_ffmpeg, av
out=root/'helpdesk-pitch/out'
master=root/'helpdesk-pitch/public/master.mp3'
ff=imageio_ffmpeg.get_ffmpeg_exe()
source=out/'Scenes01-03-Review.mp4'
def run(args):
 subprocess.run([ff,'-hide_banner','-loglevel','error','-y']+args,check=True)
fixed=out/'Scenes01-03-finalizing.mp4'
run(['-i',str(source),'-i',str(master),'-map','0:v:0','-map','1:a:0','-c:v','copy','-af','atrim=end_sample=4541565','-c:a','aac','-b:a','320k','-ar','44100','-movflags','+faststart',str(fixed)])
fixed.replace(source)
for name,start,end in [('Scene02-Solution',2165,3398),('Scene03-CustomerJourney',3398,6179)]:
 run(['-i',str(source),'-i',str(master),'-filter_complex',f'[0:v]trim=start_frame={start}:end_frame={end},setpts=PTS-STARTPTS[v];[1:a]atrim=start_sample={start*735}:end_sample={end*735},asetpts=PTS-STARTPTS[a]','-map','[v]','-map','[a]','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-r','60','-c:a','aac','-b:a','320k','-ar','44100','-movflags','+faststart',str(out/(name+'.mp4'))])
results=[]
for name,frames in [('Scenes01-03-Review',6179),('Scene02-Solution',1233),('Scene03-CustomerJourney',2781)]:
 c=av.open(str(out/(name+'.mp4')));v=c.streams.video[0];a=c.streams.audio[0]
 record=dict(file=name+'.mp4',codec=v.codec_context.name,width=v.width,height=v.height,fps=str(v.average_rate),frames=v.frames,videoDuration=float(v.duration*v.time_base),audioDuration=float(a.duration*a.time_base),audioRate=a.rate,audioChannels=a.channels)
 assert v.frames==frames and v.average_rate==60 and v.width==1920 and v.height==1080 and v.codec_context.name=='h264',record
 assert a.rate==44100 and a.channels==2 and abs(record['videoDuration']-record['audioDuration'])<.025,record
 count=sum(1 for _ in c.decode(video=0));assert count==frames
 record['decodedFrames']=count;results.append(record)
(root/'analysis/scenes01-03-export-verification.json').write_text(json.dumps(results,indent=2))
print(json.dumps(results,indent=2))
