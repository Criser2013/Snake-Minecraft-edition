let Mundo = {}
let personaje1 = null;
let personaje2 = null;
let personaje3 = null;
function setup() {
    createCanvas(400,400);
    background(255);
    Mundo = {boton:2}
    personaje1 = loadImage("images/steve_menu.png")
    personaje2 = loadImage("images/cerdo_menu.png")
    personaje3 = loadImage("images/alex_menu.png")
}
function drawGame () {
    if (Mundo.boton==2) {
        rect(50,237.5,45,25);
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
    if (keyCode==ENTER&&Mundo.boton==1) {
        window.open("menu.html","_self")
    }
    else if (keyCode==ENTER&&Mundo.boton==2) {
        window.open("snakeMovimiento(steve-medio).html","_self")
    }
    else if (keyCode==ENTER&&Mundo.boton==3) {
        window.open("snakeMovimiento(porky-medio).html","_self")
    }
    else if (keyCode==ENTER&&Mundo.boton==4) {
        window.open("snakeMovimiento(porky-medio).html","_self")
    }
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
        return update(Mundo,{boton:Mundo.boton+3})
    }
    else if (keyCode==RIGHT_ARROW&&Mundo.boton==4) {
        setup()
        return update(Mundo,{boton:Mundo.boton-3})
    }
    else {
        return update(Mundo,{})
    }
}