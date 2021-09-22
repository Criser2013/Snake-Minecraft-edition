let Mundo = {}
let flecha1 = null;
let flecha2 = null;
let flecha3 = null;
let flecha4 = null;
let fuente = null;
let fondo = null;
let skin1 = null;
let skin2 = null;
let skin3 = null;
let mapa1 = null;
let mapa2 = null;
let mapa3 = null;
let manzana = null;
let manzana_oro = null;
let enemigos = null;
let enemigos1 = null;
let enemigos2 = null;
let fruta_coral = null;
let papa_venenosa = null;
let ojo_araña = null;
let comida_inversa = null;
/*
Contrato: preload variable -> image
image = Carga una imagen.
variable = variable local (let)
Proposito: Carga las imagenes (también funciona con archivos JSON) que se muestran en los menus, antes del "setup ()" para acerlerar 
la carga de estos elementos en pantalla.
Prototipo: preload () {}
Ejemplos: preload (flecha1,loadImage("images/m1.png")) -> flecha1 = loadImage("images/m1.png") // La imagen se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
          preload (flecha2,loadImage("images/m2.png")) -> flecha2 = loadImage("images/m2.png") // La imagen se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
*/
function preload () {
    fuente = loadFont("minecraft.otf");
    fondo = loadImage("images/fondo_dificultad.png");
    flecha1 = loadImage("images/flec_arriba.png");
    flecha2 = loadImage("images/flec_abajo.png");
    flecha3 = loadImage("images/flec_izquierda.png");
    flecha4 = loadImage("images/flec_derecha.png");
    skin1 = loadImage("images/cabeza_steve.png");
    skin2 = loadImage("images/cabeza_alex.png");
    skin3 = loadImage("images/cerdo.png");
    mapa1 = loadImage("images/overworld_instrucciones.png");
    mapa2 = loadImage("images/nether_instrucciones.png");
    mapa3 = loadImage("images/end_instrucciones.png");
    manzana = loadImage("images/manzana.png");
    manzana_oro = loadImage("images/manzana_dorada.png");
    enemigos = loadImage("images/cabeza_wither.png");
    enemigos1 = loadImage("images/cabeza_enderdragon.png");
    enemigos2 = loadImage("images/creeper.png");
    fruta_coral = loadImage("images/fruta_coral.png");
    papa_venenosa = loadImage("images/papa_venenosa.png");
    ojo_araña = loadImage("images/ojo_araña.png");
    comida_inversa = loadImage("images/sopa_inversa.png");
}
function setup () {
    createCanvas(400,400);
    background(fondo);
    Mundo = {menu:1,boton:1,sonido:new buzz.sound("audio/seleccion",{formats:["mp3"],volume: 50,preload:true})};
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) {
    //Dibuja los menús.
    if (Mundo.menu==1) {
        //Dibuja los botones.
        fill(109,109,109);
        //Dibuja ambos botones.
        stroke(1);
        rect(205,360,65,20);
        rect(120,360,65,20);
        //Muestra los textos de intrucciones en pantalla.
        fill(255);
        textFont(fuente,20);
        text("Sistema de movimiento.",95,30);
        text("Apariencias de la serpiente.",60,222);
        textFont(fuente,14);
        text("Para moverte debes pulsar las teclas:",65,60);
        text("Si presionas la tecla contraria a la dirección en",30,150);
        text("la que se dirige la serpiente, no cambiará de",42.5,170);
        text("dirección.",165,190);
        text("La apariencia puede ser elegida luego de selec-",27.5,252);
        text("cionar el mapa o al perder en el juego.",59,272);
        //Muestra los textos de los botones en pantalla.
        text("Volver",132.5,375);
        text("Siguiente",207.5,375);
        //Dibuja las imagenes en pantalla.
        image(flecha1,50,80,50,50);
        image(flecha2,125,80,50,50);
        image(flecha3,225,80,50,50);
        image(flecha4,300,80,50,50);
        image(skin1,150,302,20,20);
        image(skin2,190,302,20,20);
        image(skin3,230,302,20,20);
    }
    else if (Mundo.menu==2) {
        fill(109,109,109);
        stroke(1);
        rect(205,360,65,20);
        rect(120,360,65,20);
        fill(255);
        textFont(fuente,20);
        text("Vidas.",175,30);
        text("Mapas.",170,155);
        text("Elementos dentro del juego.",67.5,285);
        textFont(fuente,14);
        text("La partida comienza con 3 vidas que no pueden ser",18.5,60);
        text("recuperadas de ninguna forma, cuando la serpiente",17.5,80);
        text("se choca, se pierde una vida y comienza a parpade-",15,100);
        text("Puedes seleccionar entre 3 mapas distintos.",45,185);
        text("ar en color rojo, eres invencible a todo por 2 segs.",12.5,120);
        text("Ayudan a crecer a la serpi-",155,315);
        text("ente y aumentan tu puntuación.",90,335);
        text("Volver",132.5,375);
        text("Siguiente",207.5,375);
        textFont(fuente,16);
        text("Manzanas:",70,315);
        image(mapa1,72,205,50,50);
        image(mapa2,175,205,50,50);
        image(mapa3,278,205,50,50);
        image(manzana,40,305,20,20);
    }
    else if (Mundo.menu==3) {
        fill(109,109,109);
        stroke(255);
        rect(164.5,360,65,20);
        stroke(1);
        fill(255);
        textFont(fuente,20);
        text("Elementos dentro del juego.",67.5,30)
        textFont(fuente,16);
        text("Manzanas de oro:",70,60);
        text("Enemigos:",70,130);
        text("Objetos perjudiciales:",70,220);
        text("Sopa inversa:",70,330);
        textFont(fuente,14);
        text("Aumentan tu veloci-",215,60);
        text("dad, detienen la reaparición de enemigos,",70,80);
        text("aparece a partir de los 5 puntos.",80,100);
        text("Aparecen a partir de los 10",150,130);
        text("puntos, muy cerca de la cabeza de tu",70,150);
        text("serpiente. Su apariencia varía dependi-",70,170);
        text("endo del mapa y tu puntaje.",100,190);
        text("Aparecen a",255,220);
        text("partir de los 10 puntos, muy cerca de la",70,240);
        text("cabeza de tu serpiente, al comerlos pi-",70,260);
        text("erdes 1 vida. Su apariencia varía depen-",70,280);
        text("diendo del mapa.",140,300);
        text("Al comerla se invierte la",182,330);
        text("dirección de las teclas.",128,350)
        text("Volver",176.5,375);
        image(manzana_oro,40,65,20,20);
        image(enemigos,40,120,20,20);
        image(enemigos1,40,145,20,20);
        image(enemigos2,40,170,20,20);
        image(fruta_coral,40,210,20,20);
        image(ojo_araña,40,245,20,20);
        image(papa_venenosa,40,280,20,20);
        image(comida_inversa,40,325,20,20);
    }
    //Dibuja un rectangulo de fondo transparente sobre el botón que se encuentre seleccionado excepto en el menú 3.
    if (Mundo.boton==2&&Mundo.menu!==3) {
        stroke(255);
        fill(255,255,255,0);
        rect(205,360,65,20);
    }
    else if (Mundo.boton==1&&Mundo.menu!==3) {
        stroke(255);
        fill(255,255,255,0);
        rect(120,360,65,20);
    }
}
function onTic (Mundo) {
    return update(Mundo,{});
}
function onMouseEvent (Mundo, event) {
    return update(Mundo,{});
}
function onKeyEvent (Mundo, keyCode) {
    //Estas condiciones son las encargadas de indicarle al programa en qué botón se encuentra seleccionado, a la vez que hacen posible el desplazamiento entre botones.
    if (((keyCode==RIGHT_ARROW||keyCode==68)&&Mundo.boton==1)&&Mundo.menu!==3) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:2});
    }
    else if (((keyCode==RIGHT_ARROW||keyCode==68)&&Mundo.boton==2)&&Mundo.menu!==3) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:1});
    }
    else if (((keyCode==LEFT_ARROW||keyCode==65)&&Mundo.boton==2)&&Mundo.menu!==3) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:1});
    }
    else if (((keyCode==LEFT_ARROW||keyCode==65)&&Mundo.boton==1)&&Mundo.menu!==3) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{boton:2});
    }
    //Abre el menú de selección de dificultad en el juego.
    else if ((keyCode==ENTER&&Mundo.boton==1)&&Mundo.menu==1) {
        window.open("menu_principal.html","_self");
        return update(Mundo,{});
    }
    //Estas condiciones abren los archivos de permitir el movimiento entre los menús que hacen parte de las intrucciones (preseleccionan un botón dentro del siguiente menú por defecto).
    else if ((keyCode==ENTER&&Mundo.boton==2)&&Mundo.menu==1) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{menu:Mundo.menu+1,boton:Mundo.boton});
    }
    else if ((keyCode==ENTER&&Mundo.boton==2)&&Mundo.menu==2) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{menu:Mundo.menu+1,boton:Mundo.boton-1});
    }
    else if ((keyCode==ENTER&&Mundo.boton==1)&&Mundo.menu!==1) {
        Mundo.sonido.stop();
        Mundo.sonido.play();
        setup();
        return update(Mundo,{menu:Mundo.menu-1,boton:Mundo.boton});
    }
    else {
        return update(Mundo,{});
    }
 }
//Esta línea carga el fondo de la página a la par del script del juego para que no se vea retraso al cargar la página.
document.body.style.backgroundImage = "url('images/fondo_menus(todos).png')";