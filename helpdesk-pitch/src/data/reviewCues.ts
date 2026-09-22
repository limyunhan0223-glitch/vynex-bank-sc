import { timeline } from "../timeline";
const local = (seconds: number, scene: number) =>
  Math.round(seconds * 60) - timeline[scene - 1].startFrame;
// Actual narration word anchors. Small animation offsets are staging, not time stretching.
export const scene02Cues = {
  introduce: local(38.26, 2),
  orchestration: local(41.2, 2),
  channels: local(43.02, 2),
  knowledge: local(44.88, 2),
  troubleshoot: local(46.28, 2),
  ticketing: local(48.96, 2),
  hero: local(50.44, 2),
  enquiry: 1125,
};
export const scene03Cues = {
  customer: local(59.78, 3),
  understand: local(66.78, 3),
  product: local(70.6, 3),
  issue: local(71.46, 3),
  error: local(72.38, 3),
  identity: local(73.6, 3),
  verify: local(74.5, 3),
  context: local(77.8, 3),
  restart: local(81.46, 3),
  recognise: local(83.46, 3),
  skip: local(85.28, 3),
  knowledge: local(87.62, 3),
  search: local(88.48, 3),
  evidence: local(90.58, 3),
  troubleshoot: local(92.98, 3),
  reply: local(94.1, 3),
  next: local(95.04, 3),
  recordQuestion: local(96.6, 3),
  recordAction: local(97.72, 3),
  recordResult: local(98.92, 3),
  unresolved: local(99.36, 3),
  handover: local(99.98, 3),
  summary: local(100.86, 3),
};
