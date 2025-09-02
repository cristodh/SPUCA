const COLORS = ["#5B8CFF","#00D3A7","#FF7A7A","#F4C95D","#BD9CF9","#7BD3FF"];
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
class CanvasChart {
  constructor(canvas, options){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.type = options.type ?? "bar";
    this.title = options.title ?? "";
    this.labels = options.labels ?? [];
    this.datasets = options.datasets ?? [];
    this.padding = {top:50, right:28, bottom:50, left:48};
    this.animStart = 0;
    this.animDuration = 650;
    this.prevData = null;
    this.currentData = this.datasets.map(d=>d.data.slice());
    this.resizeObserver = new ResizeObserver(()=>this.resize());
    this.resizeObserver.observe(this.canvas.parentElement);
    this.resize();
  }
  setType(type){
    if(type !== 'bar' && type !== 'line') return;
    this.type = type;
    this.startAnimation();
  }
  setData(labels, datasets){
    this.prevData = this.currentData?.map(arr=>arr.slice());
    this.labels = labels;
    this.datasets = datasets.map((d,i)=>({...d,color:d.color||COLORS[i%COLORS.length]}));
    this.currentData = this.datasets.map(d=>d.data.slice());
    this.startAnimation();
  }
  startAnimation(){
    this.animStart = performance.now();
    requestAnimationFrame(this.animate.bind(this));
  }
  animate(now){
    const t = Math.min(1,(now-this.animStart)/this.animDuration);
    this.draw(easeOutCubic(t));
    if(t<1) requestAnimationFrame(this.animate.bind(this));
  }
  resize(){
    const dpr = Math.max(1, window.devicePixelRatio||1);
    const {width,height} = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.round(width*dpr);
    this.canvas.height = Math.round(height*dpr);
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
    this.startAnimation();
  }
  getPlotRect(){
    const {top,right,bottom,left} = this.padding;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    return {x:left,y:top,w:w-left-right,h:h-top-bottom};
  }
  calcYScale(){
    const max = Math.max(1,...this.datasets.flatMap(d=>d.data));
    const pow = Math.pow(10,Math.floor(Math.log10(max)));
    const nice = Math.ceil(max/pow)*pow;
    return {max:nice, step:nice/5};
  }
  drawGridAndAxes(rect,yMax){
    const {ctx,labels} = this;
    ctx.lineWidth=1;
    ctx.strokeStyle="rgba(255,255,255,.25)";
    ctx.fillStyle="var(--muted)";
    ctx.font="12px system-ui";
    ctx.beginPath();
    ctx.moveTo(rect.x, rect.y);
    ctx.lineTo(rect.x, rect.y+rect.h);
    ctx.lineTo(rect.x+rect.w, rect.y+rect.h);
    ctx.stroke();
    const lines=5;
    for(let i=0;i<=lines;i++){
      const y=rect.y+rect.h-(i/lines)*rect.h;
      ctx.beginPath();
      ctx.moveTo(rect.x,y);
      ctx.lineTo(rect.x+rect.w,y);
      ctx.stroke();
      const val=(yMax/lines)*i;
      ctx.fillText(val.toFixed(0), rect.x-36, y+4);
    }
    const stepX=rect.w/Math.max(1,labels.length);
    ctx.textAlign="center";
    labels.forEach((lab,i)=>{
      const x=rect.x+stepX*(i+0.5);
      ctx.fillText(lab,x,rect.y+rect.h+18);
    });
  }
  drawBars(rect,yMax,progress){
    const {ctx,datasets,labels}=this;
    const n=labels.length;
    const groupW=rect.w/n;
    const gap=Math.min(14,groupW*0.18);
    const innerW=groupW-gap;
    const barW=innerW/datasets.length;
    datasets.forEach((ds,di)=>{
      ctx.fillStyle=ds.color;
      for(let i=0;i<n;i++){
        const val=ds.data[i]??0;
        const prev=this.prevData?.[di]?.[i]??0;
        const v=prev+(val-prev)*progress;
        const hRatio=Math.min(1,v/yMax);
        const barH=hRatio*rect.h;
        const x=rect.x+i*groupW+gap/2+di*barW;
        const y=rect.y+rect.h-barH;
        const r=Math.min(6,barW*0.3,barH*0.3);
        this.roundRect(ctx,x,y,barW-2,barH,r);
        ctx.fill();
      }
    });
  }
  drawLines(rect,yMax,progress){
    const {ctx,datasets,labels}=this;
    const n=labels.length;
    const stepX=rect.w/Math.max(1,n-1);
    datasets.forEach((ds,di)=>{
      ctx.strokeStyle=ds.color;
      ctx.lineWidth=2;
      ctx.beginPath();
      for(let i=0;i<n;i++){
        const val=ds.data[i]??0;
        const prev=this.prevData?.[di]?.[i]??0;
        const v=prev+(val-prev)*progress;
        const x=rect.x+stepX*i;
        const y=rect.y+rect.h-(v/yMax)*rect.h;
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.stroke();
      for(let i=0;i<n;i++){
        const val=ds.data[i]??0;
        const prev=this.prevData?.[di]?.[i]??0;
        const v=prev+(val-prev)*progress;
        const x=rect.x+stepX*i;
        const y=rect.y+rect.h-(v/yMax)*rect.h;
        ctx.fillStyle=ds.color;
        ctx.beginPath();
        ctx.arc(x,y,3.5,0,Math.PI*2);
        ctx.fill();
      }
    });
  }
  roundRect(ctx,x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.closePath();
  }
  drawTitle(){
    if(!this.title) return;
    const {ctx}=this;
    ctx.fillStyle="#FFFFFF";
    ctx.font="600 16px system-ui";
    ctx.textAlign="left";
    ctx.fillText(this.title,this.padding.left,this.padding.top-18);
  }
  draw(progress=1){
    const {ctx}=this;
    const rect=this.getPlotRect();
    const {max:yMax}=this.calcYScale();
    ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
    this.drawGridAndAxes(rect,yMax);
    if(this.type==='bar') this.drawBars(rect,yMax,progress);
    if(this.type==='line') this.drawLines(rect,yMax,progress);
    this.drawTitle();
  }
}
// ---------------- Demo inicial ----------------
const canvas=document.getElementById("chart");
const legendEl=document.getElementById("legend");
const barBtn=document.getElementById("barBtn");
const lineBtn=document.getElementById("lineBtn");
const randomBtn=document.getElementById("randomBtn");
let labels=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago"];
let datasets=[
  {label:"Ingresos", data:[120,180,150,220,260,240,300,280], color:COLORS[0]},
  {label:"Costos",   data:[80,110,100,140,160,150,190,170], color:COLORS[2]},
];
const chart=new CanvasChart(canvas,{
  type:"bar",
  title:"Rendimiento mensual (₡ miles)",
  labels,
  datasets
});
function renderLegend(){
  legendEl.innerHTML="";
  chart.datasets.forEach(ds=>{
    const badge=document.createElement("span");
    badge.className="badge";
    const dot=document.createElement("span");
    dot.className="dot";
    dot.style.background=ds.color;
    badge.appendChild(dot);
    badge.appendChild(document.createTextNode(ds.label));
    legendEl.appendChild(badge);
  });
}
renderLegend();
barBtn.addEventListener("click",()=>{
  barBtn.classList.add("primary");
  lineBtn.classList.remove("primary");
  chart.setType("bar");
});
lineBtn.addEventListener("click",()=>{
  lineBtn.classList.add("primary");
  barBtn.classList.remove("primary");
  chart.setType("line");
});
randomBtn.addEventListener("click",()=>{
  const next=datasets.map(ds=>({...ds,data:ds.data.map(()=>Math.round(80+Math.random()*240))}));
  chart.setData(labels,next);
  renderLegend();
});









