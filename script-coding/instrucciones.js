let Mundo = {}
let flecha1 = null;
let flecha2 = null;
let flecha3 = null;
let flecha4 = null;
function setup () {
    createCanvas(400,400);
    background(255,0,0);
    Mundo = {menu:1,boton:2};
    flecha1 = loadImage("images/flec_izquierda.png");
    flecha2 = loadImage("images/flec_arriba.png");
    flecha3 = loadImage("images/flec_abajo.png");
    flecha4 = loadImage("images/flec_derecha.png");
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) {
    if (Mundo.menu==1&&Mundo.boton==2) {
        rect(203,357,69,25);
        rect(135,360,50,20);
        rect(205,360,65,20);
        textFont('Arial',24);
        text("Instrucciones fundamentales",50,30);
        textFont('Arial',20);
        text("Sistema de movimiento:",1,60);
        text("Apariencias de la serpiente:",1,270);
        textFont('Arial',14);
        text("Para moverte debes pulsar las teclas:",1,80);
        text("Importante:\nSi presionas la tecla contraria a la direccion en la que \nse mueve la serpiente LA SERPIENTE NO CAMBIARA DE\nDIRECCION",1,190);
        text("La apariencia de la serpiente puede ser elegida despues de\nseleccionar la dificultad, si se desea cambiar luego de perder\nen el juego, en la pantalla de puntuacion aparecera un boton\npara cambiar la apariencia la dificultad del juego no se cambia.",1,290);
        text("Volver",140,375);
        text("Siguiente",207.5,375)
        image(flecha1,20,100,75,75);
        image(flecha2,115,100,75,75);
        image(flecha3,210,100,75,75);
        image(flecha4,305,100,75,75);
    }
    else if (Mundo.menu==1) {
        rect(135,360,50,20);
        rect(205,360,65,20);
        textFont('Arial',24);
        text("Instrucciones fundamentales",50,30);
        textFont('Arial',20);
        text("Sistema de movimiento:",1,60);
        text("Apariencias de la serpiente:",1,270);
        textFont('Arial',14);
        text("Para moverte debes pulsar las teclas:",1,80);
        text("Importante:\nSi presionas la tecla contraria a la direccion en la que \nse mueve la serpiente LA SERPIENTE NO CAMBIARA DE\nDIRECCION",1,190);
        text("La apariencia de la serpiente puede ser elegida despues de\nseleccionar la dificultad, si se desea cambiar luego de perder\nen el juego, en la pantalla de puntuacion aparecera un boton\npara cambiar la apariencia la dificultad del juego no se cambia.",1,290);
        text("Volver",140,375);
        text("Siguiente",207.5,375)
        image(flecha1,20,100,75,75);
        image(flecha2,115,100,75,75);
        image(flecha3,210,100,75,75);
        image(flecha4,305,100,75,75);
    }
    else if (Mundo.menu==2&&Mundo.boton==2) {
        rect(203,357,69,25);        
        rect(135,360,50,20);
        rect(205,360,65,20);
        textFont("Arial",20);
        text("Acerca de las dificultades",90,30);
        textFont("Arial",14);
        text("- Facil: En esta dificultad, la velocidad de movimiento es lenta,\nla unica forma de perder es tomando alguna trampa o chocan-\ndo la cabeza de la serpiente con su cola!",2,60)
        text("- Medio: En esta dificultad, la velocidad de movimiento se ve\nlevemente incrementada respecto a la dificultad anterior, las\ntrampas y powerups aparecen con mas frecuencia y solo los\nlaterales del mapa son traspasables, siendo ahora lo limites\nsuperiores no traspasables y si chocas con ellos pierdes!",2,120)
        text("- Dificil: En esta dificultad, la velocidad de movimiento es nota-\nblemente mas rapida respecto a las anteriores, ninguna parte\ndel mapa es traspasable y las trampas aparecen con mucha\nmayor frecuencia.",2,215)
        text("Volver",140,375);
        text("Siguiente",207.5,375);    
    }
    else if (Mundo.menu==2) {
        rect(135,360,50,20);
        rect(205,360,65,20);
        textFont("Arial",20);
        text("Acerca de las dificultades",90,30);
        textFont("Arial",14);
        text("- Facil: En esta dificultad, la velocidad de movimiento es lenta,\nla unica forma de perder es tomando alguna trampa o chocan-\ndo la cabeza de la serpiente con su cola!",2,60)
        text("- Medio: En esta dificultad, la velocidad de movimiento se ve\nlevemente incrementada respecto a la dificultad anterior, las\ntrampas y powerups aparecen con mas frecuencia y solo los\nlaterales del mapa son traspasables, siendo ahora lo limites\nsuperiores no traspasables y si chocas con ellos pierdes!",2,120)
        text("- Dificil: En esta dificultad, la velocidad de movimiento es nota-\nblemente mas rapida respecto a las anteriores, ninguna parte\ndel mapa es traspasable y las trampas aparecen con mucha\nmayor frecuencia.",2,215)
        text("Volver",140,375);
        text("Siguiente",207.5,375);
    }
    else if (Mundo.menu==3) {
        rect(177.5,360,50,20);
        textFont("Arial",20);
        text("Elementos dentro del juego",85,30);
        textFont("Arial",14);
        text("- Comida: La comida ayuda a crecer a la serpiente, cada que\ntu snake come una fruta tu puntuacion aumentara en 1 punto.",3,60);
        text("- Powerup de velocidad: Es un powerup con apariencia azul\nque aparece a partir de tener una puntuacion superior a 4, al\ntomarlo la velocidad del juego aumentara 100% - 33% durante\nun breve periodo de tiempo. Al tomarla las trampas no reapa-\nreceran.",3,100);
        text("- Fruta trampa: Posee la misma apariencia que la comida y el\npowerup, es de color negro y al tomarla ¡automaticamente pier-\ndes!, aparece a partir de los 10 puntos, en caso de no tomarla\nreaparece en un rango de tiempo de 20 segundos, reaparece\nen un rango de 4 casillas en los ejes vertical y horizontal, asi\nque ¡cuidado!",3,190);
        text("- Obstaculos: Aparecen a partir de los 10 puntos, siguen la\nmisma mecanica de la fruta trampa asi que ¡cuidado por don-\nde te mueves!",3,300)
        text("Volver",182.5,375);
    }
}
function onTic (Mundo) {
    return update(Mundo,{});
}
function onMouseEvent (Mundo, event) {
    return update(Mundo,{});
}
function onKeyEvent (Mundo, keyCode) {
    if ((keyCode==RIGHT_ARROW&&Mundo.boton==1)&&Mundo.menu!==3) {
        setup();
        rect(203,357,69,25);
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if ((keyCode==RIGHT_ARROW&&Mundo.boton==2)&&Mundo.menu!==3) {
        setup();
        rect(133,357,54,25);
        return update(Mundo,{boton:Mundo.boton-1});
    }
    else if ((keyCode==LEFT_ARROW&&Mundo.boton==2)&&Mundo.menu!==3) {
        setup();
        rect(133,357,54,25);
        return update(Mundo,{boton:Mundo.boton-1});
    }
    else if ((keyCode==LEFT_ARROW&&Mundo.boton==1)&&Mundo.menu!==3) {
        setup();
        rect(203,357,69,25);
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if ((keyCode==ENTER&&Mundo.boton==1)&&Mundo.menu==1) {
        window.open("menu.html","_self");
    }
    else if ((keyCode==ENTER&&Mundo.boton==2)&&Mundo.menu==1) {
        setup();
        rect(203,357,69,25);
        return update(Mundo,{menu:Mundo.menu+1,boton:Mundo.boton});
    }
    else if ((keyCode==ENTER&&Mundo.boton==2)&&Mundo.menu==2) {
        setup();
        rect(176,357,54,25);
        return update(Mundo,{menu:Mundo.menu+1,boton:Mundo.boton-1});
    }
    else if ((keyCode==ENTER&&Mundo.boton==1)&&Mundo.menu!==1) {
        setup();
        rect(133,357,54,25);
        return update(Mundo,{menu:Mundo.menu-1,boton:Mundo.boton});
    }
    else {
        return update(Mundo,{});
    }
 }