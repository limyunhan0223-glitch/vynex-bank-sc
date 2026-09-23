import test from 'node:test';
import assert from 'node:assert/strict';
import {protectionStore,protectionMotion} from '../src/motion/protectionState.ts';
import {PROTECTION_LAYERS} from '../src/content/protectionLayers.ts';
test('all required academic controls belong to exactly three named layers',()=>{
 assert.deepEqual(PROTECTION_LAYERS.map(l=>l.name),['TECHNICAL','HUMAN','ORGANIZATIONAL']);
 assert.deepEqual(PROTECTION_LAYERS.map(l=>l.controls.length),[7,4,5]);
 assert.equal(new Set(PROTECTION_LAYERS.flatMap(l=>l.controls.map(c=>c.name))).size,16);
});
test('hover previews without selecting or marking a layer explored',()=>{
 protectionStore.reset();protectionStore.enter();protectionStore.preview(1);
 assert.equal(protectionStore.get().selected,null);assert.equal(protectionStore.get().explored,0);assert.equal(protectionStore.get().hover,1);
});
test('selection remains readable until explicitly explored; all three align only after completion',()=>{
 protectionStore.reset();protectionStore.enter();protectionStore.ready();
 for(const index of [0,2,1]){protectionStore.select(index);assert.equal(protectionStore.get().complete,false);protectionStore.explore(index);}
 assert.equal(protectionStore.get().explored,7);assert.equal(protectionStore.get().complete,true);assert.equal(protectionStore.get().selected,null);
 protectionStore.select(2);assert.equal(protectionStore.get().selected,2);assert.equal(protectionStore.get().explored,7);
});
test('next chapter is a handoff only; reset clears the narrative and motion',()=>{
 protectionStore.continue();assert.equal(protectionStore.get().continueRequested,true);protectionStore.reset();assert.equal(protectionStore.get().entered,false);assert.equal(protectionMotion.progress,0);
});

test('native upward navigation releases Scene 05 and preserves exploration for re-entry',()=>{
 protectionStore.reset();protectionStore.enter();protectionStore.ready();protectionStore.select(1);protectionStore.explore(1);
 protectionMotion.progress=.8;
 protectionStore.navigate(false);
 assert.equal(protectionStore.get().visible,false);
 assert.equal(protectionStore.get().entered,true,'keep the scene mounted while its existing animation reverses');
 assert.equal(protectionMotion.progress,.8,'direction changes must not snap animation progress');
 protectionStore.finishExit();
 assert.equal(protectionStore.get().entered,false);assert.equal(protectionMotion.started,false);
 assert.equal(protectionStore.get().explored,2);
 protectionStore.navigate(true);
 assert.equal(protectionStore.get().entered,true);assert.equal(protectionStore.get().explored,2);
});

test('rapid direction reversal cancels an obsolete exit without resetting the current pose',()=>{
 protectionStore.reset();protectionStore.enter();protectionMotion.progress=.42;
 protectionStore.navigate(false);protectionStore.navigate(true);protectionStore.finishExit();
 assert.equal(protectionStore.get().entered,true);assert.equal(protectionStore.get().visible,true);
 assert.equal(protectionMotion.progress,.42);
 protectionStore.navigate(false);protectionStore.ready();
 assert.equal(protectionStore.get().ready,false,'an old entrance callback cannot re-enable a departing overlay');
 protectionStore.finishExit();protectionStore.reset();
});

test('three full exploration resets return to a fresh protection entry',()=>{
 for(let run=0;run<3;run++){
  protectionStore.enter();protectionStore.ready();
  for(const layer of [0,1,2]){protectionStore.select(layer);protectionStore.explore(layer);}
  protectionMotion.progress=1;protectionMotion.core=1;protectionMotion.rings.fill(1);
  assert.equal(protectionStore.get().complete,true);
  protectionStore.reset();
  assert.equal(protectionStore.get().selected,null);assert.equal(protectionStore.get().explored,0);assert.equal(protectionStore.get().entered,false);assert.equal(protectionStore.get().ready,false);assert.equal(protectionStore.get().entryVersion,0);
  assert.deepEqual(protectionMotion.rings,[0,0,0]);assert.equal(protectionMotion.started,false);
 }
});

test('cooling and shared camera progress survive a direction reversal and reset only after exit',()=>{
 protectionStore.reset();protectionStore.enter();
 Object.assign(protectionMotion,{progress:.42,cooling:.36,core:.2});
 protectionStore.navigate(false);protectionStore.navigate(true);
 assert.equal(protectionMotion.progress,.42);assert.equal(protectionMotion.cooling,.36);assert.equal(protectionMotion.core,.2);
 protectionStore.finishExit();assert.equal(protectionMotion.cooling,.36);
 protectionStore.navigate(false);protectionStore.finishExit();assert.equal(protectionMotion.cooling,0);
 protectionStore.reset();
});
