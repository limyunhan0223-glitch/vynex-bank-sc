import {useEffect} from 'react';
import {protectionStore} from '../motion/protectionState';

/** Observe native document movement. Never cancel wheel/touch or switch layers. */
export function useProtectionScroll(){
 useEffect(()=>{
  let request=protectionStore.get().entryVersion;
  let boundary:number|null=protectionStore.get().entered?window.scrollY:null;
  const unsubscribe=protectionStore.subscribe(()=>{
   const next=protectionStore.get().entryVersion;
   if(next!==request){request=next;boundary=window.scrollY;}
  });
  const scroll=()=>{
   if(boundary!==null)protectionStore.navigate(window.scrollY>=boundary-.5);
  };
  const resize=()=>{
   if(boundary!==null)boundary=Math.min(boundary,Math.max(0,document.documentElement.scrollHeight-innerHeight));
  };
  window.addEventListener('scroll',scroll,{passive:true});
  window.addEventListener('resize',resize,{passive:true});
  return()=>{unsubscribe();window.removeEventListener('scroll',scroll);window.removeEventListener('resize',resize);};
 },[]);
}
