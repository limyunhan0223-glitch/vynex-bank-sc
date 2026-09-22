"""Local-only media review with byte-range support for browser playback."""
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import mimetypes
ROOT=Path(__file__).resolve().parent.parent/'helpdesk-pitch/out'
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs): super().__init__(*args,directory=str(ROOT),**kwargs)
 def log_message(self,*args): pass
 def do_GET(self):
  p=Path(self.translate_path(self.path)).resolve()
  if not p.is_relative_to(ROOT.resolve()): self.send_error(403);return
  if p.suffix.lower()!='.mp4' or not p.exists(): return super().do_GET()
  size=p.stat().st_size;start,end=0,size-1
  requested=self.headers.get('Range','')
  if requested.startswith('bytes='):
   bits=requested[6:].split(',')[0].split('-');start=int(bits[0] or 0);end=min(int(bits[1]) if bits[1] else size-1,size-1)
  if start> end or start>=size:self.send_error(416);return
  self.send_response(206 if requested else 200);self.send_header('Content-Type',mimetypes.guess_type(p)[0] or 'video/mp4');self.send_header('Accept-Ranges','bytes');self.send_header('Content-Length',str(end-start+1))
  if requested:self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
  self.end_headers()
  try:
   with p.open('rb') as src:
    src.seek(start);left=end-start+1
    while left:
     data=src.read(min(left,1024*256))
     if not data:break
     self.wfile.write(data);left-=len(data)
  except (BrokenPipeError,ConnectionResetError):pass
print('http://127.0.0.1:3035/Production-Review.html',flush=True)
ThreadingHTTPServer(('127.0.0.1',3035),Handler).serve_forever()
