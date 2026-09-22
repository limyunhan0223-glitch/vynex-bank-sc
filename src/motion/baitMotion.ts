export type ExperienceMotion = {
 progress: number;
 depth: number;
 phone: number;
 notification: number;
 focus: number;
 visualFocus?: number;
 shade?: number;
};
export const initialMotion = (): ExperienceMotion => ({progress:0,depth:0,phone:0,notification:0,focus:0});
const clamp = (n:number) => Math.max(0,Math.min(1,n));
export function phonePose(entrance:number, focus:number, compact:boolean) {
 const e=clamp(entrance), f=clamp(focus);
 // Continuous cubic deceleration. Frame damping adds weight without a spring.
 const glide=1-Math.pow(1-e,3);
 return {
  x: 5.7+((compact?-.18:-.1)-5.7)*glide,
  y: -7.2+(compact?7.15:6.85)*glide+f*.12,
  z: .6+glide*.6+f*.7,
  rx: .16-glide*.11,
  ry: -.55+glide*.4,
  rz: -.3+glide*.15,
  scale: (compact?1.03:1.12)+f*.025,
 };
}
export function notificationReady(reveal:number, remainingDistance:number) {
 return reveal>.01 && remainingDistance<.035;
}

