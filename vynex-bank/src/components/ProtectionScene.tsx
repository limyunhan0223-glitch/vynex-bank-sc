import {VynexGlassCTA} from './VynexGlassCTA';
import {useRestart} from '../motion/restartState';
import {breachStore} from '../motion/breachState';
import {useGlassReflection} from '../hooks/useGlassReflection';
import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ArrowRight,Check,ShieldCheck,EnvelopeSimple,Link,Monitor,LockSimple,Scan,Users,Flag,IdentificationCard,FileText} from '@phosphor-icons/react';
import {PROTECTION_LAYERS} from '../content/protectionLayers';
import {protectionMotion,protectionStore,useProtection,type ProtectionLayer} from '../motion/protectionState';
const icons={identity:IdentificationCard,mail:EnvelopeSimple,shield:ShieldCheck,link:Link,device:Monitor,lock:LockSimple,scan:Scan,people:Users,flag:Flag,policy:FileText};
export function ProtectionScene({reduced}:{reduced:boolean}){
 const state=useProtection(),root=useRef<HTMLElement>(null),panel=useRef<HTMLDivElement>(null),reveal=useRef<gsap.core.Timeline|null>(null);
 useGlassReflection(panel,state.entered&&state.ready);

 useEffect(()=>{if(!state.entered||!root.current)return;
 const host=root.current.closest('.trust-scene') as HTMLElement;host.classList.add('protection-active');
 const old=host.querySelectorAll<HTMLElement>('.phone-html,.deception-editorial,.breach-foreground,.bait-layer,.navbar');
 const cta=host.querySelector<HTMLElement>('.breach-reveal .vynex-glass-cta');
 const previous=Array.from(old,el=>({el,inert:el.inert}));old.forEach(el=>el.inert=true);
 const ctx=gsap.context(()=>{
 const timeline=gsap.timeline({onUpdate:()=>{host.style.setProperty('--protection-cooling',String(protectionMotion.cooling));},onComplete:()=>protectionStore.ready(),onReverseComplete:()=>protectionStore.finishExit()});reveal.current=timeline;
 const ease='power3.out';
 // All layers already exist. One reversible playhead owns the entire handoff.
 timeline.to(cta,{'--spec-alpha':.8,duration:.12,ease},0)
 .to(cta,{'--spec-alpha':0,duration:.42,ease},.16)
 .to(old,{opacity:.6,duration:.48,ease:'power1.inOut'},.1)
 .to(old,{autoAlpha:0,duration:.32,ease:'power1.inOut'},.58)
 .to(protectionMotion,{cooling:1,duration:.88,ease:'power1.inOut'},.2)
 .fromTo(root.current!.querySelector('.protection-atmosphere'),{opacity:0},{opacity:1,duration:.88,ease:'power1.inOut'},.2)
 .to(host.querySelectorAll('.architecture,.scene-shade'),{autoAlpha:0,duration:.88,ease:'power1.inOut'},.2)
 .to(host,{backgroundColor:'#030912',duration:.88,ease:'power1.inOut'},.2)
 .to(protectionMotion,{progress:1,duration:1.18,ease:'power2.inOut'},.08)
 .to(protectionMotion,{core:1,duration:reduced?.45:.76,ease},.34)
 .to(protectionMotion.rings,{0:1,duration:.72,ease:'power2.out'},.48)
 .to(protectionMotion.rings,{1:1,duration:.68,ease:'power2.out'},.59)
 .to(protectionMotion.rings,{2:1,duration:.65,ease:'power2.out'},.69)
 .fromTo(root.current!.querySelector('.protection-sweep'),{opacity:0,scaleY:.1},{opacity:.7,scaleY:1,duration:.35,ease},.22)
 .to(root.current!.querySelector('.protection-sweep'),{opacity:0,scaleX:20,duration:.55,ease},.57)
 .fromTo(root.current!.querySelector('.protection-copy'),{opacity:0,x:reduced?0:20},{opacity:1,x:0,duration:.55,ease},.65)
 .fromTo(root.current!.querySelectorAll('.protection-selectors,.protection-brand,.protection-progress'),{opacity:0,y:reduced?0:8},{opacity:1,y:0,duration:.48,stagger:.04,ease},.72);
 },root);
 return()=>{
  ctx.revert();reveal.current=null;host.classList.remove('protection-active');host.style.removeProperty('--protection-cooling');
  previous.forEach(({el,inert})=>{el.inert=inert;});
  breachStore.update({protectionRequested:false});
 };
 },[state.entered,reduced]);
 useEffect(()=>{
  const timeline=reveal.current;if(!timeline)return;
  if(state.visible)timeline.play();
  else if(timeline.time()>0)timeline.reverse();
  else protectionStore.finishExit();
 },[state.visible,state.entered]);
 useEffect(()=>{
  if(!panel.current)return;
  const animations:Array<gsap.core.Tween>=[];
  animations.push(gsap.to(panel.current,{scrollTop:0,duration:reduced?0:.45,ease:'power3.out',overwrite:'auto'}));
  const shell=panel.current.querySelector<HTMLElement>('.protection-shell')!;
  const activeContent=shell.children[state.selected===null?3:state.selected].firstElementChild as HTMLElement;
  const resize=()=>{gsap.to(shell,{height:activeContent.offsetHeight,duration:reduced?.15:.45,ease:'power3.out',overwrite:true});};
  const observer=new ResizeObserver(resize);observer.observe(activeContent);resize();
  panel.current.querySelectorAll<HTMLElement>('.protection-content').forEach((pane,index)=>{
   const active=index===(state.selected===null?3:state.selected);
   pane.inert=!active;pane.setAttribute('aria-hidden',String(!active));
   animations.push(gsap.to(pane,{opacity:active?1:0,y:reduced?0:active?0:-10,duration:reduced?.15:.5,delay:active?.2:0,ease:'power3.out',overwrite:true,onComplete:()=>{if(!active)gsap.set(pane,{y:reduced?0:10});}}));
  });
  return()=>{observer.disconnect();gsap.killTweensOf(shell);animations.forEach(t=>t.kill());};
 },[state.selected,reduced]);


 return <section ref={root} className="protection-scene" aria-label="Vynex protection system" data-ready={state.ready} data-entered={state.entered} inert={!state.visible||!state.ready} aria-hidden={!state.visible}>
 <div className="protection-atmosphere" aria-hidden="true"/><div className="protection-sweep" aria-hidden="true"/>
 <div className="protection-brand">VYNEX BANK <span>PROTECTION SYSTEM</span></div>
 <div className="protection-selectors" role="group" aria-label="Protection layers">{PROTECTION_LAYERS.map((item,index)=><button key={item.name} disabled={!state.ready} aria-pressed={state.selected===index} onPointerEnter={e=>{if(e.pointerType==='mouse')protectionStore.preview(index as ProtectionLayer);}} onPointerLeave={()=>protectionStore.preview(null)} onFocus={()=>protectionStore.preview(index as ProtectionLayer)} onBlur={()=>protectionStore.preview(null)} onClick={()=>protectionStore.select(index as ProtectionLayer)}><small>0{index+1}</small><span>{item.name}</span>{state.explored&(1<<index)?<Check size={14}/>:<span className="layer-dot"/>}</button>)}</div>
 <div className="protection-copy" ref={panel}>
 <div className="protection-shell" data-layer={state.selected!==null}>{[0,1,2,null].map(shown=><div key={shown??'intro'} className="protection-content" data-active={state.selected===shown}><ProtectionContent shown={shown as ProtectionLayer|null}/></div>)}</div>
 </div><p className="protection-progress" aria-live="polite">{[0,1,2].filter(i=>state.explored&(1<<i)).length} / 3 LAYERS EXPLORED</p>
 </section>;
}

