let Mundo = {}
let fuente = null;
let fondo = null;
function setup () {
    createCanvas(400,400);
    fuente = loadFont("minecraft.otf");
    fondo = loadImage("images/fondo_dificultad.png");
    background(fondo);
    Mundo = {boton:2,sonido:new buzz.sound("audio/seleccion",{formats:["mp3"],volume: 50,preload:true})}
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
        return update(Mundo,{});
    }
    //Estas 3 condiciones abren los archivos de selección de eprsonaje correspondientes a la dificultad seleccionada.
    else if (keyCode==ENTER&&Mundo.boton==2) {
        window.open("menu_mapas(facil).html","_self");
        return update(Mundo,{});
    }
    else if (keyCode==ENTER&&Mundo.boton==3) {
        window.open("menu_mapas(medio).html","_self");
        return update(Mundo,{});
    }
    else if (keyCode==ENTER&&Mundo.boton==4) {
        window.open("menu_mapas(dificil).html","_self");
        return update(Mundo,{});
    }
    //Estas condiciones permiten realizar el desplazamiento entre los diferentes botones, si se encuentra en los extremos realiza la selección en el botón del extremo contrario.
    else if ((keyCode==DOWN_ARROW||keyCode==83)&&Mundo.boton!==4) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if ((keyCode==DOWN_ARROW||keyCode==83)&&Mundo.boton==4) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:1});
    }
    else if ((keyCode==UP_ARROW||keyCode==87)&&Mundo.boton!==1) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton-1});
    }
    else if ((keyCode==UP_ARROW||keyCode==87)&&Mundo.boton==1) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:4});
    }
    else {
        return update(Mundo,{})
    }
}