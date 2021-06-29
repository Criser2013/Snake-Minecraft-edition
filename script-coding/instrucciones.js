let Mundo = {}
let flecha1 = null;
let flecha2 = null;
let flecha3 = null;
let flecha4 = null;
/*
Contrato: preload variable -> image
image = Carga una imagen.
variable = variable local (let)
Proposito: Carga las imagenes (también funciona con archivos JSON) que se muestran en los menus, antes del "setup ()" para acerlerar 
la carga de los elementos en pantalla.
Prototipo: preload () {}
Ejemplos: preload (flecha1,loadImage("images/m1.png")) -> flecha1 = loadImage("images/m1.png") // La imagen se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
          preload (flecha2,loadImage("images/m2.png")) -> flecha2 = loadImage("images/m2.png") // La imagen se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
*/
function preload () {
    flecha1 = loadImage("images/flec_izquierda.png");
    flecha2 = loadImage("images/flec_arriba.png");
    flecha3 = loadImage("images/flec_abajo.png");
    flecha4 = loadImage("images/flec_derecha.png");
}
function setup () {
    createCanvas(400,400);
    Mundo = {menu:1,boton:2};
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) {
    //Dibuja los menús.
    if (Mundo.menu==1) {
        //Ambas condiciones hacen practicamente lo mismo solo cambiando en la selección del botón en el menú.
        if (Mundo.boton==2) {
            //Dibuja un rectangulo por fuera del botón que se encuentra seleccionado para indicar que es la selección actual.
            rect(202,357,71,26);
            //Dibuja los botones.
            rect(120,360,65,20);
            rect(205,360,65,20);
            //Muestra los textos de intrucciones en pantalla.
            textFont('Arial',24);
            text("Instrucciones fundamentales",50,30);
            textFont('Arial',20);
            text("Sistema de movimiento:",1,60);
            text("Apariencias de la serpiente:",1,270);
            textFont('Arial',14);
            text("Para moverte debes pulsar las teclas:",1,80);
            text("Importante:\nSi presionas la tecla contraria a la direccion en la que \nse mueve la serpiente LA SERPIENTE NO CAMBIARA DE\nDIRECCIÓN",1,190);
            text("La apariencia de la serpiente puede ser elegida despues de\nseleccionar la dificultad, si se desea cambiar luego de perder\nen el juego, en la pantalla de puntuación aparecera un botón\npara cambiar la apariencia; la dificultad del juego no se cambia.",1,290);
            //Muestra los textos de los botones en pantalla.
            text("Volver",132.5,375);
            text("Siguiente",207.5,375);
            //Muestra las imagenes en pantalla.
            image(flecha1,20,100,75,75);
            image(flecha2,115,100,75,75);
            image(flecha3,210,100,75,75);
            image(flecha4,305,100,75,75);
        }
        else if (Mundo.boton==1) {
            rect(117,357,71,26);
            rect(120,360,65,20);
            rect(205,360,65,20);
            textFont('Arial',24);
            text("Instrucciones fundamentales",50,30);
            textFont('Arial',20);
            text("Sistema de movimiento:",1,60);
            text("Apariencias de la serpiente:",1,270);
            textFont('Arial',14);
            text("Para moverte debes pulsar las teclas:",1,80);
            text("Importante:\nSi presionas la tecla contraria a la dirección en la que \nse mueve la serpiente LA SERPIENTE NO CAMBIARA DE\nDIRECCIÓN",1,190);
            text("La apariencia de la serpiente puede ser elegida despues de\nseleccionar la dificultad, si se desea cambiar luego de perder\nen el juego, en la pantalla de puntuación aparecera un botón\npara cambiar la apariencia; la dificultad del juego no se cambia.",1,290);
            text("Volver",132.5,375);
            text("Siguiente",207.5,375)
            image(flecha1,20,100,75,75);
            image(flecha2,115,100,75,75);
            image(flecha3,210,100,75,75);
            image(flecha4,305,100,75,75);
        }
    }
    else if (Mundo.menu==2) {
        if (Mundo.boton==2) {
            rect(202,357,71,26);        
            rect(120,360,65,20);
            rect(205,360,65,20);
            textFont("Arial",20);
            text("Acerca de las dificultades",90,30);
            textFont("Arial",14);
            text("- Facil: En esta dificultad, la velocidad de movimiento es lenta,\nla única forma de perder es tomando alguna trampa o chocan-\ndo la cabeza de la serpiente con su cola!",2,60)
            text("- Medio: En esta dificultad, la velocidad de movimiento se ve\nlevemente incrementada respecto a la dificultad anterior, las\ntrampas y powerups aparecen con mas frecuencia y solo los\nlaterales del mapa son traspasables, siendo ahora lo limites\nsuperiores no traspasables y si chocas con ellos pierdes!",2,120)
            text("- Dificil: En esta dificultad, la velocidad de movimiento es nota-\nblemente mas rapida respecto a las anteriores, ninguna parte\ndel mapa es traspasable y las trampas aparecen con mucha\nmayor frecuencia.",2,215)
            text("Volver",132.5,375);
            text("Siguiente",207.5,375);
        }
        else if (Mundo.boton==1) {
            rect(117,357,71,26);
            rect(120,360,65,20);
            rect(205,360,65,20);
            textFont("Arial",20);
            text("Acerca de las dificultades",90,30);
            textFont("Arial",14);
            text("- Facil: En esta dificultad, la velocidad de movimiento es lenta,\nla única forma de perder es tomando alguna trampa o chocan-\ndo la cabeza de la serpiente con su cola!",2,60)
            text("- Medio: En esta dificultad, la velocidad de movimiento se ve\nlevemente incrementada respecto a la dificultad anterior, las\ntrampas y powerups aparecen con mas frecuencia y solo los\nlaterales del mapa son traspasables, siendo ahora lo limites\nsuperiores no traspasables y si chocas con ellos pierdes!",2,120)
            text("- Dificil: En esta dificultad, la velocidad de movimiento es nota-\nblemente mas rapida respecto a las anteriores, ninguna parte\ndel mapa es traspasable y las trampas aparecen con mucha\nmayor frecuencia.",2,215)
            text("Volver",132.5,375);
            text("Siguiente",207.5,375);
        }
    }
    else if (Mundo.menu==3) {
        rect(161.5,357,71,26);
        rect(164.5,360,65,20);
        textFont("Arial",20);
        text("Elementos dentro del juego",85,30);
        textFont("Arial",14);
        text("- Comida: La comida ayuda a crecer a la serpiente, cada que\ntu snake come una fruta tu puntuación aumentará en 1 punto.",3,60);
        text("- Powerup de velocidad: Es un powerup con apariencia azul\nque aparece a partir de tener una puntuación superior a 4, al\ntomarlo la velocidad del juego aumentará 100% - 33% durante\nun breve periodo de tiempo. Al tomarla las trampas no reapa-\nreceran.",3,100);
        text("- Fruta trampa: Posee la misma apariencia que la comida y el\npowerup, es de color negro y al tomarla ¡automaticamente pier-\ndes!, aparece a partir de los 10 puntos, en caso de no tomarla\nreaparece en un rango de tiempo de 20 segundos, reaparece\nen un rango de 4 casillas en los ejes vertical y horizontal, asi\nque ¡cuidado!",3,190);
        text("- Obstaculos: Aparecen a partir de los 10 puntos, siguen la\nmisma mecanica de la fruta trampa asi que ¡cuidado por don-\nde te mueves!",3,300)
        text("Volver",176.5,375);
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
    if ((keyCode==RIGHT_ARROW&&Mundo.boton==1)&&Mundo.menu!==3) {
        setup();
        return update(Mundo,{boton:2});
    }
    else if ((keyCode==RIGHT_ARROW&&Mundo.boton==2)&&Mundo.menu!==3) {
        setup();
        return update(Mundo,{boton:1});
    }
    else if ((keyCode==LEFT_ARROW&&Mundo.boton==2)&&Mundo.menu!==3) {
        setup();
        return update(Mundo,{boton:1});
    }
    else if ((keyCode==LEFT_ARROW&&Mundo.boton==1)&&Mundo.menu!==3) {
        setup();
        return update(Mundo,{boton:2});
    }
    //Abre el menú de selección de dificultad en el juego.
    else if ((keyCode==ENTER&&Mundo.boton==1)&&Mundo.menu==1) {
        window.open("menu_principal.html","_self");
    }
    //Estas condiciones abren los archivos de permitir el movimiento entre los menús que hacen parte de las intrucciones (preseleccionan un botón dentro del siguiente menú por defecto).
    else if ((keyCode==ENTER&&Mundo.boton==2)&&Mundo.menu==1) {
        setup();
        return update(Mundo,{menu:Mundo.menu+1,boton:Mundo.boton});
    }
    else if ((keyCode==ENTER&&Mundo.boton==2)&&Mundo.menu==2) {
        setup();
        return update(Mundo,{menu:Mundo.menu+1,boton:Mundo.boton-1});
    }
    else if ((keyCode==ENTER&&Mundo.boton==1)&&Mundo.menu!==1) {
        setup();
        return update(Mundo,{menu:Mundo.menu-1,boton:Mundo.boton});
    }
    else {
        return update(Mundo,{});
    }
 }