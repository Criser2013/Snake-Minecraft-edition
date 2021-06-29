let Mundo = {}
let mapa1 = null;
let mapa2 = null;
let mapa3 = null;
/*
function preload () {

}*/
function setup () {
    createCanvas(400,400);
    Mundo = {boton:2}
}
function drawGame () {
    //Esta condición es la encargada de dibujar el menú cuando el "botón 2" se encuentra seleccionado.
    if (Mundo.boton==2) {
        rect(27.5,277.5,85,25);
        textFont('Arial',14);
        text("Selecciona el mapa:",138,95);
        //Esta pare dibuja los marcos que están por fuera de las imagenes de los personajes.
        rect(20,140,100,100);
        rect(150,140,100,100);
        rect(280,140,100,100);
        //Esta parte dibuja los rectangulos de los botones.
        rect(30,280,80,20);
        rect(160,280,80,20);
        rect(290,280,80,20);
        rect(10,30,50,20);
        //Esta parte se encarga de dibujar los textos en pantalla.
        textFont("Arial",14);
        text("Overworld",39,260);
        text("Nether",180,260);
        text("End",317,260);
        text("Seleccionar",33,295);
        text("Seleccionar",163,295);
        text("Seleccionar",293,295);
        text("Volver",15,45);
        //Estas 3 lineas son las encargadas de mostrar las imagenes ya cargadas con la función "preload ()" en pantalla.
        /*
        image(mapa1,20,140,100,100);
        image(mapa2,150,140,100,100);
        image(mapa3,280,140,100,100);*/
    }
    else if (Mundo.boton==3) {
        rect(157.5,277.5,85,25);
        textFont('Arial',14);
        text("Selecciona el mapa",138,95);
        rect(20,140,100,100);
        rect(150,140,100,100);
        rect(280,140,100,100);
        rect(30,280,80,20);
        rect(160,280,80,20);
        rect(290,280,80,20);
        rect(10,30,50,20);
        textFont("Arial",14);
        text("Overworld",39,260);
        text("Nether",180,260);
        text("End",317,260);
        text("Seleccionar",33,295);
        text("Seleccionar",163,295);
        text("Seleccionar",293,295);
        text("Volver",15,45);
        /*
        image(mapa1,20,140,100,100);
        image(mapa2,150,140,100,100);
        image(mapa3,280,140,100,100);*/
    }
    else if (Mundo.boton==4) {
        rect(287.5,277.5,85,25);
        textFont('Arial',14);
        text("Selecciona el mapa:",138,95);
        rect(20,140,100,100);
        rect(150,140,100,100);
        rect(280,140,100,100);
        rect(30,280,80,20);
        rect(160,280,80,20);
        rect(290,280,80,20);
        rect(10,30,50,20);
        textFont("Arial",14);
        text("Overworld",39,260);
        text("Nether",180,260);
        text("End",317,260);
        text("Seleccionar",33,295);
        text("Seleccionar",163,295);
        text("Seleccionar",293,295);
        text("Volver",15,45);
        /*
        image(mapa1,20,140,100,100);
        image(mapa2,150,140,100,100);
        image(mapa3,280,140,100,100);*/
    }
    else if (Mundo.boton==1) {
        rect(7.5,27.5,55,25);
        textFont('Arial',14);
        text("Selecciona el mapa:",138,95);
        rect(20,140,100,100);
        rect(150,140,100,100);
        rect(280,140,100,100);
        rect(30,280,80,20);
        rect(160,280,80,20);
        rect(290,280,80,20);
        rect(10,30,50,20);
        textFont("Arial",14);
        text("Overworld",39,260);
        text("Nether",180,260);
        text("End",317,260);
        text("Seleccionar",33,295);
        text("Seleccionar",163,295);
        text("Seleccionar",293,295);
        text("Volver",15,45);
        /*
        image(mapa1,20,140,100,100);
        image(mapa2,150,140,100,100);
        image(mapa3,280,140,100,100);*/
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
    }
    else if (Mundo.boton==2&&keyCode==ENTER) {
        window.open("seleccion(medio-overworld).html","_self");
    }
    else if (Mundo.boton==3&&keyCode==ENTER) {
        window.open("seleccion(medio-nether).html","_self");
    }
    else if (Mundo.boton==4&&keyCode==ENTER) {
        window.open("seleccion(medio-end).html","_self")
    }
    //Esas condiciones permiten el movimiento entre botones.
    else if (Mundo.boton!==4&&keyCode==RIGHT_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if (Mundo.boton!==1&&keyCode==LEFT_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton-1})
    }
    else if (Mundo.boton==1&&keyCode==LEFT_ARROW) {
        setup();
        return update(Mundo,{boton:4})
    }
    else if (Mundo.boton==4&&keyCode==RIGHT_ARROW) {
        setup();
        return update(Mundo,{boton:1})
    }
    else {
        return update(Mundo,{});
    }
}