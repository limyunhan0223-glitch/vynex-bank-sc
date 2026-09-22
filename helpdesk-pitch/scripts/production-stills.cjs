const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderStill}=require('@remotion/renderer');
const fs=require('fs');const path=require('path');
(async()=>{
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),onProgress:()=>{}});
 const browser=await openBrowser('chrome');
 const composition=await selectComposition({serveUrl,id:'FullFilm-Scenes01-12',puppeteerInstance:browser});
 const shots=[['04-refinery',121.4],['04-hero',127.3],['05-gate',135.2],['05-review',142.65],['05-hero',146.5],['06-evidence',156.8],['06-block',162.5],['06-hero',171.7],['07-loop',193.4],['07-hero',199.2],['08-populate',213.8],['08-hero',221.6],['09-assemble',241.9],['09-hero',248.7],['10-boundaries',263.8],['10-examples',273.4],['10-hero',278.35],['11-focus',290.7],['11-hero',306.5],['12-manual',315.9],['12-reuse',318.2],['12-handover',323.9],['12-hero',331.5],['12-final',333.5]].map(([n,t])=>[n,Math.round(t*60)]);
 for(const n of [6179,7748,8866,10356,12024,13375,14989,16778,18481])shots.push([`boundary-${n-1}`,n-1],[`boundary-${n}`,n]);
 fs.mkdirSync('out/production',{recursive:true});
 const subset=process.argv[2]?shots.filter(([n])=>n.includes(process.argv[2])):shots;
 for(let i=0;i<subset.length;i+=2){await Promise.all(subset.slice(i,i+2).map(async([name,frame])=>{
  await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,output:`out/production/${name}.png`,logLevel:'error'});console.log(name,frame);
 }));}
 await browser.close({silent:true});
})().catch(e=>{console.error(e);process.exit(1)});
