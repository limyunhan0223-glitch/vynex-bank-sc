import test from 'node:test';
import assert from 'node:assert/strict';
import { deceptionPose, loginReveal } from '../src/motion/deceptionMotion.ts';
import { phonePose } from '../src/motion/baitMotion.ts';
import { emptyDemo, submitDemo, completeDemo } from '../src/motion/demoSubmission.ts';

test('Scene 03 preserves the exact Scene 02 pose until the notification click',()=>{
 for(const compact of [false,true]) {
  const base=phonePose(1,0,compact);
  assert.deepEqual(deceptionPose(base,0,compact),base);
  const close=deceptionPose(base,1,compact);
  assert.ok(close.z>base.z);
  assert.ok(Math.abs(close.rz)<Math.abs(base.rz));
 }
});
test('login reveals only after the camera push has begun',()=>{
 assert.equal(loginReveal(0),0);assert.equal(loginReveal(.3),0);
 assert.equal(loginReveal(1),1);
});
test('submission drops all demo values before entering the processing pause',()=>{
 const filled={...emptyDemo(),username:'demo@example.test',password:'demo-only',remember:true};
 const processing=submitDemo(filled);
 assert.equal(processing.username,'');assert.equal(processing.password,'');
 assert.equal(processing.remember,false);assert.equal(processing.phase,'processing');
 assert.equal(processing.simulationSubmitted,false);
 const submitted=completeDemo(processing);
 assert.equal(submitted.simulationSubmitted,true);assert.equal(submitted.phase,'submitted');
 assert.equal(submitted.password,'');
 assert.equal(completeDemo(emptyDemo()).simulationSubmitted,false);
});
