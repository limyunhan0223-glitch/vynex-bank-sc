import { ShieldCheck, ChartBar, MouseSimple } from '@phosphor-icons/react';
export function BaitScene({active}:{active:boolean}){
 return <div className={`bait-layer ${active?'is-focused':''}`} aria-hidden="true" inert>
  <section className="bait-copy" aria-labelledby="bait-heading"><p className="bait-eyebrow">SAME WORLD.<br/>A NEW NOTIFICATION.</p><h2 id="bait-heading">An Unexpected<br/>Message <span>Arrives.</span></h2><p className="bait-intro">Even in a trusted world, threats can find a way in.</p><div className="bait-reading-cue"><MouseSimple size={30} weight="thin"/><span>A moment. A message.</span></div></section>
  <div className="bait-support" aria-hidden="true"><div><ShieldCheck size={27} weight="fill"/><span>Account Security<small>Your safety matters</small></span></div><div><ChartBar size={28} weight="fill"/><span>Stay in Control<small>Real time protection</small></span></div></div>
  <p className="bait-note">A single message<br/>can change everything.</p>
 </div>;
}
