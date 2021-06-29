let Mundo = {}
function setup () {
    createCanvas(400,400);
    Mundo = {boton:1};
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) {
    //Dibuja el menú, las diferentes condiciones solo dibujan un rectangulo alrededor del botón seleccionado.
    if (Mundo.boton==1) {
        //Dibuja el rectangulo que indica que el botón seleccionado es el 1º.
        rect(149.5,197,101,26);
        //Dibuja los botones.
        rect(152.5,200,95,20);
        rect(152.5,240,95,20);
        rect(152.5,280,95,20);
        //Dibuja los textos de los botones en pantalla.
        textFont("Arial",14);
        text("¡Jugar!",177,215);
        text("¿Cómo jugar?",155,255);
        text("Créditos",173,295);
        textFont("Arial",46);
        text("Snake:'Anaconda'",15,120);
    }
    else if (Mundo.boton==2) {
        rect(149.5,237,101,26);
        rect(152.5,200,95,20);
        rect(152.5,240,95,20);
        rect(152.5,280,95,20);
        textFont("Arial",14);
        text("¡Jugar!",177,215);
        text("¿Cómo jugar?",155,255);
        text("Créditos",173,295);
        textFont("Arial",46);
        text("Snake:'Anaconda'",15,120);
    }
    else if (Mundo.boton==3) {
        rect(149.5,277,101,26);
        rect(152.5,200,95,20);
        rect(152.5,240,95,20);
        rect(152.5,280,95,20);
        textFont("Arial",14);
        text("¡Jugar!",177,215);
        text("¿Cómo jugar?",155,255);
        text("Créditos",173,295);
        textFont("Arial",46);
        text("Snake:'Anaconda'",15,120);
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
    }
    else if (Mundo.boton==2&&keyCode==ENTER) {
        window.open("instrucciones.html","_self");
    }
    else if (Mundo.boton==3&&keyCode==ENTER) {
        window.open("creditos.html","_self");
    }
    //Esas condiciones permiten el movimiento entre botones.
    else if (Mundo.boton!==3&&keyCode==DOWN_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if (Mundo.boton!==1&&keyCode==UP_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton-1})
    }
    else if (Mundo.boton==1&&keyCode==UP_ARROW) {
        setup();
        return update(Mundo,{boton:3})
    }
    else if (Mundo.boton==3&&keyCode==DOWN_ARROW) {
        setup();
        return update(Mundo,{boton:1})
    }
    else {
        return update(Mundo,{});
    }
}