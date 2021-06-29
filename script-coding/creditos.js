let Mundo = {}
function setup () {
    createCanvas(400,400);
}
function drawGame (Mundo) {
    //Dibuja un rectangulo alrededor de un botón indicando que está seleccionado.
    rect(172,357,56,26);
    //Dibuja el botón.
    rect(175,360,50,20);
    //Escribe los textos en pantalla.
    textFont("Arial",24);
    text("Créditos",157,30);
    textFont("Arial",18);
    text("Beta-testers",154,60);
    text("Ideas",178,185);
    text("Programador",152,310);
    textFont("Arial",14);
    text("- Scott.",175,85);
    text("- Ryder.",172.5,110);
    text("- Branth.",172.5,135);
    text("- Dayes (ocasionalmente).",115,160);
    text("- Luisa.",175,210);
    text("- Scott.",175,235);
    text("- Branth.",172.5,260);
    text("- Cristian.",170,285);
    text("- Cristian.",170,335);
    text("Volver",181,375);
}
function onMouseEvent (Mundo,event) {
    return update(Mundo,{});
}
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
function onTic (Mundo) {
    return update(Mundo,{});
}
function onKeyEvent (Mundo,keyCode) {
    //Se ejecuta cuando se presiona la tecla "enter" para volver al menú principal.
    if(keyCode==ENTER) {
        window.open("menu_principal.html","_self");
    }
    else {
        return update(Mundo,{});
    }
}