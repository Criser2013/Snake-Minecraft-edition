let Mundo = {}
const x1 = function posx () {
                return Math.ceil(Math.random() * (370 - 30)) + 30;
           }
const y1 = function posy () {
                return Math.ceil(Math.random() * (370 - 30)) + 30;
           }
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function setup () {
    createCanvas (400,400);
    background (1);
    frameRate (5);
    Mundo = {x:200,y:200,contador:0}
}
function drawGame (Mundo) {
    fill (200,20,10);
    ellipse (Mundo.x,Mundo.y,20,20);
    stroke(255);
    line(20,20,20,380);
    line(380,20,380,380);
    line(20,380,380,380);
    line(20,20,380,20);
}
function onTic(Mundo){
    if (Mundo.contador==10) {
      return update(Mundo,{x:x1(),y:y1(),contador:0})
    }
    else {
      return update(Mundo,{contador:Mundo.contador+1})
    }
}
function onMouseEvent (Mundo, event) {
    return update(Mundo,{});
}