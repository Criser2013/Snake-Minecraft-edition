//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/
// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = functionalLight;
debugger;
/*
Contrato: foodposx,foodposy () -> number
Proposito: Determina la posición en "X" (posx) y "Y" (posy) de la comida del snake de forma aleatoria dentro del mapa.
Prototipo: foodposx,foodposy () {}
Ejemplos: foodposx,foodposy () -> {x:4,y:7}
          foodposx,foodposy () -> {x:1,y;1}
*/
function foodposx () {
  return Math.ceil(Math.random() * (20 - 1)) + 1;
};
function foodposy () {
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
let derp = null;
let obstaculo = null;
////////////////////////
function preload () {
  derp = loadImage("images/cabeza_alex.png");
  obstaculoS = loadImage("images/creeper.png");
}
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
  Mundo = {snake: [{x:3,y:1}, {x:2,y:1}, {x:1,y:1 }],dir:{x:1,y:0},food:{x:Math.ceil(Math.random()*(20-0))+0,y:Math.ceil(Math.random()*(20-0))+0},score:0,colision:false,trampas:{x:Math.ceil(Math.random()*(19-0))+0,y:Math.ceil(Math.random()*(19-0))+0,estado:false},contador:0,obstaculos:{movil:{x:Math.ceil(Math.random()*(19-0))+0,y:Math.ceil(Math.random()*(19-0))+0,},estatico:{x:Math.ceil(Math.random()*(20-0))+0,y:Math.ceil(Math.random()*(20-0))+0}},boton:1}
}
// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar.
function drawGame(Mundo){
  if (Mundo.score>=5&&Mundo.trampas.estado==false) {
    if (Mundo.score>=10&&Mundo.trampas.estado==false) {
      background(10, 200, 50);
      //Esta linea llama a la función drawFood para dibujar la comida.
      drawFood(Mundo.food);
      //Esta linea llama a la función drawScore para dibujar el puntaje.
      drawScore(Mundo.score);
      //Estas lineas llama a la función drawCheat para dibujar las trampas.
      drawCheat(Mundo.trampas);
      //Estas lineas llaman a las funciones drawObstacles(s&M) para dibujar los obstaculos.
      drawObstaclesm(Mundo.obstaculos.movil);
      drawObstaclesS(Mundo.obstaculos.estatico);
      fill(240, 240, 240);
      //Esta función se encarga de dibujar cada elemento del snake, incluida la cabeza de la serpiente, todo se dibuja con la misma apariencia y características.
      forEach(Mundo.snake, s => {
      rect(s.x * dx, s.y * dy, dx, dy);});
      //Esta parte del código es la encargada de dibujar lo que queramos en la cabeza del snake, se pueden modificar todas las coordenadas, excepto: "first(Mundo.snake).x".
      image(derp,(first(Mundo.snake).x)*dx,(first(Mundo.snake).y)*dy,20,20);
    }
    else {
      background(10, 200, 50);
      drawFood(Mundo.food);
      drawScore(Mundo.score);
      drawCheat(Mundo.trampas);
      fill(240, 240, 240);
      forEach(Mundo.snake, s => {
      rect(s.x * dx, s.y * dy, dx, dy);});
      image(derp,(first(Mundo.snake).x)*dx,(first(Mundo.snake).y)*dy,20,20);
    }
  }
  else if (Mundo.score>=10&&Mundo.trampas.estado==true) {
    background(10, 200, 50);
    drawFood(Mundo.food);
    drawScore(Mundo.score);
    drawObstaclesm(Mundo.obstaculos.movil);
    drawObstaclesS(Mundo.obstaculos.estatico);
    fill(240, 240, 240);
    forEach(Mundo.snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);});
    image(derp,(first(Mundo.snake).x)*dx,(first(Mundo.snake).y)*dy,20,20);
  }
  else {
    background(10, 200, 50);
    drawFood(Mundo.food);
    drawScore(Mundo.score);
    fill(240, 240, 240);
    forEach(Mundo.snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);});
    image(derp,(first(Mundo.snake).x)*dx,(first(Mundo.snake).y)*dy,dx,dy);
  }
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
Contrato: drawObstaclesm, drawObstaclesS coordenadas -> obstaculo
coordenadas = puntos en los ejes "X" y "Y" generados al azar en el intervalo 1 - 20 por la variable "Mundo"
obstaculo = coordenadas en los ejes "X" y "Y", junto a las dimensiones de un circulo para dibujar los obstaculos que spawnean en el juego.
Proposito: Dibujar los obstaculos que aparecen a partir de los 10 puntos. DrawObstaclesm se encarga de dibujar los obstaculos moviles y drawObstaclesS
se encarga de dibujar los obstaculos estaticos.
Prototipo: drawObstaclesm, drawObstaclesS (obstaculo) {}
Ejemplos: drawObstaclesm, drawObstaclesS (3,4), (5,4) -> ellipse (3,4,20,20), rect(5,4,20,20)
          drawObstaclesm, drawObstaclesS (10,19), (10,12) -> ellipse (10,19,20,20), rect(10,12,20,20)
