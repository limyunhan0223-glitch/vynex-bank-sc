import { useSyncExternalStore } from 'react';
import type { BreachPhase } from './breachTimeline';
export type { BreachPhase } from './breachTimeline';
type BreachState={phase:BreachPhase;forensic:boolean;clue:0|1|2;protectionRequested:boolean};
const initial:BreachState={phase:'idle',forensic:false,clue:0,protectionRequested:false};
let state=initial;
const listeners=new Set<()=>void>();
export const breachStore={get:()=>state,subscribe:(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener);};},update:(patch:Partial<BreachState>)=>{state={...state,...patch};listeners.forEach(fn=>fn());},reset:()=>{state={...initial};listeners.forEach(fn=>fn());}};
// Only narrative state is shared. Input values never enter this store.
export const useBreach=()=>useSyncExternalStore(breachStore.subscribe,breachStore.get,breachStore.get);
