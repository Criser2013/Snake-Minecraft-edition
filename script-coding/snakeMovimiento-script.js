//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/
// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = functionalLight;
debugger;
/*
Contrato: posx,posy () -> number
Proposito: Determina la posición en "X" (posx) y "Y" (posy) de la comida del snake de forma aleatoria dentro del mapa.
Prototipo: posx,posy () {}
Ejemplos: posx,posy () -> {x:4,y:7}
          posx,posy () -> {x:1,y;1}
*/
const x1 = function posx () {
  return Math.ceil(Math.random() * (20 - 1)) + 1;
};
const y1 = function posy () {
  return Math.ceil(Math.random() * (20 - 1)) + 1;
};
/*
Contrato: plus lista -> lista
Proposito: Crea una nueva parte del cuerpo del snake cada que la cabeza del snake colisiona con la comida, apoyandose de una de las condiciones de la función "onTic".
Prototipo: plus (lista) {}
Ejemplos: plus ([{x:1,y:1},{x:2,y:1},{x:1,y:1}]) -> [{x:3,y:1},{x:2,y:1},{x:1,y:1},{x:0,y:1}]
*/
const crecimiento = function plus (lista) {
  if (isEmpty(rest(lista))) {
    return cons(first(lista),cons({x:first(lista).x-1,y:first(lista).y},[]))
  }
  else {
    return cons(first(lista),plus(rest(lista)))
  }
}
// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}
//////////////////////// Mundo inicial
let Mundo = {}
////////////////////////
/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons({x: head.x + dir.x, y: head.y + dir.y}, snake.slice(0, length(snake) - 1));
}
//Estas constantes definen el ancho y alto de los elementos de snake.
const dx = 20;
const dy = 20;

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(5);
  createCanvas(400, 400);
  background(15, 200, 50);
  Mundo = {snake: [{x:3,y:1}, {x:2,y:1}, {x:1,y:1 }],dir:{x:1,y:0},food:{x:Math.ceil(Math.random()*(20-1))+1, y:Math.ceil(Math.random()*(20-1))+1},score:0,colision:false}
}
// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar.
function drawGame(Mundo){
  background(10, 200, 50);
  //Esta linea llama a la función drawFood para dibujar la comida.
  drawFood(Mundo.food);
  //Esta linea llama a la función drawScore para dibujar el puntaje.
  drawScore(Mundo.score);
  fill(240, 240, 240);
  //Esta función se encarga de dibujar cada elemento del snake, incluida la cabeza de la serpiente, todo se dibuja con la misma apariencia y características.
  forEach(Mundo.snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);
  });
  //Esta parte del código es la encargada de dibujar lo que queramos en la cabeza del snake, se pueden modificar todas las coordenadas, excepto: "first(Mundo.snake).x".
  stroke (0);
  fill(13,181,13);
  rect(first(Mundo.snake).x*dx,first(Mundo.snake).y*dy,dx,dy);
  fill (0);
  stroke (0);
  rect((first(Mundo.snake).x*dx)+3.2,(first(Mundo.snake).y*dy)+4,5,5);
  rect((first(Mundo.snake).x*dx)+12,(first(Mundo.snake).y*dy)+4,5,5);
  fill(1);
  rect((first(Mundo.snake).x*dx)+8.2,(first(Mundo.snake).y*dy)+8,3.4,6);
  rect((first(Mundo.snake).x*dx)+6.2,(first(Mundo.snake).y*dy)+11.12,1.7,6);
  rect((first(Mundo.snake).x*dx)+11.6,(first(Mundo.snake).y*dy)+11.12,1.7,6);
}
/*
Contrato: drawFood coordenadas -> food
coordenadas = puntos en los ejes "X" y "Y" generados al azar en el intervalo 1 - 20 por la variable "Mundo"
food = coordenadas en los ejes "X" y "Y", junto a las dimensiones de un circulo.
Proposito: Dibujar la comida en una posición aleatoria en el juego.
Prototipo: drawFood (food) {}
Ejemplos: drawFood (3,4) -> ellipse (3,4,20,20)
          drawFood (20,10) -> ellipse (20,10,20,20)
*/
function drawFood(food) {
  fill (200,20,10);
  ellipse((food.x*dx)-10,(food.y*dy)-10,dx,dy);
}
/*
Contrato: drawScore number -> string
Proposito: Dibuja el puntaje que se lleve en el juego.
Prototipo: drawScore (score) {}
Ejemplos: drawScore (25) -> text("Score: 25");
          drawScore (3) -> text("Score: 3");
*/
function drawScore (score) {
  textFont("Arial",14);
  fill(1);
  text("Score: "+score,10,380);
}
/*
Contrato: colision list -> boolean 
Proposito: Determina si hubo colisión entre la cabeza del snake y alguna parte de su cuerpo (representado en forma de lista).
Prototipo: colision (lista) {}
Ejemplos: colision ([{x:1,y:1},{x:2,y:1},{x:1,y:1}]) -> true
          colision ([{x:3,y:1},{x:2,y:1},{x:1,y:1}]) -> false
*/
function colision (lista) {
  const kbeza = first(Mundo.snake)
  if (isEmpty(rest(lista))) {
    return false;
  }
  else if ((first(rest(lista)).x==kbeza.x)&&(first(rest(lista)).y==kbeza.y)) {
    return true;
  }
  else {
    return colision(rest(lista));
  }
}
/*
Contrato: traslacion list -> list
Proposito: Cambia la posición en el eje "X" de los bloques que componen el cuerpo de la serpiente (incluida la cabeza), si choca con alguno de
los laterales del mapa, si choca con el lateral derecho traslada la cabeza y el cuerpo al lateral izquierdo y en su caso contrario en caso
de chocar con el lateral izquierdo. Este traslado se realiza con ayuda de la funcion "onTic".
Prototipo: traslacion (lista) {}
Ejemplos: traslacion ([{x:20,y:1},{x:19,y:1},{x:18,y:1}]) -> [{x:0,y:1},{x:20,y:1},{x:19,y:1}]
          traslacion ([{x:1,y:1},{x:0,y:1},{x:20,y:1}]) -> [{x:2,y:1},{x:1,y:1},{x:0,y:1}]
*/
function traslacion (lista) {
  if (isEmpty(rest(lista))) {
    return []
  }
  else if (first(lista).x==20) {
    return cons({x:0,y:first(lista).y},rest(lista));
  }
  else if (first(lista).x==-1) {
    return cons({x:20,y:first(lista).y},rest(lista));
  }
  else {
    return cons(first(lista),traslacion(rest(lista)));
  }
}
/*
Contrato: colisionp Mundo -> boolean
Mundo = Posicion del snake, la comida, el puntaje, colisiones, etc.
Proposito: Determina si hubo colision de la cabeza de la serpiente con el límite inferior o superior del mapa, usando la posición de la cabeza del Snake
y la dirección en la que se mueven, SOLO TOMA LA DIRECCIÓN EN EL EJE "Y". Si hubo colisión actualiza el "Mundo" en la parte de colisiones por este valor booleano.
Prototipo: colisionp () {}
Ejemplos: colisionp ({snake:[{x:1,y:19},{x:2,y:18},{x:1,y:17}],dir:{x:0,y:1}) -> true
          colisionp ({snake:[{x:1,y:0},{x:1,y:1},{x:1,y:2}],dir:{x:0,y:-1}) -> true
          colisionp ({snake:[{x:1,y:18},{x:1,y:17},{x:1,y:16}],dir:{x:0,y:1}) -> false
          colisionp ({snake:[{x:1,y:1},{x:1,y:2},{x:1,y:3}],dir:{x:0,y:-1}) -> false
*/
function colisionp () {
  if ((((first(Mundo.snake).y<=0)&&(Mundo.dir.y==-1))||(first(Mundo.snake).y>=19)&&(Mundo.dir.y==1))&&Mundo.colision==false) {
    return true
  }
  else if (Mundo.colision==true) {
    return true
  }
  else {
    return false
  }
}
/*
Contrato: mousePressed () -> setup ()
Proposito: Determina si se clicqueó (botón izquierdo del mouse) el botón de "Jugar de nuevo" cuando se detecta una colision, utiliza la posición
en "X" y "Y" del mouse para determianr si se clicqueó el botón, dibujado por la función "onTic".
Prototipo: mousePressed ()
Ejemplos: mousePressed (mousebButton=LEFT,mouseX=146,mouseY=221) -> setup ().
          mousePressed (mousebButton=RIGHT,mouseX=146,mouseY=221) -> No realiza ninguna acción.
          mousePressed (mousebButton=LEFT,mouseX=256,mouseY=241) -> No realiza ninguna acción.
          mousePressed (mousebButton=LEFT,mouseX=190,mouseY=231) -> setup ().
*/
function mousePressed () {
  if (((mouseButton===LEFT)&&((mouseX>=145&&mouseX<=255)&&(mouseY>=220&&mouseY<=240)))&&Mundo.colision==true) {
    setup()
  }
}
// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
  //Si la funcion colisionp determina que si hubo colisión (retornando un "true"), esto se ejecuta para dibujar el botón de reinicio y mostrar el puntaje alcanzado.
  if (colisionp(Mundo.snake)==true) {
        textFont("Arial",16);
        text("Haz perdido, tu puntuaci\xf3n es: "+Mundo.score,90,200);
        fill(255);
        rect(145,220,110,20);
        fill(1);
        textFont("Arial",14);
        text("Jugar de nuevo",150,235);
        return update(Mundo,{colision:true});
  }
  /* Esta condición actualiza la dirección en "X" del en el Mundo, si la serpiente se mueve hacia la derecha y se presiona la tecla para mover a la 
  izquierda, para que permanezca moviendose hacia la derecha. */
  else if (((first(Mundo.snake).x>first(rest(Mundo.snake)).x)&&Mundo.dir.x==-1)&&colision(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:1,y:0}),dir:{x:1,y:0}});
  }
  //Realiza la misma labor que la condición anterior solo que en la dirección contaria y presionando la tecla contraria.
  else if (((first(Mundo.snake).x<first(rest(Mundo.snake)).x)&&Mundo.dir.x==1)&&colision(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:-1,y:0}),dir:{x:-1,y:0}})
  }
  //Realiza la misma labor que las condiciones anteriores solo que en el eje "Y".
  else if (((first(Mundo.snake).y>first(rest(Mundo.snake)).y)&&Mundo.dir.y==-1)&&colision(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:0,y:1}),dir:{x:0,y:1}})
  }
  else if (((first(Mundo.snake).y<first(rest(Mundo.snake)).y)&&Mundo.dir.y==1)&&colision(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:0,y:-1}),dir:{x:0,y:-1}})
  }
  //Estas 2 condiciones determinan si hubo colisión entre la cabeza del snake y la comida.
  else if ((first(Mundo.snake).x+1==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y)) {
    return update(Mundo,{snake: moveSnake(crecimiento(Mundo.snake),Mundo.dir),food:{x:x1(),y:y1()},score:Mundo.score+1})
  }
  else if (((first(Mundo.snake).x==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y))&&((Mundo.dir.y!==1)&&(Mundo.dir.x!==0))) {
    return update(Mundo,{snake: moveSnake(crecimiento(Mundo.snake),Mundo.dir),food:{x:x1(),y:y1()},score:Mundo.score+1})
  }
  //Estas condiciones determinan si la cabeza del snake se encuentra en los límites laterales del mapa, para asi realizar el cambio de posición.
  else if (first(Mundo.snake).x==20) {
    return update(Mundo,{snake:moveSnake(traslacion(Mundo.snake),Mundo.dir)})
  }
  else if (first(Mundo.snake).x==-1) {
    return update(Mundo,{snake:moveSnake(traslacion(Mundo.snake),Mundo.dir)})
  }
  //Aumenta la velocidad del juego en función del puntaje.
  else if (Mundo.score>=10&&Mundo.score<20) {
    frameRate(7.5);
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)});
  }
  else if (Mundo.score>=20&&Mundo.score<30) {
    frameRate(10);
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)});
  }
  else if (Mundo.score>=30&&Mundo.score<40) {
    frameRate(12.5);
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)});
  }
  else if (Mundo.score>=50) {
    frameRate(15);
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)});
  }
  else {
    //Realiza la mismo que la primera condición de "onTic", solo que ahora es con la colisión de la cabeza del snake con alguna parte de su cuerpo.
    if (colision(Mundo.snake)==true) {
      textFont("Arial",16);
      text("Haz perdido, tu puntuaci\xf3n es: "+Mundo.score,90,200);
      fill(255);
      rect(145,220,110,20);
      fill(1);
      textFont("Arial",14);
      text("Jugar de nuevo",150,235);
      return update(Mundo,{colision:true});
    }
    //Actualiza la posición del snake usando la función "moveSnake".
    else {
        return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)})
    }
  }
}
//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent (Mundo, event) {
   return update(Mundo,{});
}
/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent (Mundo, keyCode) {
  // Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección
  if (keyCode==UP_ARROW&&Mundo.dir.y!==1){
      return update(Mundo, {dir: {y: -1, x: 0}});
  }
  else if (keyCode==DOWN_ARROW&&Mundo.dir.y!==-1) {
      return update(Mundo, {dir: {y: 1, x: 0}});
  }
  else if (keyCode==LEFT_ARROW&&Mundo.dir.x!==1) {
      return update(Mundo, {dir: {y: 0, x: -1}});
  }
  else if (keyCode==RIGHT_ARROW&&Mundo.dir.x!==-1) {
      return update(Mundo, {dir: {y: 0, x: 1}});
  }
  else {
      console.log(keyCode);
      return update(Mundo, {});
  }
}