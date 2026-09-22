import {createContext,useContext} from 'react';
export const RestartContext=createContext<()=>void>(()=>{});
export const useRestart=()=>useContext(RestartContext);
export const restartMotion={rings:[0,0,0],core:0,invalidate:null as (()=>void)|null};
export function resetRestartMotion(){restartMotion.rings.fill(0);restartMotion.core=0;}
