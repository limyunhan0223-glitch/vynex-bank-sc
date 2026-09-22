import test from 'node:test';
import assert from 'node:assert/strict';
import { notificationReady, phonePose } from '../src/motion/baitMotion.ts';

test('notification cannot appear during entrance, even if scrolling jumps to the end', () => {
 assert.equal(notificationReady(1, .3), false);
 assert.equal(notificationReady(0, 0), false);
 assert.equal(notificationReady(1, .005), true);
});
test('phone starts below/right, settles in frame, and click pushes it closer', () => {
 const outside=phonePose(0,0,false), settled=phonePose(1,0,false), clicked=phonePose(1,1,false);
 assert.ok(outside.x>settled.x+3);
 assert.ok(outside.y<settled.y-5);
 assert.ok(clicked.z>settled.z);
 assert.ok(Math.abs(settled.rz)<.2);
});
test('reverse scroll restores the offscreen starting pose and bounded inputs stay finite', () => {
 assert.deepEqual(phonePose(-1,0,false),phonePose(0,0,false));
 assert.deepEqual(phonePose(2,0,false),phonePose(1,0,false));
 assert.ok(Object.values(phonePose(.5,.3,true)).every(Number.isFinite));
});
