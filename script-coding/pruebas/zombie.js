let img = null;
let Mundo = {}
function setup () {
    createCanvas(20,20);
    img = loadImage("images/cabeza_steve.png")
}
function drawGame () {
    image(img,0,0,20,20);
}
function onMouseEvent (Mundo) {
    return Mundo
}