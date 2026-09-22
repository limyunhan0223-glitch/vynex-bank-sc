import { BreachAudioControl } from './BreachAudioControl';
import { BreachReveal } from './BreachReveal';
import { useBreachSequence } from '../hooks/useBreachSequence';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { IconContext, CircleNotch, List, ArrowRight, ArrowClockwise, Export, BookOpen, CopySimple, ShieldCheck, Check, LockSimple, User, Eye, EyeSlash, CellSignalFull, WifiHigh, BatteryFull } from '@phosphor-icons/react';
import { useGlassReflection } from '../hooks/useGlassReflection';
import { emptyDemo, submitDemo, completeDemo } from '../motion/demoSubmission';

const iconStyle={weight:'light' as const};

export function DeceptionScreen({ready}:{ready:boolean}){
 const [demo,setDemo]=useState(emptyDemo),[showPassword,setShowPassword]=useState(false),[help,setHelp]=useState(''),[browserNotice,setBrowserNotice]=useState('');

 const surface=useRef<HTMLDivElement>(null),panel=useRef<HTMLFormElement>(null),cta=useRef<HTMLButtonElement>(null);
 // Development-only QA: count outgoing data requests, never inspect their content.
 useEffect(()=>{
  if(!import.meta.env.DEV)return;
  let requests=0;
  if(surface.current)surface.current.dataset.dataRequests='0';
  const observer=new PerformanceObserver(list=>{
   requests+=list.getEntries().filter(entry=>['fetch','xmlhttprequest','beacon'].includes((entry as PerformanceResourceTiming).initiatorType)).length;
   if(surface.current)surface.current.dataset.dataRequests=String(requests);
  });
  observer.observe({type:'resource',buffered:false});return()=>observer.disconnect();
 },[]);

 useEffect(()=>{if(!ready){setDemo(emptyDemo());setShowPassword(false);setHelp('');setBrowserNotice('');}},[ready]);
 const submit=(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();if(!ready||demo.phase!=='editing')return;
  event.currentTarget.reset();setDemo(state=>submitDemo(state));setShowPassword(false);setHelp('');
  startBreach();
 };
 const startBreach=useBreachSequence(ready,surface,()=>setDemo(state=>completeDemo(state)));
 const busy=demo.phase!=='editing';
 useGlassReflection(panel,ready&&!busy);
 useGlassReflection(cta,ready&&!busy);
 return <IconContext.Provider value={iconStyle}><div ref={surface} className="deception-screen" aria-hidden={!ready} inert={!ready} data-simulation-submitted={demo.simulationSubmitted} data-processing={demo.phase==='processing'}>
  {busy&&<BreachAudioControl/>}
  <div className="deception-status" aria-hidden="true"><strong>9:41</strong><span><CellSignalFull/><WifiHigh/><BatteryFull/></span></div><div className="deception-island" aria-hidden="true"/>
  <div className="deception-browser" aria-label="Simulated browser controls" onKeyDown={event=>{if(event.key==='Escape')setBrowserNotice('');}}>
   <div className="deception-address"><span className="deception-reader" aria-hidden="true"><small>A</small>A</span><LockSimple/><span className="deception-url">vynex-secure.example/verify</span><button type="button" disabled={busy} aria-label="Refresh preview" onClick={()=>setBrowserNotice('The preview is already up to date.')} onBlur={()=>setBrowserNotice('')}><ArrowClockwise/></button></div>
   <div className="deception-browser-actions">
    <button type="button" disabled={busy} aria-label="Share" onClick={()=>setBrowserNotice('Sharing is unavailable in this local demo.')} onBlur={()=>setBrowserNotice('')}><Export/></button>
    <button type="button" disabled={busy} aria-label="Bookmarks" onClick={()=>setBrowserNotice('No bookmarks in this demo browser.')} onBlur={()=>setBrowserNotice('')}><BookOpen/></button>
    <button type="button" disabled={busy} aria-label="Tabs" onClick={()=>setBrowserNotice('One tab — Vynex Bank.')} onBlur={()=>setBrowserNotice('')}><CopySimple/></button>
   </div>
   {browserNotice&&<span className="deception-browser-notice" role="status">{browserNotice}</span>}
  </div>
  <div className="deception-site">
   <header className="deception-header"><div><img src="/assets/vynex-logo.png" alt=""/><span>Vynex Bank</span></div><nav aria-label="Vynex website"><button type="button" disabled={busy} onClick={()=>setHelp('Personal banking access is available through this demo form.')}>Personal</button><button type="button" disabled={busy} onClick={()=>setHelp('Business banking is outside this demo.')}>Business</button><button type="button" disabled={busy} onClick={()=>setHelp('Use demo values only. No account information is sent or saved.')}>Support</button><button type="button" aria-label="Vynex menu" disabled={busy} onClick={()=>setHelp('Personal, Business and Support are available in this demo header.')}><List/></button></nav></header>
   <img className="deception-shield" src="/assets/deception-shield.webp" alt="Glass security shield on a Vynex Bank pedestal"/>
   <form ref={panel} className="deception-login" onSubmit={submit} autoComplete="off" aria-label={demo.simulationSubmitted?'Security alert':undefined} aria-labelledby={demo.simulationSubmitted?undefined:'deception-title'} aria-busy={demo.phase==='processing'}>
    <span className="deception-optics" aria-hidden="true"/><div className="deception-original" inert={demo.simulationSubmitted} aria-hidden={demo.simulationSubmitted}><div className="deception-login-heading"><p className="deception-eyebrow">SECURE ACCESS</p><h2 id="deception-title">Welcome Back</h2><p className="deception-intro">Log in to your Vynex Bank account.</p></div>
    <fieldset disabled={busy}><label className="deception-field"><span className="deception-sr-only">Username / Email</span><User/><input name="demo-identity" value={demo.username} onChange={e=>setDemo({...demo,username:e.target.value})} placeholder="Username / Email" autoComplete="off" autoCapitalize="none" spellCheck={false} data-1p-ignore data-lpignore="true"/></label>
    <label className="deception-field"><span className="deception-sr-only">Password</span><LockSimple/><input name="demo-secret" aria-label="Password" type={showPassword?'text':'password'} value={demo.password} onChange={e=>setDemo({...demo,password:e.target.value})} placeholder="Password" autoComplete="new-password" data-1p-ignore data-lpignore="true"/><button type="button" aria-label={showPassword?'Hide password':'Show password'} aria-pressed={showPassword} onClick={()=>setShowPassword(!showPassword)}>{showPassword?<Eye/>:<EyeSlash/>}</button></label>
    <div className="deception-options"><label><span className="deception-checkbox"><input type="checkbox" checked={demo.remember} onChange={e=>setDemo({...demo,remember:e.target.checked})}/><Check aria-hidden="true"/></span><span>Remember me</span></label><button type="button" disabled={busy} onClick={()=>setHelp('Password recovery is unavailable in this demo. No real account is connected.')}>Forgot password?</button></div>
    <button ref={cta} className="deception-submit" type="submit">{busy&&<CircleNotch className="breach-loading" aria-hidden="true"/>}<span>{busy?'Please wait...':'Log In'}</span>{demo.phase==='editing'&&<ArrowRight/>}</button></fieldset>
    <p className="deception-footer"><ShieldCheck/><span>Secure. Trusted. Always with you.</span></p><p className="deception-demo">Demo experience â€” do not enter real credentials.</p>
    <p className="deception-help" role="status">{help|| (demo.phase==='processing'?'Processing demo sign-in.':demo.simulationSubmitted?'Demo submitted.':'')}</p>
   </div>{demo.simulationSubmitted&&<BreachReveal/>}</form>
  </div>
 </div></IconContext.Provider>;
}
