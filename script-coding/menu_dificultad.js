let Mundo = {}
function setup () {
    createCanvas(400,400);
    Mundo = {boton:1}
}
function drawGame (Mundo) {
    if (Mundo.boton==1) {
        rect(197,157,106,21);
        rect(200,160,100,15)
        rect(200,200,100,15)
        rect(200,240,100,15)
        textFont("Arial",14)
        text("Selecciona la dificultad:",175,120)
        text("Facil",235,172)
        text("Medio",230,212)
        text("Dificil",232.5,252)
    }
    else if (Mundo.boton==2) {
        rect(197,197,106,21)
        rect(200,160,100,15)
        rect(200,200,100,15)
        rect(200,240,100,15)
        textFont("Arial",14)
        text("Selecciona la dificultad:",175,120)
        text("Facil",235,172)
        text("Medio",230,212)
        text("Dificil",232.5,252)
    }
    else if (Mundo.boton==3) {
        rect(197,237,106,21)
        rect(200,160,100,15)
        rect(200,200,100,15)
        rect(200,240,100,15)
        textFont("Arial",14)
        text("Selecciona la dificultad:",175,120)
        text("Facil",235,172)
        text("Medio",230,212)
        text("Dificil",232.5,252)
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
    if (keyCode==ENTER&&Mundo.boton==1) {
        window.open("seleccion(facil).html","_self");
    }
    else if (keyCode==ENTER&&Mundo.boton==2) {
        window.open("seleccion(medio).html","_self");
    }
    else if (keyCode==ENTER&&Mundo.boton==3) {
        window.open("seleccion(dificil).html","_self");
    }
    else if (keyCode==DOWN_ARROW&&Mundo.boton!==3) {
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if (keyCode==DOWN_ARROW&&Mundo.boton==3) {
        setup();
        return update(Mundo,{boton:Mundo.boton-2});
    }
    else if (keyCode==UP_ARROW&&Mundo.boton!==1) {
        setup();
        return update(Mundo,{boton:Mundo.boton-1});
    }
    else if (keyCode==UP_ARROW&&Mundo.boton==1) {
        setup();
        return update(Mundo,{boton:Mundo.boton+2});
    }
    else {
        return update(Mundo,{})
    }
}