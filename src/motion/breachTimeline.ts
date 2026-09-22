// Source MP3: 3.030204s, 44.1kHz stereo. Offline 800–1400Hz envelope peaks.
export const AUDIO_BEEP_PEAKS=[.530,.750,.969] as const;
export const BREACH_TIMING={
 wait:1.5,firstTriangle:1.5,alarmStart:1.5,reveal:1.76,
 pulseStarts:AUDIO_BEEP_PEAKS.map(at=>1.5+at-.035),
 pulseRise:.035,pulseHold:.035,pulseFall:.12,
 alarmStop:2.61,audioRelease:.1,clearing:2.64,silenceEnd:3.04,
 information:3.04,primary:3.38,secondary:3.58,settled:4.15,
};
export const TRIANGLE_CUES=[
 {at:1.5,duration:.28,rotation:.14}, {at:1.61,duration:.3,rotation:-.09},
 {at:1.77,duration:.27,rotation:.11}, {at:1.86,duration:.32,rotation:-.12},
 {at:2.01,duration:.29,rotation:.08}, {at:2.12,duration:.26,rotation:-.1},
 {at:2.25,duration:.3,rotation:.12}, {at:2.36,duration:.25,rotation:-.08},
] as const;
export const BREACH_PHASES=['idle','waiting','warning_start','triangles','reveal','pulse_1','pulse_2','pulse_3','release','clearing','silence','information','primary_action','actions','settled'] as const;
export type BreachPhase=typeof BREACH_PHASES[number];
export function breachVisibility(phase:BreachPhase){
 const index=BREACH_PHASES.indexOf(phase),at=(target:BreachPhase)=>index>=BREACH_PHASES.indexOf(target);
 return {revealed:at('reveal'),information:at('information'),primary:at('primary_action'),secondary:at('actions')};
}
export const breachClock={elapsed:0,running:false,pulse:0};

