/* Element Lab. All quantities SI unless specified. Kinetics and surface temperatures are illustrative. */
(function(root){
'use strict';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const rows=`
H 氢 1.008 .0824 -259.16 -252.87 14300
He 氦 4.003 .163 -272.2 -268.93 5193
Li 锂 6.94 534 180.5 1342 3580
Be 铍 9.012 1850 1287 2469 1825
B 硼 10.81 2340 2076 3927 1030
C 碳 12.011 2267 3550 4027 710
N 氮 14.007 1.145 -210 -195.8 1040
O 氧 15.999 1.308 -218.79 -182.95 918
F 氟 18.998 1.553 -219.67 -188.11 824
Ne 氖 20.18 .825 -248.59 -246.05 1030
Na 钠 22.99 968 97.79 883 1230
Mg 镁 24.305 1738 650 1091 1020
Al 铝 26.982 2700 660.32 2519 897
Si 硅 28.085 2329 1414 3265 705
P 磷 30.974 1823 44.15 280.5 769
S 硫 32.06 2070 115.21 444.6 710
Cl 氯 35.45 2.899 -101.5 -34.04 479
Ar 氩 39.948 1.634 -189.34 -185.85 520
K 钾 39.098 862 63.38 759 757
Ca 钙 40.078 1550 842 1484 647
Sc 钪 44.956 2985 1541 2836 568
Ti 钛 47.867 4506 1668 3287 523
V 钒 50.942 6110 1910 3407 489
Cr 铬 51.996 7190 1907 2671 449
Mn 锰 54.938 7440 1246 2061 479
Fe 铁 55.845 7874 1538 2862 449
Co 钴 58.933 8900 1495 2927 421
Ni 镍 58.693 8908 1455 2913 444
Cu 铜 63.546 8960 1084.62 2562 385
Zn 锌 65.38 7140 419.53 907 388
Ga 镓 69.723 5904 29.76 2204 371
Ge 锗 72.63 5323 938.25 2833 320
As 砷 74.922 5727 817 614 329
Se 硒 78.971 4810 221 685 321
Br 溴 79.904 3103 -7.2 58.8 474
Kr 氪 83.798 3.425 -157.36 -153.22 248
Rb 铷 85.468 1532 39.31 688 363
Sr 锶 87.62 2640 777 1382 301
Y 钇 88.906 4472 1526 3338 298
Zr 锆 91.224 6520 1855 4409 278
Nb 铌 92.906 8570 2477 4744 265
Mo 钼 95.95 10220 2623 4639 251
Tc 锝 98 11000 2157 4265 63
Ru 钌 101.07 12370 2334 4150 238
Rh 铑 102.906 12410 1964 3695 243
Pd 钯 106.42 12020 1554.9 2963 244
Ag 银 107.868 10490 961.78 2162 235
Cd 镉 112.414 8650 321.07 767 232
In 铟 114.818 7310 156.6 2072 233
Sn 锡 118.71 7310 231.93 2602 228
Sb 锑 121.76 6697 630.63 1587 207
Te 碲 127.6 6240 449.51 988 202
I 碘 126.904 4933 113.7 184.3 214
Xe 氙 131.293 5.366 -111.8 -108.1 158
Cs 铯 132.905 1873 28.44 671 242
Ba 钡 137.327 3510 727 1897 204
La 镧 138.905 6146 920 3464 195
Ce 铈 140.116 6770 795 3443 192
Pr 镨 140.908 6770 931 3520 193
Nd 钕 144.242 7010 1010 3074 190
Pm 钷 145 7260 1042 3000 180
Sm 钐 150.36 7520 1072 1794 197
Eu 铕 151.964 5244 822 1529 182
Gd 钆 157.25 7900 1313 3273 236
Tb 铽 158.925 8230 1356 3230 182
Dy 镝 162.5 8550 1412 2567 170
Ho 钬 164.93 8800 1474 2700 165
Er 铒 167.259 9070 1529 2868 168
Tm 铥 168.934 9320 1545 1950 160
Yb 镱 173.045 6900 824 1196 155
Lu 镥 174.967 9841 1652 3402 154
Hf 铪 178.49 13310 2233 4603 144
Ta 钽 180.948 16690 3017 5458 140
W 钨 183.84 19250 3422 5555 134
Re 铼 186.207 21020 3186 5596 137
Os 锇 190.23 22590 3033 5012 130
Ir 铱 192.217 22560 2446 4428 131
Pt 铂 195.084 21450 1768.3 3825 133
Au 金 196.967 19300 1064.18 2856 129
Hg 汞 200.592 13534 -38.83 356.73 140
Tl 铊 204.38 11850 304 1473 129
Pb 铅 207.2 11340 327.46 1749 128
Bi 铋 208.98 9780 271.4 1564 122
Po 钋 209 9196 254 962 125
At 砹 210 ? ? ? ?
Rn 氡 222 9.073 -71 -61.7 94
Fr 钫 223 ? ? ? ?
Ra 镭 226 5500 700 1737 94
Ac 锕 227 10070 1050 3200 120
Th 钍 232.038 11720 1750 4788 113
Pa 镤 231.036 15370 1572 4000 120
U 铀 238.029 19100 1135 4131 116
Np 镎 237 20450 644 3902 110
Pu 钚 244 19840 640 3228 130
Am 镅 243 13690 1176 2011 100
Cm 锔 247 13510 1345 3110 110
Bk 锫 247 ? ? ? ?
Cf 锎 251 ? ? ? ?
Es 锿 252 ? ? ? ?
Fm 镄 257 ? ? ? ?
Md 钔 258 ? ? ? ?
No 锘 259 ? ? ? ?
Lr 铹 266 ? ? ? ?
Rf 𬬻 267 ? ? ? ?
Db 𬭊 268 ? ? ? ?
Sg 𬭳 269 ? ? ? ?
Bh 𬭛 270 ? ? ? ?
Hs 𬭶 269 ? ? ? ?
Mt 鿏 278 ? ? ? ?
Ds 𫟼 281 ? ? ? ?
Rg 𬬭 282 ? ? ? ?
Cn 鿔 285 ? ? ? ?
Nh 鿭 286 ? ? ? ?
Fl 𫓧 289 ? ? ? ?
Mc 镆 290 ? ? ? ?
Lv 𫟷 293 ? ? ? ?
Ts 鿬 294 ? ? ? ?
Og 鿫 294 ? ? ? ?`.trim().split('\n');
const periods=[2,10,18,36,54,86,118];
const colors={alkali:'#dba574',alkaline:'#d9c585',transition:'#b5c0bd',post:'#93b6bb',metalloid:'#9bb57f',nonmetal:'#9ac9ac',halogen:'#d7c268',noble:'#b3a0d3',lanthanide:'#bca8b5',actinide:'#c498b2',unknown:'#8d879d'};
const categoryNames={alkali:'碱金属',alkaline:'碱土金属',transition:'过渡金属',post:'其他金属',metalloid:'类金属',nonmetal:'非金属',halogen:'卤素',noble:'稀有气体',lanthanide:'镧系元素',actinide:'锕系元素',unknown:'性质待定'};
function category(z){if([3,11,19,37,55,87].includes(z))return'alkali';if([4,12,20,38,56,88].includes(z))return'alkaline';if([2,10,18,36,54,86,118].includes(z))return'noble';if([9,17,35,53,85,117].includes(z))return'halogen';if(z>=57&&z<=71)return'lanthanide';if(z>=89&&z<=103)return'actinide';if([5,14,32,33,51,52].includes(z))return'metalloid';if([1,6,7,8,15,16,34].includes(z))return'nonmetal';if([13,31,49,50,81,82,83,84,113,114,115,116].includes(z))return'post';return'transition';}
const radioInfo={43:'Tc：无稳定同位素，主要为 β 辐射。',61:'Pm：无稳定同位素，可发生 β 衰变或电子俘获。',83:'Bi-209：极长寿命 α 衰变；短时间内变化不可见。',84:'Po-210（示例）：α 衰变，半衰期约 138 天；衰变热可显著。',85:'At：短寿命放射性元素，宏观块体无法长期维持。',86:'Rn-222（示例）：α 衰变，半衰期约 3.82 天；气体可扩散。',87:'Fr-223（示例）：β 衰变，半衰期约 22 分钟；1 m³ 仅是假想占位。',88:'Ra-226（示例）：α 衰变，半衰期约 1600 年；衰变链会产生氡。',89:'Ac：存在放射性及衰变链。',90:'Th-232（示例）：α 衰变，半衰期约 140 亿年。',91:'Pa：主要为 α 辐射。',92:'天然铀：主要为 α 辐射，伴有衰变链；毒性与辐射应分开考虑。',93:'Np：放射性锕系金属，主要为 α 辐射。',94:'Pu：α 辐射及同位素相关的自发裂变；本模型不求解临界性。',95:'Am：α 辐射，并可能伴随 γ 射线。',96:'Cm：α 衰变及同位素相关的自发裂变。',98:'Cf：同位素可能发生自发裂变并放出中子。'};
const traceRadio={19:'天然钾含少量 K-40，存在弱 β / γ 辐射。',37:'天然铷含 Rb-87，存在 β 衰变。',57:'天然镧含长寿命放射性同位素。',71:'天然镥含 Lu-176，存在 β 辐射。',75:'天然铼含 Re-187，存在弱 β 辐射。'};
const specials={C:'采用石墨；碳在常压下主要升华。',P:'默认白磷 P₄；可切换红磷。白磷在空气中易自燃。',S:'采用常温斜方硫 S₈。',As:'常压下主要升华，升华点约 614°C。',Br:'室温为红棕色液体；溴蒸气呈棕色。',Hg:'室温为液态；蒸气有毒但不可见。',Ga:'熔点约 29.76°C，接近室温。',Cs:'熔点约 28.44°C；25°C 时仍为固态。',I:'常温为紫黑固体；可缓慢升华为紫色蒸气。',O:'常温为无色 O₂ 气体；助燃，本身不作燃料。',H:'常温为无色 H₂ 气体；与氧混合仍需要点火。',N:'常温为 N₂；常规条件下动力学惰性较强。'};
const elements=rows.map((line,i)=>{let[s,name,w,d,mp,bp,cp]=line.split(' '),z=i+1,period=periods.findIndex(n=>z<=n)+1,cat=category(z),unknown=d==='?';return{z,s,name,w:+w,d:unknown?null:+d,mp:mp==='?'?null:+mp,bp:bp==='?'?null:+bp,cp:cp==='?'?null:+cp,period,cat,color:colors[cat],phase:unknown?'unknown':([1,2,7,8,9,10,17,18,36,54,86].includes(z)?'gas':[35,80].includes(z)?'liquid':'solid'),radio:z===43||z===61||z>=83,trace:!!traceRadio[z],radiation:radioInfo[z]||traceRadio[z]||(z>=97?'短寿命放射性元素；衰变、衰变热与裂变取决于具体同位素。':''),note:specials[s]||(unknown?'宏观物性缺少可靠实测；此立方体为假想占位，不计算化学反应。':'')};});
const bySymbol=Object.fromEntries(elements.map(e=>[e.s,e]));
const phaseNames={solid:'固态',liquid:'液态',gas:'气态',unknown:'物性未知'};
const rules=[];
function add(a,b,na,nb,formula,title,q,threshold,rate,fx,color,note,product){rules.push({a,b,na,nb,formula,title,q:q*1000,threshold,rate,fx,color,note,product:product||title});}
// Stoichiometry expressed in mol of ATOMS, not mol of molecular allotropes.
add('H','O',4,2,'2H₂ + O₂ → 2H₂O(g)','氢氧燃烧',483.6,520,5,'flame','#a3c7ff','需要点火；火焰淡蓝。水蒸气本身不可见，冷却凝结后才出现白雾。','水蒸气 / 冷凝水');
add('H','F',2,2,'H₂ + F₂ → 2HF','氢氟反应',546,25,7,'flash','#ffe1ac','常温混合可快速反应；HF 气体本身无色，潮湿空气中可形成酸雾。','氟化氢');
add('H','Cl',2,2,'H₂ + Cl₂ → 2HCl','氢氯光化学反应',184.6,380,5,'flash','#fff0ca','需要光照或点火触发；本实验用点火按钮代表启动条件。','氯化氢');
add('H','Br',2,2,'H₂ + Br₂ → 2HBr','氢溴反应',72.5,350,1,'flame','#a8c8ee','需要加热；反应速度采用定性近似。','溴化氢');
const halogens=[['F',25,1.5],['Cl',25,.65],['Br',25,.25],['I',160,.1]];
const reactive=[['Li',1],['Na',1],['K',1],['Rb',1],['Cs',1],['Mg',2],['Ca',2],['Sr',2],['Ba',2],['Al',3],['Fe',3],['Cu',2],['Zn',2]];
for(const[m,v]of reactive)for(const[x,t,mult]of halogens){
 const alk=['Li','Na','K','Rb','Cs'].includes(m),base=x==='F'?25:alk?t:(['Mg','Al','Fe','Cu'].includes(m)?(x==='Cl'?300:400):150);
 const na=v===3?2:1,nb=v===3?6:v,prod=m+x+(v===1?'':v===2?'₂':'₃');
 add(m,x,na,nb,`${na===1?'':na}${m} + ${nb/2===1?'':nb/2}${x}₂ → ${na===1?'':na}${prod}`,`${bySymbol[m].name}的卤化`,(x==='F'?480:350)*na,base,(alk?1:.12)*mult,'spark',m==='Na'?'#ffc36c':m==='K'?'#cab6ff':'#f4d4ac','接触面积、氧化膜与温度决定真实速率；这里仅模拟表面反应。',prod);
}
// Explicit oxygen products avoid asserting the same oxide for every metal.
const ox=[['Li',4,2,'4Li + O₂ → 2Li₂O',1196,25,.02,'#e9a6a1'],['Na',2,2,'2Na + O₂ → Na₂O₂',511,25,.025,'#ffd37b'],['K',1,2,'K + O₂ → KO₂',283,25,.025,'#ccaeff'],['Rb',1,2,'Rb + O₂ → RbO₂',280,25,.04,'#d8b5ff'],['Cs',1,2,'Cs + O₂ → CsO₂',280,25,.05,'#ceacff'],['Mg',2,2,'2Mg + O₂ → 2MgO',1203,610,.35,'#ffffff'],['Al',4,6,'4Al + 3O₂ → 2Al₂O₃',3351,850,.08,'#fff7dd'],['Fe',3,4,'3Fe + 2O₂ → Fe₃O₄',1118,900,.1,'#ffb763'],['Cu',2,2,'2Cu + O₂ → 2CuO',310,350,.04,'#c68357'],['Zn',2,2,'2Zn + O₂ → 2ZnO',701,500,.16,'#bcd7ff'],['Ca',2,2,'2Ca + O₂ → 2CaO',1270,480,.12,'#ffc08b'],['Ti',1,2,'Ti + O₂ → TiO₂',944,1000,.08,'#fff4cf'],['Si',1,2,'Si + O₂ → SiO₂',911,950,.04,'#ffc78f'],['C',1,2,'C + O₂ → CO₂',393.5,650,.14,'#ffad6b'],['S',1,2,'S + O₂ → SO₂',296.8,235,.3,'#8faaff'],['P',4,10,'P₄ + 5O₂ → P₄O₁₀',2984,25,.1,'#ffe4ac']];
for(const[m,na,nb,f,q,t,r,c]of ox)add(m,'O',na,nb,f,`${bySymbol[m].name}的氧化`,q,t,r,t<=25?'surface':'flame',c,t<=25?(m==='P'?'白磷在空气中可自燃；红磷需加热。':'块状碱金属先发生表面氧化，不把室温氧化直接等同于剧烈燃烧。'):'块状物表面需达到启动温度；模型不等同于金属粉尘燃烧。',f.split('→ ')[1]);
add('Fe','S',1,1,'Fe + S → FeS','铁硫化合',100,450,.13,'glow','#ffaf68','块状铁硫接触在室温下不会迅速反应；加热后界面生成硫化亚铁。','FeS');
add('Cu','S',2,1,'2Cu + S → Cu₂S','铜硫化合',79,220,.08,'glow','#e3ad75','需要加热；产物与条件相关，采用 Cu₂S 路径。','Cu₂S');
add('Zn','S',1,1,'Zn + S → ZnS','锌硫化合',206,430,.12,'spark','#fff3cc','加热启动界面反应；不套用粉末混合物的爆燃速率。','ZnS');
add('Hg','S',1,1,'Hg + S → HgS','汞硫化合',58,25,.012,'surface','#a64f44','界面缓慢生成硫化汞；无研磨时反应受接触面限制。','HgS');
for(const m of['Au','Ag','Sn','Zn'])add('Hg',m,1,1,`Hg + ${m} → 汞齐（合金）`,'汞齐化',0,25,.025,'amalgam','#b6d3da','合金形成采用定性界面模型；不指定固定化学计量，也不显示燃烧。','汞齐 / 合金');
add('Li','N',6,2,'6Li + N₂ → 2Li₃N','锂的氮化',330,25,.006,'surface','#a87866','锂可在常温下缓慢与氮反应，形成氮化锂。','Li₃N');
add('Mg','N',3,2,'3Mg + N₂ → Mg₃N₂','镁的氮化',461,650,.07,'flame','#fff1da','镁燃烧时可与氮气反应。','Mg₃N₂');
const envNames={air:'干燥空气',humid:'湿润空气',argon:'氩气',vacuum:'真空'};
let nextId=1;
function makeBlock(s,x=0,y=.5,z=0,allotrope){const e=bySymbol[s];if(!e)throw Error('未知元素');const density=s==='P'&&allotrope==='red'?2260:e.d;return{id:nextId++,s,x,y,z,T:25,n:density?density*1000/e.w:0,n0:density?density*1000/e.w:0,product:0,products:{},heat:0,allotrope:allotrope||((s==='P')?'white':'default'),events:[],activated:false};}
function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);}
function contact(a,b){let ds=[Math.abs(a.x-b.x),Math.abs(a.y-b.y),Math.abs(a.z-b.z)];for(let k=0;k<3;k++)if(Math.abs(ds[k]-1)<.035&&ds[(k+1)%3]<.99&&ds[(k+2)%3]<.99)return(1-ds[(k+1)%3])*(1-ds[(k+2)%3]);return 0;}
function gasShape(b,time,confined=false){const e=bySymbol[b.s];if(e.phase!=='gas'||confined)return{x:b.x,y:b.y,z:b.z,spread:.5};let t=Math.max(0,time);return{x:b.x,y:Math.max(.1,b.y+clamp((1.18-e.d)*.05,-.15,.1)*t),z:b.z,spread:.5+Math.sqrt(t)*.16};}
function exposure(a,b,time,confined){if(confined)return contact(a,b);const ea=bySymbol[a.s],eb=bySymbol[b.s];if(ea.phase!=='gas'&&eb.phase!=='gas')return contact(a,b);const p=gasShape(a,time),q=gasShape(b,time),spread=p.spread+q.spread,d=distance(p,q);return clamp(Math.exp(-(Math.max(0,d-.75)**2)/(2*spread**2))/(1+time*.09),0,1);}
function findRule(a,b){return rules.find(r=>(r.a===a.s&&r.b===b.s)||(r.a===b.s&&r.b===a.s));}
function threshold(r,a,b){if(r.a==='P'&&[a,b].find(e=>e.s==='P')?.allotrope==='red')return 300;return r.threshold;}
function surfaceCapacity(b){const e=bySymbol[b.s],mass=(e.d||10)*(e.phase==='gas'?Math.max(.02,b.n/Math.max(b.n0,1)):1);return Math.max(40,(e.cp||200)*Math.min(mass,e.phase==='gas'?mass:1.5));}
class World{
 constructor(blocks=[],env='air',confined=false){this.blocks=blocks;this.env=env;this.confined=confined;this.time=0;this.energy=0;this.external=0;this.events=[];this.active=[];this.logKeys=new Set();this.flash=0;this.maxT=25;}
 log(key,type,title,text,formula='',ids=[]){if(this.logKeys.has(key))return;this.logKeys.add(key);this.events.unshift({time:this.time,type,title,text,formula,ids});this.events=this.events.slice(0,100);}
 ignite(b){if(!b)return;b.T=Math.min(3500,b.T+1050);b.activated=true;const q=surfaceCapacity(b)*1050;this.external+=q;this.log('ignite-'+b.id+'-'+Math.floor(this.time),'input','外部点火 / 局部加热',`${bySymbol[b.s].name}表面加入热量，形成局部热斑；不是整块升温。`,'',[b.id]);}
 initialize(){this.log('begin','info','实验开始',`初始 25°C · ${envNames[this.env]}${this.env==='vacuum'?'':' · 1 atm'}。固体坐标固定；速率与界面温度为教学估计。`);for(const b of this.blocks){const e=bySymbol[b.s];if(e.radio)this.log('radio'+b.id,'radiation',e.name+'：电离辐射',e.radiation+' 不计算剂量、核临界性或核爆炸。','',[b.id]);if(e.trace)this.log('trace'+b.id,'radiation',e.name+'：天然放射性',e.radiation,'',[b.id]);if(e.phase==='unknown')this.log('unknown'+b.id,'unknown',e.name+'：物性不足','此 1 m³ 方块是假想占位。不给出相态、温度演化或虚构反应。','',[b.id]);if(e.phase==='gas')this.log('gas'+b.id,'info',e.name+'：气体',this.confined?'采用理想约束区域，气体保持在初始立方体；界面可交换物质。':'初始 1 m³；开始后用高斯云团近似扩散与浮沉。无色气体的淡色描边为可视化辅助。','',[b.id]);if(b.s==='Hg'||b.s==='Br')this.log('vapor'+b.id,'hazard',e.name+'：挥发与毒性',b.s==='Hg'?'汞蒸气不可见；液面挥发和有毒性只作批注，不画成浓烟。':'棕色蒸气为溴挥发的示意；浓度与吸入剂量未计算。','',[b.id]);}}
 react(r,a,b,area,dt,ambient=false){
  if(area<.0001||a.n<=0||(!ambient&&b.n<=0))return;
  const gate=threshold(r,a,b),temp=Math.max(a.T,b.T);if(temp+1<gate)return;
  let A=r.a===a.s?a:b,B=r.a===a.s?b:a;
  if(ambient){A=a;B=b;}
  const accel=gate>25?clamp(1+(temp-gate)/350,1,5):clamp(1+(temp-25)/250,1,6);
  const extent=Math.max(0,Math.min(r.rate*area*accel*dt,A.n/r.na,ambient?Infinity:B.n/r.nb));if(!extent)return;
  A.n=Math.max(0,A.n-extent*r.na);if(!ambient)B.n=Math.max(0,B.n-extent*r.nb);
  const q=extent*r.q;this.energy+=q;const share=ambient?1:.5;A.T+=q*share/surfaceCapacity(A);if(!ambient)B.T+=q*.5/surfaceCapacity(B);
  A.heat+=q*share;A.product+=extent;A.products[r.product]=(A.products[r.product]||0)+extent;if(!ambient){B.product+=extent;B.products[r.product]=(B.products[r.product]||0)+extent;}
  const key=(ambient?'air-':'pair-')+r.title+'-'+Math.min(a.id,b.id)+'-'+Math.max(a.id,b.id);
  this.log(key,r.fx==='amalgam'?'info':'reaction',r.title+(ambient?' · 环境':' · 接触'),r.note+(ambient?' 环境气体按开放储库处理。':''),r.formula,ambient?[a.id]:[a.id,b.id]);
  const strength=clamp((q/dt)/70000,.03,2);this.active.push({a:A,b:ambient?null:B,r,strength,q,ambient});if(r.fx==='flash'&&q>500)this.flash=Math.min(1,this.flash+q/70000);
 }
 step(dt){
  this.time+=dt;this.active=[];this.flash*=Math.exp(-dt*5);
  const bs=this.blocks;
  for(let i=0;i<bs.length;i++)for(let j=i+1;j<bs.length;j++){
   const a=bs[i],b=bs[j],ea=bySymbol[a.s],eb=bySymbol[b.s];if(ea.phase==='unknown'||eb.phase==='unknown')continue;
   const area=exposure(a,b,this.time,this.confined);if(area<.0001)continue;
   const r=findRule(a,b);
   if(r)this.react(r,a,b,area,dt);
   else if(contact(a,b))this.log('missing'+a.id+'-'+b.id,'unknown','接触界面：'+a.s+' / '+b.s,a.s===b.s?'同种单质接触：不生成新的化合物。':(ea.cat==='noble'||eb.cat==='noble')?'本模型的常规条件下无可用反应路径。':'当前反应库未覆盖该组合；不能据此断言现实中不反应。','',[a.id,b.id]);
   if(r&&Math.max(a.T,b.T)+1<threshold(r,a,b))this.log('wait'+a.id+'-'+b.id,'waiting','等待启动条件：'+a.s+' / '+b.s,r.note+' 可选中方块，使用“点火 / 加热”。',r.formula,[a.id,b.id]);
   if(contact(a,b)){const flow=(a.T-b.T)*Math.min(surfaceCapacity(a),surfaceCapacity(b))*.035*dt;a.T-=flow/surfaceCapacity(a);b.T+=flow/surfaceCapacity(b);}
  }
  for(const b of bs){const e=bySymbol[b.s];if(e.phase==='unknown')continue;
   if(this.env==='air'||this.env==='humid'){
    for(const s of['O','N']){const r=rules.find(r=>r.a===b.s&&r.b===s);if(r){const env={s,n:Infinity,T:25,id:0};let exposed=6-bs.filter(a=>a!==b&&contact(a,b)>.99).length;this.react(r,b,env,Math.max(0,exposed)*(s==='O'?.21:.78)*.35,dt,true);}}
    if(this.env==='humid'&&['Li','Na','K','Rb','Cs','Ca','Sr','Ba'].includes(b.s)&&b.n>0){const alk=['Li','Na','K','Rb','Cs'].includes(b.s),rate=.012*dt,used=Math.min(rate,b.n);b.n-=used;const q=used*150000;this.energy+=q;b.T+=q/surfaceCapacity(b);b.products['氢氧化物 / H₂']=(b.products['氢氧化物 / H₂']||0)+used;this.log('moist'+b.id,'reaction','潮气与'+e.name+'反应','水来自环境水蒸气，不是元素方块；湿气供给有限，不套用投入液态水的爆燃效果。',alk?`2${b.s} + 2H₂O → 2${b.s}OH + H₂`:`${b.s} + 2H₂O → ${b.s}(OH)₂ + H₂`,[b.id]);}
   }
   // Grey-body heat loss of the effective hot interface / product cloud.
   // Effective emitting area and emissivity are teaching parameters, not measured material data.
   const cap=surfaceCapacity(b),kelvin=Math.max(298.15,b.T+273.15),emitting=e.phase==='gas'?.2:.525;
   const radiated=emitting*5.670374419e-8*(kelvin**4-298.15**4);
   b.T-=Math.min(Math.max(0,b.T-25)*cap*.6,radiated*dt)/cap;
   b.T=clamp(b.T-(b.T-25)*(e.phase==='gas'&&!this.confined?.075:.012)*dt,25,4500);this.maxT=Math.max(this.maxT,b.T);
   if(b.T>=4499)this.log('temperature-limit'+b.id,'unknown','超出可靠温度估计范围','达到数值模型上限；此时不应把温度读数当作真实预测。散热、解离、相变和流体交换需要更完整的求解。','',[b.id]);
   if(b.T>e.mp&&e.mp!==null&&e.phase==='solid'&&!['C','As'].includes(b.s)&&!(b.s==='P'&&b.allotrope==='red'))this.log('melt'+b.id,'thermal',e.name+'：表面熔化','表面温度达到参考熔点；只显示局部熔化，整块仍作为固定控制体。','',[b.id]);
   if(e.phase!=='gas'&&e.bp!==null&&b.T>e.bp&&!(b.s==='P'&&b.allotrope==='red'))this.log('boil'+b.id,'thermal',e.name+'：挥发增强','表面温度超过参考沸点 / 升华温度；未求解潜热与蒸气压力，温度仅为界面估计。','',[b.id]);
  }
 }
 summary(){return{temperature:Math.max(25,...this.blocks.filter(b=>bySymbol[b.s].phase!=='unknown').map(b=>b.T)),radio:this.blocks.filter(b=>bySymbol[b.s].radio).length,energy:this.energy,reactions:this.events.filter(e=>e.type==='reaction').length};}
}
root.Chemistry={elements,bySymbol,colors,categoryNames,phaseNames,envNames,rules,makeBlock,contact,exposure,gasShape,findRule,threshold,World};
})(typeof window==='undefined'?globalThis:window);
