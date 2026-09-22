import test from 'node:test';
import assert from 'node:assert/strict';
import { breachStore } from '../src/motion/breachState.ts';
import { emptyDemo,submitDemo,completeDemo } from '../src/motion/demoSubmission.ts';
test('submission clears values before reveal can activate',()=>{
 const pending=submitDemo({...emptyDemo(),username:'demo-user',password:'demo-password',remember:true});
 assert.equal(pending.simulationSubmitted,false);assert.equal(pending.username,'');assert.equal(pending.password,'');assert.equal(pending.remember,false);
 assert.equal(completeDemo(pending).simulationSubmitted,true);
});
test('forensic state carries no credential data and resets all narrative choices',()=>{
 breachStore.reset();breachStore.update({phase:'settled',forensic:true,clue:2,protectionRequested:true});
 assert.deepEqual(Object.keys(breachStore.get()).sort(),['clue','forensic','phase','protectionRequested']);
 breachStore.reset();assert.deepEqual(breachStore.get(),{phase:'idle',forensic:false,clue:0,protectionRequested:false});
});
import { triangleEntrance } from '../src/motion/breachMotion.ts';
test('reduced motion skips travel but retains sequential fades',()=>{
 for(const time of [0,1.8,3,7]){const {opacity,...motion}=triangleEntrance(time,7,true);assert.deepEqual(motion,{depth:0,scale:1,rotation:.08});assert.ok(opacity>=0&&opacity<=1);const exit=triangleExit(time,0,true);assert.equal(exit.depth,0);assert.equal(exit.x,0);assert.equal(exit.scale,1);}
});
test('triangle entrance is individual and exits preserve only three distant echoes',()=>{
 assert.ok(triangleEntrance(1.57,0,false).opacity>0);assert.equal(triangleEntrance(1.57,1,false).opacity,0);
 for(let i=0;i<8;i++)assert.ok(Math.abs(triangleExit(5,i,false).opacity-(i>=5?.13:0))<1e-8);
 assert.ok(triangleExit(3,0,false).depth>0);assert.ok(triangleExit(3,2,false).depth<0);
});
import {triangleExit} from '../src/motion/breachMotion.ts';
import {BREACH_TIMING as T,TRIANGLE_CUES,AUDIO_BEEP_PEAKS,breachVisibility} from '../src/motion/breachTimeline.ts';
test('audio-measured cues preserve wait, three glyph peaks, silence and short event',()=>{
 assert.equal(T.wait,1.5);assert.ok(T.firstTriangle>=T.wait);assert.equal(T.pulseStarts.length,3);
 T.pulseStarts.forEach((at,i)=>assert.ok(Math.abs(at+T.pulseRise-T.alarmStart-AUDIO_BEEP_PEAKS[i])<1e-6));
 assert.ok(T.alarmStop+T.audioRelease<T.primary);assert.ok(T.primary>=T.information);assert.ok(Math.abs(T.secondary-T.primary-.2)<1e-6);
 assert.ok(T.settled-T.wait>=2.5&&T.settled-T.wait<=3);
 assert.ok(new Set(TRIANGLE_CUES.slice(1).map((cue,i)=>Math.round((cue.at-TRIANGLE_CUES[i].at)*1000))).size>=5);
 assert.equal(breachVisibility('pulse_3').primary,false);assert.equal(breachVisibility('primary_action').secondary,false);
});
import {BreachAlarm} from '../src/audio/breachAlarm.ts';
test('audio failure cannot block visual sequence',async()=>{
 const alarm=new BreachAlarm(()=>{throw new Error('unavailable');});assert.equal(await alarm.arm(),false);alarm.stop();assert.equal(alarm.get().status,'stopped');
});
test('provided media unlocks silently, supports mute, plays once and stops',async()=>{
 const media={currentTime:0,paused:true,muted:false,volume:1,load(){},async play(){this.paused=false;},pause(){this.paused=true;}};
 const alarm=new BreachAlarm(()=>media);await alarm.arm();assert.equal(media.paused,true);assert.equal(media.currentTime,0);await alarm.start();assert.equal(media.paused,false);assert.equal(media.loop,false);alarm.setMuted(true);assert.equal(media.muted,true);alarm.gain(.2);assert.ok(media.volume<.2);alarm.stop();assert.equal(media.paused,true);assert.equal(media.volume,0);assert.equal(alarm.time(),null);
});

test('three restarts rewind the supplied alarm and permit the next user-triggered playback',async()=>{
 const media={currentTime:0,paused:true,muted:false,volume:1,load(){},async play(){this.paused=false;},pause(){this.paused=true;}};
 const alarm=new BreachAlarm(()=>media);
 for(let run=0;run<3;run++){await alarm.arm();await alarm.start();media.currentTime=2.4;alarm.pulse();alarm.reset();assert.equal(media.paused,true);assert.equal(media.currentTime,0);assert.equal(alarm.get().pulses,0);assert.equal(alarm.get().status,'idle');}
});
