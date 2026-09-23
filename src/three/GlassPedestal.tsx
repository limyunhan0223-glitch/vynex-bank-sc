import { useMemo, useEffect } from 'react';
import * as THREE from 'three';

export function GlassPedestal() {
 const materials = useMemo(() => ({
   // Shared environment reflections and open walls avoid a costly transmission pass.
   glass: new THREE.MeshPhysicalMaterial({ color:'#cfddf5', metalness:.45, roughness:.085, clearcoat:1, clearcoatRoughness:.035, envMapIntensity:1.6, transparent:true, opacity:.36, depthWrite:false, side:THREE.DoubleSide,forceSinglePass:true }),
   top: new THREE.MeshPhysicalMaterial({ color:'#b6ccef', metalness:.3, roughness:.075, clearcoat:1, envMapIntensity:1.2, transparent:true, opacity:.25, depthWrite:false, side:THREE.DoubleSide,forceSinglePass:true }),
   chrome: new THREE.MeshStandardMaterial({color:'#b7c5df',metalness:.9,roughness:.23,envMapIntensity:1.5,emissive:'#4676c9',emissiveIntensity:.055}),
   edge: new THREE.MeshBasicMaterial({color:'#a9ccff',transparent:true,opacity:.75}),
 }), []);
 useEffect(()=>()=>Object.values(materials).forEach(m=>m.dispose()),[materials]);
 const tiers=[{r:3.65,h:.78,y:-.38},{r:3.35,h:.18,y:.11},{r:2.98,h:.2,y:.32}];
 return <group position={[0,-1.88,0]} scale={[1,1,.78]}>
   {tiers.map((p,i)=><group key={i} position={[0,p.y,0]}>
     <mesh material={i===0?materials.chrome:materials.glass}><cylinderGeometry args={[p.r,p.r,p.h,64,1,true]}/></mesh>
     <mesh material={materials.top} rotation={[-Math.PI/2,0,0]} position={[0,p.h/2,0]}><circleGeometry args={[p.r,64]}/></mesh>
     {[-1,1].map(side=><group key={side} position={[0,side*p.h/2,0]}>
       <mesh material={materials.chrome} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[p.r-.05,p.r,64]}/></mesh>
       <mesh material={materials.edge} rotation={[Math.PI/2,0,0]}><torusGeometry args={[p.r,.009,4,64]}/></mesh>
     </group>)}
     <mesh material={materials.chrome} position={[0,-p.h/2+.025,0]}><cylinderGeometry args={[p.r-.025,p.r-.025,.035,64,1,true]}/></mesh>
   </group>)}
   <mesh rotation={[-Math.PI/2,0,0]} position={[0,.34,0]}><ringGeometry args={[2.58,2.92,64]}/><meshBasicMaterial color="#80bdff" transparent opacity={.22} depthWrite={false}/></mesh>
 </group>;
}




