import {useEffect,useRef,type ButtonHTMLAttributes} from 'react';
import {ArrowRight} from '@phosphor-icons/react';
import '../styles/glass-cta.css';
type Props=ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'crystal'|'highlighted'};
export function VynexGlassCTA({variant='crystal',className='',children,...props}:Props){
 const ref=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  const el=ref.current!;const media=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,last=0,x=.5,y=.35,tx=x,ty=y,alpha=0,targetAlpha=0,dx=0;
  const tick=(now:number)=>{if(el.disabled){frame=0;return;}const dt=Math.min((now-last)/1000||.016,.05);last=now;const blend=1-Math.exp(-9*dt);x+=(tx-x)*blend;y+=(ty-y)*blend;alpha+=(targetAlpha-alpha)*(1-Math.exp(-6*dt));
   el.style.setProperty('--spec-x',`${x*100}%`);el.style.setProperty('--spec-y',`${y*100}%`);el.style.setProperty('--spec-alpha',String(alpha));el.style.setProperty('--lens-light',String(Math.max(0,(x-.65)/.35)*alpha));
   if(Math.abs(tx-x)+Math.abs(ty-y)+Math.abs(targetAlpha-alpha)>.002)frame=requestAnimationFrame(tick);else frame=0;
  };
  const start=()=>{if(!frame){last=performance.now();frame=requestAnimationFrame(tick);}};
  const move=(e:PointerEvent)=>{if(e.pointerType!=='mouse'||media.matches||el.disabled)return;const r=el.getBoundingClientRect();const next=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));dx=next-tx;tx=next;ty=Math.max(.05,Math.min(.8,(e.clientY-r.top)/r.height));targetAlpha=1;start();};
  const leave=()=>{tx=Math.max(0,Math.min(1,tx+dx*.35));targetAlpha=0;start();};
  el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);el.addEventListener('pointercancel',leave);
  return()=>{cancelAnimationFrame(frame);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);el.removeEventListener('pointercancel',leave);};
 },[]);
 return <button {...props} ref={ref} type={props.type??'button'} className={`vynex-glass-cta ${className}`} data-variant={variant}>
 <span className="vynex-cta-optics" aria-hidden="true"/>
 {variant==='highlighted'&&<svg className="vynex-cta-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C13.3 8.7 15.3 10.7 22 12C15.3 13.3 13.3 15.3 12 22C10.7 15.3 8.7 13.3 2 12C8.7 10.7 10.7 8.7 12 2Z" fill="currentColor"/></svg>}
 <span className="vynex-cta-label">{children}</span><span className="vynex-cta-lens" aria-hidden="true"><ArrowRight weight="light"/></span>
 </button>;
}
