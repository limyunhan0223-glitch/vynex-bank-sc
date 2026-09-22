import { useSyncExternalStore } from 'react';
export type ProtectionLayer=0|1|2;
type State={entered:boolean;visible:boolean;entryVersion:number;ready:boolean;selected:ProtectionLayer|null;hover:ProtectionLayer|null;explored:number;complete:boolean;continueRequested:boolean;signal:number};
const initial:State={entered:false,visible:false,entryVersion:0,ready:false,selected:null,hover:null,explored:0,complete:false,continueRequested:false,signal:0};
let state={...initial};const listeners=new Set<()=>void>();
const update=(patch:Partial<State>)=>{state={...state,...patch};listeners.forEach(listener=>listener());};
export const protectionMotion={progress:0,cooling:0,core:0,rings:[0,0,0],elapsed:0,started:false};
export const protectionStore={
 get:()=>state,subscribe:(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener);};},
 enter:()=>{protectionMotion.started=true;update({entered:true,visible:true,ready:false,entryVersion:state.entryVersion+1});},
 navigate:(visible:boolean)=>{
  if(visible===state.visible)return;
  if(visible)protectionMotion.started=true;
  update({visible,entered:visible||state.entered,ready:false,hover:null});
 },
 finishExit:()=>{
  if(state.visible)return;
  Object.assign(protectionMotion,{progress:0,cooling:0,core:0,rings:[0,0,0],elapsed:0,started:false});
  update({entered:false,ready:false,hover:null});
 },
 ready:()=>{if(state.visible)update({ready:true});},
 preview:(hover:ProtectionLayer|null)=>update({hover}),
 select:(selected:ProtectionLayer)=>{if(state.ready)update({selected,hover:null,complete:false,signal:state.signal+1});},
 signal:()=>update({signal:state.signal+1}),
 explore:(index:ProtectionLayer)=>{const explored=state.explored|(1<<index);update(explored===7?{explored,complete:true,selected:null,hover:null}:{explored});},
 align:()=>{if(state.explored===7)update({selected:null,hover:null,complete:true});},
 continue:()=>{if(state.explored===7)update({continueRequested:true});},
 reset:()=>{Object.assign(protectionMotion,{progress:0,cooling:0,core:0,rings:[0,0,0],elapsed:0,started:false});state={...initial};listeners.forEach(listener=>listener());},
};
export const useProtection=()=>useSyncExternalStore(protectionStore.subscribe,protectionStore.get,protectionStore.get);
