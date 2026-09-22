import { Wallet, ChartBar, Globe, ShieldCheck, ArrowRight } from '@phosphor-icons/react';
export const features = [
 {title:'Everyday Banking',copy:'Simple, fast and secure banking for your daily needs.',icon:Wallet},
 {title:'Grow Your Wealth',copy:'Investment solutions for a brighter future.',icon:ChartBar},
 {title:'Global Access',copy:'Bank anytime, anywhere in the world.',icon:Globe},
 {title:'Your Security',copy:'Advanced protection for your peace of mind.',icon:ShieldCheck},
];
export function FeatureCards({ onAction }: { onAction: (name: string) => void }) { return <div className="bottom-content"><div className="feature-grid">{features.map(({ title,copy,icon:Icon }) => <button className="feature" key={title} onClick={() => onAction(title)}><Icon className="feature-icon" size={31} weight="fill"/><h2>{title}</h2><p>{copy}</p><span className="feature-arrow"><ArrowRight size={16}/></span></button>)}</div><p className="manifesto">People<br/>Progress<br/><span>A Stronger Tomorrow</span><i/></p></div>; }

