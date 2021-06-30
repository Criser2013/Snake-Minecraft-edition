let Mundo = {}
let img1 = null;
let img2 = null;
let img3 = null;
function setup () {
    createCanvas(20,400)
    img1 = loadImage("images/pasto.png")
    img2 = loadImage("images/camino_pasto.png")
}
function drawGame (Mundo) {
    image(img1,0,0,20,20)
    image(img1,0,20,20,20)
    image(img1,0,40,20,20)
    image(img1,0,60,20,20)
    image(img1,0,80,20,20)
    image(img1,0,100,20,20)
    image(img1,0,120,20,20)
    image(img1,0,140,20,20)
    image(img1,0,160,20,20)
    image(img2,0,180,20,20)
    image(img2,0,200,20,20)
    image(img1,0,220,20,20)
    image(img1,0,240,20,20)
    image(img1,0,260,20,20)
    image(img1,0,280,20,20)
    image(img1,0,300,20,20)
    image(img1,0,320,20,20)
    image(img1,0,340,20,20)
    image(img1,0,360,20,20)
    image(img1,0,380,20,20)
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