import sys,subprocess
from pathlib import Path
r=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(r/'.tools'))
import imageio_ffmpeg
p=r/'helpdesk-pitch/out'/ (sys.argv[1] if len(sys.argv)>1 else 'Scene01-Challenge.mp4')
temp=p.with_name(p.stem+'-finalizing.mp4')
# Preserve rendered H.264. Encode the unchanged master opening, with an exact
# PCM cut at the 2165/60 second review boundary; no gain/fades/speed changes.
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-hide_banner','-loglevel','error','-y','-i',str(p),'-i',str(r/'helpdesk-pitch/public/master.mp3'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-af','atrim=end_sample=1591275','-c:a','aac','-b:a','320k','-ar','44100','-movflags','+faststart',str(temp)],check=True)
temp.replace(p)
