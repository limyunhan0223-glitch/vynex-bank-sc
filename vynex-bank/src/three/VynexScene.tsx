import {useBreach} from '../motion/breachState';
import { ProtectionSystem } from './ProtectionSystem';
import { protectionMotion,useProtection } from '../motion/protectionState';
import { BreachTriangles } from './BreachTriangles';
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei/core/Environment.js';
import { Lightformer } from '@react-three/drei/core/Lightformer.js';
import * as THREE from 'three';
import { BankCard } from './BankCard';
import { TypographyRing } from './TypographyRing';
import { GlassPedestal } from './GlassPedestal';
import { BaitPhone } from './BaitPhone';
import { loginReveal, dampValue, projectionFrame } from '../motion/deceptionMotion';
import type { ExperienceMotion } from '../motion/baitMotion';
export type MotionState = ExperienceMotion;
type SceneProps={motion:RefObject<MotionState>;pointer:RefObject<{x:number;y:number}>;reduced:boolean;compact:boolean;phoneMounted:boolean;active:boolean;onActivate:()=>void;invalidateRef:RefObject<(()=>void)|null>};
function Objects({motion,pointer,reduced,compact,phoneMounted,active,onActivate,invalidateRef}:SceneProps){
 const card=useRef<THREE.Group>(null);const ring=useRef<THREE.Group>(null);const root=useRef<THREE.Group>(null);const time=useRef(0);const telemetry=useRef({elapsed:0,frames:0});const {camera,gl,size,invalidate,get,setSize}=useThree();
 const narrow=!compact&&size.width/size.height<1.3;
 const lighting=useMemo(()=><><ambientLight intensity={.45}/><directionalLight position={[3,5,6]} intensity={2.2} color="#dce8ff"/><directionalLight position={[-4,1,2]} intensity={1.1} color="#6e99ff"/>
 <Environment resolution={128} frames={1}><Lightformer form="rect" intensity={4} color="#c6e6ff" position={[0,4,3]} scale={[6,2,1]}/><Lightformer form="rect" intensity={5} color="#b8d5f7" position={[-4,0,2]} rotation={[0,Math.PI/3,0]} scale={[2,6,1]}/><Lightformer form="rect" intensity={3} position={[5,1,1]} rotation={[0,-Math.PI/3,0]} scale={[1,5,1]}/><Lightformer form="rect" intensity={3.5} color="#f1f4fa" position={[0,0,6]} scale={[2.5,8,1]}/><Lightformer form="rect" intensity={2} color="#ffe6cb" position={[-4,0,4]} scale={[1.6,7,1]}/><Lightformer form="rect" intensity={2.5} color="#dce8f9" position={[4,-1,4]} scale={[2.2,6,1]}/><Lightformer form="rect" intensity={5} color="#467eff" position={[0,-1.6,4]} scale={[7,.65,1]}/></Environment></>,[]);
 const materialColors=useRef<{material:THREE.MeshStandardMaterial;color:THREE.Color;emissive:THREE.Color}[]>([]);
 const lastFilter=useRef(''),shade=useRef<HTMLElement|null>(null);
 const initialFrame=useRef({height:0,offsetX:0,offsetY:0});
 const actualFrame=useRef({height:0,offsetX:0,offsetY:0,fullHeight:0});
 const hostRef=useRef<HTMLElement|null>(null);
 const elements=useRef<{nav:HTMLElement|null;bait:HTMLElement|null;editorial:HTMLElement|null;blurred:HTMLElement|null}>({nav:null,bait:null,editorial:null,blurred:null});
 const projectionKey=useRef(''),lastFocus=useRef(-1);
 const transitionFrames=useRef({running:false,elapsed:0,frames:[] as number[]});
 useEffect(()=>{if(import.meta.env.DEV&&active)transitionFrames.current={running:true,elapsed:0,frames:[]};},[active]);
 // The close-up HTML remains high resolution; its defocused WebGL backdrop
 // needs fewer pixels once the viewport expands to fill the presentation screen.

 useLayoutEffect(()=>{
  const host=gl.domElement.closest<HTMLElement>('.trust-scene');hostRef.current=host;
  if(!host)return;
  shade.current=host.querySelector<HTMLElement>('.scene-shade');
  elements.current={nav:host.querySelector<HTMLElement>('.navbar'),bait:host.querySelector<HTMLElement>('.bait-layer'),editorial:host.querySelector<HTMLElement>('.deception-editorial'),blurred:host.querySelector<HTMLElement>('.scene03-architecture')};
  const rect=gl.domElement.getBoundingClientRect(),outer=compact?{left:0,top:0,width:document.documentElement.clientWidth,height:innerHeight}:host.getBoundingClientRect();
  const frame={height:rect.height,offsetX:rect.left+rect.width/2-outer.left-outer.width/2,offsetY:rect.top+rect.height/2-outer.top-outer.height/2};
  if(!host.classList.contains('phone-stage-ready'))initialFrame.current=frame;
  host.classList.toggle('phone-stage-ready',phoneMounted);
  if(active)host.classList.add('deception-active');
  const expanded=gl.domElement.parentElement!.getBoundingClientRect();
  // The mobile stage uses svh, not Safari's changing address-bar viewport.
  if(compact&&phoneMounted)outer.height=expanded.height;
  actualFrame.current={height:expanded.height,offsetX:expanded.left+expanded.width/2-outer.left-outer.width/2,offsetY:expanded.top+expanded.height/2-outer.top-outer.height/2,fullHeight:outer.height};
  // Resize the renderer before paint, alongside its camera compensation.
  if(Math.abs(get().size.width-expanded.width)>.1||Math.abs(get().size.height-expanded.height)>.1)setSize(expanded.width,expanded.height,expanded.top,expanded.left);
 },[active,phoneMounted,compact,size.width,size.height,gl,get,setSize]);
 useEffect(()=>{invalidateRef.current=invalidate;return()=>{invalidateRef.current=null;};},[invalidate,invalidateRef]);
 useEffect(()=>{
  const seen=new Set<THREE.Material>();materialColors.current=[];
  root.current?.traverse(object=>{if(object instanceof THREE.Mesh){
   const materials=Array.isArray(object.material)?object.material:[object.material];
   for(const material of materials)if(material instanceof THREE.MeshStandardMaterial&&!seen.has(material)){
    seen.add(material);materialColors.current.push({material,color:material.color.clone(),emissive:material.emissive.clone()});
   }
  }});
  return()=>{for(const entry of materialColors.current){entry.material.color.copy(entry.color);entry.material.emissive.copy(entry.emissive);}};
 },[compact]);
 useFrame((_,delta)=>{if(protectionMotion.started)return;const dt=Math.min(delta,.05);if(!reduced)time.current+=dt;const t=time.current,p=motion.current.progress,d=motion.current.depth;
 const targetFocus=motion.current.focus;
 const currentFocus=motion.current.visualFocus??0;
 const f=reduced?targetFocus:dampValue(currentFocus,targetFocus,12,dt);
 motion.current.visualFocus=Math.abs(f-targetFocus)<.000001?targetFocus:f;
 if(card.current){card.current.position.y=.78+p*.85+(reduced?0:Math.sin(t*Math.PI/3.2)*.042);card.current.rotation.y=(reduced?0:Math.sin(t*.36)*.025)+p*.075;card.current.scale.setScalar(1.12+p*.065);}
 if(ring.current){if(!reduced)ring.current.rotation.y+=dt*Math.PI*2/24*(1+p*.65);ring.current.position.y=-.76-p*.19;ring.current.position.x=THREE.MathUtils.damp(ring.current.position.x,pointer.current.x*.06,2.4,dt);}
 if(root.current){root.current.rotation.y=THREE.MathUtils.damp(root.current.rotation.y,pointer.current.x*.032,2.4,dt);root.current.rotation.x=THREE.MathUtils.damp(root.current.rotation.x,pointer.current.y*.014,2.4,dt);}
  if(root.current){
  root.current.position.set(-.42-d*(compact?1.9:2.7)-f*.3,.24-d*1.2,-d*3.1-f*1.25);
  const base=compact?.82:narrow?.94:1;root.current.scale.setScalar(base*(1-d*.28));
 }
 for(const entry of materialColors.current){entry.material.color.copy(entry.color).multiplyScalar(1-d*.32-f*.1);entry.material.emissive.copy(entry.emissive).multiplyScalar(1-d*.3-f*.15);}
 const host=hostRef.current;
 const view=get().size;
 const nextProjectionKey=`${compact}:${f}:${view.width}:${view.height}`;
 if(camera instanceof THREE.PerspectiveCamera&&projectionKey.current!==nextProjectionKey){
  projectionKey.current=nextProjectionKey;
  if(initialFrame.current.height&&actualFrame.current.height){
   const projection=projectionFrame(initialFrame.current,actualFrame.current,actualFrame.current.fullHeight,f);
   camera.fov=projection.fov;
   camera.setViewOffset(view.width,view.height,projection.offsetX,projection.offsetY,view.width,view.height);
  }
  camera.updateProjectionMatrix();
 }
 const targetZ=10.5-p*.42-f*.3;
 camera.position.z=reduced?targetZ:THREE.MathUtils.damp(camera.position.z,targetZ,f>0?10:3,dt);
 const filter=d>.005?`blur(${(d*1.2).toFixed(2)}px)`:'none';
 if(filter!==lastFilter.current){gl.domElement.style.filter=filter;lastFilter.current=filter;}
 if(shade.current)shade.current.style.opacity=String((motion.current.shade??.04)+f*.2);
 if(host&&lastFocus.current!==f){lastFocus.current=f;const reveal=String(loginReveal(f));
  elements.current.nav?.style.setProperty('--deception-reveal',reveal);
  elements.current.bait?.style.setProperty('--deception-reveal',reveal);
  if(elements.current.editorial)elements.current.editorial.style.opacity=reveal;
  if(elements.current.blurred)elements.current.blurred.style.opacity=String(f);if(!active&&f<.00001&&host.classList.contains('deception-active')){
   host.classList.remove('deception-active');
   const rect=gl.domElement.parentElement!.getBoundingClientRect();setSize(rect.width,rect.height,rect.top,rect.left);
  }
  const nav=elements.current.nav;if(nav){nav.inert=d>.5;nav.setAttribute('aria-hidden',String(f>.36));}
  const bait=elements.current.bait;if(bait){bait.inert=motion.current.phone<.9||f>.36;bait.setAttribute('aria-hidden',String(bait.inert));}}

 gl.domElement.dataset.scene=d>.95?'bait':'trust';
 gl.domElement.dataset.focus=f.toFixed(3);
 if(import.meta.env.DEV&&transitionFrames.current.running){
  const sample=transitionFrames.current;sample.elapsed+=delta;sample.frames.push(delta*1000);
  if(!active||(f>.995&&host?.querySelector('.phone-screen')?.getAttribute('data-settled')==='true')){
   sample.running=false;const sorted=[...sample.frames].sort((a,b)=>a-b);
   gl.domElement.dataset.transitionMs=String(Math.round(sample.elapsed*1000));
   gl.domElement.dataset.frameP95=String(Math.round(sorted[Math.floor(sorted.length*.95)]??0));
   gl.domElement.dataset.longFrames=String(sorted.filter(ms=>ms>34).length);
   gl.domElement.dataset.frameTimes=sample.frames.map(ms=>Math.round(ms)).join(',');
  }
 }
 // Read-only presentation telemetry, useful for checking the actual renderer in a browser.
 telemetry.current.elapsed+=delta;telemetry.current.frames++;
 if(telemetry.current.elapsed>=1){const canvas=gl.domElement;canvas.dataset.drawCalls=String(gl.info.render.calls);canvas.dataset.triangles=String(gl.info.render.triangles);canvas.dataset.fps=String(Math.round(telemetry.current.frames/telemetry.current.elapsed));canvas.dataset.parallaxX=String(root.current?.rotation.y.toFixed(4));canvas.dataset.orbitAngle=String(ring.current?.rotation.y.toFixed(3));telemetry.current={elapsed:0,frames:0};}
 },-2);
 return <>{lighting}
 <group ref={root} position={[-.42,.24,0]} scale={compact?.82:narrow?.94:1}><group ref={card} position={[narrow?.15:0,.78,0]}><BankCard/></group><group ref={ring} position={[0,-.76,0]}><TypographyRing compact={compact}/></group><GlassPedestal/></group>{phoneMounted&&<BaitPhone motion={motion} pointer={pointer} reduced={reduced} compact={compact} active={active} onActivate={onActivate}/>}</>;
}
export default function VynexScene(props:SceneProps){const protection=useProtection();const breach=useBreach();const [visible,setVisible]=useState(!document.hidden);const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{let intersecting=true;const update=()=>setVisible(!document.hidden&&intersecting);const observer=new IntersectionObserver(([e])=>{intersecting=e.isIntersecting;update();});if(host.current)observer.observe(host.current);document.addEventListener('visibilitychange',update);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);};},[]);
 return <div className="scene-canvas" ref={host} role={props.phoneMounted?"group":"img"} aria-label="Floating navy Vynex Bank card above a rotating extruded VYNEX BANK typography ring and a chrome glass pedestal"><Canvas resize={{debounce:0}} dpr={props.compact?1.15:breach.forensic||protection.entered?1.15:props.phoneMounted?.65:[1,1.25]} frameloop={!visible?'never':protection.entered&&protection.ready||props.reduced?'demand':'always'} camera={{position:[0,1.35,10.5],fov:40}} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}} onCreated={({camera})=>{camera.lookAt(0,-.35,0);}}><Suspense fallback={null}><group name="legacy-vynex-world"><Objects {...props}/></group><BreachTriangles/></Suspense><Suspense fallback={null}><ProtectionSystem reduced={props.reduced}/></Suspense></Canvas></div>;
}









