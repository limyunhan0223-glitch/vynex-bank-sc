import * as THREE from 'three';
/** One-time product render using the existing renderer/context, not another Canvas.
 * The cached foreground plate is projected from world depth above the DOM phone UI.
 * This lets physical warning glass cross the HTML panel without duplicating WebGL.
 */
export function renderWarningPlate(gl:THREE.WebGLRenderer,environment:THREE.Texture|null,geometries:THREE.BufferGeometry[],materials:THREE.Material[]){
 const scene=new THREE.Scene();scene.environment=environment;scene.environmentIntensity=.65;
 const object=new THREE.Group();object.rotation.set(.06,-.26,-.09);scene.add(object);
 const clones=materials.map(material=>material.clone());
 clones.forEach(material=>{(material as THREE.MeshPhysicalMaterial).opacity=1;});
 const shell=clones[0] as THREE.MeshPhysicalMaterial;shell.color.set('#e48a96');shell.metalness=.18;shell.roughness=.055;shell.transmission=.88;shell.thickness=.38;shell.ior=1.6;shell.attenuationColor=new THREE.Color('#b40b29');shell.attenuationDistance=.32;shell.emissiveIntensity=.07;
 const core=clones[1] as THREE.MeshPhysicalMaterial;core.color.set('#21030c');core.transmission=.7;core.thickness=.18;core.ior=1.5;core.metalness=.08;core.roughness=.09;
 geometries.forEach((geometry,i)=>object.add(new THREE.Mesh(geometry,clones[i])));
 const edges=new THREE.EdgesGeometry(geometries[0],35),edgeMaterial=new THREE.LineBasicMaterial({color:'#ffd6d8',transparent:true,opacity:.32});object.add(new THREE.LineSegments(edges,edgeMaterial));
 const key=new THREE.DirectionalLight('#fff1ed',3);key.position.set(-2,3,4);scene.add(key);
 const rim=new THREE.DirectionalLight('#ff203b',4);rim.position.set(3,-1,2);scene.add(rim);scene.add(new THREE.AmbientLight('#df6b86',.35));
 const camera=new THREE.PerspectiveCamera(34,1,.1,10);camera.position.set(0,.08,2.8);camera.lookAt(0,.08,0);
 const target=new THREE.WebGLRenderTarget(1024,1024,{depthBuffer:true,samples:4});target.texture.colorSpace=THREE.SRGBColorSpace;
 const oldTarget=gl.getRenderTarget(),oldColor=gl.getClearColor(new THREE.Color()),oldAlpha=gl.getClearAlpha();
 const pixels=new Uint8Array(1024*1024*4);
 try{gl.setRenderTarget(target);gl.setClearColor(0,0);gl.clear();gl.render(scene,camera);gl.readRenderTargetPixels(target,0,0,1024,1024,pixels);}
 finally{gl.setRenderTarget(oldTarget);gl.setClearColor(oldColor,oldAlpha);target.dispose();clones.forEach(m=>m.dispose());edges.dispose();edgeMaterial.dispose();}
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=1024;const context=canvas.getContext('2d')!;
 const data=context.createImageData(1024,1024);for(let y=0;y<1024;y++)data.data.set(pixels.subarray((1023-y)*4096,(1024-y)*4096),y*4096);context.putImageData(data,0,0);
 const soft=document.createElement('canvas');soft.width=1024;soft.height=1024;const blur=soft.getContext('2d')!;blur.filter='blur(7px)';blur.drawImage(canvas,0,0);
 return {sharp:canvas.toDataURL('image/png'),soft:soft.toDataURL('image/png')};
}
