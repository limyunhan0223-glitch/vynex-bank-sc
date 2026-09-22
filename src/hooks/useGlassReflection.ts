import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/** Reflection only: no panel motion, no React updates, no idle animation. */
export function useGlassReflection(ref:RefObject<HTMLElement|null>,enabled:boolean){
 const reduced=useReducedMotion();
 useEffect(()=>{
  const element=ref.current;if(!element||!enabled||reduced)return;
  let frame=0,last=0,x=0,y=0,targetX=0,targetY=0;
  const tick=(now:number)=>{
   const blend=1-Math.exp(-8*Math.min((now-last)/1000,.05));last=now;
   x+=(targetX-x)*blend;y+=(targetY-y)*blend;
   element.style.setProperty('--glass-x',`${x.toFixed(3)}px`);
   element.style.setProperty('--glass-y',`${y.toFixed(3)}px`);
   frame=Math.abs(targetX-x)+Math.abs(targetY-y)>.005?requestAnimationFrame(tick):0;
  };
  const start=()=>{if(!frame){last=performance.now();frame=requestAnimationFrame(tick);}};
  const move=(event:PointerEvent)=>{
   if(event.pointerType==='touch')return;
   const rect=element.getBoundingClientRect();
   targetX=Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1));
   targetY=Math.max(-.45,Math.min(.45,((event.clientY-rect.top)/rect.height*2-1)*.45));start();
  };
  const leave=()=>{targetX=0;targetY=0;start();};
  element.addEventListener('pointermove',move,{passive:true});element.addEventListener('pointerleave',leave);
  return()=>{cancelAnimationFrame(frame);element.removeEventListener('pointermove',move);element.removeEventListener('pointerleave',leave);element.style.removeProperty('--glass-x');element.style.removeProperty('--glass-y');};
 },[ref,enabled,reduced]);
}
