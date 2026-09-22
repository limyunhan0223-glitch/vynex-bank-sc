import {useProtectionScroll} from '../hooks/useProtectionScroll';
import {protectionMotion} from '../motion/protectionState';
import { ProtectionScene } from '../components/ProtectionScene';
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/Navbar';
import { HeroContent } from '../components/HeroContent';
import { FeatureCards } from '../components/FeatureCards';
import { ScrollIndicator } from '../components/ScrollIndicator';
import { ExperienceDialog } from '../components/ExperienceDialog';
import { SceneErrorBoundary } from '../components/SceneErrorBoundary';
import { FloatingPanels } from '../three/FloatingPanels';
import { BaitScene } from './BaitScene';
import { DeceptionEditorial } from './DeceptionEditorial';
import { initialMotion } from '../motion/baitMotion';
import { useParallax } from '../hooks/useParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';
const VynexScene=lazy(()=>import('../three/VynexScene'));
gsap.registerPlugin(ScrollTrigger);
export function TrustScene(){
 useProtectionScroll();
 const host=useRef<HTMLElement>(null),motion=useRef(initialMotion());
 const reduced=useReducedMotion(),pointer=useParallax(reduced);
 const [dialog,setDialog]=useState<string|null>(null),[compact,setCompact]=useState(innerWidth<768);
 const [phoneMounted,setPhoneMounted]=useState(false),[active,setActive]=useState(false);
 const mountedRef=useRef(false);
 const activeRef=useRef(false),invalidate=useRef<(()=>void)|null>(null),trigger=useRef<ScrollTrigger|null>(null);
 const context=useRef<gsap.Context|null>(null),focusTween=useRef<gsap.core.Tween|null>(null);
 useEffect(()=>{const m=matchMedia('(max-width:767px)');const update=()=>setCompact(m.matches);m.addEventListener('change',update);return()=>m.removeEventListener('change',update);},[]);
 useLayoutEffect(()=>{
  Object.assign(motion.current,initialMotion(),{visualFocus:0,shade:.04});
  const ctx=gsap.context(()=>{
   const tl=gsap.timeline({paused:true});
   // Scene 01's initial styles, geometry and first glide remain unchanged.
   tl.to(motion.current,{progress:1,ease:'none',duration:1},0)
    .to('.hero-copy',{y:-45,opacity:0,ease:'power1.inOut',duration:.7},.12)
    .to('.floating-panels',{y:-20,opacity:0,duration:1},0)
    .to('.bottom-content',{y:22,opacity:0,duration:.6},.08)
    .to('.scroll-indicator',{opacity:0,duration:.2},0)
    .to(motion.current,{depth:1,ease:'power2.inOut',duration:1.35},.55)
    .to(motion.current,{shade:.48,duration:1.8,ease:'none'},.25)
    .to('.navbar',{opacity:.15,duration:.7},.7)
    .to(motion.current,{phone:1,ease:'none',duration:1.5},1.1)
    .to('.bait-layer',{autoAlpha:1,duration:.65,ease:'power3.out'},1.85)
    .to(motion.current,{notification:1,ease:'power2.out',duration:.45},2.85)
    .to({}, {duration:.35});
   trigger.current=ScrollTrigger.create({
    trigger:compact?'#transition':host.current,animation:tl,
    start:compact?'top 70%':'top top',end:()=>`+=${innerHeight*(compact?2.2:3.15)}`,
    pin:!compact,scrub:reduced?true:1.3,anticipatePin:1,invalidateOnRefresh:true,
    onUpdate:()=>invalidate.current?.(),
   });
   tl.eventCallback('onUpdate',()=>{
    if(protectionMotion.started)return;
    const m=motion.current;
    const mount=m.phone>.0001;
    if(mount!==mountedRef.current){mountedRef.current=mount;setPhoneMounted(mount);}
    host.current?.classList.toggle('bait-mobile-active',compact&&m.depth>.005);
    const layer=host.current?.querySelector<HTMLElement>('.bait-layer');
    if(layer){layer.inert=m.phone<.9;layer.setAttribute('aria-hidden',String(m.phone<.9));}
    for(const selector of ['.hero-copy','.bottom-content','.navbar','.scroll-indicator']){
     const element=host.current?.querySelector<HTMLElement>(selector);if(element)element.inert=m.depth>.5;
    }
    if(m.notification<.95&&activeRef.current){
     focusTween.current?.kill();activeRef.current=false;setActive(false);
     focusTween.current=gsap.to(m,{focus:0,duration:reduced?0:.75,ease:'power3.out',onUpdate:()=>invalidate.current?.()});
    }
    invalidate.current?.();
   });
  },host);
  context.current=ctx;
  return()=>{focusTween.current?.kill();ctx.revert();trigger.current=null;context.current=null;host.current?.classList.remove('bait-mobile-active');Object.assign(motion.current,initialMotion(),{visualFocus:0,shade:.04});};
 },[compact,reduced]);
 const activate=()=>{
  if(activeRef.current||motion.current.notification<.95)return;
  activeRef.current=true;setActive(true);
  context.current?.add(()=>{focusTween.current=gsap.to(motion.current,{focus:1,duration:reduced?0:1.45,ease:'power2.inOut',onUpdate:()=>invalidate.current?.()});});
 };
 const enterExperience=()=>{const st=trigger.current;if(st)window.scrollTo({top:st.start+(st.end-st.start)*.92,behavior:reduced?'instant':'smooth'});};
 return <><main id="home" ref={host} className={`trust-scene ${reduced?'reduced-motion':''}`}><div className="architecture"/><div className="architecture scene03-architecture" aria-hidden="true"/><div className="scene-shade"/><Navbar onAction={setDialog}/><HeroContent onAction={setDialog}/><div className="visual-stage"><SceneErrorBoundary><Suspense fallback={<div className="scene-loading">Preparing your tomorrow<span/></div>}><VynexScene motion={motion} pointer={pointer} reduced={reduced} compact={compact} phoneMounted={phoneMounted} active={active} onActivate={activate} invalidateRef={invalidate}/></Suspense></SceneErrorBoundary><FloatingPanels/></div><FeatureCards onAction={setDialog}/><ScrollIndicator onExperience={enterExperience}/><BaitScene active={active}/><DeceptionEditorial/><ProtectionScene reduced={reduced}/></main><div id="transition" className="scene-transition-anchor" aria-hidden="true"/><ExperienceDialog title={dialog} onClose={()=>setDialog(null)} onAction={setDialog}/></>;
}
