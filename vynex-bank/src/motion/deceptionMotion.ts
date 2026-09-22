type Pose={x:number;y:number;z:number;rx:number;ry:number;rz:number;scale:number};
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(n:number)=>{const t=clamp(n);return t*t*(3-2*t);};
export const dampValue=(current:number,target:number,rate:number,delta:number)=>target+(current-target)*Math.exp(-rate*Math.max(0,delta));
export const loginReveal=(focus:number)=>smooth((focus-.30)/.60);
export const lockReveal=(focus:number)=>smooth((focus-.20)/.58);
type Frame={height:number;offsetX:number;offsetY:number};
// Compensate the actual viewport, not an assumed already-expanded viewport.
export function projectionFrame(initial:Frame,actual:Frame,fullHeight:number,focus:number){
 const f=clamp(focus),desiredHeight=initial.height+(fullHeight-initial.height)*f;
 return {fov:Math.atan(Math.tan(Math.PI/9)*actual.height/desiredHeight)*360/Math.PI,
  offsetX:actual.offsetX-initial.offsetX*(1-f),offsetY:actual.offsetY-initial.offsetY*(1-f)};
}
export function deceptionPose(base:Pose,focus:number,compact:boolean):Pose{
 const f=clamp(focus),rotation=1-Math.pow(1-f,1.25);
 const target=compact?{x:.05,y:-.12,z:1.8,rx:.05,ry:0,rz:0,scale:.95}:
  {x:0,y:-2.80,z:2.2,rx:-.32,ry:.015,rz:.008,scale:2.45};
 return Object.fromEntries(Object.entries(base).map(([key,value])=>[key,value+(target[key as keyof Pose]-value)*(key.startsWith('r')?rotation:f)])) as Pose;
}




