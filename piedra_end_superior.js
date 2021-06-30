let Mundo = {}
let img1 = null;
let img2 = null;
let img3 = null;
function setup () {
    createCanvas(360,20)
    img1 = loadImage("images/piedra_end.png")
}
function drawGame (Mundo) {
    image(img1,0,0,20,20)
    image(img1,20,0,20,20)
    image(img1,40,0,20,20)
    image(img1,60,0,20,20)
    image(img1,80,0,20,20)
    image(img1,100,0,20,20)
    image(img1,120,0,20,20)
    image(img1,140,0,20,20)
    image(img1,160,0,20,20)
    image(img1,180,0,20,20)
    image(img1,200,0,20,20)
    image(img1,220,0,20,20)
    image(img1,240,0,20,20)
    image(img1,260,0,20,20)
    image(img1,280,0,20,20)
    image(img1,300,0,20,20)
    image(img1,320,0,20,20)
    image(img1,340,0,20,20)
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