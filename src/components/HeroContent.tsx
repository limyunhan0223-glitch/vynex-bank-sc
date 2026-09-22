import { ArrowRight, Play } from '@phosphor-icons/react';
import { GlassButton } from './GlassButton';
export function HeroContent({ onAction }: { onAction: (name: string) => void }) {
 return <div className="hero-copy"><p className="eyebrow">SECURE · SMART · TOGETHER</p><h1>Bank for a<br/>Brighter <span>Tomorrow</span></h1><p className="intro">At Vynex Bank, we combine innovation and trust<br className="desktop-break"/> to help you achieve more — today and beyond.</p><div className="hero-actions flex items-center"><GlassButton className="primary" onClick={() => onAction('Get Started')}>Get Started <ArrowRight size={18}/></GlassButton><button className="story" onClick={() => onAction('Watch Our Story')}><span><Play size={12} weight="fill"/></span>Watch Our Story</button></div><div className="stats flex"><div><strong>2M+</strong><small>Happy Customers</small></div><div><strong>99.9%</strong><small>Secure Transactions</small></div><div><strong>24/7</strong><small>Trusted Support</small></div></div></div>;
}

