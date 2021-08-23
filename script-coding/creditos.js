let Mundo = {}
let fondo = null;
let fuente = null;

function setup () {
    createCanvas(400,400);
    fuente = loadFont("minecraft.otf");
    fondo = loadImage("images/fondo_dificultad.png");
    background(fondo);
    Mundo = {}
}
function drawGame (Mundo) {
    //Dibuja el botón.
    stroke(255);
    fill(109,109,109);
    rect(177.5,360,55,20);
    stroke(1);
    fill(255);
    //Escribe los textos en pantalla.
    textFont(fuente,24);
    text("Equipo de desarrollo",75,30);
    textFont(fuente,18);
    text("Beta-testers",142,60);
    text("Ideas",177,185);
    text("Programador",142,310);
    textFont(fuente,14);
    text("- Scott.",175,85);
    text("- Ryder.",172.5,110);
    text("- Branth.",169,135);
    text("- Dayes (ocasionalmente).",109,160);
    text("- Luisa.",175,210);
    text("- Scott.",175,235);
    text("- Branth.",169,260);
    text("- Cristian.",167,285);
    text("- Cristian.",167,335);
    text("Volver",183,375);
}
function onMouseEvent (Mundo,event) {
    return update(Mundo,{});
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function onTic (Mundo) {
    return update(Mundo,{});
}
function onKeyEvent (Mundo,keyCode) {
    //Se ejecuta cuando se presiona la tecla "enter" para volver al menú principal.
    if(keyCode==ENTER) {
        window.open("menu_principal.html","_self");
        return update(Mundo,{});
    }
    else {
        return update(Mundo,{});
    }
}