let Mundo = {}
let fondo = null;
let fuente = null;
let titulo = null;
let titulo2 = null;
function setup () {
    createCanvas(400,400);
    fuente = loadFont("minecraft.otf");
    fondo = loadImage("images/fondo_principal.png");
    titulo = loadImage("images/titulo_snake.png");
    titulo2 = loadFont("minecrafter.ttf");
    background(fondo);
    Mundo = {boton:1,sonido:new buzz.sound("audio/seleccion",{formats:["mp3"],volume: 50,preload:true})};
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) {
    //Dibuja el menú, las diferentes condiciones solo dibujan un rectangulo alrededor del botón seleccionado.
    if (Mundo.boton==1) {
        image(titulo,117,80,165,51);
        //Dibuja los botones.
        fill(109,109,109);
        stroke(255);
        rect(140,200,119,20);
        stroke(1);
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
    }
    else if (Mundo.boton==2) {
        image(titulo,117,80,165,51);
        fill(109,109,109);
        stroke(255);
        rect(140,240,119,20);
        stroke(1);
        rect(140,200,119,20);
        rect(140,280,119,20);
        fill(255);
        textFont(fuente,14);
        text("¡Jugar!",177,215);
        text("¿Cómo jugar?",151.5,255);
        text("Agradecimientos",145,295);
        fill(216,206,205);
        textFont(titulo2,14);
        text("Minecraft edition",125,150);
    }
    else if (Mundo.boton==3) {
        image(titulo,117,80,165,51);
        fill(109,109,109);
        stroke(255);
        rect(140,280,119,20);
        stroke(1);
        rect(140,200,119,20);
        rect(140,240,119,20);
        fill(255);
        textFont(fuente,14);
        text("¡Jugar!",177,215);
        text("¿Cómo jugar?",151.5,255);
        text("Agradecimientos",145,295);
        fill(216,206,205);
        textFont(titulo2,14);
        text("Minecraft edition",125,150);
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
        window.open("menu.html","_self");
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