let Mundo = {}
let img1 = null;
let img2 = null;
let img3 = null;
let img4 = null;
let img5 = null;
function setup () {
    createCanvas(80,80)
    img1 = loadImage("images/piedra.png")
    img2 = loadImage("images/piedra_musgosa.png")
}
function drawGame (Mundo) {
    image(img1,0,0,20,20)
    image(img2,20,0,20,20)
    image(img1,40,0,20,20)
    image(img1,60,0,20,20)
    image(img1,0,20,20,20)
    image(img1,20,20,20,20)
    image(img2,40,20,20,20)
    image(img1,60,20,20,20)
    image(img1,80,20,20,20)
    image(img1,0,40,20,20)
    image(img2,20,40,20,20)
    image(img1,40,40,20,20)
    image(img1,60,40,20,20)
    image(img2,0,60,20,20)
    image(img1,20,60,20,20)
    image(img2,40,60,20,20)
    image(img1,60,60,20,20)
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