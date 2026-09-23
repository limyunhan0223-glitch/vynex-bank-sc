import {VynexGlassCTA} from './VynexGlassCTA';
import { protectionStore } from '../motion/protectionState';
import { useGlassReflection } from '../hooks/useGlassReflection';
import { breachVisibility } from '../motion/breachTimeline';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, LockSimple, User } from '@phosphor-icons/react';
import { breachStore, useBreach } from '../motion/breachState';
const clues=[
 {title:'Suspicious URL',copy:'The link used a look-alike address rather than the official Vynex Bank website.'},
 {title:'Urgency & Pressure',copy:'The message pressured you to act immediately by claiming your account could be suspended.'},
 {title:'Credential Request',copy:'The link led directly to a page asking for banking login information.'},
];
export function BreachReveal(){
 const {phase,forensic,clue,protectionRequested}=useBreach();
 const [viewed,setViewed]=useState(0);
 useEffect(()=>{if(forensic)setViewed(value=>value|(1<<clue));},[forensic,clue]);
 const primaryButton=useRef<HTMLButtonElement>(null);
 const heading=useRef<HTMLHeadingElement>(null),root=useRef<HTMLDivElement>(null);
 const {revealed,information,primary,secondary}=breachVisibility(phase);
 useGlassReflection(primaryButton,primary&&!forensic);

 useEffect(()=>{const host=root.current?.closest('.trust-scene');host?.classList.toggle('breach-forensic',forensic);return()=>host?.classList.remove('breach-forensic');},[forensic]);
 return <div ref={root} role="region" aria-label="Security reveal" aria-live="polite" className={`breach-reveal ${revealed?'is-revealed':''}`} aria-hidden={!revealed} inert={!revealed} data-forensic={forensic}>
  <p className="breach-kicker">{forensic?'THE EVIDENCE':'SECURITY ALERT'}</p>
  <h2 ref={heading} tabIndex={-1}>{forensic?'See what you missed.':'You may have been phished.'}</h2>
  {!forensic?<>
   <div className="breach-information" data-ready={information} aria-hidden={!information}><p className="breach-summary">The page you just trusted was not the official Vynex Bank website.</p>
   <div className="breach-domain"><LockSimple/><span>vynex-secure.example/verify</span></div>
   <div className="breach-rule"/></div>

   <button type="button" ref={primaryButton} className="breach-primary" data-ready={primary} disabled={!primary} onClick={()=>breachStore.update({forensic:true})}>See What You Missed <ArrowRight/></button>
  </>:<>
   <div className="breach-tabs" role="tablist" aria-label="Phishing clues">{clues.map((item,index)=><button key={item.title} id={`clue-tab-${index}`} role="tab" type="button" aria-selected={clue===index} aria-controls="clue-evidence" tabIndex={clue===index?0:-1} onClick={()=>breachStore.update({clue:index as 0|1|2})} onKeyDown={event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?2:(clue+(event.key==='ArrowRight'?1:2))%3;breachStore.update({clue:next as 0|1|2});document.getElementById(`clue-tab-${next}`)?.focus();}}}>0{index+1}</button>)}</div>
   <div key={clue} id="clue-evidence" role="tabpanel" aria-labelledby={`clue-tab-${clue}`} className="breach-evidence">
    {clue===0?<div className="evidence-url"><LockSimple/>vynex-secure.example/verify</div>:clue===1?<div className="evidence-message"><header><img src="/assets/vynex-logo.png" alt=""/>Vynex Bank <small>now</small></header><p>Your account has been temporarily <mark>suspended due to unusual activity.</mark> Please <mark>verify your account immediately</mark> to avoid permanent suspension.</p></div>:<div className="evidence-fields"><span><User/>Username / Email</span><span><LockSimple/>Password</span></div>}
    <h3>{clues[clue].title}</h3><p>{clues[clue].copy}</p>
   </div>
  </>}
  <VynexGlassCTA variant={viewed===7?'highlighted':'crystal'} data-ready={secondary||forensic} disabled={!secondary||protectionRequested} onClick={()=>{if(viewed===7){breachStore.update({protectionRequested:true});protectionStore.enter();}else{breachStore.update({forensic:true,clue:([0,1,2].find(i=>!(viewed&(1<<i)))??0) as 0|1|2});}}}>{viewed===7?'Learn How Vynex Protects You':'Continue to Protection'}</VynexGlassCTA>
  <p className="breach-privacy" data-ready={secondary||forensic} role="status">{protectionRequested?'Opening the Vynex protection system.':'Demo complete. Your entries were discarded.'}</p>
 </div>;
}
