let Mundo = {}
let fuente = null;
let fondo = null;
function setup () {
    createCanvas(400,400);
    fuente = loadFont("minecraft.otf");
    fondo = loadImage("images/fondo_perdido.png");
    background(fondo);
    Mundo = {boton:1,sonido:new buzz.sound("audio/seleccion",{formats:["mp3"],volume: 50,preload:true})};
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) {
    //Cuando un botón está seleccionado todos dibujan los mismo a excepción del rectangulo que está alrededor del botón que se encuentra seleccionado.
    if (Mundo.boton==1) {
        fill(109,109,109);
        //Esta parte dibuja el botón que se encuentra seleccionado (el 1º).
        stroke(255)
        rect(95,220,209,20);
        //Esta parte dibuja los botones que no se encuentran seleccionados.
        stroke(1)
        rect(95,260,209,20);
        rect(95,300,209,20);
        rect(95,340,209,20);
        fill(255);
        //Esta parte dibuja los textos en pantalla.
        textFont(fuente,24);
        text("Juego terminado.",100,60);
        textFont(fuente,18);
        text("Empieza una nueva partida, manteniendo",22,130);
        text("la misma dificultad, mapa y personaje",32.5,150);
        text("seleccionados previamente.",77,170);
        textFont(fuente,14);
        text("Jugar de nuevo",145,235);
        text("Seleccionar otro personaje",100,275);
        text("Seleccionar otro mapa",120,315);
        text("Cambiar dificultad",137.5,355);
    }
    else if (Mundo.boton==2) {
        fill(109,109,109);
        stroke(255);
        rect(95,260,209,20);
        stroke(1);
        rect(95,220,209,20);
        rect(95,300,209,20);
        rect(95,340,209,20);
        fill(255);
        textFont(fuente,24);
        text("Juego terminado.",100,60);
        textFont(fuente,18);
        text("Vuelve al menú de selección de persona-",10,130);
        text("jes y empieza una nueva partida manteni-",10,150);
        text("endo la dificultad y el mapa seleccionado.",14,170);
        textFont(fuente,14);
        text("Jugar de nuevo",145,235);
        text("Seleccionar otro personaje",100,275);
        text("Seleccionar otro mapa",120,315);
        text("Cambiar dificultad",137.5,355);
    }
    else if (Mundo.boton==3) {
        fill(109,109,109);
        stroke(255);
        rect(95,300,209,20);
        stroke(1);
        rect(95,220,209,20);
        rect(95,260,209,20);
        rect(95,340,209,20);
        fill(255);
        textFont(fuente,24);
        text("Juego terminado.",100,60);
        textFont(fuente,18);
        text("Cambia el mapa del juego, la dificultad no",15,130);
        text("se verá afectada, deberás seleccionar",20,150);
        text("nuevamente tu personaje.",82.5,170);
        textFont(fuente,14);
        text("Jugar de nuevo",145,235);
        text("Seleccionar otro personaje",100,275);
        text("Seleccionar otro mapa",120,315);
        text("Cambiar dificultad",137.5,355);
    }
    else if (Mundo.boton==4) {
        fill(109,109,109);
        stroke(255);
        rect(95,340,209,20);
        stroke(1);
        rect(95,220,209,20);
        rect(95,260,209,20);
        rect(95,300,209,20);
        fill(255);
        textFont(fuente,24);
        text("Juego terminado.",100,60);
        textFont(fuente,18);
        text("Cambia la dificultad del juego, deberás",25,130);
        text("seleccionar nuevamente el mapa y tu",33,150);
        text("personaje.",150,170);
        textFont(fuente,14);
        text("Jugar de nuevo",145,235);
        text("Seleccionar otro personaje",100,275);
        text("Seleccionar otro mapa",120,315);
        text("Cambiar dificultad",137.5,355);
    }
}
function onMouseEvent (Mundo,event) {
    return update(Mundo,{});
}
function onKeyEvent (Mundo,keyCode) {
    //Vuelve a abrir el archivo del juego.
    if (Mundo.boton==1&&keyCode==ENTER) {
        window.open("snakeMovimiento(alex-medio-overworld).html","_self");
        return update(Mundo,{});
    }
    //Abre el menú de selección de personajes.
    else if (Mundo.boton==2&&keyCode==ENTER) {
        window.open("seleccion(medio-overworld).html","_self");
        return update(Mundo,{});
    }
    //Abre el menú de selección de mapas.
    else if (Mundo.boton==3&&keyCode==ENTER) {
        window.open("menu_mapas(medio).html","_self");
        return update(Mundo,{});
    }
    //Abre el menú de selección de dificultad.
    else if (Mundo.boton==4&&keyCode==ENTER) {
        window.open("menu.html","_self");
        return update(Mundo,{});
    }
    //Permite el movimiento entre botones con el teclado en dirección superior, a excepción del primer botón.
    else if (Mundo.boton!==1&&(keyCode==UP_ARROW||keyCode==87)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton-1});
    }
    //Si se presiona la tecla "arriba" del teclado y se encuentra seleccionado el 1º botón, esta condición realiza el traslado hacia el último botón (3º).
    else if (Mundo.boton==1&&(keyCode==UP_ARROW||keyCode==87)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:4});
    }
    //Permite el movimiento entre botones con el teclado en dirección inferior, a excepción del último botón.
    else if (Mundo.boton!==4&&(keyCode==DOWN_ARROW||keyCode==83)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    //Si se presiona la tecla "abajo" del teclado y se encuentra seleccionado el 3º botón, esta condición realiza el traslado hacia el primer botón (1º).
    else if (Mundo.boton==4&&(keyCode==DOWN_ARROW||keyCode==83)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:1});
    }
    else {
        return update(Mundo,{});
    }
}
function onTic (Mundo) {
    return update(Mundo,{});
}