let Mundo = {}
let fondo = null;
let fuente = null;
let titulo = null;
let titulo2 = null;
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
    fondo = loadImage("images/fondo_principal.png");
    fuente = loadFont("minecraft.otf");
    titulo = loadImage("images/titulo_snake.png");
    titulo2 = loadFont("minecrafter.ttf");
}
function setup () {
    createCanvas(400,400);
    background(fondo);
    Mundo = {boton:1,sonido:new buzz.sound("audio/seleccion",{formats:["mp3"],volume: 50,preload:true})};
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) {
    //Dibuja el menú.
    image(titulo,117,80,165,51);
    //Dibuja los botones.
    fill(109,109,109);
    stroke(1);
    rect(140,200,119,20);
    rect(140,240,119,20);
    rect(140,280,119,20);
    fill(255);
    //Dibuja los textos de los botones en pantalla.
    textFont(fuente,14);
    text("¡Jugar!",177,215);
    text("¿Cómo jugar?",151.5,255);
    text("Agradecimientos",145,295);
    fill(216,206,205);
    textFont(titulo2,14);
    text("Minecraft edition",125,150);
    //Estas condiciones dibujan un rectangulo transparente con borde color blanco sobre el botón seleccionado para indicar en cuál se está.
    if (Mundo.boton==1) {
        stroke(255);
        fill(255,255,255,0);
        rect(140,200,119,20);
    }
    else if (Mundo.boton==2) {
        stroke(255);
        fill(255,255,255,0);
        rect(140,240,119,20);
    }
    else if (Mundo.boton==3) {
        stroke(255);        
        fill(255,255,255,0);
        rect(140,280,119,20);
    }
}
function onTic (Mundo) {
    return update(Mundo,{});
}
function onMouseEvent (Mundo, event) {
    return update(Mundo,{});
}
function onKeyEvent (Mundo, keyCode) {
    //Estas condiciones abren el archivo correspondiente a la selección del botón en el que se encuentre.
    if (Mundo.boton==1&&keyCode==ENTER) {
        window.open("menu_mapas.html","_self");
        return update(Mundo,{});
    }
    else if (Mundo.boton==2&&keyCode==ENTER) {
        window.open("instrucciones.html","_self");
        return update(Mundo,{});
    }
    else if (Mundo.boton==3&&keyCode==ENTER) {
        window.open("creditos.html","_self");
        return update(Mundo,{});
    }
    //Esas condiciones permiten el movimiento entre botones.
    else if (Mundo.boton!==3&&(keyCode==DOWN_ARROW||keyCode==83)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if (Mundo.boton!==1&&(keyCode==UP_ARROW||keyCode==87)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton-1})
    }
    else if (Mundo.boton==1&&(keyCode==UP_ARROW||keyCode==87)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:3})
    }
    else if (Mundo.boton==3&&(keyCode==DOWN_ARROW||keyCode==83)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:1})
    }
    else {
        return update(Mundo,{});
    }
}
//Esta línea carga el fondo de la página a la par del script del juego para que no se vea retraso al cargar la página.
document.body.style.backgroundImage = "url('images/fondo_menu_principal.png')";