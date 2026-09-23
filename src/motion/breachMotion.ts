import { TRIANGLE_CUES, BREACH_TIMING as T } from './breachTimeline.ts';
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
export function triangleEntrance(elapsed:number,index:number,reduced:boolean){
 const cue=TRIANGLE_CUES[index],progress=clamp((elapsed-cue.at)/cue.duration),eased=1-Math.pow(1-progress,3);
 return {opacity:progress*progress*(3-2*progress),depth:reduced?0:(1-eased)*2.1,scale:reduced?1:.7+.3*eased,rotation:reduced?.08:.08+(1-eased)*cue.rotation};
}
export function triangleExit(elapsed:number,index:number,reduced:boolean){
 const foreground=index<2,distant=index>=5;
 const progress=clamp((elapsed-T.clearing-(foreground?index*.07:distant?.19:(index-2)*.06))/(distant?.7:.56));
 const eased=progress*progress*(3-2*progress),rest=distant?.13:0;
 return {opacity:1-eased*(1-rest),depth:reduced?0:eased*(foreground?2.1:-2),x:reduced?0:eased*(index===0?1.5:index===1?-1:0),scale:reduced?1:1+eased*(foreground?.22:-.15),blur:reduced?0:eased*(foreground?6:distant?2:1)};
}
