import {protectionMotion} from '../motion/protectionState';
import { useMemo, useRef, useState, type RefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei/core/RoundedBox.js';
import { Html } from '@react-three/drei/web/Html.js';
import * as THREE from 'three';
import { PhoneScreen } from '../components/PhoneScreen';
import { notificationReady, phonePose, type ExperienceMotion } from '../motion/baitMotion';
import { deceptionPose, loginReveal, lockReveal } from '../motion/deceptionMotion';

type Props={motion:RefObject<ExperienceMotion>;pointer:RefObject<{x:number;y:number}>;reduced:boolean;compact:boolean;active:boolean;onActivate:()=>void};
export function BaitPhone({motion,pointer,reduced,compact,active,onActivate}:Props){
 const group=useRef<THREE.Group>(null),screen=useRef<HTMLDivElement>(null),notification=useRef<HTMLButtonElement>(null);
 const started=useRef(false),lastReady=useRef(false);
 const [interactive,setInteractive]=useState(false),[loginReady,setLoginReady]=useState(false);
 const lastLoginReady=useRef(false);
 const {camera,get}=useThree();
 const density=compact?2:3;
 const ui=useRef<{lock:HTMLElement|null;login:HTMLElement|null}>({lock:null,login:null}),lastUI=useRef(-1),lastMoving=useRef(false);
 const raster=useRef(0),phonePointer=useRef({x:0,y:0});
 const corners=useMemo(()=>Array.from({length:5},()=>new THREE.Vector3()),[]);
 useFrame((_,delta)=>{
  const g=group.current;if(!g)return;
  const m=motion.current,f=m.visualFocus??m.focus,pose=deceptionPose(phonePose(m.phone,0,compact),f,compact),dt=Math.min(delta,.05);
  if(!protectionMotion.started){
  phonePointer.current.x=THREE.MathUtils.damp(phonePointer.current.x,pointer.current.x,2,dt);
  phonePointer.current.y=THREE.MathUtils.damp(phonePointer.current.y,pointer.current.y,2,dt);
  const px=f>0?phonePointer.current.x:pointer.current.x,py=f>0?phonePointer.current.y:pointer.current.y;
  const step=(from:number,to:number)=>reduced?to:THREE.MathUtils.damp(from,to,f>0?14:4.8,dt);
  g.visible=m.phone>.001;
  if(!started.current||m.phone===0){g.position.set(pose.x,pose.y,pose.z);g.rotation.set(pose.rx,pose.ry,pose.rz);g.scale.setScalar(pose.scale);started.current=true;}
  else {
   g.position.set(step(g.position.x,pose.x),step(g.position.y,pose.y),step(g.position.z,pose.z));
   g.rotation.set(step(g.rotation.x,pose.rx+(reduced?0:py*.008*(1-f*.65))),step(g.rotation.y,pose.ry+(reduced?0:px*.012*(1-f*.65))),step(g.rotation.z,pose.rz));
   g.scale.setScalar(step(g.scale.x,pose.scale));
  }
  const remaining=Math.hypot(g.position.x-pose.x,g.position.y-pose.y,g.position.z-pose.z);
  const canLogin=active&&f>.995&&remaining<.035;
  if(canLogin!==lastLoginReady.current){lastLoginReady.current=canLogin;setLoginReady(canLogin);}
  if(screen.current&&lastUI.current!==f){
   lastUI.current=f;
   ui.current.lock??=screen.current.querySelector<HTMLElement>('.phone-lock-content');
   ui.current.login??=screen.current.querySelector<HTMLElement>('.deception-screen');
   const reveal=loginReveal(f),leave=lockReveal(f);
   if(ui.current.lock){ui.current.lock.style.opacity=String(1-leave);ui.current.lock.style.transform=leave?`scale(${1+leave*.008})`:'none';}
   if(ui.current.login){ui.current.login.style.opacity=String(reveal);ui.current.login.style.transform=reveal===1?'none':`translateY(${(1-reveal)*2}px)`;}
   const moving=f>.00001&&f<.995;
   if(moving!==lastMoving.current){screen.current.dataset.transitioning=String(moving);lastMoving.current=moving;}
  }
  }
  // Keep projection attached to the same camera during the protection handoff.
  // Project the four screen corners directly. This avoids nested CSS camera
  // transforms drifting from WebGL on Chromium's composited glass surfaces.
  if(screen.current){
   g.updateWorldMatrix(true,false);camera.updateMatrixWorld();
   const size=get().size,pixelWidth=326*density,pixelHeight=690*density;
   if(raster.current!==density){raster.current=density;
   screen.current.style.setProperty('--screen-density',String(density));
   screen.current.style.width=`${pixelWidth}px`;screen.current.style.height=`${pixelHeight}px`;screen.current.style.borderRadius=`${29*density}px`;}
   const w=326*2.8/400,h=690*2.8/400;
   corners[0].set(-w/2,h/2,.13);corners[1].set(w/2,h/2,.13);
   corners[2].set(w/2,-h/2,.13);corners[3].set(-w/2,-h/2,.13);corners[4].set(0,0,.13);
   for(const v of corners){v.applyMatrix4(g.matrixWorld).project(camera);v.x=(v.x+1)*size.width/2;v.y=(1-v.y)*size.height/2;}
   const [p0,p1,p2,p3]=corners;
   // The Html anchor is fixed; this matrix owns both translation and perspective.
   const dx1=p1.x-p2.x,dx2=p3.x-p2.x,dx3=p0.x-p1.x+p2.x-p3.x;
   const dy1=p1.y-p2.y,dy2=p3.y-p2.y,dy3=p0.y-p1.y+p2.y-p3.y;
   const den=dx1*dy2-dx2*dy1;
   const a=(dx3*dy2-dx2*dy3)/den,b=(dx1*dy3-dx3*dy1)/den;
   screen.current.style.transform=`matrix3d(${(p1.x-p0.x+a*p1.x)/pixelWidth},${(p1.y-p0.y+a*p1.y)/pixelWidth},0,${a/pixelWidth},${(p3.x-p0.x+b*p3.x)/pixelHeight},${(p3.y-p0.y+b*p3.y)/pixelHeight},0,${b/pixelHeight},0,0,1,0,${p0.x},${p0.y},0,1)`;
  }
  if(protectionMotion.started)return;
  const remaining=Math.hypot(g.position.x-pose.x,g.position.y-pose.y,g.position.z-pose.z);
  // Mobile viewport refreshes can rewind the scroll entrance while the focused
  // login/forensic page is still fully visible. Its settled controls stay usable.
  const ready=(compact&&active&&f>.995&&remaining<.035)||m.phone>.995&&(active||notificationReady(m.notification,remaining));
  // Keep the whole lock screen hidden until the physical device enters.
  if(screen.current){screen.current.style.visibility=g.visible?'visible':'hidden';screen.current.inert=!ready;screen.current.setAttribute('aria-hidden',String(!ready));screen.current.dataset.settled=String(remaining<.035);screen.current.dataset.entrance=m.phone.toFixed(3);}
  if(notification.current){
   const opacity=ready?m.notification:0;
   notification.current.style.opacity=String(opacity);
   notification.current.style.visibility=opacity>.01?'visible':'hidden';
   const enabled=ready&&m.notification>.95&&!active;
   if(enabled!==lastReady.current){notification.current.dataset.ready=String(enabled);lastReady.current=enabled;setInteractive(enabled);}
  }
 },-1);
 return <group ref={group} visible={false} position={[5.7,-7.2,.6]}>
  <RoundedBox args={[2.44,5.02,.19]} radius={.28} smoothness={3}><meshPhysicalMaterial color="#8b8d94" metalness={.85} roughness={.16} clearcoat={.8} clearcoatRoughness={.12}/></RoundedBox>
  <RoundedBox args={[2.38,4.96,.205]} radius={.25} smoothness={3}><meshPhysicalMaterial color="#08090d" metalness={.72} roughness={.18} clearcoat={1} clearcoatRoughness={.08}/></RoundedBox>
  <RoundedBox args={[2.32,4.9,.02]} radius={.22} smoothness={3} position={[0,0,.11]}><meshPhysicalMaterial color="#06080c" metalness={.32} roughness={.09} clearcoat={1}/></RoundedBox>
  <RoundedBox args={[.055,.53,.085]} radius={.015} smoothness={1} position={[1.23,.8,0]}><meshStandardMaterial color="#777b82" metalness={1} roughness={.2}/></RoundedBox>
  <RoundedBox args={[.045,.36,.07]} radius={.013} smoothness={1} position={[-1.23,.94,0]}><meshStandardMaterial color="#60646b" metalness={1} roughness={.22}/></RoundedBox>
  <RoundedBox args={[.045,.36,.07]} radius={.013} smoothness={1} position={[-1.23,.43,0]}><meshStandardMaterial color="#60646b" metalness={1} roughness={.22}/></RoundedBox>
  <Html calculatePosition={()=>[0,0]} position={[0,0,.13]} zIndexRange={[4,3]} wrapperClass="phone-html" pointerEvents="none">
   <PhoneScreen screenRef={screen} notificationRef={notification} active={active} interactive={interactive} onActivate={onActivate} loginReady={loginReady}/>
  </Html>
 </group>;
}
