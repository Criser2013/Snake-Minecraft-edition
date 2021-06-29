let Mundo = {}
function setup () {
    createCanvas(400,400);
    Mundo = {boton:1};
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function drawGame (Mundo) {
    if (Mundo.boton==1) {
        rect(149.5,147,101,26);
        rect(152.5,150,95,20);
        rect(152.5,190,95,20);
        rect(152.5,230,95,20);
        textFont("Arial",14);
        text("¡Jugar!",177,165);
        text("¿Cómo jugar?",155,205);
        text("Créditos",173,245);
    }
    else if (Mundo.boton==2) {
        rect(149.5,187,101,26);
        rect(152.5,150,95,20);
        rect(152.5,190,95,20);
        rect(152.5,230,95,20);
        textFont("Arial",14);
        text("¡Jugar!",177,165);
        text("¿Cómo jugar?",155,205);
        text("Créditos",173,245);        
    }
    else if (Mundo.boton==3) {
        rect(149.5,227,101,26);
        rect(152.5,150,95,20);
        rect(152.5,190,95,20);
        rect(152.5,230,95,20);
        textFont("Arial",14);
        text("¡Jugar!",177,165);
        text("¿Cómo jugar?",155,205);
        text("Créditos",173,245);
    }
}
function onTic (Mundo) {
    return update(Mundo,{});
}
function onMouseEvent (Mundo, event) {
    return update(Mundo,{});
}
function onKeyEvent (Mundo, keyCode) {
    if (Mundo.boton==1&&keyCode==ENTER) {
        window.open("menu.html","_self");
    }
    else if (Mundo.boton==2&&keyCode==ENTER) {
        window.open("instrucciones.html","_self");
    }
    else if (Mundo.boton==3&&keyCode==ENTER) {
        window.open("creditos.html","_self");
    }
    else if (Mundo.boton!==3&&keyCode==DOWN_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton+1});
    }
    else if (Mundo.boton!==1&&keyCode==UP_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton-1})
    }
    else if (Mundo.boton==1&&keyCode==UP_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton+2})
    }
    else if (Mundo.boton==3&&keyCode==DOWN_ARROW) {
        setup();
        return update(Mundo,{boton:Mundo.boton-2})
    }
    else {
        return update(Mundo,{});
    }
}