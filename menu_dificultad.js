let Mundo = {}
function setup () {
    createCanvas(400,400);
    Mundo = {boton:2}
}
function drawGame (Mundo) {
    //Dibuja el menú cuando el "botón 1" se encuentra seleccionado.
    if (Mundo.boton==2) {
        //Dibuja un rectangulo por fuera del botón 1 cuando este se encuentra seleccionado (para indicar que es la selección actual).
        rect(197,157,106,21);
        //Dibuja los botones de la dificultad.
        rect(10,30,50,20);
        rect(200,160,100,15)
        rect(200,200,100,15)
        rect(200,240,100,15)
        //Muestra en pantalla los textos que se encuentran en el menú.
        textFont("Arial",14)
        text("Selecciona la dificultad:",175,120)
        text("Facil",235,172)
        text("Medio",230,212)
        text("Dificil",232.5,252)
        text("Volver",15,45);
    }
    //Dibuja el menú cuando el "botón 2" se encuentra seleccionado.
    else if (Mundo.boton==3) {
        rect(10,30,50,20);
        rect(197,197,106,21)
        rect(200,160,100,15)
        rect(200,200,100,15)
        rect(200,240,100,15)
        textFont("Arial",14)
        text("Selecciona la dificultad:",175,120)
        text("Facil",235,172)
        text("Medio",230,212)
        text("Dificil",232.5,252)
        text("Volver",15,45);
    }
    else if (Mundo.boton==4) {
        rect(10,30,50,20);
        rect(197,237,106,21)
        rect(200,160,100,15)
        rect(200,200,100,15)
        rect(200,240,100,15)
        textFont("Arial",14)
        text("Selecciona la dificultad:",175,120)
        text("Facil",235,172)
        text("Medio",230,212)
        text("Dificil",232.5,252)
        text("Volver",15,45);
    }
    else if (Mundo.boton==1) {
        rect(7,27,56,26)
        rect(10,30,50,20);
        rect(200,160,100,15)
        rect(200,200,100,15)
        rect(200,240,100,15)
        textFont("Arial",14)
        text("Selecciona la dificultad:",175,120)
        text("Facil",235,172)
        text("Medio",230,212)
        text("Dificil",232.5,252)
        text("Volver",15,45);
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
function onKeyEvent (Mundo,keyCode) {
    //Esta condición retorna al menú principal en caso de ser presionado el botón de volver.
    if (keyCode==ENTER&&Mundo.boton==1) {
        window.open("menu_principal.html","_self");
    }
    //Estas 3 condiciones abren los archivos de selección de eprsonaje correspondientes a la dificultad seleccionada.
    else if (keyCode==ENTER&&Mundo.boton==2) {
        window.open("seleccion(facil).html","_self");
    }
    else if (keyCode==ENTER&&Mundo.boton==3) {
        window.open("seleccion(medio).html","_self");
    }
    else if (keyCode==ENTER&&Mundo.boton==4) {
        window.open("seleccion(dificil).html","_self");
    }
    //Estas condiciones permiten realizar el desplazamiento entre los diferentes botones, si se encuentra en los extremos realiza la selección en el botón del extremo contrario.
    else if (keyCode==DOWN_ARROW&&Mundo.boton!==4) {
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if (keyCode==DOWN_ARROW&&Mundo.boton==4) {
        setup();
        return update(Mundo,{boton:Mundo.boton-3});
    }
    else if (keyCode==UP_ARROW&&Mundo.boton!==1) {
        setup();
        return update(Mundo,{boton:Mundo.boton-1});
    }
    else if (keyCode==UP_ARROW&&Mundo.boton==1) {
        setup();
        return update(Mundo,{boton:Mundo.boton+3});
    }
    else {
        return update(Mundo,{})
    }
}