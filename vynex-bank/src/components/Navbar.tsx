import { MagnifyingGlass, List, X, ArrowUpRight } from '@phosphor-icons/react';
import { useState } from 'react';
import { GlassButton } from './GlassButton';
export function Navbar({ onAction }: { onAction: (name: string) => void }) {
 const [open, setOpen] = useState(false);
 return <header className="navbar flex items-center justify-between"><a className="brand flex items-center" href="#home" aria-label="Vynex Bank home"><img src="/assets/vynex-logo.png" alt="" /><span><strong>Vynex Bank</strong><small>Your Tomorrow, Our Priority</small></span></a>
 <nav aria-label="Main navigation" className={open ? 'nav-links is-open' : 'nav-links'}>{['Personal','Business','Wealth','About Us','Support'].map(item => <button key={item} onClick={() => {onAction(item);setOpen(false);}}>{item}</button>)}</nav>
 <div className="nav-actions flex items-center"><button className="search" aria-label="Search Vynex Bank" onClick={() => onAction('Search')}><MagnifyingGlass size={20}/></button><GlassButton className="login" onClick={() => onAction('Log In')}>Log In<ArrowUpRight size={15}/></GlassButton><GlassButton className="primary nav-cta" onClick={() => onAction('Open an Account')}>Open an Account<ArrowUpRight size={15}/></GlassButton><button className="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={24}/> : <List size={24}/>}</button></div></header>;
}

