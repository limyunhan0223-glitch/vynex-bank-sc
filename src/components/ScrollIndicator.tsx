import { CaretDown, MouseSimple } from '@phosphor-icons/react';
export function ScrollIndicator({onExperience}:{onExperience?:()=>void}) {return <a className="scroll-indicator" href="#transition" onClick={e=>{if(onExperience){e.preventDefault();onExperience();}}} aria-label="Scroll to experience"><MouseSimple size={27} weight="thin"/><span>SCROLL TO EXPERIENCE</span><CaretDown size={14}/></a>;}

