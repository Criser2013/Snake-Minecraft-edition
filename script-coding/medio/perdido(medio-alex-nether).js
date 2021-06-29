let Mundo = {}
function setup () {
    createCanvas(400,400);
    Mundo = {boton:1}
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) {
    //Cuando un botón está seleccionado todos dibujan los mismo a excepción del rectangulo que está alrededor del botón que se encuentra seleccionado.
    if (Mundo.boton==1) {
        fill(255);
        //Dibuja un rectangulo alrededor del botón para indicar que ese es el selccionado.
        rect(142,217,116,26);
        //Estas 4 líneas dibujan los botones.
        rect(145,220,110,20);
        rect(110,260,177,20);
        rect(125,300,147,20);
        rect(140,340,120,20);
        fill(1);
        //Esta parte dibuja los textos en pantalla.
        textFont("Arial",24);
        text("Juego terminado.",110,60);
        textFont("Arial",18);
        text("Empieza una nueva partida, manteniendo",35,122.5);
        text("la misma dificultad y personaje",75,142.5);
        text("seleccionados previamente.",87.5,162.5);
        textFont("Arial",14);
        text("Jugar de nuevo",150,235);
        text("Seleccionar otro personaje",115,275);
        text("Seleccionar otro mapa",127.5,315);
        text("Cambiar dificultad",142.5,355);
    }
    else if (Mundo.boton==2) {
        fill(255);
        rect(107,257,183,26);
        rect(145,220,110,20);
        rect(110,260,177,20);
        rect(125,300,147,20);
        rect(140,340,120,20);
        fill(1);
        textFont("Arial",24);
        text("Juego terminado.",110,60);
        textFont("Arial",18);
        text("Vuelve al menú de selección de personajes",27.5,122.5);
        text("y empieza una nueva partida manteniendo",32.5,142.5);
        text("la dificultad.",157.5,162.5);
        textFont("Arial",14);
        text("Jugar de nuevo",150,235);
        text("Seleccionar otro personaje",115,275);
        text("Seleccionar otro mapa",127.5,315);
        text("Cambiar dificultad",142.5,355);
    }
    else if (Mundo.boton==3) {
        fill(255);
        rect(122,297,153,26);
        rect(145,220,110,20);
        rect(110,260,177,20);
        rect(125,300,147,20);
        rect(140,340,120,20);
        fill(1);
        textFont("Arial",24);
        text("Juego terminado.",110,60);
        textFont("Arial",18);
        text("Cambia el mapa del juego, la dificultad no se",20,137.5);
        text("verá afectada, deberás seleccionar",57.5,157.5);
        text("nuevamente tu personaje.",97.5,177.5);
        textFont("Arial",14);
        text("Jugar de nuevo",150,235);
        text("Seleccionar otro personaje",115,275);
        text("Seleccionar otro mapa",127.5,315);
        text("Cambiar dificultad",142.5,355)
    }
    else if (Mundo.boton==4) {
        fill(255);
        rect(137,337,126,26);
        rect(145,220,110,20);
        rect(110,260,177,20);
        rect(125,300,147,20);
        rect(140,340,120,20);
        fill(1);
        textFont("Arial",24);
        text("Juego terminado.",110,60);
        textFont("Arial",18);
        text("Cambia la dificultad del juego, tendrás que",27.5,137.5);
        text("seleccionar nuevamente tu personaje.",45,157.5);
        textFont("Arial",14);
        text("Jugar de nuevo",150,235);
        text("Seleccionar otro personaje",115,275);
        text("Seleccionar otro mapa",127.5,315);
        text("Cambiar dificultad",142.5,355);
    }
}
function onMouseEvent (Mundo,event) {
    return update(Mundo,{});
}
function onKeyEvent (Mundo,keyCode) {
    //Vuelve a abrir el archivo del juego.
    if (Mundo.boton==1&&keyCode==ENTER) {
        window.open("snakeMovimiento(alex-medio-nether).html","_self");
    }
    //Abre el menú de selección de personajes.
    else if (Mundo.boton==2&&keyCode==ENTER) {
        window.open("seleccion(medio-nether).html","_self");
    }
    //Abre el menú de selección de mapas.
    else if (Mundo.boton==3&&keyCode==ENTER) {
        window.open("menu_mapas(medio).html","_self");
    }
    //Abre el menú de selección de dificultad.
    else if (Mundo.boton==4&&keyCode==ENTER) {
        window.open("menu.html","_self");
    }
    //Permite el movimiento entre botones con el teclado en dirección superior, a excepción del primer botón.
    else if (Mundo.boton!==1&&keyCode==UP_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton-1});
    }
    //Si se presiona la tecla "arriba" del teclado y se encuentra seleccionado el 1º botón, esta condición realiza el traslado hacia el último botón (3º).
    else if (Mundo.boton==1&&keyCode==UP_ARROW) {
        setup();
        return update(Mundo,{boton:4});
    }
    //Permite el movimiento entre botones con el teclado en dirección inferior, a excepción del último botón.
    else if (Mundo.boton!==4&&keyCode==DOWN_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    //Si se presiona la tecla "abajo" del teclado y se encuentra seleccionado el 3º botón, esta condición realiza el traslado hacia el primer botón (1º).
    else if (Mundo.boton==4&&keyCode==DOWN_ARROW) {
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