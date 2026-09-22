import { useMemo, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei/core/RoundedBox.js';
import * as THREE from 'three';

export function BankCard() {
 const texture=useLoader(THREE.TextureLoader,'/assets/card-face.webp');
 texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;
 const face=useMemo(()=>{
   const w=4.18,h=2.58,r=.12,x=-w/2,y=-h/2;
   const shape=new THREE.Shape();
   shape.moveTo(x+r,y);shape.lineTo(x+w-r,y);shape.quadraticCurveTo(x+w,y,x+w,y+r);
   shape.lineTo(x+w,y+h-r);shape.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
   shape.lineTo(x+r,y+h);shape.quadraticCurveTo(x,y+h,x,y+h-r);
   shape.lineTo(x,y+r);shape.quadraticCurveTo(x,y,x+r,y);
   const g=new THREE.ShapeGeometry(shape,8),pos=g.attributes.position,uv=g.attributes.uv;
   for(let i=0;i<pos.count;i++)uv.setXY(i,pos.getX(i)/w+.5,pos.getY(i)/h+.5);
   return g;
 },[]);
 useEffect(()=>()=>face.dispose(),[face]);
 return <group rotation={[-.035,-.18,.19]}>
   <RoundedBox args={[4.27,2.67,.08]} radius={.13} smoothness={3}><meshPhysicalMaterial color="#d0e1ff" metalness={.95} roughness={.18} clearcoat={.7} envMapIntensity={2}/></RoundedBox>
   <RoundedBox args={[4.21,2.61,.072]} radius={.12} smoothness={3}><meshPhysicalMaterial color="#050b15" metalness={.3} roughness={.3} clearcoat={.6}/></RoundedBox>
   <mesh geometry={face} position={[0,0,.044]} scale={[1.011,1.011,1]}><meshBasicMaterial color="#9bbfff" transparent opacity={.55}/></mesh>
   <mesh geometry={face} position={[0,0,.046]}><meshPhysicalMaterial map={texture} metalness={.12} roughness={.32} clearcoat={.38} clearcoatRoughness={.24} envMapIntensity={.45}/></mesh>
 </group>;
}


