import test from 'node:test';
import assert from 'node:assert/strict';
import { dampValue, projectionFrame, lockReveal, loginReveal } from '../src/motion/deceptionMotion.ts';
test('damping has the same response at 60, 90 and 120 Hz',()=>{
 const results=[60,90,120].map(hz=>{let current=0;for(let i=0;i<hz;i++)current=dampValue(current,1,12,1/hz);return current;});
 assert.ok(Math.max(...results)-Math.min(...results)<1e-12);
});
test('canvas expansion preserves projected scale and center before movement',()=>{
 const initial={height:830,offsetX:340,offsetY:-35};
 const old=projectionFrame(initial,{height:830,offsetX:340,offsetY:-35},1000,0);
 const full=projectionFrame(initial,{height:1000,offsetX:0,offsetY:0},1000,0);
 assert.ok(Math.abs(830/Math.tan(old.fov*Math.PI/360)-1000/Math.tan(full.fov*Math.PI/360))<1e-8);
 assert.equal(340-old.offsetX,-full.offsetX);
 assert.equal(-35-old.offsetY,-full.offsetY);
 const end=projectionFrame(initial,{height:1000,offsetX:0,offsetY:0},1000,1);
 assert.ok(Math.abs(end.fov-40)<1e-10);assert.equal(end.offsetX,0);
});
test('screen layers overlap and reach exact endpoints',()=>{
 assert.equal(lockReveal(0),0);assert.equal(loginReveal(0),0);
 assert.ok(lockReveal(.5)>0&&lockReveal(.5)<1);
 assert.ok(loginReveal(.5)>0&&loginReveal(.5)<1);
 assert.equal(lockReveal(1),1);assert.equal(loginReveal(1),1);
});
