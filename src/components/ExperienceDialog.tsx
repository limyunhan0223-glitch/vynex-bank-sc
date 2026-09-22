import { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight, MagnifyingGlass } from '@phosphor-icons/react';
const detail: Record<string,string> = {
 'Personal':'Everyday possibilities. Discover simple banking, global access and a brighter financial future.',
 'Business':'Built for your next chapter. Explore a banking partner for your growing ambitions.',
 'Wealth':'Make room for tomorrow. Explore investment solutions designed around your future.',
 'About Us':'People. Progress. A stronger tomorrow. Vynex brings thoughtful innovation to everyday banking.',
 'Support':'Here for you, around the clock. Explore our everyday banking, wealth and global access services.',
 'Watch Our Story':'A brighter tomorrow begins with possibility. With people at the heart of everything we do, Vynex brings your world and your ambitions closer together.',
 'Everyday Banking':'A simpler way to manage your everyday. Payments, savings and spending, beautifully connected.',
 'Grow Your Wealth':'Your ambitions deserve room to grow. Discover a more thoughtful approach to your financial future.',
 'Global Access':'Your world, connected. A banking experience designed to travel with you.',
 'Your Security':'Confidence in every moment. Thoughtfully designed protection is part of the Vynex experience.',
};
export function ExperienceDialog({ title, onClose, onAction }: { title:string|null;onClose:()=>void;onAction:(name:string)=>void }) {
 const ref=useRef<HTMLDialogElement>(null); const [query,setQuery]=useState('');
 useEffect(()=>{ if(title){setQuery('');ref.current?.showModal();}else ref.current?.close(); },[title]);
 return <dialog ref={ref} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}} className="experience-dialog"><button className="dialog-close" aria-label="Close dialog" onClick={onClose}><X size={23}/></button><p className="eyebrow">VYNEX BANK</p><h2>{title}</h2>{title==='Search'?<><label className="search-input"><MagnifyingGlass size={20}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="How can we help you?" aria-label="Search services"/></label><div className="search-results">{Object.keys(detail).filter(k=>k!=='Watch Our Story'&&k.toLowerCase().includes(query.toLowerCase())).map(k=><button key={k} onClick={()=>onAction(k)}>{k}<ArrowUpRight size={18}/></button>)}</div></>:<><p>{detail[title||''] || 'You’re exploring the Vynex Bank showcase. Account opening and online banking will be introduced in a later experience.'}</p><button className="primary" onClick={onClose}>Continue exploring <ArrowUpRight size={18}/></button></>}</dialog>;
}
