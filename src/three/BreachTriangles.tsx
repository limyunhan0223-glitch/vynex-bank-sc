import {protectionMotion} from '../motion/protectionState';
import { breachClock } from '../motion/breachTimeline';
import { renderWarningPlate } from './renderWarningPlate';
import { triangleEntrance, triangleExit } from '../motion/breachMotion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { useBreach } from '../motion/breachState';
// Foreground right/left, left midground, left upper, right midground, three distant echoes.
const placements=[[1.48,-.28,-5.4,2.25,-.08],[-2.9,-.85,-4.8,2.3,.18],[-3.05,.15,-7,1.2,-.2],[-3.2,2.4,-8,1.1,.12],[4.2,-1.35,-8,1.2,-.18],[-4.2,1.5,-12,.82,-.12],[-3.3,-1.7,-11,.68,.14],[4.5,2.7,-13,.72,-.08]];
export function BreachTriangles(){
 const {phase,forensic}=useBreach(),{camera,invalidate,size:viewportSize,gl,scene}=useThree();
 const group=useRef<THREE.Group>(null),rim=useRef<THREE.InstancedMesh>(null),core=useRef<THREE.InstancedMesh>(null),mark=useRef<THREE.InstancedMesh>(null);
 const samples=useRef<number[]>([]);
 const alpha=useRef(0),done=useRef(false),active=!['idle','waiting','warning_start'].includes(phase);
 const reduced=useReducedMotion();
 const projectionOffset=useRef({x:0,y:0});
 const foreground=useRef<HTMLDivElement|null>(null),plates=useRef<{root:HTMLDivElement;sharp:HTMLImageElement;soft:HTMLImageElement}[]>([]),point=useMemo(()=>new THREE.Vector3(),[]);
 useEffect(()=>{
  const host=gl.domElement.closest('.trust-scene');if(!host)return;
  const layer=document.createElement('div');layer.className='breach-foreground';layer.setAttribute('aria-hidden','true');
  plates.current=[0,1].map(()=>{const root=document.createElement('div');root.className='breach-warning-object';const sharp=document.createElement('img'),soft=document.createElement('img');sharp.alt='';soft.alt='';root.append(sharp,soft);layer.appendChild(root);return {root,sharp,soft};});host.appendChild(layer);foreground.current=layer;
  return()=>{layer.remove();plates.current=[];foreground.current=null;};
 },[gl]);
 const assets=useMemo(()=>{
  const shape=new THREE.Shape();shape.moveTo(0,.67);shape.lineTo(-.64,-.45);shape.lineTo(.64,-.45);shape.closePath();
  const hole=new THREE.Path();hole.moveTo(0,.53);hole.lineTo(.51,-.35);hole.lineTo(-.51,-.35);hole.closePath();shape.holes.push(hole);
  const rim=new THREE.ExtrudeGeometry(shape,{depth:.24,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.035,bevelThickness:.04,curveSegments:1});
  const face=new THREE.Shape();face.moveTo(0,.5);face.lineTo(-.48,-.35);face.lineTo(.48,-.35);face.closePath();
  const core=new THREE.ExtrudeGeometry(face,{depth:.12,bevelEnabled:false});
  const stem=new THREE.CapsuleGeometry(.037,.25,4,10);stem.translate(0,.05,.25);
  const dot=new THREE.SphereGeometry(.044,12,8);dot.translate(0,-.22,.25);const mark=mergeGeometries([stem,dot]);stem.dispose();dot.dispose();
  const reveal=new THREE.InstancedBufferAttribute(new Float32Array(placements.length),1);
  [rim,core,mark].forEach(geometry=>geometry.setAttribute('instanceReveal',reveal));
  const result={reveal,rim,core,mark,rimMaterial:new THREE.MeshPhysicalMaterial({color:'#5e0c20',metalness:.72,roughness:.09,clearcoat:1,clearcoatRoughness:.12,emissive:'#b40e2c',emissiveIntensity:.12,transparent:true,opacity:0}),coreMaterial:new THREE.MeshPhysicalMaterial({color:'#480617',metalness:.28,roughness:.16,clearcoat:1,transparent:true,opacity:0,depthWrite:false}),markMaterial:new THREE.MeshStandardMaterial({color:'#ffe1df',emissive:'#ff7588',emissiveIntensity:.8,transparent:true,opacity:0}),dummy:new THREE.Object3D()};
  [result.rimMaterial,result.coreMaterial,result.markMaterial].forEach(material=>{
   material.onBeforeCompile=shader=>{
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nattribute float instanceReveal; varying float vReveal;').replace('#include <begin_vertex>','#include <begin_vertex>\nvReveal=instanceReveal;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying float vReveal;').replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.a *= vReveal; if(diffuseColor.a < 0.001) discard;');
   };material.customProgramCacheKey=()=> 'breach-instance-reveal';
  });return result;
 },[]);
 useEffect(()=>{alpha.current=0;done.current=false;samples.current=[];invalidate();},[active,reduced,invalidate]);
 useEffect(()=>{done.current=false;invalidate();},[forensic,invalidate]);
 useEffect(()=>{const canvas=gl.domElement.getBoundingClientRect(),host=foreground.current?.getBoundingClientRect();if(host)projectionOffset.current={x:canvas.left-host.left,y:canvas.top-host.top};},[active,viewportSize.width,viewportSize.height,gl]);
 useEffect(()=>()=>{assets.rim.dispose();assets.core.dispose();assets.mark.dispose();assets.rimMaterial.dispose();assets.coreMaterial.dispose();assets.markMaterial.dispose();},[assets]);
 useFrame((_,delta)=>{
  if(protectionMotion.started&&protectionMotion.progress>.25){if(group.current)group.current.visible=false;return;}
  if(plates.current.length&&!plates.current[0].sharp.src&&scene.environment){
   const src=renderWarningPlate(gl,scene.environment,[assets.rim,assets.core,assets.mark],[assets.rimMaterial,assets.coreMaterial,assets.markMaterial]);plates.current.forEach(image=>{image.sharp.src=src.sharp;image.soft.src=src.soft;});
  }
  if(!group.current)return;group.current.visible=active;if(foreground.current)foreground.current.style.display=active?'block':'none';if(!active)return;
  group.current.position.copy(camera.position);group.current.quaternion.copy(camera.quaternion);
  if(done.current)return;
  const t=breachClock.elapsed;
  if(import.meta.env.DEV&&breachClock.running)samples.current.push(delta*1000);
  placements.forEach(([x,y,z,size,rotation],i)=>{
   const entrance=triangleEntrance(t,i,reduced),exit=triangleExit(t,i,reduced);assets.reveal.setX(i,i<2?0:entrance.opacity*exit.opacity);
   const mobileHero=viewportSize.width<768&&i===0;
   assets.dummy.position.set((mobileHero?1.8:x)+exit.x,mobileHero?1.9:y,(mobileHero?-9:z)-entrance.depth+exit.depth);
   assets.dummy.rotation.set(.04,entrance.rotation,rotation);
   assets.dummy.scale.setScalar((mobileHero?1.1:size)*entrance.scale*exit.scale);assets.dummy.updateMatrix();
   if(i<2&&plates.current[i]){
    const plate=plates.current[i],image=plate.root;
    point.copy(assets.dummy.position).applyQuaternion(camera.quaternion).add(camera.position).project(camera);
    const depth=-assets.dummy.position.z,pixels=viewportSize.height/(2*Math.tan(THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov/2))*depth);
    const width=assets.dummy.scale.x*1.71*pixels;
    image.style.transform=`translate3d(${projectionOffset.current.x+(point.x+1)*viewportSize.width/2-512}px,${projectionOffset.current.y+(1-point.y)*viewportSize.height/2-512}px,0) scale(${width/1024}) rotate(${rotation+entrance.rotation-.08}rad)`;
    image.style.opacity=String(entrance.opacity*exit.opacity*(forensic?.28:1));
    plate.soft.style.opacity=String(reduced?0:Math.min(.95,.04+exit.blur/7));plate.sharp.style.opacity=String(reduced?1:1-Math.min(.95,.04+exit.blur/7));
   }
   rim.current?.setMatrixAt(i,assets.dummy.matrix);core.current?.setMatrixAt(i,assets.dummy.matrix);mark.current?.setMatrixAt(i,assets.dummy.matrix);
  });
  assets.reveal.needsUpdate=true;
  [rim,core,mark].forEach(ref=>{if(ref.current)ref.current.instanceMatrix.needsUpdate=true;});
  const target=Math.min(t/.3,1)*(forensic?.28:1);alpha.current=THREE.MathUtils.damp(alpha.current,target,9,Math.min(delta,.05));const opacity=alpha.current;assets.rimMaterial.opacity=opacity*.97;assets.coreMaterial.opacity=opacity*.84;assets.markMaterial.opacity=opacity*.92;
  done.current=!breachClock.running&&Math.abs(opacity-target)<.005;
  if(done.current&&import.meta.env.DEV&&samples.current.length){const values=samples.current.sort((a,b)=>a-b);gl.domElement.dataset.breachFrameP95=String(Math.round(values[Math.floor(values.length*.95)]));gl.domElement.dataset.breachFps=String(Math.round(values.length*1000/values.reduce((a,b)=>a+b,0)));samples.current=[];}
  if(!done.current)invalidate();
 });
 return <group ref={group} visible={false}>
  <instancedMesh ref={rim} args={[assets.rim,assets.rimMaterial,placements.length]} frustumCulled={false}/>
  <instancedMesh ref={core} args={[assets.core,assets.coreMaterial,placements.length]} frustumCulled={false}/>
  <instancedMesh ref={mark} args={[assets.mark,assets.markMaterial,placements.length]} frustumCulled={false}/>
 </group>;
}

