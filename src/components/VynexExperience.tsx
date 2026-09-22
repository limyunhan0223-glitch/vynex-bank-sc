import {useCallback,useEffect,useRef,useState} from 'react';
import {flushSync} from 'react-dom';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {TrustScene} from '../sections/TrustScene';
import {breachAlarm} from '../audio/breachAlarm';
import {breachStore} from '../motion/breachState';
import {protectionStore} from '../motion/protectionState';
import {RestartContext,restartMotion,resetRestartMotion} from '../motion/restartState';
import {useReducedMotion} from '../hooks/useReducedMotion';
import '../styles/restart.css';

export function VynexExperience(){
 const [mounted,setMounted]=useState(true),[session,setSession]=useState(0),[busy,setBusy]=useState(false);
 const cover=useRef<HTMLDivElement>(null),surface=useRef<HTMLDivElement>(null),running=useRef(false),timeline=useRef<gsap.core.Timeline|null>(null);
 const reduced=useReducedMotion();
 const restart=useCallback(()=>{
  if(running.current||!protectionStore.get().complete)return;
  running.current=true;setBusy(true);breachAlarm.stop();protectionStore.preview(null);
  const tl=gsap.timeline({onUpdate:()=>restartMotion.invalidate?.(),onComplete:()=>{running.current=false;setBusy(false);timeline.current=null;}});timeline.current=tl;
  tl.to(surface.current!.querySelectorAll('.protection-copy,.protection-selectors,.protection-brand,.protection-progress'),{opacity:0,y:reduced?0:-8,duration:.4,ease:'power3.out'},.05);
  [0,1,2].forEach(index=>tl.to(restartMotion.rings,{[index]:1,duration:reduced?.3:.7,ease:'power2.inOut'},.12+index*.1));
  tl.to(restartMotion,{core:1,duration:.4,ease:'power2.inOut'},.65)
   .to(cover.current,{opacity:1,duration:.55,ease:'power2.inOut'},.55)
   .call(()=>{
    // Unmount first: every scene cleans up its triggers, listeners, form and audio timeline.
    flushSync(()=>setMounted(false));
    breachAlarm.reset();breachStore.reset();protectionStore.reset();resetRestartMotion();
    window.scrollTo({top:0,left:0,behavior:'instant'});
    flushSync(()=>{setSession(value=>value+1);setMounted(true);});
    ScrollTrigger.refresh();window.scrollTo({top:0,left:0,behavior:'instant'});
   },[],1.1)
   .to(cover.current,{opacity:0,duration:reduced?.45:1,ease:'power2.inOut'},1.5);
 },[reduced]);
 useEffect(()=>()=>{timeline.current?.kill();},[]);
 return <RestartContext.Provider value={restart}>
  <div ref={surface} className="vynex-session" inert={busy} data-session={session}>{mounted&&<TrustScene key={session}/>}</div>
  <div ref={cover} className="vynex-restart-cover" data-active={busy} aria-hidden="true"/>
 </RestartContext.Provider>;
}

