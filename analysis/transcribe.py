import sys, os, json
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / '.tools'))
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING']='1'
from faster_whisper import WhisperModel
root=Path(__file__).resolve().parent.parent
model=WhisperModel('base.en', device='cpu', compute_type='int8', download_root=str(root/'.models'))
segments,info=model.transcribe(str(root/'helpdesk-pitch/public/master.mp3'),word_timestamps=True,beam_size=5,vad_filter=True)
out=[]
for s in segments:
    row={'start':s.start,'end':s.end,'text':s.text,'words':[{'start':w.start,'end':w.end,'word':w.word,'probability':w.probability} for w in s.words]}
    out.append(row)
    print(f'{s.start:.2f} - {s.end:.2f}: {s.text}',flush=True)
    (root/'analysis/transcript.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