function ProtectionContent({shown}:{shown:ProtectionLayer|null}){
 const restart=useRestart();
 const state=useProtection(),[open,setOpen]=useState<number|null>(null),[finalReady,setFinalReady]=useState(false),hoverIntent=useRef<gsap.core.Tween|null>(null);
 useEffect(()=>()=>{hoverIntent.current?.kill();},[]);
 useEffect(()=>{setFinalReady(false);if(!state.complete)return;const t=gsap.delayedCall(.95,()=>setFinalReady(true));return()=>{t.kill();};},[state.complete]);
 const layer=shown===null?null:PROTECTION_LAYERS[shown];
 return <> {layer?<div className="protection-information"><p className="protection-eyebrow">0{shown!+1} / {layer.name} CONTROLS</p><h2>{layer.headline}</h2><p className="protection-description">{layer.copy}</p>
 <div className="protection-controls">{layer.controls.map((control,index)=>{const Icon=icons[control.icon];return <button key={control.name} className="protection-control" aria-expanded={open===index} aria-controls={`protection-detail-${shown}-${index}`} onClick={()=>{hoverIntent.current?.kill();setOpen(open===index?null:index);protectionStore.signal();}} onPointerEnter={e=>{if(e.pointerType==='mouse'){hoverIntent.current?.kill();hoverIntent.current=gsap.delayedCall(.2,()=>{setOpen(index);protectionStore.signal();});}}} onPointerLeave={()=>hoverIntent.current?.kill()}><span className="control-title"><Icon size={18} weight="light"/><span>{control.name}</span><small>ACTIVE</small></span><span className="control-detail" id={`protection-detail-${shown}-${index}`}><span>{control.description}</span></span></button>;})}</div>
 <button className="protection-explore" onClick={()=>protectionStore.explore(shown!)}>{state.explored&(1<<shown!)?'Layer explored':'Mark as explored'} <Check size={16}/></button>
 {state.explored===7&&<button className="protection-align" onClick={()=>protectionStore.align()}>View complete system <ArrowRight/></button>}</div>:<div className="protection-intro" data-complete={finalReady}>
 <div className="protection-intro-initial" aria-hidden={finalReady} inert={finalReady}><p className="protection-eyebrow">VYNEX SECURITY</p><h1>Protection works<br/>in layers.</h1><p>Technology reduces exposure.<br/>People recognize threats.<br/>Processes keep protection consistent.</p><p className="protection-hint">Select a layer to explore its protection.</p></div>
 <div className="protection-intro-final" aria-hidden={!finalReady} inert={!finalReady}><p className="protection-eyebrow">THREE LAYERS. ONE SYSTEM.</p><h1>Protection works<br/>in layers.</h1><p>Effective phishing risk treatment combines technology, people and organizational processes.</p><VynexGlassCTA variant="crystal" onClick={restart}>Continue</VynexGlassCTA><p className="protection-status" role="status">{state.continueRequested?'You’ve explored the Vynex protection system.':''}</p></div>
 </div>}
</>;
}
