import { useMemo, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';

export function TypographyRing({ compact }: { compact:boolean }) {
 const font=useLoader(FontLoader,'/assets/helvetiker_bold.typeface.json');
 const glass=useMemo(()=>{
   const material=new THREE.MeshPhysicalMaterial({color:'#a4c3f5',metalness:.48,roughness:.075,clearcoat:1,envMapIntensity:2,transparent:true,opacity:.32,depthWrite:false,side:THREE.DoubleSide,forceSinglePass:true});
   // Local edge/caustic highlights share the existing glass pass: no bloom,
   // extra render target or animated uniform uploads.
   material.onBeforeCompile=shader=>{
     shader.vertexShader='varying vec3 vOpticalPosition;\n'+shader.vertexShader;
     shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvOpticalPosition = position;');
     shader.fragmentShader='varying vec3 vOpticalPosition;\n'+shader.fragmentShader;
     shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`
       float opticalAngle = atan(vOpticalPosition.x, vOpticalPosition.z);
       float opticalEdge = pow(clamp(abs(vOpticalPosition.y)/0.285,0.0,1.0),12.0);
       float opticalGlint = pow(max(0.0,cos(opticalAngle*3.0+0.45)),38.0);
       float opticalFresnel = pow(1.0-abs(dot(normal,normalize(vViewPosition))),3.0);
       outgoingLight += vec3(0.04,0.22,1.0)*(opticalEdge*3.0+opticalGlint*2.5+opticalFresnel*0.4);
       #include <opaque_fragment>
     `);
   };
   material.customProgramCacheKey=()=> 'vynex-optical-ring-v2';
   return material;
 },[]);
 useEffect(()=>()=>glass.dispose(),[glass]);
 const geometry=useMemo(()=>{
   const templates:Record<string,THREE.BufferGeometry>={};
   const widths:Record<string,number>={' ':.17,'•':.14};
   for(const ch of new Set('VYNEXBANK')){
     const g=new TextGeometry(ch,{font,size:compact?.32:.36,depth:.065,curveSegments:3,bevelEnabled:true,bevelThickness:.006,bevelSize:.004,bevelSegments:1});
     g.computeBoundingBox();widths[ch]=g.boundingBox!.max.x;
     const colors=new Float32Array(g.attributes.position.count*3).fill(1);
     const sideColor=new THREE.Color('#769ed9');
     for(const group of g.groups)if(group.materialIndex===1){
       for(let i=group.start;i<group.start+group.count;i++)sideColor.toArray(colors,i*3);
     }
     g.setAttribute('color',new THREE.BufferAttribute(colors,3));
     g.translate(-widths[ch]/2,0,0);templates[ch]=g;
   }
   const sphere=new THREE.SphereGeometry(.032,8,6);
   templates['•']=sphere.toNonIndexed();sphere.dispose();templates['•'].translate(0,.14,0);
   templates['•'].setAttribute('color',new THREE.BufferAttribute(new Float32Array(templates['•'].attributes.position.count*3).fill(1),3));
   // Proportional advances keep whole bank names readable on the front arc.
   // Uniform angular slots made narrow glyphs look widely tracked and fragmented.
   const label='VYNEX BANK',radius=3.2,tracking=.025;
   const labelWidth=[...label].reduce((sum,ch)=>sum+widths[ch]+tracking,0);
   const pieces:THREE.BufferGeometry[]=[];
   for(let repeat=0;repeat<4;repeat++){
     let cursor=-labelWidth/2;
     for(const ch of label){
       const width=widths[ch],a=repeat*Math.PI/2+(cursor+width/2)/radius;
       if(ch!==' '){const g=templates[ch].clone();g.rotateY(a);g.translate(Math.sin(a)*radius,-.15,Math.cos(a)*radius);pieces.push(g);}
       cursor+=width+tracking;
     }
     const a=repeat*Math.PI/2+Math.PI/4,g=templates['•'].clone();
     g.translate(Math.sin(a)*radius,-.15,Math.cos(a)*radius);pieces.push(g);
   }
   // Static physical letters share one draw call rather than one per glyph/face.
   const merged=mergeGeometries(pieces,false)!;
   [...Object.values(templates),...pieces].forEach(g=>g.dispose());
   return merged;
 },[font,compact]);
 useEffect(()=>()=>geometry.dispose(),[geometry]);
 return <group>
   <mesh geometry={geometry}><meshPhysicalMaterial vertexColors color="#e4efff" metalness={.28} roughness={.19} clearcoat={1} emissive="#5999ff" emissiveIntensity={.12}/></mesh>
   <mesh material={glass}><cylinderGeometry args={[3.18,3.18,.57,80,1,true]}/></mesh>
   {[-.29,.29].map(y=><group key={y} position={[0,y,0]}>
     <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[3.19,.014,4,96]}/><meshBasicMaterial color="#c8e3ff"/></mesh>
     <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[3.19,.043,4,96]}/><meshBasicMaterial color="#397cff" transparent opacity={.18} depthWrite={false}/></mesh>
   </group>)}
 </group>;
}

