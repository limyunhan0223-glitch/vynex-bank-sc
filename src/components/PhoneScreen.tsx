import { LockSimple, CellSignalFull, BatteryFull, Flashlight, Camera } from '@phosphor-icons/react';
import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { DeceptionScreen } from './DeceptionScreen';

type Props={screenRef:RefObject<HTMLDivElement|null>;notificationRef:RefObject<HTMLButtonElement|null>;active:boolean;interactive:boolean;onActivate:()=>void;loginReady:boolean};
export function PhoneScreen({screenRef,notificationRef,active,interactive,onActivate,loginReady}:Props){
 const reduced=useReducedMotion();
 useEffect(()=>{
  const element=notificationRef.current;
  if(!element||!interactive||reduced)return;
  let frame=0,x=0,y=0,targetX=0,targetY=0,last=0;
  const tick=(now:number)=>{
   const blend=1-Math.exp(-Math.min((now-last)/1000,.05)*12);last=now;
   x+=(targetX-x)*blend;y+=(targetY-y)*blend;
   element.style.setProperty('--reflection-x',`${x.toFixed(2)}px`);
   element.style.setProperty('--reflection-y',`${y.toFixed(2)}px`);
   frame=Math.abs(targetX-x)+Math.abs(targetY-y)>.02?requestAnimationFrame(tick):0;
  };
  const start=()=>{if(!frame){last=performance.now();frame=requestAnimationFrame(tick);}};
  const move=(event:PointerEvent)=>{
   if(event.pointerType==='touch')return;
   const rect=element.getBoundingClientRect();
   targetX=((event.clientX-rect.left)/rect.width-.5)*8;
   targetY=((event.clientY-rect.top)/rect.height-.5)*3;start();
  };
  const leave=()=>{targetX=0;targetY=0;start();};
  element.addEventListener('pointermove',move);element.addEventListener('pointerleave',leave);
  return ()=>{cancelAnimationFrame(frame);element.removeEventListener('pointermove',move);element.removeEventListener('pointerleave',leave);element.style.removeProperty('--reflection-x');element.style.removeProperty('--reflection-y');};
 },[notificationRef,interactive,reduced]);
 return <div ref={screenRef} className="phone-screen" aria-hidden="true" inert>
  <div className="phone-lock-content" inert={active} aria-hidden={active}>
  <div className="phone-status"><span>MY MAXIS</span><span><CellSignalFull size={15} weight="fill"/><span>5G</span><BatteryFull size={21} weight="fill"/></span></div>
  <div className="phone-earpiece" aria-hidden="true"><span/></div>
  <div className="phone-clock" aria-hidden="true"><LockSimple size={25} weight="fill"/><span className="phone-time"><span>9</span><span className="phone-time-colon">:</span><span>41</span></span><small>Monday, 28 September</small></div>
  <button ref={notificationRef} type="button" className={`bank-notification ${active?'is-expanded':''}`} aria-label="Open Vynex Bank notification" aria-expanded={active} disabled={!interactive} onClick={onActivate}>
   <span className="notification-heading"><span className="notification-icon"><img src="/assets/vynex-logo.png" alt=""/></span><strong>Vynex Bank</strong><span className="notification-timestamp">now</span></span>
   <span className="notification-message">Your account has been temporarily suspended due to unusual activity. Please verify your account immediately to avoid permanent suspension.</span>
   <span className="notification-url">vynex-secure.example/verify</span>
  </button>
  <div className="phone-utilities" aria-hidden="true"><span><Flashlight size={24} weight="fill"/></span><small>Swipe up to unlock</small><span><Camera size={25} weight="fill"/></span></div>
  <div className="phone-home-bar" aria-hidden="true"/>
  </div>
  <DeceptionScreen ready={active&&loginReady}/>
 </div>;
}
