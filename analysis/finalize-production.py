"""Preserve approved opening video; join new scenes and original master audio.

All cuts use the existing 60 fps timeline. No gain, fades or tempo edits.
"""
import json, subprocess, sys
from pathlib import Path
root=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(root/'.tools'))
import av, imageio_ffmpeg
out=root/'helpdesk-pitch/out'; master=root/'helpdesk-pitch/public/master.mp3'
ff=imageio_ffmpeg.get_ffmpeg_exe()
def run(args):
 subprocess.run([ff,'-hide_banner','-loglevel','error','-y']+args,check=True)
new=out/'Scenes04-12-Review.mp4';fixed=out/'Scenes04-12-audio-finalizing.mp4'
run(['-i',str(new),'-i',str(master),'-map','0:v:0','-map','1:a:0','-c:v','copy','-af','atrim=start_sample=4541565,asetpts=PTS-STARTPTS','-c:a','aac','-b:a','320k','-ar','44100','-movflags','+faststart',str(fixed)])
fixed.replace(new)
# Concat video-only intermediates: audio durations cannot shift the join.
for source,target in [('Scenes01-03-Review.mp4','production-opening-video.mp4'),('Scenes04-12-Review.mp4','production-new-video.mp4')]:
 run(['-i',str(out/source),'-map','0:v:0','-c:v','copy','-an',str(out/target)])
concat=out/'production-concat.txt'
concat.write_text("file 'production-opening-video.mp4'\nfile 'production-new-video.mp4'\n")
full=out/'AI-Helpdesk-FullFilm-Scenes01-12.mp4'
run(['-f','concat','-safe','0','-i',str(concat),'-i',str(master),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','320k','-ar','44100','-movflags','+faststart',str(full)])
# Requested 12-second transition: last five seconds of 11, first seven of 12.
start,end=18181,18901
run(['-i',str(full),'-i',str(master),'-filter_complex',f'[0:v]trim=start_frame={start}:end_frame={end},setpts=PTS-STARTPTS[v];[1:a]atrim=start_sample={start*735}:end_sample={end*735},asetpts=PTS-STARTPTS[a]','-map','[v]','-map','[a]','-c:v','libx264','-crf','17','-preset','medium','-pix_fmt','yuv420p','-r','60','-c:a','aac','-b:a','320k','-ar','44100','-movflags','+faststart',str(out/'Scene11-to-12-Transition.mp4')])
results=[]
for name,frames in [('Scenes04-12-Review.mp4',13833),('AI-Helpdesk-FullFilm-Scenes01-12.mp4',20012),('Scene11-to-12-Transition.mp4',720)]:
 c=av.open(str(out/name));v=c.streams.video[0];a=c.streams.audio[0]
 record=dict(file=name,frames=v.frames,fps=str(v.average_rate),width=v.width,height=v.height,videoSeconds=float(v.duration*v.time_base),audioSeconds=float(a.duration*a.time_base),codec=v.codec_context.name,audioRate=a.rate,audioChannels=a.channels)
 assert v.frames==frames and v.average_rate==60 and v.width==1920 and v.height==1080,record
 assert a.rate==44100 and a.channels==2 and abs(record['videoSeconds']-record['audioSeconds'])<.025,record
 previous=None;count=0
 for frame in c.decode(video=0):
  if previous is not None: assert abs(float((frame.pts-previous)*v.time_base)-1/60)<.0001
  previous=frame.pts;count+=1
 assert count==frames;record['decodedFrames']=count;results.append(record);c.close()
 print(name,'validated',flush=True)
(root/'analysis/production-export-verification.json').write_text(json.dumps(results,indent=2))
print(json.dumps(results,indent=2))
