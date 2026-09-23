/** Plays only the supplied recording. No synthesized oscillators or replacement tones. */
export class BreachAlarm {
 private revision=0;
 private media:HTMLAudioElement|null=null;
 private listeners=new Set<()=>void>();
 private snapshot={muted:false,status:'idle' as 'idle'|'armed'|'playing'|'stopped'|'unavailable',pulses:0};
 private createMedia:()=>HTMLAudioElement;
 constructor(createMedia:()=>HTMLAudioElement=()=>new Audio('/assets/premium-cybersecurity-warning.mp3')){this.createMedia=createMedia;}
 get=()=>this.snapshot;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
 private update(patch:Partial<typeof this.snapshot>){this.snapshot={...this.snapshot,...patch};this.listeners.forEach(listener=>listener());}
 preload(){try{if(!this.media){this.media=this.createMedia();this.media.preload='auto';this.media.loop=false;this.media.load();}}catch{this.update({status:'unavailable'});}}
 async arm(){
  const revision=++this.revision;this.preload();if(!this.media)return false;
  try{this.media.muted=true;this.media.currentTime=0;await this.media.play();if(revision!==this.revision)return false;this.media.pause();this.media.currentTime=0;this.media.muted=this.snapshot.muted;this.media.volume=.7;this.update({status:'armed',pulses:0});return true;}
  catch{this.update({status:'unavailable'});return false;}
 }
 async start(){const revision=++this.revision;if(!this.media)return;try{this.media.currentTime=0;this.media.muted=this.snapshot.muted;this.media.volume=.7;await this.media.play();if(revision===this.revision)this.update({status:'playing'});}catch{this.update({status:'unavailable'});}}
 time(){return this.snapshot.status==='playing'&&this.media&&!this.media.paused?this.media.currentTime:null;}
 setMuted(muted:boolean){if(this.media)this.media.muted=muted;this.update({muted});}
 pulse(){this.update({pulses:this.snapshot.pulses+1});}
 gain(value:number){if(this.media)this.media.volume=Math.max(0,Math.min(.7,value*.7));}
 stop(){this.revision++;if(this.media){this.media.pause();this.media.volume=0;}this.update({status:'stopped'});}
 reset(){this.stop();if(this.media)this.media.currentTime=0;this.update({status:'idle',pulses:0});}
 pause(){this.media?.pause();}
 async continue(){if(this.media&&this.snapshot.status==='playing'){try{await this.media.play();}catch{this.update({status:'unavailable'});}}}
}
export const breachAlarm=new BreachAlarm();
