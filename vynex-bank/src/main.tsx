import React from 'react';
import { createRoot } from 'react-dom/client';
import { VynexExperience } from './components/VynexExperience';
import './styles/index.css';
import './styles/refinements.css';
import './styles/bait.css';
import './styles/deception.css';
import './styles/breach.css';
import './styles/protection.css';
import './styles/mobile.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><VynexExperience /></React.StrictMode>);

