let Mundo = {}
let mapa1 = null;
let mapa2 = null;
let mapa3 = null;
let fuente = null;
let fondo = null;
function setup () {
    createCanvas(400,400);
    mapa1 = loadImage("images/overworld_menu.png");
    mapa2 = loadImage("images/nether_menu.png");
    mapa3 = loadImage("images/end_menu.png");
    fuente = loadFont("minecraft.otf");
    fondo = loadImage("images/fondo_mapas.png");
    background(fondo);
    Mundo = {boton:2,sonido:new buzz.sound("audio/seleccion",{formats:["mp3"],volume: 50,preload:true})}
}
function drawGame () {
    //Esta condición es la encargada de dibujar el menú cuando el "botón 2" se encuentra seleccionado.
    if (Mundo.boton==2) {
        textFont(fuente,18);
        text("Selecciona el mapa:",115,110);
        //Esta pare dibuja los marcos que están por fuera de las imagenes de los personajes.
        rect(20,140,100,100);
        rect(150,140,100,100);
        rect(280,140,100,100);
        //Esta parte dibuja los rectangulos de los botones.
        fill(109,109,109);
        stroke(255);
        rect(27,280,87,20);
        stroke(1);
        rect(157,280,87,20);
        rect(285,280,87,20);
        rect(10,30,55,20);
        fill(255);
        //Esta parte se encarga de dibujar los textos en pantalla.
        textFont(fuente,14);
        text("Overworld",35,260);
        text("Nether",178,260);
        text("End",318,260);
        text("Seleccionar",30,295);
        text("Seleccionar",160,295);
        text("Seleccionar",288,295);
        text("Volver",16,45);
        //Estas 3 lineas son las encargadas de mostrar las imagenes ya cargadas con la función "preload ()" en pantalla.
        image(mapa1,20,140,100,100);
        image(mapa2,150,140,100,100);
        image(mapa3,280,140,100,100);
    }
    else if (Mundo.boton==3) {
        textFont(fuente,18);
        text("Selecciona el mapa:",115,110);
        rect(20,140,100,100);
        rect(150,140,100,100);
        rect(280,140,100,100);
        fill(109,109,109);
        stroke(255);
        rect(157,280,87,20);
        stroke(1);
        rect(27,280,87,20);
        rect(285,280,87,20);
        rect(10,30,55,20);
        fill(255);
        textFont(fuente,14);
        text("Overworld",35,260);
        text("Nether",178,260);
        text("End",318,260);
        text("Seleccionar",30,295);
        text("Seleccionar",160,295);
        text("Seleccionar",288,295);
        text("Volver",16,45);
        image(mapa1,20,140,100,100);
        image(mapa2,150,140,100,100);
        image(mapa3,280,140,100,100);
    }
    else if (Mundo.boton==4) {
        textFont(fuente,18);
        text("Selecciona el mapa:",115,110);
        rect(20,140,100,100);
        rect(150,140,100,100);
        rect(280,140,100,100);
        fill(109,109,109);
        stroke(255);
        rect(285,280,87,20);
        stroke(1);
        rect(27,280,87,20);
        rect(157,280,87,20);
        rect(10,30,55,20);
        fill(255);
        textFont(fuente,14);
        text("Overworld",35,260);
        text("Nether",178,260);
        text("End",318,260);
        text("Seleccionar",30,295);
        text("Seleccionar",160,295);
        text("Seleccionar",288,295);
        text("Volver",16,45);
        image(mapa1,20,140,100,100);
        image(mapa2,150,140,100,100);
        image(mapa3,280,140,100,100);
    }
    else if (Mundo.boton==1) {
        textFont(fuente,18);
        text("Selecciona el mapa:",115,110);
        rect(20,140,100,100);
        rect(150,140,100,100);
        rect(280,140,100,100);
        fill(109,109,109);
        stroke(255);
        rect(10,30,55,20);
        stroke(1);
        rect(27,280,87,20);
        rect(157,280,87,20);
        rect(285,280,87,20);
        fill(255);
        textFont(fuente,14);
        text("Overworld",35,260);
        text("Nether",178,260);
        text("End",318,260);
        text("Seleccionar",30,295);
        text("Seleccionar",160,295);
        text("Seleccionar",288,295);
        text("Volver",16,45);
        image(mapa1,20,140,100,100);
        image(mapa2,150,140,100,100);
        image(mapa3,280,140,100,100);
    }
}
function onMouseEvent (Mundo,event) {
    return update(Mundo,{})
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function onTic (Mundo) {
    return update(Mundo,{})
}
function onKeyEvent (Mundo, keyCode) {
    //Estas condiciones abren el archivo correspondiente a la selección del botón en el que se encuentre.
    if (Mundo.boton==1&&keyCode==ENTER) {
        window.open("menu.html","_self");
        return update(Mundo,{});
    }
    else if (Mundo.boton==2&&keyCode==ENTER) {
        window.open("seleccion(medio-overworld).html","_self");
        return update(Mundo,{});
    }
    else if (Mundo.boton==3&&keyCode==ENTER) {
        window.open("seleccion(medio-nether).html","_self");
        return update(Mundo,{});
    }
    else if (Mundo.boton==4&&keyCode==ENTER) {
        window.open("seleccion(medio-end).html","_self");
        return update(Mundo,{});
    }
    //Esas condiciones permiten el movimiento entre botones.
    else if (Mundo.boton!==4&&(keyCode==RIGHT_ARROW||keyCode==68)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if (Mundo.boton!==1&&(keyCode==LEFT_ARROW||keyCode==65)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton-1})
    }
    else if (Mundo.boton==1&&(keyCode==LEFT_ARROW||keyCode==65)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:4})
    }
    else if (Mundo.boton==4&&(keyCode==RIGHT_ARROW||keyCode==68)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:1})
    }
    else {
        return update(Mundo,{});
    }
}