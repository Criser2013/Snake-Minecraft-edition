let Mundo = {}
let fuente = null;
let fondo = null;
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
    Mundo = {boton:2}
}
function drawGame (Mundo) {
    //Dibuja el menú, solo con variaciones dependiendo de que botón se encuentra seleccionado.
    if (Mundo.boton==2) {
        fill(100,109,109);
        stroke(255);
        rect(150,160,100,15);
        stroke(1);
        //Dibuja los botones de la dificultad.
        rect(10,30,55,20);
        rect(150,200,100,15);
        rect(150,240,100,15);
        //Muestra en pantalla los textos que se encuentran en el menú.
        fill(255);
        textFont(fuente,18);
        text("Selecciona la dificultad:",95,120);
        textFont(fuente,14);
        text("Fácil",185,172);
        text("Medio",182.5,212);
        text("Difícil",182,252);
        text("Volver",16,45);
    }
    else if (Mundo.boton==3) {
        fill(100,109,109);
        stroke(255);
        rect(150,200,100,15);
        stroke(1);
        rect(10,30,55,20);
        rect(150,160,100,15);
        rect(150,240,100,15);
        fill(255);
        textFont(fuente,18);
        text("Selecciona la dificultad:",95,120);
        textFont(fuente,14);
        text("Fácil",185,172);
        text("Medio",182.5,212);
        text("Difícil",182,252);
        text("Volver",16,45);
    }
    else if (Mundo.boton==4) {
        fill(100,109,109);
        stroke(255);
        rect(150,240,100,15);
        stroke(1);
        rect(10,30,55,20);
        rect(150,160,100,15);
        rect(150,200,100,15);
        fill(255);
        textFont(fuente,18);
        text("Selecciona la dificultad:",95,120);
        textFont(fuente,14);
        text("Fácil",185,172);
        text("Medio",182.5,212);
        text("Difícil",182,252);
        text("Volver",16,45);
    }
    else if (Mundo.boton==1) {
        fill(100,109,109);
        stroke(255);
        rect(10,30,55,20);
        stroke(1);
        rect(150,160,100,15);
        rect(150,200,100,15);
        rect(150,240,100,15);
        fill(255);
        textFont(fuente,18);
        text("Selecciona la dificultad:",95,120);
        textFont(fuente,14);
        text("Fácil",185,172);
        text("Medio",182.5,212);
        text("Difícil",182,252);
        text("Volver",16,45);
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
        window.open("menu_mapas(facil).html","_self");
    }
    else if (keyCode==ENTER&&Mundo.boton==3) {
        window.open("menu_mapas(medio).html","_self");
    }
    else if (keyCode==ENTER&&Mundo.boton==4) {
        window.open("menu_mapas(dificil).html","_self");
    }
    //Estas condiciones permiten realizar el desplazamiento entre los diferentes botones, si se encuentra en los extremos realiza la selección en el botón del extremo contrario.
    else if (keyCode==DOWN_ARROW&&Mundo.boton!==4) {
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if (keyCode==DOWN_ARROW&&Mundo.boton==4) {
        setup();
        return update(Mundo,{boton:1});
    }
    else if (keyCode==UP_ARROW&&Mundo.boton!==1) {
        setup();
        return update(Mundo,{boton:Mundo.boton-1});
    }
    else if (keyCode==UP_ARROW&&Mundo.boton==1) {
        setup();
        return update(Mundo,{boton:4});
    }
    else {
        return update(Mundo,{})
    }
}