*/
function drawObstaclesm (obstaculo) {
  fill(1);
  ellipse((obstaculo.x*dx)-10,(obstaculo.y*dy)-10,dx,dy);
}
function drawObstaclesS (obstaculo) {
  image(obstaculoS,obstaculo.x*dx,obstaculo.y*dy,dx,dy)
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
Contrato: cheatposx,cheatposy () -> number
Proposito: Determina la posición en "X" (posx) y "Y" (posy) de la las trampas dependiendo de las coordenadas en las que se encuentre la cabeza del snake.
No depende de la dirección para spawnear. Spawnea en un rango de mas o menos 3 - 4 casillas de las que se encuentra la cabeza, aplicando condiciones especiales
al llegar a las ultimas 3 casillas de los limites del mapa (se puede dar el caso de que spawnee en la misma posición de la cabeza).
Prototipo: cheatposx,cheatposy () {}
Ejemplos: cheatposx,cheatposy (6,5) {snake:[{x:4,y:2},{x:3,y:2},{x:2,y:2}]} -> 6,5 (Valores posibles en "X": 0 - 7, valores posibles en "Y": 0 - 4)
          cheatposx,cheatposy (2,5) {snake:[{x:2,y:1},{x:11,y:1},{x:10,y:1}]} -> 2,5 (Valores posibles en "X": 0 - 2, valores posibles en "Y": 0 - 4)
          cheatposx,cheatposy (1,4) {snake:[{x:1,y:1},{x:2,y:1},{x:3,y:1}]} -> 1,4 (Valores posibles en "X": 0 - 1, valores posibles en "Y": 0 - 4)
          cheatposx,cheatposy (3,2) {snake:[{x:0,y:1},{x:2,y:1},{x:3,y:1}]} -> 3,2 (Valores posibles en "X": 0 - 3, valores posibles en "Y": 0 - 4)
*/
function cheatposx () {
  //Determina la posición en "X" sumando o restando 4, mientras la cabeza se encuentre entre 3 - 16.
  if ((first(Mundo.snake).x<=16)&&(first(Mundo.snake).x>=3)) {
    return Math.ceil(Math.random() * (((first(Mundo.snake).x)+3)-(first(Mundo.snake).x-4))+(first(Mundo.snake).x)-4);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=2, el rango es diferente al resto.
  else if (first(Mundo.snake).x==2) {
    return Math.ceil(Math.random() * (4-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=1, el rango es diferente al resto.
  else if (first(Mundo.snake).x==1) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=0, el rango es diferente al resto.
  else if (first(Mundo.snake).x==0) {
    return Math.ceil(Math.random() * (3-0)+0);
  }
  //Condiciones dadas si la cabeza se encuentra en las ultimas 3 casillas del mapa (la diferencia es que varían en las posiciones en las que puede spawnear).
  else if (first(Mundo.snake).x==17) {
    return Math.ceil(Math.random() * (19-15)+15);
  }
  else if (first(Mundo.snake).x==18) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if (first(Mundo.snake).x==19) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  //Condiciones dadas cuando se realiza el traslado de la cabeza en uno de los laterales del mapa.
  else if (first(Mundo.snake).x>19) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
  else if (first(Mundo.snake).x<0) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
};
function cheatposy () {
  if ((first(Mundo.snake).y<=16)&&(first(Mundo.snake).y>=3)) {
    return Math.ceil(Math.random() * (((first(Mundo.snake).y)+3)-(first(Mundo.snake).y-3))+first(Mundo.snake).y-3);
  }
  else if (first(Mundo.snake).y==2) {
    return Math.ceil(Math.random() * (4-0)+0);
  }
  else if (first(Mundo.snake).y==1) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
  else if (first(Mundo.snake).y==0) {
    return Math.ceil(Math.random() * (3-0)+0);
  }
  else if (first(Mundo.snake).y==17) {
    return Math.ceil(Math.random() * (19-15)+15);
  }
  else if (first(Mundo.snake).y==18) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if (first(Mundo.snake).y==19) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if (first(Mundo.snake).y>19) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
  else if (first(Mundo.snake).y<0) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
};
/*
Contrato: obsposx,obsposy () -> number
Proposito: Determina la posición en "X" (posx) y "Y" (posy) del los obstaculos al llegar a una puntuación mayor o igual a 10 puntos, spawnea una
trampa movil en un rango de 3 - 4 espacios de la cabeza de la serpiente (tanto en "X" como en "Y"), incluyendo la posición en donde está la cabeza
de la serpiente, depende la dirección para elegir la coordenada. En los límites del mapa se aplican condiciones distintas (3 posiciones en los laterales).
Prototipo: obsposx,obsposy () {}
Ejemplos: obsposx,obsposy (4,5) {snake:[{x:4,y:2},{x:3,y:2},{x:2,y:2}],dir:{x:1,y:0}} -> 4,5 (Valores posibles en "X": 4 - 7, valores posibles en "Y": 0 - 4)
          obsposx,obsposy (10,5) {snake:[{x:12,y:1},{x:11,y:1},{x:10,y:1}],dir:{x:-1,y:0}} -> 10,5 (Valores posibles en "X": 9 - 12, valores posibles en "Y": 0 - 4)
          obsposx,obsposy (0,4) {snake:[{x:1,y:1},{x:2,y:1},{x:3,y:1}],dir:{x:-1,y:0}} -> 0,4 (Valores posibles en "X": 0 - 1, valores posibles en "Y": 0 - 4)
          obsposx,obsposy (1,2) {snake:[{x:1,y:1},{x:2,y:1},{x:3,y:1}],dir:{x:1,y:0}} -> 1,2 (Valores posibles en "X": 1 - 5, valores posibles en "Y": 0 - 4)
          obsposx,obsposy (0,0) {snake:[{x:0,y:1},{x:1,y:1},{x:2,y:1}],dir:{x:-1,y:0}} -> 0,0 (Valores posibles en "X": 0 - 2, valores posibles en "Y": 0 - 4)
          obsposx,obsposy (3,2) {snake:[{x:0,y:1},{x:1,y:1},{x:2,y:1}],dir:{x:1,y:0}} -> 3,2 (Valores posibles en "X": 0 - 4, valores posibles en "Y": 0 - 4)
*/
function obsposx () {
  //Determina la posición en "X" sumando o restando 4, mientras la cabeza se encuentre entre 3 - 16, cuando la serpiente se dirige hacia la derecha. 
  if (Mundo.dir.x==1&&(first(Mundo.snake).x<=16)&&(first(Mundo.snake).x>=3)) {
    return Math.ceil(Math.random()*(((first(Mundo.snake).x)+3)-(first(Mundo.snake).x-1))+first(Mundo.snake).x-1);
  }
  //Determina la posición en "X" sumando o restando 4, mientras la cabeza se encuentre entre 3 - 16, cuando la serpiente se dirige hacia la izquierda. 
  else if (Mundo.dir.x==-1&&(first(Mundo.snake).x<=16)&&(first(Mundo.snake).x>=3)) {
    return Math.ceil(Math.random()*((first(Mundo.snake).x+1)-(first(Mundo.snake).x-4))+first(Mundo.snake).x-4);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=2 y la serpiente se dirige hacia la derecha, el rango es diferente al resto.
  else if ((first(Mundo.snake).x==2)&&(Mundo.dir.x==1)) {
    return Math.ceil(Math.random()*(5+0)-0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=2 y la serpiente se dirige hacia la izquierda, el rango es diferente al resto.
  else if ((first(Mundo.snake).x==2)&&(Mundo.dir.x==-1)) {
    return Math.ceil(Math.random()*(2-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=1 y la serpiente se dirige hacia la derecha, el rango es diferente al resto.
  else if ((first(Mundo.snake).x==1)&&(Mundo.dir.x==1)) {
    return Math.ceil(Math.random() * (4-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=1 y la serpiente se dirige hacia la izquierda, el rango es diferente al resto.
  else if ((first(Mundo.snake).x==1)&&(Mundo.dir.x==-1)) {
    return Math.ceil(Math.random() * (1-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=0 y la serpiente se dirige hacia la derecha, el rango es diferente al resto.
  else if ((first(Mundo.snake).x==0)&&(Mundo.dir.x==1)) {
    return Math.ceil(Math.random() * (3-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=0 y la serpiente se dirige hacia la izquierda, el rango es diferente al resto.
  else if ((first(Mundo.snake).x==0)&&(Mundo.dir.x==-1)) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
  //Condiciones dadas si la cabeza del snake se encuentra en las posiciones X:17 - 19, cambian los intervalos en función de la dirección de movimiento.
  else if ((first(Mundo.snake).x==17)&&(Mundo.dir.x==1)) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if ((first(Mundo.snake).x==17)&&(Mundo.dir.x==-1)) {
    return Math.ceil(Math.random() * (17-13)+13);
  }
  else if ((first(Mundo.snake).x==18)&&(Mundo.dir.x==1)) {
    return Math.ceil(Math.random() * (19-17)+17);
  }
  else if ((first(Mundo.snake).x==18)&&(Mundo.dir.x==-1)) {
    return Math.ceil(Math.random() * (18-15)+15);
  }
  else if ((first(Mundo.snake).x==19)&&(Mundo.dir.x==1)) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if ((first(Mundo.snake).x==19)&&(Mundo.dir.x==-1)) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  //Condiciones dadas cuando la dirección en "X"=0, son las mismas condiciones que las anteriores solo que cambiando los intervalos :c
  else if (Mundo.dir.x==0&&((first(Mundo.snake).x<=16)&&(first(Mundo.snake).x>=3))) {
    return Math.ceil(Math.random()*(((first(Mundo.snake).x)+3)-(first(Mundo.snake).x-3))+first(Mundo.snake).x-3);
  }
  else if ((first(Mundo.snake).x==19)&&(Mundo.dir.x==0)) {
    return Math.ceil(Math.random()*(19-16)+16);
  }
  else if ((first(Mundo.snake).x==18)&&(Mundo.dir.x==0)) {
    return Math.ceil(Math.random() * (19-14)+14);
  }
  else if ((first(Mundo.snake).x==17)&&(Mundo.dir.x==0)) {
    return Math.ceil(Math.random() * (19-13)+13);
  }
  else if ((first(Mundo.snake).x==0)&&(Mundo.dir.x==0)) {
    return Math.ceil(Math.random()*(3-0)+0);
  }
  else if ((first(Mundo.snake).x==1)&&(Mundo.dir.x==0)) {
    return Math.ceil(Math.random() * (4-0)+0)
  }
  else if ((first(Mundo.snake).x==2)&&(Mundo.dir.x==0)) {
    return Math.ceil(Math.random() * (5-0)+0);
  }
  //Condiciones dadas cuando se realiza el traslado de un lateral del mapa a otro.
  else if ((first(Mundo.snake).x)<0) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if ((first(Mundo.snake).x)>19) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
}
function obsposy () {
  if (Mundo.dir.y==1&&(first(Mundo.snake).y<=16)&&(first(Mundo.snake).y>=3)) {
    return Math.ceil(Math.random()*(((first(Mundo.snake).y)+3)-(first(Mundo.snake).y-1))+first(Mundo.snake).y-1);
  }
  else if (Mundo.dir.y==-1&&(first(Mundo.snake).y<=16)&&(first(Mundo.snake).y>=3)) {
    return Math.ceil(Math.random()*((first(Mundo.snake).y)-(first(Mundo.snake).y-4))+first(Mundo.snake).y-4);
  }
  else if ((first(Mundo.snake).y==2)&&(Mundo.dir.y==1)) {
    return Math.ceil(Math.random()*(4-2)+2);
  }
  else if ((first(Mundo.snake).y==2)&&(Mundo.dir.y==-1)) {
    return Math.ceil(Math.random()*(2-0)+0);
  }
  else if ((first(Mundo.snake).y==1)&&(Mundo.dir.y==1)) {
    return Math.ceil(Math.random() * (4-0)+0);
  }
  else if ((first(Mundo.snake).y==1)&&(Mundo.dir.y==-1)) {
    return Math.ceil(Math.random()*(2-0)+0);
  }
  else if ((first(Mundo.snake).y==0)&&(Mundo.dir.y==1)) {
    return Math.ceil(Math.random() * (4-0)+0);
  }
  else if ((first(Mundo.snake).y==0)&&(Mundo.dir.y==-1)) {
    return Math.ceil(Math.random() * (3-0)+0);
  }
  else if ((first(Mundo.snake).y==17)&&(Mundo.dir.y==1)) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if ((first(Mundo.snake).y==17)&&(Mundo.dir.y==-1)) {
    return Math.ceil(Math.random() * (17-13)+13);
  }
  else if ((first(Mundo.snake).y==18)&&(Mundo.dir.y==1)) {
    return Math.ceil(Math.random() * (19-17)+17);
  }
  else if ((first(Mundo.snake).y==18)&&(Mundo.dir.y==-1)) {
    return Math.ceil(Math.random() * (18-15)+15);
  }
  else if ((first(Mundo.snake).y==19)&&(Mundo.dir.y==1)) {
    return Math.ceil(Math.random()*(19-16)+16);
  }
  else if ((first(Mundo.snake).y==19)&&(Mundo.dir.y==-1)) {
    return Math.ceil(Math.random()*(19-16)+16);
  }
  else if (Mundo.dir.y==0&&((first(Mundo.snake).y<=16)&&(first(Mundo.snake).y>=3))) {
    return Math.ceil(Math.random()*(((first(Mundo.snake).y)+3)-(first(Mundo.snake).y-3))+first(Mundo.snake).y-3);
  }
  else if ((first(Mundo.snake).y==19)&&(Mundo.dir.y==0)) {
    return Math.ceil(Math.random()*(19-16)+16);
  }
  else if ((first(Mundo.snake).y==18)&&(Mundo.dir.y==0)) {
    return Math.ceil(Math.random() * (19-15)+15);
  }
  else if ((first(Mundo.snake).y==17)&&(Mundo.dir.y==0)) {
    return Math.ceil(Math.random() * (19-14)+14);
  }
  else if ((first(Mundo.snake).y==0)&&(Mundo.dir.y==0)) {
    return Math.ceil(Math.random()*(3-0)+0);
  }
  else if ((first(Mundo.snake).y==1)&&(Mundo.dir.y==0)) {
    return Math.ceil(Math.random() * (4-0)+0)
  }
  else if ((first(Mundo.snake).y==2)&&(Mundo.dir.y==0)) {
    return Math.ceil(Math.random() * (5-0)+0);
  }
  else if ((first(Mundo.snake).y)<0) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if ((first(Mundo.snake).y)>19) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
}
/*
Contrato: drawCheat coordenadas -> cheat
coordenadas = puntos en los ejes "X" y "Y" generados al azar en el intervalo 1 - 20 por la variable "Mundo".
cheat = coordenadas en los ejes "X" y "Y", junto a las dimensiones de un circulo para dibujar las trampas dentro el juego.
Proposito: Determina la posición en "X" (posx) y "Y" (posy) de la comida del snake de forma aleatoria dentro del mapa.
Prototipo: foodposx,foodposy () {}
Ejemplos: drawCheat (4,7) -> ellipse (3,4,20,20)
          drawCheat (1,1) -> ellipse (3,4,20,20)
*/
function drawCheat (trampa) {
  fill(0,0,255);
  ellipse((trampa.x*dx)-10,(trampa.y*dy)-10,dx,dy);
}
/*
Contrato: colisionCabeza list -> boolean 
Proposito: Determina si hubo colisión entre la cabeza del snake y alguna parte de su cuerpo (representado en forma de lista).
Prototipo: colisionCabeza (lista) {}
Ejemplos: colisionCabeza ([{x:1,y:1},{x:2,y:1},{x:1,y:1}]) -> true
          colisionCabeza ([{x:3,y:1},{x:2,y:1},{x:1,y:1}]) -> false
*/
function colisionCabeza (lista) {
  const kbeza = first(Mundo.snake)
  if (isEmpty(rest(lista))) {
    return false;
  }
  else if ((first(rest(lista)).x==kbeza.x)&&(first(rest(lista)).y==kbeza.y)) {
    return true;
  }
  else if ((first(lista).x==first(rest(lista)).x)&&(first(lista).y==first(rest(lista)).y)) {
    return true;
  }
  else {
    return colisionCabeza(rest(lista));
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
  else if (first(lista).x>=20) {
    return cons({x:0,y:first(lista).y},rest(lista));
  }
  else if (first(lista).x<=-1) {
    return cons({x:20,y:first(lista).y},rest(lista));
  }
  else if (first(lista).y<=-1) {
    return cons({x:first(lista).x,y:20},rest(lista));
  }
  else if (first(lista).y>=20) {
    return cons({x:first(lista).x,y:0},rest(lista));
  }
  else {
    return cons(first(lista),traslacion(rest(lista)));
  }
}
/*
Contrato: colisionparedes Mundo -> boolean
Mundo = Posicion del snake, la comida, el puntaje, colisiones, etc.
Proposito: Determina si hubo colision de la cabeza de la serpiente con el límite inferior o superior del mapa, usando la posición de la cabeza del Snake
y la dirección en la que se mueven, SOLO TOMA LA DIRECCIÓN EN EL EJE "Y". Si hubo colisión actualiza el "Mundo" en la parte de colisiones por este valor booleano.
Prototipo: colisionparedes () {}
Ejemplos: colisionparedes ({snake:[{x:1,y:19},{x:2,y:18},{x:1,y:17}],dir:{x:0,y:1}) -> true
          colisionparedes ({snake:[{x:1,y:0},{x:1,y:1},{x:1,y:2}],dir:{x:0,y:-1}) -> true
          colisionparedes ({snake:[{x:1,y:18},{x:1,y:17},{x:1,y:16}],dir:{x:0,y:1}) -> false
          colisionparedes ({snake:[{x:1,y:1},{x:1,y:2},{x:1,y:3}],dir:{x:0,y:-1}) -> false
*/
function colisionparedes () {
  //Estas 3 condiciones determinan si hubo colisión con una de las trampas estaticas que spawnean de forma aleatoria a partir de los 10 puntos.
  if (((((first(Mundo.snake).x+1==Mundo.obstaculos.estatico.x)&&(Mundo.dir.x==1))&&(first(Mundo.snake).y==Mundo.obstaculos.estatico.y))||(((first(Mundo.snake).x-1==Mundo.obstaculos.estatico.x)&&(Mundo.dir.x==-1)))&&(first(Mundo.snake).y==Mundo.obstaculos.estatico.y))&&Mundo.score>=10) {
    return true
  }
  else if (((((first(Mundo.snake).y+1==Mundo.obstaculos.estatico.y)&&(Mundo.dir.y==1))&&(first(Mundo.snake).x==Mundo.obstaculos.estatico.x))||(((first(Mundo.snake).y-1==Mundo.obstaculos.estatico.y)&&(Mundo.dir.y==-1)))&&(first(Mundo.snake).x==Mundo.obstaculos.estatico.x))&&Mundo.score>=10) {
    return true
  }
  else if ((first(Mundo.snake).x==Mundo.obstaculos.estatico.x)&&(first(Mundo.snake).y==Mundo.obstaculos.estatico.y)) {
    return false
  }
  //Estas 2 condiciones determinan si hubo colision con alguna de las trampas que spawnean cerca de la cabeza del snake (se incluye el contador para evitar que si una trampa spawnea justo en la posición de la cabeza del snake se pierda el juego de manera injusta).
  else if ((first(Mundo.snake).x+1==Mundo.obstaculos.movil.x)&&(first(Mundo.snake).y+1==Mundo.obstaculos.movil.y)&&Mundo.score>=10&&(Mundo.contador>1)) {
    return true
  }
  else if ((((first(Mundo.snake).x==Mundo.obstaculos.movil.x)&&(first(Mundo.snake).y+1==Mundo.obstaculos.movil.y))&&((Mundo.dir.y!==1)&&(Mundo.dir.x!==0)&&(Mundo.dir.x!==1)))&&Mundo.score>=10) {
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
Contrato: fpscheat () -> number
Proposito: Determina la velocidad de refresco de los fotogramas en función del puntaje (actua como funcion auxiliar de la función "onTic" dentro de
los condicionales dedicados al spawn de las trampas y sus efectos).
Prototipo: fpscheat () {}
Ejemplos: fpscheat (0) -> 5
          fpscheat (10) -> 7.5
          fpscheat (20) -> 10
          fpscheat (30) -> 12.5
          fpscheat (50) -> 15
          fpscheat (69) -> 15
*/
function fpscheat () {
  if (Mundo.score>=0&&Mundo.score<10) {
    return 5
  }
  else if (Mundo.score>=10&&Mundo.score<20) {
    return 7.5
  }
  else if (Mundo.score>=20&&Mundo.score<30) {
    return 10
  }
  else if (Mundo.score>=30&&Mundo.score<50) {
    return 12.5
  }
  else if (Mundo.score>=50) {
    return 15
  }
}
// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
  //Si la funcion colisionparedes determina que si hubo colisión (retornando un "true"), esto se ejecuta para mostrar el puntaje alcanzado.
  if (colisionparedes(Mundo.snake)==true) {
    fill(1);
    textFont("Arial",16);
    text("Haz perdido, tu puntuaci\xf3n es: "+Mundo.score,90,190);
    text("Presiona cualquier tecla para continuar.",70,240);
    return update(Mundo,{colision:true});
  }
  //Realiza lo mismo que la condición anterior, solo que ahora es con la colisión de la cabeza del snake con alguna parte de su cuerpo.
  else if (colisionCabeza(Mundo.snake)==true) {
    fill(1);
    textFont("Arial",16);
    text("Haz perdido, tu puntuaci\xf3n es: "+Mundo.score,90,190);
    text("Presiona cualquier tecla para continuar.",70,240);
    return update(Mundo,{colision:true});
  }
  /* Esta condición actualiza la dirección en "X" del en el Mundo, si la serpiente se mueve hacia la derecha y se presiona la tecla para mover a la 
  izquierda, para que permanezca moviendose hacia la derecha. */
  else if (((first(Mundo.snake).x>first(rest(Mundo.snake)).x)&&Mundo.dir.x==-1)&&colisionCabeza(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:1,y:0}),dir:{x:1,y:0}});
  }
  //Realiza la misma labor que la condición anterior solo que en la dirección contaria y presionando la tecla contraria.
  else if (((first(Mundo.snake).x<first(rest(Mundo.snake)).x)&&Mundo.dir.x==1)&&colisionCabeza(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:-1,y:0}),dir:{x:-1,y:0}})
  }
  //Realiza la misma labor que las condiciones anteriores solo que en el eje "Y".
  else if (((first(Mundo.snake).y>first(rest(Mundo.snake)).y)&&Mundo.dir.y==-1)&&colisionCabeza(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:0,y:1}),dir:{x:0,y:1}})
  }
  else if (((first(Mundo.snake).y<first(rest(Mundo.snake)).y)&&Mundo.dir.y==1)&&colisionCabeza(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:0,y:-1}),dir:{x:0,y:-1}})
  }
  //Esta condicion se ejecuta cuando la serpiente toma la comida y la comida se encuentra en la misma posicion que un powerup de velocidad, esta condicion activa la suma del score y activa el efecto de aumento de velocidad.
  else if (((Mundo.food.x==Mundo.trampas.x&&Mundo.food.y==Mundo.food.x)&&((first(Mundo.snake).x+1==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y)||((first(Mundo.snake).x==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y))&&((Mundo.dir.y!==1)&&(Mundo.dir.x!==0))))&&Mundo.score>=5) {
    frameRate(fpscheat()+5)
    return update(Mundo,{snake:moveSnake(crecimiento(Mundo.snake),Mundo.dir),food:{x:foodposx(),y:foodposy()},score:Mundo.score+1,trampas:{estado:true},contador:Mundo.contador+1})
  }
  //Estas 2 condiciones determinan si hubo colisión entre la cabeza del snake y la comida.
  else if ((first(Mundo.snake).x+1==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y)) {
  return update(Mundo,{snake: moveSnake(crecimiento(Mundo.snake),Mundo.dir),food:{x:foodposx(),y:foodposy()},score:Mundo.score+1})
  }
  else if (((first(Mundo.snake).x==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y))&&((Mundo.dir.y!==1)&&(Mundo.dir.x!==0))) {
    return update(Mundo,{snake: moveSnake(crecimiento(Mundo.snake),Mundo.dir),food:{x:foodposx(),y:foodposy()},score:Mundo.score+1})
  }
   //Esta condicion determina si hubo colisión entre la cabeza del snake y una trampa, aparte de habilitar el efecto de aumento de velocidad, aumentando los FPS del juego 5.
   else if (((first(Mundo.snake).x+1==Mundo.trampas.x)&&(first(Mundo.snake).y+1==Mundo.trampas.y))&&Mundo.score>=5) {
    frameRate(fpscheat()+5)
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),trampas:{estado:true},contador:Mundo.contador+1})
  }
  else if ((((first(Mundo.snake).x==Mundo.trampas.x)&&(first(Mundo.snake).y+1==Mundo.trampas.y))&&((Mundo.dir.y!==1)&&(Mundo.dir.x!==0)))&&Mundo.score>=5) {
    frameRate(fpscheat()+5)
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),trampas:{estado:true},contador:Mundo.contador+1})
  }
   //Esta condición es la encargada de hacer desaparecer el efecto de aumento de velocidad en la serpiente luego de 20 segundos 
  else if (Mundo.contador==80&&Mundo.trampas.estado==true) {
    frameRate(fpscheat())
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),trampas:{x:cheatposx(),y:cheatposy(),estado:false},contador:0})
  }
  //Estas condiciones determinan si la cabeza del snake se encuentra en los límites laterales del mapa, para asi realizar el cambio de posición.
  else if (first(Mundo.snake).x>=20) {
    return update(Mundo,{snake:moveSnake(traslacion(Mundo.snake),Mundo.dir)})
  }
  else if (first(Mundo.snake).x<=-1) {
    return update(Mundo,{snake:moveSnake(traslacion(Mundo.snake),Mundo.dir)})
  }
  else if (first(Mundo.snake).y<=-1) {
    return update(Mundo,{snake:moveSnake(traslacion(Mundo.snake),Mundo.dir)})
  }
  else if (first(Mundo.snake).y>=20) {
    return update(Mundo,{snake:moveSnake(traslacion(Mundo.snake),Mundo.dir)})
  }
   //Estas 2 condiciones determinan si hubo colisión entre la cabeza del snake y la comida.
  else if (Mundo.trampas.estado==true&&Mundo.contador<80) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),contador:Mundo.contador+1})
  }
   //Esta condición actua como cronometro para spawnear una nueva trampa siempre y cuando el usuario no la haya cogido.
  else if ((Mundo.contador>=0&&Mundo.contador<40)&&Mundo.trampas.estado==false) {
    frameRate(fpscheat());
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),contador:Mundo.contador+1})
  }
   //Esta condicion spawnea una nueva trampa y nuevos obstaculos cada que la condicion anterior alcanza un valor de 40 en el parametro "contador" del mundo.
  else if (Mundo.contador==40&&Mundo.trampas.estado==false) {
    frameRate(fpscheat());
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),trampas:{x:cheatposx(),y:cheatposy(),estado:false},obstaculos:{movil:{x:obsposx(),y:obsposy()},estatico:{x:cheatposx(),y:cheatposy()}},contador:0})
  }
  //Aumenta la velocidad del juego en función del puntaje.
  else if (Mundo.score>=10&&Mundo.score<20&&(Mundo.trampas.estado==false&&Mundo.contador==0)) {
    frameRate(7.5);
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)})
  }
  else if (Mundo.score>=20&&Mundo.score<30&&(Mundo.trampas.estado==false&&Mundo.contador==0)) {
    frameRate(10);
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)});
  }
  else if (Mundo.score>=30&&Mundo.score<50&&(Mundo.trampas.estado==false&&Mundo.contador==0)) {
    frameRate(12.5);
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)});
  }
  else if (Mundo.score>=50&&(Mundo.trampas.estado==false&&Mundo.contador==0)) {
    frameRate(15);
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)});
  }
  else {
    //Actualiza la posición del snake usando la función "moveSnake".
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir)})
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
  if ((keyCode==UP_ARROW&&Mundo.dir.y!==1)&&Mundo.colision==false){
      return update(Mundo, {dir: {y: -1, x: 0}});
  }
  else if ((keyCode==DOWN_ARROW&&Mundo.dir.y!==-1)&&Mundo.colision==false) {
      return update(Mundo, {dir: {y: 1, x: 0}});
  }
  else if ((keyCode==LEFT_ARROW&&Mundo.dir.x!==1)&&Mundo.colision==false) {
      return update(Mundo, {dir: {y: 0, x: -1}});
  }
  else if ((keyCode==RIGHT_ARROW&&Mundo.dir.x!==-1)&&Mundo.colision==false) {
      return update(Mundo, {dir: {y: 0, x: 1}});
  }
  else if (Mundo.colision==true) {
    window.open("perdido(alex-facil).html","_self")
  }
  else {
      console.log(keyCode);
      return update(Mundo, {});
  }
}