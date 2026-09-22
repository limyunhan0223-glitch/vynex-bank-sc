import { useEffect, useRef, type ButtonHTMLAttributes, type PointerEvent } from 'react';

export function GlassButton({className='', ...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
 const frame=useRef(0);
 const light=useRef({x:50,y:15,targetX:50,targetY:15,time:0});
 const button=useRef<HTMLButtonElement>(null);
 useEffect(()=>()=>cancelAnimationFrame(frame.current),[]);
 const animate=(time:number)=>{
   const p=light.current,dt=Math.min((time-p.time)/1000,.05);p.time=time;
   const blend=1-Math.exp(-7*dt);p.x+=(p.targetX-p.x)*blend;p.y+=(p.targetY-p.y)*blend;
   button.current?.style.setProperty('--light-x',`${p.x}%`);
   button.current?.style.setProperty('--light-y',`${p.y}%`);
   frame.current=Math.abs(p.x-p.targetX)+Math.abs(p.y-p.targetY)>.1?requestAnimationFrame(animate):0;
 };
 const target=(x:number,y:number)=>{
   if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
   light.current.targetX=x;light.current.targetY=y;
   if(!frame.current){light.current.time=performance.now();frame.current=requestAnimationFrame(animate);}
 };
 const move=(event:PointerEvent<HTMLButtonElement>)=>{
   if(event.pointerType!=='mouse')return;
   const rect=event.currentTarget.getBoundingClientRect();
   target((event.clientX-rect.left)/rect.width*100,(event.clientY-rect.top)/rect.height*100);
 };
 return <button {...props} ref={button} className={`optical-button ${className}`} onPointerMove={move} onPointerLeave={()=>target(50,15)}/>;
}
