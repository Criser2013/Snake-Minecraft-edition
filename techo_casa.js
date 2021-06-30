let Mundo = {}
let img1 = null;
let img2 = null;
let img3 = null;
let img4 = null;
let img5 = null;
function setup () {
    createCanvas(60,60)
    img1 = loadImage("images/madera.png")
}
function drawGame (Mundo) {
    image(img1,0,0,20,20)
    image(img1,20,0,20,20)
    image(img1,40,0,20,20)
    image(img1,0,20,20,20)
    image(img1,20,20,20,20)
    image(img1,40,20,20,20)
    image(img1,0,40,20,20)
    image(img1,20,40,20,20)
    image(img1,40,40,20,20)
    image(img1,0,40,20,20)
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function onTic (Mundo) {
    return update(Mundo,{})
}
function onMouseEvent (Mundo,event) {
    return update(Mundo,{})
}
function onKeyEvent (Mundo,keyCode) {
    return update(Mundo,{})
}