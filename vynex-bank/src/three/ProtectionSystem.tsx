import {restartMotion} from '../motion/restartState';
import {useEffect,useMemo,useRef} from 'react';
import {useFrame,useThree,useLoader} from '@react-three/fiber';
import {RoundedBox} from '@react-three/drei/core/RoundedBox.js';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';
import * as THREE from 'three';
import {protectionMotion,protectionStore,useProtection,type ProtectionLayer} from '../motion/protectionState';
const rotations=[[.78,.15,-.22],[1.12,-.32,.38],[.98,.3,-.16]];
function coreTexture(){
 const c=document.createElement('canvas');c.width=1024;c.height=1536;const ctx=c.getContext('2d')!;ctx.scale(2,2);
 const g=ctx.createLinearGradient(0,0,512,768);g.addColorStop(0,'#182633');g.addColorStop(.4,'#070e19');g.addColorStop(1,'#101c2b');ctx.fillStyle=g;ctx.fillRect(0,0,512,768);
 ctx.strokeStyle='#a5c1df55';ctx.lineWidth=1;ctx.strokeRect(16,16,480,736);
 ctx.fillStyle='#c8e0fa';ctx.font='500 25px Segoe UI';ctx.fillText('VYNEX BANK',47,78);
 ctx.strokeStyle='#c3ddf0';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(256,260);ctx.lineTo(333,295);ctx.lineTo(326,373);ctx.quadraticCurveTo(318,426,256,468);ctx.quadraticCurveTo(194,426,186,373);ctx.lineTo(179,295);ctx.closePath();ctx.stroke();
 ctx.strokeStyle='#87aac6';ctx.lineWidth=2;for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(256,359,15+i*10,Math.PI*.95,Math.PI*2.06);ctx.stroke();}ctx.beginPath();ctx.moveTo(256,347);ctx.lineTo(256,410);ctx.stroke();
 ctx.fillStyle='#a7bfd5';ctx.font='16px Segoe UI';ctx.letterSpacing='4px';ctx.fillText('IDENTITY CORE',47,687);
 const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;return texture;
}
function ProtectionRing({index,reduced}:{index:ProtectionLayer;reduced:boolean}){
 const state=useProtection(),group=useRef<THREE.Group>(null),tip=useRef<THREE.Mesh>(null),response=useRef(0),signal=useRef(0),clarity=useRef(1),converge=useRef(0),held=useRef({response:0,z:0});
 const {invalidate}=useThree();const font=useLoader(FontLoader,'/assets/helvetiker_regular.typeface.json');
 const assets=useMemo(()=>{
  const radius=1.9+index*.48,shape=new THREE.Shape();shape.absarc(0,0,radius+.065,0,Math.PI*2,false);const hole=new THREE.Path();hole.absarc(0,0,radius-.065,0,Math.PI*2,true);shape.holes.push(hole);
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:.075,bevelEnabled:true,bevelSize:.014,bevelThickness:.014,bevelSegments:2,steps:1,curveSegments:64});geometry.translate(0,0,-.0375);
  const edge=new THREE.TorusGeometry(radius+.067,.009,5,128),inner=new THREE.TorusGeometry(radius-.067,.008,5,128);
  const reveal={value:0};
  const glass=new THREE.MeshPhysicalMaterial({color:index===1?'#718c9f':'#50769a',metalness:.46,roughness:.23,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:.65,transparent:true,opacity:.62,depthWrite:false,side:THREE.DoubleSide});
  const chrome=new THREE.MeshStandardMaterial({color:'#b7c8d8',metalness:.85,roughness:.19,transparent:true,opacity:.63});
  for(const material of [glass,chrome]){material.onBeforeCompile=shader=>{
   shader.uniforms.uReveal=reveal;shader.vertexShader='varying vec3 vLocal;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvLocal=position;');
   shader.fragmentShader='uniform float uReveal; varying vec3 vLocal;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nfloat arc = mod(atan(vLocal.y,vLocal.x)+6.2831853,6.2831853)/6.2831853; if(arc>uReveal) discard;');
  };material.customProgramCacheKey=()=> 'protection-ring-reveal';}
  const label=new TextGeometry(`0${index+1}`,{font,size:.12,depth:.006,curveSegments:2});label.computeBoundingBox();label.translate(-label.boundingBox!.max.x/2,0,0);
  return {radius,geometry,edge,inner,reveal,glass,chrome,label};
 },[index,font]);
 useEffect(()=>{if(state.complete){converge.current=performance.now();held.current={response:response.current,z:group.current?.position.z??0};}invalidate();},[state.complete,invalidate]);
 useEffect(()=>{signal.current=state.signal?performance.now():0;invalidate();},[state.signal,invalidate]);
 useEffect(()=>()=>{for(const resource of [assets.geometry,assets.edge,assets.inner,assets.glass,assets.chrome,assets.label])resource.dispose();},[assets]);
 useFrame((_,delta)=>{
  if(!group.current||!state.entered)return;const dt=Math.min(delta,.05),selected=state.selected===index,hover=state.hover===index;
  const delaying=state.complete&&(performance.now()-converge.current)<index*100;const target=delaying?held.current.response:selected?1:hover?.28:0;response.current=THREE.MathUtils.damp(response.current,target,7,dt);const s=response.current;
  const base=rotations[index],formation=protectionMotion.rings[index];assets.reveal.value=reduced?1:formation;
  group.current.visible=formation>.001;group.current.scale.setScalar(reduced?1:1-restartMotion.rings[index]*.1);
  group.current.rotation.set(reduced?base[0]:base[0]+(.28-base[0])*s,base[1]*(1-s*.7),base[2]*(1-s*.65)+(reduced?0:(1-formation)*.18));
  group.current.position.z=THREE.MathUtils.damp(group.current.position.z,(delaying?held.current.z:state.selected!==null&&!selected?-.42:selected?.22:0)-(reduced?0:restartMotion.rings[index]*1.5),6,dt);
  const dimTarget=state.selected!==null&&!selected?.46:1;clarity.current=THREE.MathUtils.damp(clarity.current,dimTarget,6,dt);const dim=clarity.current*(1-restartMotion.rings[index]);
  assets.glass.opacity=(.52+s*.22)*dim*(reduced?formation:1);assets.chrome.opacity=(.52+s*.3)*dim*(reduced?formation:1);
  const elapsed=(performance.now()-signal.current)/1000,travel=selected&&elapsed<.85?elapsed/.85:-1;
  if(tip.current){const angle=(formation<.995?formation:travel)*Math.PI*2;tip.current.visible=(formation<.995&&formation>.001)||travel>=0;tip.current.position.set(Math.cos(angle)*assets.radius,Math.sin(angle)*assets.radius,.045);}
  if(delaying||Math.abs(dim-dimTarget)>.001||Math.abs(s-target)>.001||travel>=0||formation<1||protectionMotion.progress<1||Math.abs(group.current.position.z-(state.selected!==null&&!selected?-.42:selected?.22:0))>.001)invalidate();
 });
 return <group ref={group} rotation={rotations[index] as [number,number,number]}>
  <mesh geometry={assets.geometry} material={assets.glass} onPointerOver={e=>{e.stopPropagation();if(state.ready)protectionStore.preview(index);}} onPointerOut={()=>protectionStore.preview(null)} onClick={e=>{e.stopPropagation();protectionStore.select(index);}}/>
  <mesh geometry={assets.edge} material={assets.chrome}/><mesh geometry={assets.inner} material={assets.chrome}/>
  <mesh ref={tip}><sphereGeometry args={[.025,8,6]}/><meshBasicMaterial color="#c9e7ff"/></mesh>
  <mesh position={[0,-assets.radius-.2,.04]} geometry={assets.label} visible={state.ready}><meshStandardMaterial color={state.explored&(1<<index)?'#d9edff':'#839eb8'} metalness={.4} roughness={.3}/></mesh>
  <mesh position={[.16,-assets.radius-.15,.04]} visible={!!(state.explored&(1<<index))}><sphereGeometry args={[.02,8,6]}/><meshBasicMaterial color="#b1d6ff"/></mesh>
 </group>;
}
export function ProtectionSystem({reduced}:{reduced:boolean}){
 const state=useProtection(),lights=useRef<THREE.Group>(null),root=useRef<THREE.Group>(null),core=useRef<THREE.Group>(null),progress=useRef(-1),coreLight=useRef(0),cameraOffset=useRef(0),scrollCurrent=useRef(0);
 const {camera,gl,size,scene,invalidate}=useThree();const texture=useMemo(coreTexture,[]);
 const projectionSize=useRef({width:0,height:0});
 const legacyMaterials=useRef<{material:THREE.Material;opacity:number;transparent:boolean}[]>([]),coreMaterials=useRef<THREE.MeshStandardMaterial[]>([]);
 const destination=useMemo(()=>new THREE.Vector3(0,0,12),[]),orientation=useMemo(()=>new THREE.Quaternion(),[]);
 const start=useRef<{position:THREE.Vector3;quaternion:THREE.Quaternion;fov:number;offsetX:number;offsetY:number}|null>(null);
 const handoffFrames=useRef({last:0,samples:[] as number[],done:false});
 const pointer=useRef({x:0,y:0,targetX:0,targetY:0}),scroll=useRef(0),frames=useRef({count:0,time:0});
 useEffect(()=>()=>texture.dispose(),[texture]);
 useEffect(()=>{
  coreMaterials.current=[];core.current?.traverse(object=>{if(object instanceof THREE.Mesh){const materials=Array.isArray(object.material)?object.material:[object.material];for(const material of materials)if(material instanceof THREE.MeshStandardMaterial){material.emissive.set('#709ac3');coreMaterials.current.push(material);}}});
 },[]);
 // Geometry and texture exist before the CTA. Compile shaders during analysis,
 // when no camera handoff is running, using the existing renderer/environment.
 useEffect(()=>{
  if(!root.current)return;
  let cancelled=false;const preparedRoot=root.current;
  gl.initTexture(texture);
  void gl.compileAsync(scene,camera).then(()=>{
   if(cancelled||protectionStore.get().entered)return;
   const target=new THREE.WebGLRenderTarget(64,64),oldTarget=gl.getRenderTarget(),wasVisible=preparedRoot.visible;
   const warmCamera=new THREE.PerspectiveCamera(38,1,.1,100);warmCamera.position.set(0,0,12);
   const changed:Array<{material:THREE.Material;transparent:boolean}>=[];
   scene.getObjectByName('legacy-vynex-world')?.traverse(obj=>{if(obj instanceof THREE.Mesh)for(const m of Array.isArray(obj.material)?obj.material:[obj.material])if(!changed.some(e=>e.material===m)){changed.push({material:m,transparent:m.transparent});m.transparent=true;}});
   try{preparedRoot.visible=true;gl.setRenderTarget(target);gl.render(scene,warmCamera);}
   finally{gl.setRenderTarget(oldTarget);preparedRoot.visible=wasVisible;changed.forEach(e=>{e.material.transparent=e.transparent;});target.dispose();}
  }).catch(()=>{});
  return()=>{cancelled=true;};
 },[gl,scene,camera,texture]);
 useEffect(()=>{
  if(!state.entered)return;restartMotion.invalidate=invalidate;handoffFrames.current={last:performance.now(),samples:[],done:false};
  const previous=scene.getObjectByName('legacy-vynex-world');const seen=new Set<THREE.Material>();legacyMaterials.current=[];previous?.traverse(object=>{if(object instanceof THREE.Mesh){for(const material of Array.isArray(object.material)?object.material:[object.material]){if(!seen.has(material)){seen.add(material);legacyMaterials.current.push({material,opacity:material.opacity,transparent:material.transparent});material.transparent=true;}}}});
  const c=camera as THREE.PerspectiveCamera,oldView=c.view?{...c.view}:null,oldFilter=gl.domElement.style.filter;gl.domElement.style.filter='none';progress.current=-1;start.current={position:c.position.clone(),quaternion:c.quaternion.clone(),fov:c.fov,offsetX:c.view?.offsetX??0,offsetY:c.view?.offsetY??0};
  const move=(event:PointerEvent)=>{if(event.pointerType==='touch'||reduced||!protectionStore.get().ready)return;pointer.current.targetX=(event.clientX/innerWidth-.5)*.024;pointer.current.targetY=(event.clientY/innerHeight-.5)*.014;invalidate();};
  const initialScroll=window.scrollY,onScroll=()=>{scroll.current=Math.max(-.035,Math.min(.035,(window.scrollY-initialScroll)/innerHeight*.035));invalidate();};
  window.addEventListener('pointermove',move,{passive:true});window.addEventListener('scroll',onScroll,{passive:true});invalidate();
  return()=>{
   lights.current?.children.forEach(light=>{(light as THREE.Light).intensity=0;});
   restartMotion.invalidate=null;window.removeEventListener('pointermove',move);window.removeEventListener('scroll',onScroll);
   for(const entry of legacyMaterials.current){entry.material.opacity=entry.opacity;entry.material.transparent=entry.transparent;}
   if(previous)previous.visible=true;
   if(start.current){c.position.copy(start.current.position);c.quaternion.copy(start.current.quaternion);c.fov=start.current.fov;}
   c.view=oldView;c.updateProjectionMatrix();gl.domElement.style.filter=oldFilter;start.current=null;invalidate();
  };
 },[state.entered,camera,invalidate,reduced]);
 useFrame((_,delta)=>{
  if(!root.current||!state.entered||!start.current)return;const p=protectionMotion.progress,dt=Math.min(delta,.05),mobile=size.width<768;
  const c=camera as THREE.PerspectiveCamera,origin=start.current;
  if(import.meta.env.DEV&&!handoffFrames.current.done){const sample=handoffFrames.current,now=performance.now();sample.samples.push(now-sample.last);sample.last=now;if(state.ready){sample.done=true;const sorted=[...sample.samples].sort((a,b)=>a-b);gl.domElement.dataset.protectionFrameP95=String(Math.round(sorted[Math.floor(sorted.length*.95)]??0));gl.domElement.dataset.protectionFrameMax=String(Math.round(sorted.at(-1)??0));gl.domElement.dataset.protectionLongFrames=String(sorted.filter(ms=>ms>34).length);}}

  lights.current?.children.forEach((light,index)=>{(light as THREE.Light).intensity=[.7,2.5,1.4][index]*p;});
  cameraOffset.current=THREE.MathUtils.damp(cameraOffset.current,state.selected!==null?-.2:0,5,dt);c.position.lerpVectors(origin.position,destination,p);c.position.z+=cameraOffset.current*p;
  c.quaternion.copy(origin.quaternion).slerp(orientation,p);
  if(progress.current!==p||projectionSize.current.width!==size.width||projectionSize.current.height!==size.height){const fullHeight=THREE.MathUtils.lerp(size.height,mobile?size.height*.55:size.height,p);c.fov=THREE.MathUtils.lerp(origin.fov,38,p);c.setViewOffset(size.width,fullHeight,origin.offsetX*(1-p),origin.offsetY*(1-p),size.width,size.height);c.updateProjectionMatrix();progress.current=p;projectionSize.current={width:size.width,height:size.height};}
  pointer.current.x=THREE.MathUtils.damp(pointer.current.x,pointer.current.targetX,3.5,dt);pointer.current.y=THREE.MathUtils.damp(pointer.current.y,pointer.current.targetY,3.5,dt);
  // Fit the complete outer ring to portrait width, retaining the upper-stage depth.
  const mobileScale=Math.min(.82,size.width/(size.height*.55)*1.1);
  root.current.position.set(mobile?0:-2.45,mobile?0:.25,0);root.current.scale.setScalar(mobile?mobileScale:1);
  scrollCurrent.current=THREE.MathUtils.damp(scrollCurrent.current,scroll.current,4,dt);root.current.rotation.set(reduced?0:pointer.current.y,reduced?0:pointer.current.x+scrollCurrent.current,0);
  coreLight.current=THREE.MathUtils.damp(coreLight.current,state.complete?.055:0,5,dt);
  if(core.current){const v=protectionMotion.core*(1-restartMotion.core);core.current.scale.setScalar(reduced?1:.92+v*.08);core.current.position.z=reduced?0:-(1-v)*.65;core.current.visible=v>.005;for(const material of coreMaterials.current){material.opacity=v;material.emissiveIntensity=coreLight.current;}core.current.rotation.y=THREE.MathUtils.damp(core.current.rotation.y,-.22+(state.complete?.07:0),5,dt);}
  for(const entry of legacyMaterials.current)entry.material.opacity=entry.opacity*Math.max(0,1-protectionMotion.cooling);
  const legacy=scene.getObjectByName('legacy-vynex-world');if(legacy)legacy.visible=protectionMotion.cooling<.82;
  gl.domElement.dataset.scene='protection';
  if(import.meta.env.DEV){frames.current.count++;frames.current.time+=delta;if(frames.current.time>1){gl.domElement.dataset.fps=String(Math.round(frames.current.count/frames.current.time));gl.domElement.dataset.drawCalls=String(gl.info.render.calls);frames.current={count:0,time:0};}}
  if(Math.abs(scrollCurrent.current-scroll.current)>.0001||p<1||Math.abs(coreLight.current-(state.complete?.055:0))>.0001||(core.current&&Math.abs(core.current.rotation.y-(-.22+(state.complete?.07:0)))>.0001)||Math.abs(c.position.z-(state.selected!==null?11.8:12))>.001||Math.abs(pointer.current.x-pointer.current.targetX)+Math.abs(pointer.current.y-pointer.current.targetY)>.0001)invalidate();
 },-1.5);

 return <>
  <group ref={lights}><ambientLight intensity={0}/><directionalLight position={[1,5,7]} intensity={0} color="#dfedff"/><directionalLight position={[-5,-1,4]} intensity={0} color="#6f9dcd"/></group>
  <group ref={root} visible={state.entered}>
   <group ref={core} rotation={[.035,-.22,-.025]}>
    <RoundedBox args={[1.826,2.75,.176]} radius={.095} smoothness={3}><meshPhysicalMaterial color="#596979" metalness={.86} roughness={.19} clearcoat={1} transparent/></RoundedBox>
    <RoundedBox args={[1.771,2.695,.187]} radius={.075} smoothness={3}><meshPhysicalMaterial color="#08121f" metalness={.5} roughness={.17} clearcoat={1} transparent/></RoundedBox>
    <mesh position={[0,0,.102]}><planeGeometry args={[1.705,2.596]}/><meshStandardMaterial map={texture} metalness={.22} roughness={.35} transparent/></mesh>
   </group>
   {[0,1,2].map(index=><ProtectionRing key={index} index={index as ProtectionLayer} reduced={reduced}/>)}
  </group>
 </>;
}
