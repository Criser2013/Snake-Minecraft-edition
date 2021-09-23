let Mundo = {}
let fondo = null;
let fuente = null;
/*
Contrato: preload variable -> FoI
FoI = Font or image.
Image = Imagen dentro de los archivos del juego.
Font = Fuente tipográfica no incluida en CSS ni P5.JS.
variable = variable local (let)
Proposito: Carga la fuente estilo Minecraft que utiliza este menú del juego y la imagen de fondo.
Prototipo: preload () {}
Ejemplos: preload (fuente,loadImage("minecraft.otf")) -> fuente = loadFont("minecraft.otf") // La fuente se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
          preload (fondo,loadImage("images/m2.png")) -> fondo = loadImage("images/m2.png") // La imagen se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
*/
function preload () {
    fuente = loadFont("minecraft.otf");
    fondo = loadImage("images/fondo_dificultad.png");
}
function setup () {
    createCanvas(400,400);
    background(fondo);
    Mundo = {ambiente:new buzz.sound("audio/sweden",{formats:["mp3"],volume: 60,preload:true,loop:true})}
}
function drawGame (Mundo) {
    Mundo.ambiente.play();
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
    text("Beta-Testers",142,60);
    text("Ideas",177,135);
    text("Programadores",130,235);
    textFont(fuente,14);
    text("Sebastian Ordoñez.",135,85);
    text("Arturo Zapata (Ryder :D) — amigo de Cris.",55,110);
    text("Jhon Edison Suescun.",125,160);
    text("Cristian Obando.",145,185);
    text("Jean Steven Martinez.",124,210);
    text("Sebastian Ordoñez.",135,260);
    text("Jhon Edison Suescun.",125,285);
    text("Cristian Obando.",145,335);
    text("Jean Steven Martinez.",124,310);
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
        window.open("index.html","_self");
        return update(Mundo,{});
    }
    else {
        return update(Mundo,{});
    }
}
//Esta línea carga el fondo de la página a la par del script del juego para que no se vea retraso al cargar la página.
document.body.style.backgroundImage = "url('images/fondo_menus(todos).png')";