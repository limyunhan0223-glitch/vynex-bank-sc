import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { breachStore } from '../motion/breachState';
import { BREACH_TIMING as T, breachClock, type BreachPhase } from '../motion/breachTimeline';
import { breachAlarm } from '../audio/breachAlarm';
export function useBreachSequence(ready:boolean,surface:RefObject<HTMLDivElement|null>,onSubmitted:()=>void){
 const complete=useRef(onSubmitted);complete.current=onSubmitted;
 const cleanup=useRef(()=>{});
 useEffect(()=>{breachAlarm.preload();},[]);
 useEffect(()=>{if(!ready)cleanup.current();return()=>cleanup.current();},[ready]);
 return ()=>{
  cleanup.current();const element=surface.current,host=element?.closest<HTMLElement>('.trust-scene');if(!element||!host)return;
  breachStore.reset();breachClock.elapsed=0;breachClock.pulse=0;breachClock.running=true;void breachAlarm.arm();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const events:{phase:string,time:number,audio:number|null}[]=[];
  const phase=(value:BreachPhase)=>{breachStore.update({phase:value});element.dataset.breachPhase=value;events.push({phase:value,time:Math.round(breachClock.elapsed*1000),audio:breachAlarm.time()});element.dataset.breachEvents=JSON.stringify(events);};
  phase('waiting');
  const light={value:0},volume={value:1};
  const drawLight=()=>{
   breachClock.pulse=light.value;
   const node=element.querySelector<HTMLElement>('.breach-reveal h2');
   if(node){const v=light.value*(reduced?.38:1);node.style.color=`rgb(${Math.round(240+15*v)} ${Math.round(233-163*v)} ${Math.round(237-147*v)})`;node.style.textShadow=`0 0 ${1.6*v}px rgba(255,38,65,${v*.8}),0 0 ${4*v}px rgba(230,18,48,${v*.35})`;}
  };
  let timeline:gsap.core.Timeline;
  const context=gsap.context(()=>{
   timeline=gsap.timeline({paused:true}).to(breachClock,{elapsed:T.settled,duration:T.settled,ease:'none'},0);
   timeline.call(()=>{complete.current();host.classList.add('breach-active');phase('warning_start');void breachAlarm.start();},[],T.wait);
   timeline.call(()=>phase('triangles'),[],T.firstTriangle+.001);
   timeline.call(()=>{phase('reveal');element.dataset.breachRevealed='true';},[],T.reveal);
   T.pulseStarts.forEach((at,index)=>{
    timeline.call(()=>{phase(`pulse_${index+1}` as BreachPhase);element.dataset.breachPulses=String(index+1);breachAlarm.pulse();},[],at);
    timeline.to(light,{value:.82+index*.09,duration:T.pulseRise,ease:'power2.out',onUpdate:drawLight},at)
     .to(light,{value:0,duration:T.pulseFall,ease:'power2.inOut',onUpdate:drawLight},at+T.pulseRise+T.pulseHold);
   });
   timeline.call(()=>phase('release'),[],T.alarmStop)
    .to(volume,{value:0,duration:T.audioRelease,ease:'none',onUpdate:()=>breachAlarm.gain(volume.value)},T.alarmStop)
    .call(()=>phase('clearing'),[],T.clearing)
    .call(()=>{breachAlarm.stop();phase('silence');},[],T.alarmStop+T.audioRelease)
    .call(()=>phase('information'),[],T.information)
    .call(()=>phase('primary_action'),[],T.primary)
    .call(()=>phase('actions'),[],T.secondary)
    .call(()=>{phase('settled');breachClock.running=false;},[],T.settled);
  },element);
  let last=performance.now(),elapsed=0;
  // The recording's playback clock drives the audiovisual section; wall time drives
  // the silent wait/tail. No independent beep timers and no per-frame React updates.
  const tick=()=>{
   const now=performance.now(),dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden)return;
   const audio=breachAlarm.time();
   const predicted=elapsed+dt;
   // Follow the actual sample clock; do not accumulate visual lag across a dropped frame.
   elapsed=audio!==null&&elapsed>=T.wait&&elapsed<T.alarmStop+T.audioRelease?Math.max(elapsed,T.wait+audio):predicted;
   timeline.time(Math.min(elapsed,T.settled),false);
   if(elapsed>=T.settled)gsap.ticker.remove(tick);
  };
  gsap.ticker.add(tick);
  const visibility=()=>{last=performance.now();if(document.hidden)breachAlarm.pause();else void breachAlarm.continue();};
  document.addEventListener('visibilitychange',visibility);
  cleanup.current=()=>{gsap.ticker.remove(tick);document.removeEventListener('visibilitychange',visibility);context.revert();breachAlarm.stop();breachClock.elapsed=0;breachClock.pulse=0;breachClock.running=false;host.classList.remove('breach-active','breach-forensic');['breachPhase','breachEvents','breachRevealed','breachPulses'].forEach(key=>delete element.dataset[key]);breachStore.reset();cleanup.current=()=>{};};
 };
}
