let Mundo = {}
let personaje1 = null;
let personaje2 = null;
let personaje3 = null;
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
    personaje1 = loadImage("images/steve_menu.png")
    personaje2 = loadImage("images/cerdo_menu.png")
    personaje3 = loadImage("images/alex_menu.png")
}
function setup() {
    createCanvas(400,400);
    background(255);
    Mundo = {boton:2}
}
function drawGame () {
    //Esta condición es la encargada de dibujar el menú cuando el "botón 2" se encuentra seleccionado.
    if (Mundo.boton==2) {
        rect(50,237.5,45,25);
        textFont('Arial',14)
        text("Selecciona tu personaje:",110,40)
        //Esta pare dibuja los marcos que están por fuera de las imagenes de los personajes.
        rect(20,100,100,100)
        rect(150,100,100,100)
        rect(280,100,100,100)
        //Esta parte dibuja los rectangulos de los botones.
        rect(52.5,240,40,20)
        rect(182.5,240,40,20)
        rect(310,240,40,20)
        rect(10,300,50,20)
        //Esta parte se encarga de dibujar los textos en pantalla.
        textFont("Arial",14)
        text("Steve",55,220)
        text("Porky",185,220)
        text("Alex",315,220)
        text("Jugar",55,255)
        text("Jugar",185,255)
        text("Jugar",312.5,255)
        text("Volver",15,315)
        //Estas 3 lineas son las encargadas de mostrar las imagenes ya cargadas con la función "preload ()" en pantalla.
        image(personaje1,20,100,100,100)
        image(personaje2,150,100,100,100)
        image(personaje3,280,100,100,100)
    }
    else if (Mundo.boton==3) {
        rect(180,237.5,45,25);
        textFont('Arial',14)
        text("Selecciona tu personaje:",110,40)
        rect(20,100,100,100)
        rect(150,100,100,100)
        rect(280,100,100,100)
        rect(52.5,240,40,20)
        rect(182.5,240,40,20)
        rect(310,240,40,20)
        rect(10,300,50,20)
        textFont("Arial",14)
        text("Steve",55,220)
        text("Porky",185,220)
        text("Alex",315,220)
        text("Jugar",55,255)
        text("Jugar",185,255)
        text("Jugar",312.5,255)
        text("Volver",15,315)
        image(personaje1,20,100,100,100)
        image(personaje2,150,100,100,100)
        image(personaje3,280,100,100,100)
    }
    else if (Mundo.boton==4) {
        rect(307.5,237.5,45,25);
        textFont('Arial',14)
        text("Selecciona tu personaje:",110,40)
        rect(20,100,100,100)
        rect(150,100,100,100)
        rect(280,100,100,100)
        rect(52.5,240,40,20)
        rect(182.5,240,40,20)
        rect(310,240,40,20)
        rect(10,300,50,20)
        textFont("Arial",14)
        text("Steve",55,220)
        text("Porky",185,220)
        text("Alex",315,220)
        text("Jugar",55,255)
        text("Jugar",185,255)
        text("Jugar",312.5,255)
        text("Volver",15,315)
        image(personaje1,20,100,100,100)
        image(personaje2,150,100,100,100)
        image(personaje3,280,100,100,100)
    }
    else if (Mundo.boton==1) {
        rect(7.5,297.5,55,25);
        textFont('Arial',14)
        text("Selecciona tu personaje:",110,40)
        rect(20,100,100,100)
        rect(150,100,100,100)
        rect(280,100,100,100)
        rect(52.5,240,40,20)
        rect(182.5,240,40,20)
        rect(310,240,40,20)
        rect(10,300,50,20)
        textFont("Arial",14)
        text("Steve",55,220)
        text("Porky",185,220)
        text("Alex",315,220)
        text("Jugar",55,255)
        text("Jugar",185,255)
        text("Jugar",312.5,255)
        text("Volver",15,315)
        image(personaje1,20,100,100,100)
        image(personaje2,150,100,100,100)
        image(personaje3,280,100,100,100)
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
        window.open("menu.html","_self")
    }
    //Estas 3 condiciones abre los archivos del juego con la apariencia seleccionada en su dificultad.
    else if (keyCode==ENTER&&Mundo.boton==2) {
        window.open("snakeMovimiento(steve-dificil).html","_self")
    }
    else if (keyCode==ENTER&&Mundo.boton==3) {
        window.open("snakeMovimiento(porky-dificil).html","_self")
    }
    else if (keyCode==ENTER&&Mundo.boton==4) {
        window.open("snakeMovimiento(alex-dificil).html","_self")
    }
    //Estas funciones son las que permiten el movimiento de la selección de botones en pantalla (notese que se llama a la función "setup ()" en cada una, de ahí la razón de la función "preload ()").
    else if (keyCode==LEFT_ARROW&&Mundo.boton!==1) {
        setup()
        return update(Mundo,{boton:Mundo.boton-1})
    }
    else if (keyCode==RIGHT_ARROW&&Mundo.boton!==4) {
        setup()
        return update(Mundo,{boton:Mundo.boton+1})
    }
    else if (keyCode==LEFT_ARROW&&Mundo.boton==1) {
        setup()
        return update(Mundo,{boton:4})
    }
    else if (keyCode==RIGHT_ARROW&&Mundo.boton==4) {
        setup()
        return update(Mundo,{boton:1})
    }
    else {
        return update(Mundo,{})
    }
}