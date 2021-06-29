let Mundo = {}
const ernan = 255
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function setup () {
    createCanvas(400,400);
    background (ernan);
}
function drawGame () {
    const boton = createButton('ola');
    fill(1);
    rect (50,50,100,100);
    boton.position(0,0);
    boton.mousePressed(derp);
}
function derp () {
    const a = random(255)
    background(a);
}
function onMouseEvent (Mundo, event) {
    return update(Mundo,{});
}
function onTic(Mundo) {
   return update(Mundo,{});
}