import sys,subprocess,json
from pathlib import Path
root=Path(__file__).resolve().parent.parent;sys.path.insert(0,str(root/'.tools'))
import imageio_ffmpeg,numpy as np
ff=imageio_ffmpeg.get_ffmpeg_exe();out=root/'helpdesk-pitch/out';master=root/'helpdesk-pitch/public/master.mp3'
def samples(file,start):
 b=subprocess.check_output([ff,'-v','error','-i',str(file),'-ss',str(start),'-t','2','-vn','-ac','2','-ar','44100','-f','f32le','pipe:1'])
 return np.frombuffer(b,dtype='<f4').astype(np.float64)
checks=[]
for name,offset,points in [('Scenes04-12-Review.mp4',6179/60,[1,77,185,227]),('AI-Helpdesk-FullFilm-Scenes01-12.mp4',0,[1,105,205,328]),('Scene11-to-12-Transition.mp4',18181/60,[1,8])]:
 for t in points:
  a=samples(out/name,t);b=samples(master,t+offset);n=min(len(a),len(b));cor=float(np.corrcoef(a[:n],b[:n])[0,1]);ratio=float(np.sqrt(np.mean(a[:n]**2)/np.mean(b[:n]**2)))
  record=dict(file=name,localSecond=t,masterSecond=t+offset,correlation=cor,rmsRatio=ratio);checks.append(record)
  assert cor>.99 and .97<ratio<1.03,record
(root/'analysis/production-audio-verification.json').write_text(json.dumps(checks,indent=2));print(json.dumps(checks,indent=2))
