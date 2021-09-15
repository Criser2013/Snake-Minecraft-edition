let Mundo = {}
let personaje1 = null;
let personaje2 = null;
let personaje3 = null;
let fuente = null;
let fondo = null;
/*
Contrato: preload variable -> image
image = Carga una imagen.
variable = variable local (let)
Proposito: Carga las imagenes (también funciona con archivos JSON) que se muestran en los menus, antes del "setup ()" para acerlerar 
la carga de los elementos en pantalla.
Prototipo: preload () {}
Ejemplos: preload (personaje1,loadImage("images/m1.png")) -> personaje1 = loadImage("images/m1.png") // La imagen se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
          preload (personaje2,loadImage("images/m2.png")) -> personaje2 = loadImage("images/m2.png") // La imagen se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
*/
function preload () {
    personaje1 = loadImage("images/steve_menu.png");
    personaje2 = loadImage("images/cerdo_menu.png");
    personaje3 = loadImage("images/alex_menu.png");
    fuente = loadFont("minecraft.otf");
    fondo = loadImage("images/fondo_mapas.png");
}
function setup() {
    createCanvas(400,400);
    background(fondo);
    Mundo = {boton:2,sonido:new buzz.sound("audio/seleccion",{formats:["mp3"],volume: 50,preload:true})};
}
function drawGame () {
    //Dibuja el menú con todos sus elementos.
    stroke(1);
    fill(255);
    textFont(fuente,18);
    text("Selecciona tu personaje:",87,112);
    //Esta pare dibuja los marcos que están por fuera de las imagenes de los personajes.
    fill(255,255,255,0);
    rect(20,140,100,100);
    rect(150,140,100,100);
    rect(280,140,100,100);
    //Esta parte dibuja los rectangulos de los botones.
    fill(109,109,109);
    stroke(1);
    rect(48.5,280,45,20);
    rect(177.5,280,45,20);
    rect(308,280,45,20);
    rect(10,30,55,20);
    fill(255);
    //Esta parte se encarga de dibujar los textos en pantalla.
    textFont(fuente,14);
    text("Steve",51,265);
    text("Porky",180,265);
    text("Alex",316,265);
    text("Jugar",51,295);
    text("Jugar",180,295);
    text("Jugar",310.5,295);
    text("Volver",16,45);
    //Estas 3 lineas son las encargadas de mostrar las imagenes ya cargadas con la función "preload ()" en pantalla.
    image(personaje1,20,140,100,100);
    image(personaje2,150,140,100,100);
    image(personaje3,280,140,100,100);
    //Estas condiciones dibujan un rectangulo transparente con borde color blanco sobre el botón seleccionado para indicar en cuál se está.
    if (Mundo.boton==2) {
        stroke(255);
        fill(255,255,255,0);
        rect(48.5,280,45,20);
    }
    else if (Mundo.boton==3) {
        stroke(255);
        fill(255,255,255,0);
        rect(177.5,280,45,20);
    }
    else if (Mundo.boton==4) {
        stroke(255);
        fill(255,255,255,0);
        rect(308,280,45,20);
    }
    else if (Mundo.boton==1) {
        stroke(255);
        fill(255,255,255,0);
        rect(10,30,55,20);
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
    //Abre el archivo del menú cuando se presiona el botón de volver.
    if (keyCode==ENTER&&Mundo.boton==1) {
        window.open("menu_mapas.html","_self");
        return update(Mundo,{});
    }
    //Estas 3 condiciones abre los archivos del juego con la apariencia seleccionada en su dificultad.
    else if (keyCode==ENTER&&Mundo.boton==2) {
        window.open("steve-end.html","_self");
        return update(Mundo,{});
    }
    else if (keyCode==ENTER&&Mundo.boton==3) {
        window.open("porky-end.html","_self");
        return update(Mundo,{});
    }
    else if (keyCode==ENTER&&Mundo.boton==4) {
        window.open("alex-end.html","_self");
        return update(Mundo,{});
    }
    //Estas funciones son las que permiten el movimiento de la selección de botones en pantalla (notese que se llama a la función "setup ()" en cada una, de ahí la razón de la función "preload ()").
    else if ((keyCode==LEFT_ARROW||keyCode==65)&&Mundo.boton!==1) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton-1});
    }
    else if ((keyCode==RIGHT_ARROW||keyCode==68)&&Mundo.boton!==4) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if ((keyCode==LEFT_ARROW||keyCode==65)&&Mundo.boton==1) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:4});
    }
    else if ((keyCode==RIGHT_ARROW||keyCode==68)&&Mundo.boton==4) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:1});
    }
    else {
        return update(Mundo,{});
    }
}
//Esta línea carga el fondo de la página a la par del script del juego para que no se vea retraso al cargar la página.
document.body.style.backgroundImage = "url('images/fondo_menus(todos).png')";