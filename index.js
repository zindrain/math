
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function choose(choices) {
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

class OP {
  constructor(on,low,high,inv,sta,stb){
    this.on = on;
    this.low = low;
    this.high = high;
    this.inv = inv;
    this.st = [sta,stb]
  }
}
class addWN extends OP{
  constructor(on,low,high,inv,sta,stb){
    super(on,low,high,inv,sta,stb)
  }
  op(x,y) {
    return(x+y)
  }
  getNums() {
    return randInt(this.low,this.high)
  }
}
class mulWN extends OP{
  constructor(on,low,high,inv,sta,stb){
    super(on,low,high,inv,sta,stb)
  }
  op(x,y) {
    return(x*y)
  }
  getNums() {
    return randInt(this.low,this.high)
  }
}
let a = new addWN(true,1,4,0," + "," - ")
let m = new mulWN(false,2,8,1," X ", " ÷ ")
let ops = [a,m]
function gen(){

  let acts = []
  for(let i = 0; i<ops.length;i++){
    if(ops[i].on==true){
      acts.push(ops[i])
    }
  }
  let chosen = choose(acts)
  let inv;
  switch (chosen.inv) {
    case 0:
      inv = 0;
      break;
    case 1:
      inv = 1
    case 2:
      inv = randInt(0,1)
    default:
      0;
    }
    let x = chosen.getNums()
    let y= chosen.getNums()

    let big = chosen.op(x,y).toString()
    x = x.toString()
    y = y.toString()
    let qst, ans;
    if(inv){
      qst = big + chosen.st[inv] + x
      ans = y
    }
    else{
      qst = x + chosen.st[inv] + y
      ans = big
    }
    let max = chosen.op(chosen.high,chosen.high)
    let min = chosen.low
    return {qst,ans,max,min}
}
let qstTxt = document.querySelector('.qst')
let ansTxt = document.querySelector('.ans')


function draw(){

  let qa=gen()

  ansTxt.classList.remove('correct','incorrect')
  ansTxt.innerHTML = "?"
  qstTxt.innerHTML = qa.qst

  let btns = document.getElementById('btns')
  removeAllChildNodes(btns)
  for(let i = 1;i<=btsz;i++){
    let button = document.createElement('button')
    button.innerHTML=i
    button.setAttribute('class','b')
    button.addEventListener('click',function(){
      act(this.innerHTML==qa.ans)
      })
    btns.appendChild(button)
  }
}

function act(bool){
  if(bool){
    ansTxt.innerHTML="Correct!"
    ansTxt.classList.remove('incorrect')
    ansTxt.classList.add('correct')
  }else{
    ansTxt.innerHTML="Wrong"
    ansTxt.classList.remove('correct')
    ansTxt.classList.add('incorrect')
  }

  setTimeout(draw,1000)
}
let btsz = 36;
let ana = document.getElementById('ana')
let ara = document.getElementById('ara')
ana.addEventListener('click',function(){
  a.on=true;
  a.low=1;
  a.high=12;
  a.inv=1;

  m.on=true;
  m.low=2;
  m.high=6;
  m.inv=0;
  btsz=36;
})
ara.addEventListener('click',function(){
  a.on=true;
  a.low=1;
  a.high=6;
  a.inv=0;

  m.on=false;

  btsz = 12
})
draw()
