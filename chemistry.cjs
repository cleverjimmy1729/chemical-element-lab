const fs=require('fs'),vm=require('vm'),assert=require('assert');
const sandbox={};vm.runInNewContext(fs.readFileSync(__dirname+'/../src/chemistry.js','utf8'),sandbox);
const C=sandbox.Chemistry;
assert.equal(C.elements.length,118);assert.equal(new Set(C.elements.map(e=>e.z)).size,118);
assert.equal(new Set(C.elements.map(e=>e.period)).size,7);
for(const e of C.elements){assert(e.name&&e.s);if(e.phase!=='unknown')assert(e.d>0&&e.cp>0);}
assert.equal(C.bySymbol.Hg.phase,'liquid');assert.equal(C.bySymbol.Br.phase,'liquid');assert.equal(C.bySymbol.Cs.phase,'solid');assert.equal(C.bySymbol.O.phase,'gas');assert.equal(C.bySymbol.Og.phase,'unknown');
assert.equal(C.makeBlock('P',0,.5,0,'red').n0*30.974/1000,2260);
const simulate=(world,seconds)=>{for(let t=0;t<seconds;t+=.025)world.step(.025);};
function pair(a,b){return new C.World([C.makeBlock(a,0,.5,0),C.makeBlock(b,1,.5,0)],'argon',true);}
let w=pair('H','O');const h0=w.blocks[0].n,o0=w.blocks[1].n;
simulate(w,8);assert.equal(w.energy,0,'H₂ and O₂ must not ignite at room temperature');
w.ignite(w.blocks[0]);simulate(w,20);assert(w.energy>100000,'Ignition must enable hydrogen combustion');
const dh=h0-w.blocks[0].n,doo=o0-w.blocks[1].n;
assert(Math.abs(dh/doo-2)<1e-8,'Hydrogen and oxygen atomic consumption ratio must be 2:1');
assert(w.energy<=h0/4*483600+1e-5,'Heat must respect limiting reagent');
assert(w.blocks.every(b=>b.n>=0),'Moles cannot become negative');
for(const[a,b]of[['Mg','O'],['Fe','S']]){w=pair(a,b);simulate(w,10);assert.equal(w.energy,0,a+' must require ignition');w.ignite(w.blocks[0]);simulate(w,3);assert(w.energy>0,a+' ignition must enable reaction');}
w=pair('Mg','O');w.ignite(w.blocks[0]);simulate(w,30);assert(w.summary().temperature<4000,'High-temperature heat loss must prevent the magnesium demo from sitting at the numerical ceiling');
w=pair('Na','Cl');simulate(w,1);assert(w.energy>0,'Na / Cl must react without ignition');
w=pair('Hg','Au');simulate(w,8);assert.equal(w.energy,0,'Qualitative amalgamation must not fabricate combustion heat');assert(w.blocks[0].product>0,'Amalgamation must be recorded');
w=pair('Ar','Cu');simulate(w,8);assert.equal(w.energy,0,'Argon / copper must remain inert');
assert(!w.events.some(e=>e.title.includes('挥发增强')),'Already gaseous elements must not be reported as boiling at room temperature');
w=new C.World([C.makeBlock('Na')],'vacuum');simulate(w,10);assert.equal(w.energy,0,'Vacuum must not supply atmospheric oxygen');
w=new C.World([C.makeBlock('Na')],'air');simulate(w,10);assert(w.energy>0,'Air must supply oxygen at the surface');
w=new C.World([C.makeBlock('Na')],'humid');simulate(w,1);assert(w.events.some(e=>e.title.includes('潮气')),'Moisture must be distinguished from oxygen');
let white=new C.World([C.makeBlock('P',0,.5,0,'white')],'air'),red=new C.World([C.makeBlock('P',0,.5,0,'red')],'air');simulate(white,2);simulate(red,2);assert(white.energy>0);assert.equal(red.energy,0,'Red phosphorus must not use white phosphorus autoignition');
assert.equal(C.contact({x:0,y:.5,z:0},{x:1,y:.5,z:0}),1);
assert.equal(C.contact({x:0,y:.5,z:0},{x:1.1,y:.5,z:0}),0);
assert.equal(C.contact({x:0,y:.5,z:0},{x:1,y:.5,z:1}),0,'Edge-only contact has no face area');
assert(C.exposure(C.makeBlock('H',0,.5,0),C.makeBlock('O',3,.5,0),12,false)>0,'Gas diffusion must expand contact reach');
assert.equal(C.exposure(C.makeBlock('H',0,.5,0),C.makeBlock('O',3,.5,0),12,true),0,'Confinement must restrict diffusion');
for(const r of C.rules){assert(C.bySymbol[r.a]&&C.bySymbol[r.b]);assert(r.na>0&&r.nb>0&&r.rate>0&&r.q>=0);w=pair(r.a,r.b);w.ignite(w.blocks[0]);simulate(w,1);for(const b of w.blocks){assert(Number.isFinite(b.T));assert(Number.isFinite(b.n));assert(b.n>=0&&b.n<=b.n0+1e-8);assert.equal(b.x,b===w.blocks[0]?0:1,'Solid anchors must not move');}}
w=pair('Og','F');simulate(w,4);assert.equal(w.energy,0,'Unknown bulk properties must not produce invented reactions');
w=new C.World([C.makeBlock('U'),C.makeBlock('Og',1,.5,0)],'argon');w.initialize();assert(w.events.some(e=>e.type==='radiation'));assert(w.events.some(e=>e.type==='unknown'));
console.log(JSON.stringify({ok:true,elements:C.elements.length,periods:7,reactionPaths:C.rules.length,checks:'Ignition, stoichiometry, energy limits, nonnegative inventory, atmospheres, allotropes, diffusion, radiation placeholders and fixed anchors passed.'},null,2));
