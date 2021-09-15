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
    fondo = loadImage("images/fondo_perdido.png");
}
function setup () {
    createCanvas(400,400);
    background(fondo);
    Mundo = {boton:1,sonido:new buzz.sound("audio/seleccion",{formats:["mp3"],volume: 50,preload:true})};
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) { 
    //Dibuja el menú sin ningún botón seleccionado ni texto de botón.
    fill(109,109,109);
    stroke(1)
    rect(95,240,209,20);
    rect(95,280,209,20);
    rect(95,320,209,20);
    fill(255);
    //Esta parte dibuja los textos en pantalla.
    textFont(fuente,24);
    text("Juego terminado.",100,60);
    textFont(fuente,14);
    text("Jugar de nuevo",145,255);
    text("Seleccionar otro personaje",100,295);
    text("Seleccionar otro mapa",120,335);
    //Dibuja un rectangulo transparente bordeado junto al texto que le acompaña.
    if (Mundo.boton==1) {
        fill(255,255,255,0);
        stroke(255);
        rect(95,240,209,20);
        fill(255);
        stroke(1);
        textFont(fuente,18);
        text("Empieza una nueva partida, manteniendo",22,130);
        text("el mismo mapa y personaje seleccio-",32.5,150);
        text("nados previamente.",117,170);
    }
    else if (Mundo.boton==2) {
        fill(255,255,255,0);
        stroke(255);
        rect(95,280,209,20);
        fill(255);
        stroke(1);
        textFont(fuente,18);
        text("Vuelve al menú de selección de persona-",10,130);
        text("jes y empieza una nueva partida manteni-",10,150);
        text("endo el mapa seleccionado.",78,170);
    }
    else if (Mundo.boton==3) {
        fill(255,255,255,0);
        stroke(255);
        rect(95,320,209,20);
        fill(255);
        stroke(1);
        textFont(fuente,18);
        text("Cambia el mapa del juego, deberás se-",25,141);
        text("leccionar nuevamente tu personaje.",37,161);
    }
}
function onMouseEvent (Mundo,event) {
    return update(Mundo,{});
}
function onKeyEvent (Mundo,keyCode) {
    //Vuelve a abrir el archivo del juego.
    if (Mundo.boton==1&&keyCode==ENTER) {
        window.open("porky-end.html","_self");
        return update(Mundo,{});
    }
    //Abre el menú de selección de personajes.
    else if (Mundo.boton==2&&keyCode==ENTER) {
        window.open("seleccion-personaje-end.html","_self");
        return update(Mundo,{});
    }
    //Abre el menú de selección de mapas.
    else if (Mundo.boton==3&&keyCode==ENTER) {
        window.open("menu_mapas.html","_self");
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
        return update(Mundo,{boton:3});
    }
    //Permite el movimiento entre botones con el teclado en dirección inferior, a excepción del último botón.
    else if (Mundo.boton!==3&&(keyCode==DOWN_ARROW||keyCode==83)) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    //Si se presiona la tecla "abajo" del teclado y se encuentra seleccionado el 3º botón, esta condición realiza el traslado hacia el primer botón (1º).
    else if (Mundo.boton==3&&(keyCode==DOWN_ARROW||keyCode==83)) {
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
//Esta línea carga el fondo de la página a la par del script del juego para que no se vea retraso al cargar la página.
document.body.style.backgroundImage = "url('images/fondo_menus(todos).png')";