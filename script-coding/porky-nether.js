//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/
// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = functionalLight;
/*
Contrato: foodpos () -> number
Proposito: Determina la posición en "X" y "Y" de la comida del snake de forma aleatoria dentro del mapa.
Prototipo: foodpos () {}
Ejemplos: foodpos () -> {x:4,y:7}
          foodpos () -> {x:1,y;1}
*/
function foodpos () {
  return Math.abs(Math.ceil(Math.random() * (19 + 1)) - 1);
};
/*
Contrato: crecimiento lista -> lista
Proposito: Crea una nueva parte del cuerpo del snake cada que la cabeza del snake colisiona con la comida, apoyandose de una de las condiciones de la función "onTic".
Prototipo: crecimiento (lista) {}
Ejemplos: crecimiento ([{x:1,y:1},{x:2,y:1},{x:1,y:1}]) -> [{x:3,y:1},{x:2,y:1},{x:1,y:1},{x:0,y:1}]
*/
function crecimiento (lista) {
  if (isEmpty(rest(lista))) {
    return cons(first(lista),cons({x:first(lista).x-1,y:first(lista).y},[]))
  }
  else {
    return cons(first(lista),crecimiento(rest(lista)))
  }
}
// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}
//////////////////////// Mundo inicial
let Mundo = {}
let cara = null;
let obstaculoS = null;
let obstaculoS1 = null;
let obstaculoS2 = null;
let obstaculoS3 = null;
let comida = null;
let powerup = null;
let trampa = null;
let mapa = null;
let fuente = null;
////////////////////////
/*
Contrato: preload variable -> image
image = Carga una imagen.
variable = variable local (let)
Proposito: Carga las imagenes (también funciona con archivos JSON) que se muestran en los menus, antes del "setup ()" para acerlerar 
la carga de los elementos en pantalla.
Prototipo: preload () {}
Ejemplos: preload (cara,loadImage("images/m1.png")) -> cara = loadImage("images/m1.png") // La imagen se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
          preload (obstaculo,loadImage("images/m2.png")) -> obstavulo = loadImage("images/m2.png") // La imagen se carga en la memoria de forma permanente aún hasta cuando se llame a la funcion setup ().
*/
function preload () {
  cara = loadImage("images/cerdo.png");
  obstaculoS = loadImage("images/cabeza_wither.png");
  obstaculoS1 = loadImage("images/cabeza_esqueletowither.png");
  obstaculoS2 = loadImage("images/cabeza_cerdozombie.png");
  obstaculoS3 = loadImage("images/cabeza_esqueleto.png");
  comida = loadImage("images/manzana.png");
  powerup = loadImage("images/manzana_dorada.png");
  trampa = loadImage("images/ojo_araña.png");
  mapa = loadImage("images/nether.png");
  fuente = loadFont("minecraft.otf");
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
  frameRate(10);
  createCanvas(400, 400);
  background(mapa);
  Mundo = {snake: [{x:3,y:1}, {x:2,y:1}, {x:1,y:1 }],dir:{x:1,y:0},food:{x:foodpos(),y:foodpos()},score:0,colision:false,trampas:{x:foodpos(),y:foodpos(),estado:false},contador:0,obstaculos:{movil:{x:foodpos(),y:foodpos()},estatico:{x:foodpos(),y:foodpos()},respawn:false},sonidos:{muerte: new buzz.sound("audio/muerte",{formats:["mp3"],volume: 40,preload:true}),comer:new buzz.sound("audio/comiendo",{formats:["mp3"],volume: 40,preload:true})},enemigos:{primero:new buzz.sound("audio/cerdo_zombie",{formats:["mp3"],volume: 40,preload:true}),segundo:new buzz.sound("audio/esqueleto",{formats:["mp3"],volume: 40,preload:true}),tercero:new buzz.sound("audio/esqueleto",{formats:["mp3"],volume: 40,preload:true}),cuarto:new buzz.sound("audio/wither",{formats:["mp3"],volume: 40,preload:true})},reproductor:true}
}
// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar.
function drawGame(Mundo){
  if (Mundo.score>=5&&Mundo.trampas.estado==false) {
    if (Mundo.score>=10&&Mundo.trampas.estado==false) {
      background(mapa);
      //Esta linea llama a la función drawFood para dibujar la comida.
      drawFood(Mundo.food);
      //Estas lineas llama a la función drawCheat para dibujar las trampas.
      drawCheat(Mundo.trampas);
      //Estas lineas llaman a las funciones drawObstacles(s&M) para dibujar los obstaculos.
      drawObstaclesm(Mundo.obstaculos.movil);
      drawObstaclesS(Mundo.obstaculos.estatico);
      fill(255,166,194);
      //Esta función se encarga de dibujar cada elemento del snake, incluida la cabeza de la serpiente, todo se dibuja con la misma apariencia y características.
      forEach(Mundo.snake, s => {
      rect(s.x * dx, s.y * dy, dx, dy);});
      //Esta parte del código es la encargada de dibujar lo que queramos en la cabeza del snake, se pueden modificar todas las coordenadas, excepto: "first(Mundo.snake).x".
      image(cara,(first(Mundo.snake).x)*dx,(first(Mundo.snake).y)*dy,20,20);
      //Esta linea llama a la función drawScore para dibujar el puntaje.
      drawScore(Mundo.score); 
    }
    else {
      background(mapa);
      drawFood(Mundo.food);
      drawCheat(Mundo.trampas);
      fill(255,166,194);
      forEach(Mundo.snake, s => {
      rect(s.x * dx, s.y * dy, dx, dy);});
      image(cara,(first(Mundo.snake).x)*dx,(first(Mundo.snake).y)*dy,20,20);
      drawScore(Mundo.score);
    }
  }
  else if (Mundo.score>=10&&Mundo.trampas.estado==true) {
    background(mapa);
    drawFood(Mundo.food);
    drawObstaclesm(Mundo.obstaculos.movil);
    drawObstaclesS(Mundo.obstaculos.estatico);
    fill(255,166,194);
    forEach(Mundo.snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);});
    image(cara,(first(Mundo.snake).x)*dx,(first(Mundo.snake).y)*dy,20,20);
    drawScore(Mundo.score);
  }
  else {
    background(mapa);
    drawFood(Mundo.food);
    fill(255,166,194);
    forEach(Mundo.snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);});
    image(cara,(first(Mundo.snake).x)*dx,(first(Mundo.snake).y)*dy,dx,dy);
    drawScore(Mundo.score);
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
  image(comida,food.x*dx,food.y*dy,dx,dy);
}
/*
Contrato: drawObstaclesm, drawObstaclesS coordenadas -> obstaculo
coordenadas = puntos en los ejes "X" y "Y" generados al azar en el intervalo 1 - 20 por la variable "Mundo"
obstaculo = coordenadas en los ejes "X" y "Y", junto a las dimensiones de un circulo para dibujar los obstaculos que spawnean en el juego.
Proposito: Dibujar los obstaculos que aparecen a partir de los 10 puntos. DrawObstaclesm se encarga de dibujar los obstaculos moviles y drawObstaclesS
se encarga de dibujar los obstaculos estaticos. En drawObstaclesS la imagen que tiene cada obstaculo cambia en función del puntaje actual del jugador.
Prototipo: drawObstaclesm, drawObstaclesS (obstaculo) {}
Ejemplos: drawObstaclesm, drawObstaclesS (3,4), (5,4) -> ellipse (3,4,20,20), rect(5,4,20,20)
          drawObstaclesm, drawObstaclesS (10,19), (10,12) -> ellipse (10,19,20,20), rect(10,12,20,20)
*/
function drawObstaclesm (obstaculo) {
  image(trampa,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
}
function drawObstaclesS (obstaculo) {
  if (Mundo.score>=10&&Mundo.score<20) {
    if (Mundo.reproductor==true&&Mundo.colision==false) {
      Mundo.enemigos.primero.play();
      image(obstaculoS2,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
    else {
      image(obstaculoS2,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
  }
  else if (Mundo.score>=20&&Mundo.score<30) {
    if (Mundo.reproductor==true&&Mundo.colision==false) {
      Mundo.enemigos.segundo.play();
      image(obstaculoS3,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
    else {
      image(obstaculoS3,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
  }
  else if (Mundo.score>=30&&Mundo.score<50) {
    if (Mundo.reproductor==true&&Mundo.colision==false) {
      Mundo.enemigos.tercero.play();
      image(obstaculoS1,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
    else {      
      image(obstaculoS1,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
  }
  else if (Mundo.score>=50) {
    if (Mundo.reproductor==true&&Mundo.colision==false) {
      Mundo.enemigos.cuarto.play();
      image(obstaculoS,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
    else {      
      image(obstaculoS,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
  }
}
/*
Contrato: drawScore number -> string
Proposito: Dibuja el puntaje que se lleve en el juego.
Prototipo: drawScore (score) {}
Ejemplos: drawScore (25) -> text("Score: 25");
          drawScore (3) -> text("Score: 3");
*/
function drawScore (score) {
  stroke(1);
  textFont(fuente,14);
  fill(255);
  text("Puntuación: "+score,10,380);
}
/*
Contrato: cheatpos number -> number
Proposito: Determina la posición en "X" y "Y" de la las trampas dependiendo de las coordenadas en las que se encuentre la cabeza del snake.
No depende de la dirección para spawnear. Spawnea en un rango de mas o menos 3 - 4 casillas de las que se encuentra la cabeza, aplicando condiciones especiales
al llegar a las ultimas 3 casillas de los limites del mapa (se puede dar el caso de que spawnee en la misma posición de la cabeza).
Prototipo: cheatposx,cheatpos () {}
Ejemplos: cheatpos (4) {snake:[{x:4,y:2},{x:3,y:2},{x:2,y:2}]} -> 6 (Valores posibles en "X": 0 - 7, valores posibles en "Y": 0 - 4)
          cheatpos (2) {snake:[{x:2,y:1},{x:11,y:1},{x:10,y:1}]} -> 2 (Valores posibles en "X": 0 - 2, valores posibles en "Y": 0 - 4)
          cheatpos (1) {snake:[{x:1,y:1},{x:2,y:1},{x:3,y:1}]} -> 1 (Valores posibles en "X": 0 - 1, valores posibles en "Y": 0 - 4)
          cheatpos (0) {snake:[{x:0,y:1},{x:2,y:1},{x:3,y:1}]} -> 3 (Valores posibles en "X": 0 - 3, valores posibles en "Y": 0 - 4)
*/
function cheatpos (cabeza) {
  //Determina la posición en "X" sumando o restando 4, mientras la cabeza se encuentre entre 3 - 16.
  if ((cabeza<=16)&&(cabeza>=3)) {
    return Math.ceil(Math.random() * (((cabeza)+3)-(cabeza-4))+(cabeza)-4);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=2, el rango es diferente al resto.
  else if (cabeza==2) {
    return Math.ceil(Math.random() * (4-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=1, el rango es diferente al resto.
  else if (cabeza==1) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=0, el rango es diferente al resto.
  else if (cabeza==0) {
    return Math.ceil(Math.random() * (3-0)+0);
  }
  //Condiciones dadas si la cabeza se encuentra en las ultimas 3 casillas del mapa (la diferencia es que varían en las posiciones en las que puede spawnear).
  else if (cabeza==17) {
    return Math.ceil(Math.random() * (19-15)+15);
  }
  else if ((cabeza==18)||(cabeza==19)) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
else if (cabeza>19) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
  else if (cabeza<0) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
};
/*
Contrato: obspos number,number -> number
Proposito: Determina la posición en "X" (posx) y "Y" (posy) del los obstaculos al llegar a una puntuación mayor o igual a 10 puntos, spawnea una
trampa movil en un rango de 3 - 4 espacios de la cabeza de la serpiente (tanto en "X" como en "Y"), incluyendo la posición en donde está la cabeza
de la serpiente, depende la dirección para elegir la coordenada. En los límites del mapa se aplican condiciones distintas (3 posiciones en los laterales).
Prototipo: obspos (cabeza,direccion) {}
Ejemplos: obspos (4,1) {snake:[{x:4,y:2},{x:3,y:2},{x:2,y:2}],dir:{x:1,y:0}} -> 4,5 (Valores posibles en "X": 4 - 7, valores posibles en "Y": 0 - 4)
          obspos (12,-1) {snake:[{x:12,y:1},{x:11,y:1},{x:10,y:1}],dir:{x:-1,y:0}} -> 10,5 (Valores posibles en "X": 9 - 12, valores posibles en "Y": 0 - 4)
          obspos (1,-1) {snake:[{x:1,y:1},{x:2,y:1},{x:3,y:1}],dir:{x:-1,y:0}} -> 0,4 (Valores posibles en "X": 0 - 1, valores posibles en "Y": 0 - 4)
          obspos (1,1) {snake:[{x:1,y:1},{x:2,y:1},{x:3,y:1}],dir:{x:1,y:0}} -> 1,2 (Valores posibles en "X": 1 - 5, valores posibles en "Y": 0 - 4)
          obspos (0,-1) {snake:[{x:0,y:1},{x:1,y:1},{x:2,y:1}],dir:{x:-1,y:0}} -> 0,0 (Valores posibles en "X": 0 - 2, valores posibles en "Y": 0 - 4)
          obspos (0,1) {snake:[{x:0,y:1},{x:1,y:1},{x:2,y:1}],dir:{x:1,y:0}} -> 3,2 (Valores posibles en "X": 0 - 4, valores posibles en "Y": 0 - 4)
*/
function obspos (cabeza,direccion) {
  //Determina la posición en "X" sumando o restando 4, mientras la cabeza se encuentre entre 3 - 16, cuando la serpiente se dirige hacia la derecha. 
  if (direccion==1&&((cabeza<=16)&&(cabeza>=3))) {
    return Math.ceil(Math.random()*(((cabeza+3)-(cabeza-1))+cabeza-1));
  }
  //Determina la posición en "X" sumando o restando 4, mientras la cabeza se encuentre entre 3 - 16, cuando la serpiente se dirige hacia la izquierda. 
  else if (direccion==-1&&((cabeza<=16)&&(cabeza>=3))) {
    return Math.ceil(Math.random()*((cabeza)-(cabeza-4))+cabeza-4);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=2 y la serpiente se dirige hacia la derecha, el rango es diferente al resto.
  else if ((cabeza==2)&&(direccion==1)) {
    return Math.ceil(Math.random()*(4-2)+2);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=2 y la serpiente se dirige hacia la izquierda, el rango es diferente al resto.
  else if ((cabeza==2)&&(direccion==-1)) {
    return Math.ceil(Math.random()*(2-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=1 y la serpiente se dirige hacia la derecha, el rango es diferente al resto.
  else if ((cabeza==1)&&(direccion==1)) {
    return Math.ceil(Math.random() * (4-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=1 y la serpiente se dirige hacia la izquierda, el rango es diferente al resto.
  else if ((cabeza==1)&&(direccion==-1)) {
    return Math.ceil(Math.random() * (2-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=0 y la serpiente se dirige hacia la derecha, el rango es diferente al resto.
  else if ((cabeza==0)&&(direccion==1)) {
    return Math.ceil(Math.random() * (4-0)+0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=0 y la serpiente se dirige hacia la izquierda, el rango es diferente al resto.
  else if ((cabeza==0)&&(direccion==-1)) {
    return Math.ceil(Math.random() * (3-0)+0);
  }
  //Condiciones dadas si la cabeza del snake se encuentra en las posiciones X:17 - 19, cambian los intervalos en función de la dirección de movimiento.
  else if ((cabeza==17)&&(direccion==1)) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if ((cabeza==17)&&(direccion==-1)) {
    return Math.ceil(Math.random() * (17-13)+13);
  }
  else if ((cabeza==18)&&(direccion==1)) {
    return Math.ceil(Math.random() * (19-17)+17);
  }
  else if ((cabeza==18)&&(direccion==-1)) {
    return Math.ceil(Math.random() * (18-15)+15);
  }
  else if ((cabeza==19)&&(direccion==1)) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if ((cabeza==19)&&(direccion==-1)) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  //Condiciones dadas cuando la dirección en "X"=0, son las mismas condiciones que las anteriores solo que cambiando los intervalos :c
  else if (direccion==0&&(cabeza<=16)&&(cabeza>=3)) {
    return Math.ceil(Math.random()*(((cabeza)+3)-(cabeza-3))+cabeza-3);
  }
  else if ((cabeza==19)&&(direccion==0)) {
    return Math.ceil(Math.random()*(19-16)+16);
  }
  else if ((cabeza==18)&&(direccion==0)) {
    return Math.ceil(Math.random() * (19-15)+15);
  }
  else if ((cabeza==17)&&(direccion==0)) {
    return Math.ceil(Math.random() * (19-14)+14);
  }
  else if ((cabeza==0)&&(direccion==0)) {
    return Math.ceil(Math.random()*(3-0)+0);
  }
  else if ((cabeza==1)&&(direccion==0)) {
    return Math.ceil(Math.random() * (4-0)+0)
  }
  else if ((cabeza==2)&&(direccion==0)) {
    return Math.ceil(Math.random() * (5-0)+0);
  }
  //Condiciones dadas cuando se realiza el traslado de un lateral del mapa a otro.
  else if (cabeza<0) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if (cabeza>19) {
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
  image(powerup,trampa.x*dx,trampa.y*dy,dx,dy);
}
/*
Contrato: colisionCabeza list -> boolean 
Proposito: Determina si hubo colisión entre la cabeza del snake y alguna parte de su cuerpo (representado en forma de lista).
Prototipo: colisionCabeza (lista) {}
Ejemplos: colisionCabeza ([{x:1,y:1},{x:2,y:1},{x:1,y:1}]) -> true
          colisionCabeza ([{x:3,y:1},{x:2,y:1},{x:1,y:1}]) -> false
*/
function colisionCabeza (lista) {
  const cabeza = first(Mundo.snake)
  if (isEmpty(rest(lista))) {
    return false;
  }
  else if ((first(rest(lista)).x==cabeza.x)&&(first(rest(lista)).y==cabeza.y)) {
    Mundo.enemigos.primero.stop();
    Mundo.enemigos.segundo.stop();
    Mundo.enemigos.tercero.stop();
    Mundo.enemigos.cuarto.stop();
    Mundo.sonidos.comer.stop();
    Mundo.sonidos.muerte.play();
    return true;
  }
  else if ((first(lista).x==first(rest(lista)).x)&&(first(lista).y==first(rest(lista)).y)) {
    Mundo.enemigos.primero.stop();
    Mundo.enemigos.segundo.stop();
    Mundo.enemigos.tercero.stop();
    Mundo.enemigos.cuarto.stop();
    Mundo.sonidos.comer.stop();
    Mundo.sonidos.muerte.play();
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
  const primeraParte = first(lista);
  if (isEmpty(rest(lista))) {
    return []
  }
  else if ((primeraParte.x>19&&primeraParte.y<0)&&Mundo.dir.x==1) {
    return cons({x:primeraParte.x,y:19},rest(lista))
  }
  else if ((primeraParte.x>=19&&primeraParte.y<0)&&Mundo.dir.x==-1) {
    return cons({x:19,y:19},rest(lista))
  }
  else if ((primeraParte.x>19&&primeraParte.y>19)&&Mundo.dir.x==1) {
    return cons({x:0,y:0},rest(lista))
  }
  else if ((primeraParte.x>=19&&primeraParte.y>=19)&&Mundo.dir.x==-1) {
    return cons({x:primeraParte.x,y:0},rest(lista))
  }
  else if ((primeraParte.x<=0&&first(lista).y<=0)&&Mundo.dir.x==1) {
    return cons({x:primeraParte.x,y:19},rest(lista))
  }
  else if ((primeraParte.x<0&&primeraParte.y<0)&&Mundo.dir.x==-1) {
    return cons({x:19,y:1},rest(lista))
  }
  else if ((primeraParte.x<=0&&primeraParte.y>=19)&&Mundo.dir.x==1) {
    return cons({x:primeraParte.x,y:0},rest(lista))
  }
  else if ((primeraParte.x<0&&primeraParte.y>19)&&Mundo.dir.x==-1) {
    return cons({x:19,y:0},rest(lista))
  }
  else if ((primeraParte.x>=19&&primeraParte.y<=0)&&Mundo.dir.y==-1) {
    return cons({x:primeraParte.x,y:20},rest(lista))
  }
  else if ((primeraParte.x<=0&&primeraParte.y<=0)&&Mundo.dir.y==-1) {
    return cons({x:primeraParte.x,y:20},rest(lista))
  }
  else if ((primeraParte.x>=19&&primeraParte.y>=19)&&Mundo.dir.y==1) {
    return cons({x:primeraParte.x,y:-1},rest(lista))
  }
  else if ((primeraParte.x<=0&&primeraParte.y>=19)&&Mundo.dir.y==1) {
    return cons({x:primeraParte.x,y:-1},rest(lista))
  }
  else if (primeraParte.x>=19) {
    if (Mundo.dir.x==1) {
      return cons({x:-1,y:primeraParte.y},rest(lista));
    }
    else {
      return cons({x:0,y:primeraParte.y},rest(lista));
    }
  }
  else if (first(lista).x<=0) {
    if (Mundo.dir.x==-1) {
      return cons({x:20,y:primeraParte.y},rest(lista));
    }
    else {
      return cons({x:19,y:primeraParte.y},rest(lista));
    }
  }
  else if (first(lista).y<=0) {
    if (Mundo.dir.y==-1) {
      return cons({x:primeraParte.x,y:20},rest(lista));
    }
    else {
      return cons({x:primeraParte.x,y:19},rest(lista));
    }
  }
  else if (primeraParte.y>=19) {
    if (Mundo.dir.y==1) {
      return cons({x:primeraParte.x,y:-1},rest(lista));
    }
    else {
      return cons({x:primeraParte.x,y:0},rest(lista));
    }
  }
  else {
    return cons(primeraParte,traslacion(rest(lista)));
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
  const cabeza = first(Mundo.snake);
  const obstaculoEstatico = Mundo.obstaculos.estatico;
  const direccion = Mundo.dir;
  if (Mundo.colision==true) {
    return true;
  }
  //Estas 3 condiciones determinan si hubo colisión con una de las trampas estaticas que spawnean de forma aleatoria a partir de los 10 puntos.
  else if (((((cabeza.x+1==obstaculoEstatico.x)&&(direccion.x==1))&&(cabeza.y==obstaculoEstatico.y))||(((cabeza.x-1==obstaculoEstatico.x)&&(direccion.x==-1)))&&(cabeza.y==obstaculoEstatico.y))&&Mundo.score>=10) {
    Mundo.enemigos.primero.stop();
    Mundo.enemigos.segundo.stop();
    Mundo.enemigos.tercero.stop();
    Mundo.enemigos.cuarto.stop();
    Mundo.sonidos.comer.stop();
    Mundo.sonidos.muerte.play();
    return true;
  }
  else if (((((cabeza.y+1==obstaculoEstatico.y)&&(direccion.y==1))&&(cabeza.x==obstaculoEstatico.x))||(((cabeza.y-1==obstaculoEstatico.y)&&(direccion.y==-1)))&&(cabeza.x==obstaculoEstatico.x))&&Mundo.score>=10) {
    Mundo.enemigos.primero.stop();
    Mundo.enemigos.segundo.stop();
    Mundo.enemigos.tercero.stop();
    Mundo.enemigos.cuarto.stop();
    Mundo.sonidos.comer.stop();
    Mundo.sonidos.muerte.play();
    return true;
  }
  //Estas 4 condiciones evaluan si hay un obstaculo estatico en el lateral opuesto al que se encuentra la serpiente realizando el traslado.
  else if (cabeza.x<=-1&&obstaculoEstatico.x==19) {
    if (obstaculoEstatico.y==cabeza.y) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else if ((obstaculoEstatico.y==cabeza.y+1)&&direccion.y==1) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else if ((obstaculoEstatico.y==cabeza.y-1)&&direccion.y==-1) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else {
      return false;
    }
  }
  else if (cabeza.y<=-1&&obstaculoEstatico.y==19) {
    if (obstaculoEstatico.x==cabeza.x) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x+1)&&direccion.x==1) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x-1)&&direccion.x==-1) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else {
      return false;
    }
  }
  else if (cabeza.x>=20&&obstaculoEstatico.x==0) {
    if (obstaculoEstatico.y==cabeza.y) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else if ((obstaculoEstatico.y==cabeza.y+1)&&direccion.y==1) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x+1)&&direccion.x==1) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else {
      return false;
    }
  }
  else if (cabeza.y>=20&&obstaculoEstatico.y==0) {
    if (obstaculoEstatico.x==cabeza.x) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x+1)&&direccion.x==1) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x-1)&&direccion.x==-1) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    else {
      return false;
    }
  }
  else if ((cabeza.x==Mundo.obstaculos.movil.x)&&(first(Mundo.snake).y==Mundo.obstaculos.movil.y)&&Mundo.score>=10) {
    if (Mundo.trampas.estado==true) {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
    //Esta condición determina si hubo colision con alguna de las trampas que spawnean cerca de la cabeza del snake (se incluye el contador para evitar que si una trampa spawnea justo en la posición de la cabeza del snake se pierda el juego de manera injusta).
    else if ((Mundo.contador<=1&&Mundo.trampas.estado==false)&&Mundo.obstaculos.respawn==true) {
      return false;
    }
    else {
      Mundo.enemigos.primero.stop();
      Mundo.enemigos.segundo.stop();
      Mundo.enemigos.tercero.stop();
      Mundo.enemigos.cuarto.stop();
      Mundo.sonidos.comer.stop();
      Mundo.sonidos.muerte.play();
      return true;
    }
  }
  else {
    return false;
  }
}
/*
Contrato: fpscheat () -> number
Proposito: Determina la velocidad de refresco de los fotogramas en función del puntaje (actua como funcion auxiliar de la función "onTic" dentro de
los condicionales dedicados al spawn de las trampas y sus efectos).
Prototipo: fpscheat () {}
Ejemplos: fpscheat (0) -> 10
          fpscheat (10) -> 12.5
          fpscheat (20) -> 15
          fpscheat (30) -> 17.5
          fpscheat (50) -> 20
          fpscheat (69) -> 20
*/
function fpscheat () {
  if (Mundo.score>=0&&Mundo.score<10) {
    return 10
  }
  else if (Mundo.score>=10&&Mundo.score<20) {
    return 12.5
  }
  else if (Mundo.score>=20&&Mundo.score<30) {
    return 15
  }
  else if (Mundo.score>=30&&Mundo.score<50) {
    return 17.5
  }
  else if (Mundo.score>=50) {
    return 20
  }
}
/*
Contrato: verificadorComida/Trampas/ObstaculosM/ObstaculosE list,number,number -> JSON
Proposito: Verifican que las trampas,obstaculos y comida no spawneen en una posición en la que se encuentre el cuerpo de la serpiente. Si spawnean en esas
posiciones vuelve a llamar a la función para que se cambie la posición, evitando al máximo spawnear en donde se encuentra la serpiente.
Prototipo: verificadorComida/Trampas/ObstaculosM/ObstaculosE (serpiene,posx,posy) {}
Ejemplos: verificadorComida ([{x:1,y:3},{x:2,y:3},{x:3,y:3}],3,3) -> {x:14,y:8}
          verificadorTrampas ([{x:3,y:17},{x:3,y:16},{x:3,y:15}],3,16) -> {x:2,y:18,estado:false}
          verificadorObstaculosE ([{x:3,y:17},{x:3,y:16},{x:3,y:15}],3,15) -> {x:0,y:16}
          verificadorObstaculosM ([{x:3,y:19},{x:3,y:0},{x:3,y:1}],3,19) -> {x:3,y:18}
*/
function verificadorComida (serpiente,posx,posy) {
  if (isEmpty(rest(serpiente))) {
    return {x:posx,y:posy};
  }
  else if ((first(serpiente).x==posx)&&(first(serpiente).y==posy)) {
    return verificadorComida(Mundo.snake,foodpos(),foodpos());
  }
  else {
    return verificadorComida(rest(serpiente),posx,posy);
  }
}
function verificadorTrampas (serpiente,posx,posy) {
  if (isEmpty(rest(serpiente))) {
    return {x:posx,y:posy,estado:false};
  }
  else if ((first(serpiente).x==posx)&&(first(serpiente).y==posy)) {
    return verificadorTrampas(Mundo.snake,cheatpos(first(Mundo.snake).x),cheatpos(first(Mundo.snake).y));
  }
  else {
    return verificadorTrampas(rest(serpiente),posx,posy);
  }
}
function verificadorObstaculosM (serpiente,posx,posy) {
  if (isEmpty(rest(serpiente))) {
    return {x:posx,y:posy};
  }
  else if ((first(serpiente).x==posx)&&(first(serpiente).y==posy)) {
    return verificadorObstaculosM(Mundo.snake,obspos(first(Mundo.snake).x,Mundo.dir.x),obspos(first(Mundo.snake).y,Mundo.dir.y));
  }
  else {
    return verificadorObstaculosM(rest(serpiente),posx,posy);
  }
}
function verificadorObstaculosE (serpiente,posx,posy) {
  if (isEmpty(rest(serpiente))) {
    return {x:posx,y:posy};
  }
  else if ((first(serpiente).x==posx)&&(first(serpiente).y==posy)) {
    return verificadorObstaculosE(Mundo.snake,cheatpos(first(Mundo.snake).x),cheatpos(first(Mundo.snake).y));
  }
  else {
    return verificadorObstaculosE(rest(serpiente),posx,posy);
  }
}
// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
  const comida = verificadorComida(Mundo.snake,foodpos(),foodpos());
  const movimiento = moveSnake(Mundo.snake,Mundo.dir);
  const aumento = moveSnake(crecimiento(Mundo.snake),Mundo.dir);
  const trampas = verificadorTrampas(Mundo.snake,cheatpos(first(Mundo.snake).x),cheatpos(first(Mundo.snake).y));
  const FPS = frameRate(fpscheat());
  const sonido = Mundo.sonidos.comer;
  const cabeza = first(Mundo.snake);
  const direccion = Mundo.dir;
  //Si la funcion colisionparedes y colisionCabeza determinan si hubo colisión (retornando un "true"), esto se ejecuta para mostrar el puntaje alcanzado.
  if (colisionparedes(Mundo.snake)==true||colisionCabeza(Mundo.snake)==true) {
    fill(255);
    textFont(fuente,16);
    text("Puntuación: "+Mundo.score,143,190);
    text("Presiona cualquier tecla para continuar.",36,240);
    return update(Mundo,{colision:true});
  }
  /* Esta condición actualiza la dirección en "X" del en el Mundo, si la serpiente se mueve hacia la derecha y se presiona la tecla para mover a la 
  izquierda, para que permanezca moviendose hacia la derecha. */
  else if ((cabeza.x>first(rest(Mundo.snake)).x)&&direccion.x==-1) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:1,y:0}),dir:{x:1,y:0}});
  }
  //Realiza la misma labor que la condición anterior solo que en la dirección contaria y presionando la tecla contraria.
  else if ((cabeza.x<first(rest(Mundo.snake)).x)&&direccion.x==1) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:-1,y:0}),dir:{x:-1,y:0}})
  }
  //Realiza la misma labor que las condiciones anteriores solo que en el eje "Y".
  else if ((cabeza.y>first(rest(Mundo.snake)).y)&&direccion.y==-1) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:0,y:1}),dir:{x:0,y:1}})
  }
  else if ((cabeza.y<first(rest(Mundo.snake)).y)&&direccion.y==1) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:0,y:-1}),dir:{x:0,y:-1}})
  }
  //Esta condicion se ejecuta cuando la serpiente toma la comida y la comida se encuentra en la misma posicion que un powerup de velocidad, esta condicion activa la suma del score y activa el efecto de aumento de velocidad.
  else if ((Mundo.food.x==Mundo.trampas.x&&Mundo.food.y==Mundo.trampas.y)&&((cabeza.x==Mundo.food.x)&&(cabeza.y==Mundo.food.y))&&Mundo.score>=5) {
    frameRate(fpscheat()+5);
    sonido.stop();
    sonido.play();
    return update(Mundo,{snake:aumento,food:comida,score:Mundo.score+1,trampas:{estado:true},contador:0})
  }
  //Esta condición determina si hubo colisión entre la cabeza del snake y la comida.
  else if ((cabeza.x==Mundo.food.x)&&(cabeza.y==Mundo.food.y)) {
    if (Mundo.score>=5) {
      sonido.stop();
      sonido.play();
      return update(Mundo,{snake: aumento,food:comida,score:Mundo.score+1,contador:Mundo.contador+1});
    }
    else {
      sonido.stop();
      sonido.play();
      return update(Mundo,{snake: aumento,food:comida,score:Mundo.score+1});
    }
  }
   //Esta condicion determina si hubo colisión entre la cabeza del snake y una trampa, aparte de habilitar el efecto de aumento de velocidad, aumentando los FPS del juego 5.
   else if (((first(Mundo.snake).x==Mundo.trampas.x)&&(first(Mundo.snake).y==Mundo.trampas.y))&&Mundo.score>=5) {
    frameRate(fpscheat()+5);
    sonido.stop();
    sonido.play();
    return update(Mundo,{snake: movimiento,trampas:{estado:true},contador:0})
  }
   //Esta condición es la encargada de hacer desaparecer el efecto de aumento de velocidad en la serpiente luego de 20 segundos 
  else if (Mundo.contador>=80&&Mundo.trampas.estado==true) {
    FPS;
    return update(Mundo,{snake: movimiento,trampas:trampas,obstaculos:{movil:{x:Mundo.obstaculos.movil.x,y:Mundo.obstaculos.movil.y},estatico:{x:Mundo.obstaculos.estatico.x,y:Mundo.obstaculos.estatico.y},respawn:false},contador:0,reproductor:false})
  }
  //Estas condiciones determinan si la cabeza del snake se encuentra en los límites laterales del mapa, para asi realizar el cambio de posición.
  else if ((cabeza.x>=20||cabeza.x<=-1)||((cabeza.y<=-1)||(cabeza.y>=20))) {
    return update(Mundo,{snake:moveSnake(traslacion(Mundo.snake),Mundo.dir)})
  }
  //Esta condición hace de cronometro cuando se toma una de las trampas.
  else if (Mundo.trampas.estado==true&&Mundo.contador<80) {
    return update(Mundo,{snake: movimiento,contador:Mundo.contador+1,reproductor:false})
  }
  //Esta condición actua como cronometro para spawnear una nueva trampa siempre y cuando el usuario no la haya cogido.
  else if ((Mundo.contador>=0&&Mundo.contador<40)&&(Mundo.trampas.estado==false&&Mundo.score>=5)) {
    FPS;
    return update(Mundo,{snake: movimiento,contador:Mundo.contador+1,reproductor:false})
  }
   //Esta condicion spawnea una nueva trampa y nuevos obstaculos cada que la condicion anterior alcanza un valor de 40 en el parametro "contador" del mundo.
  else if (Mundo.contador>=40&&Mundo.trampas.estado==false) {
    FPS;
    return update(Mundo,{snake: movimiento,trampas:trampas,obstaculos:{movil:verificadorObstaculosM(Mundo.snake,obspos(cabeza.x,Mundo.dir.x),obspos(cabeza.y,Mundo.dir.y)),estatico:verificadorObstaculosE(Mundo.snake,cheatpos(cabeza.x),cheatpos(cabeza.y)),respawn:true},contador:0,reproductor:true})
  }
  else {
    FPS;
    //Actualiza la posición del snake usando la función "moveSnake".
    return update(Mundo,{snake: movimiento})
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
  if (((keyCode==UP_ARROW||keyCode==87)&&Mundo.dir.y!==1)&&Mundo.colision==false){
      return update(Mundo, {dir: {y: -1, x: 0}});
  }
  else if (((keyCode==DOWN_ARROW||keyCode==83)&&Mundo.dir.y!==-1)&&Mundo.colision==false) {
      return update(Mundo, {dir: {y: 1, x: 0}});
  }
  else if (((keyCode==LEFT_ARROW||keyCode==65)&&Mundo.dir.x!==1)&&Mundo.colision==false) {
      return update(Mundo, {dir: {y: 0, x: -1}});
  }
  else if (((keyCode==RIGHT_ARROW||keyCode==68)&&Mundo.dir.x!==-1)&&Mundo.colision==false) {
      return update(Mundo, {dir: {y: 0, x: 1}});
  }
  else if (Mundo.colision==true) {
    window.open("game_over-porky-nether.html","_self")
    return update(Mundo,{});
  }
  else {
    return update(Mundo,{});
  }
}
//Esta línea carga el fondo de la página a la par del script del juego para que no se vea retraso al cargar la página.
document.body.style.backgroundImage = "url('images/fondo_nether.png')";