import { useSyncExternalStore } from 'react';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { breachAlarm } from '../audio/breachAlarm';
export function BreachAudioControl(){
 const audio=useSyncExternalStore(breachAlarm.subscribe,breachAlarm.get,breachAlarm.get);
 return <button type="button" className="breach-audio-toggle" aria-label={audio.muted?'Unmute alarm':'Mute alarm'} aria-pressed={audio.muted} onClick={()=>breachAlarm.setMuted(!audio.muted)} title={audio.status==='unavailable'?'Audio unavailable; the visual sequence continues.':audio.muted?'Unmute alarm':'Mute alarm'} data-audio-status={audio.status} data-audio-pulses={audio.pulses}>{audio.muted?<SpeakerSlash/>:<SpeakerHigh/>}</button>;
}
