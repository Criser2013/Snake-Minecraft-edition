let Mundo = {}
let img1 = null;
let img2 = null;
let img3 = null;
function setup () {
    createCanvas(400,400)
    img1 = loadImage("images/ladrillo_nether_lateral.png")
    img2 = loadImage("images/superior_ladrillo_nether.png")
    img3 = loadImage("images/netherrack_horizontal.png")
}
function drawGame (Mundo) {
    image(img1,0,0,20,400)
    image(img1,380,0,20,400)
    image(img2,20,0,360,20)
    image(img2,20,380,360,20)
    image(img3,20,20,360,20)
    image(img3,20,40,360,20)
    image(img3,20,60,360,20)
    image(img3,20,80,360,20)
    image(img3,20,100,360,20)
    image(img3,20,120,360,20)
    image(img3,20,140,360,20)
    image(img3,20,160,360,20)
    image(img3,20,180,360,20)
    image(img3,20,200,360,20)
    image(img3,20,220,360,20)
    image(img3,20,240,360,20)
    image(img3,20,260,360,20)
    image(img3,20,280,360,20)
    image(img3,20,300,360,20)
    image(img3,20,320,360,20)
    image(img3,20,340,360,20)
    image(img3,20,360,360,20)
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