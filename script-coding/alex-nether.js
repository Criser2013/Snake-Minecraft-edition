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
let vida = null;
let comidaInversa = null;
////////////////////////
const TIME_DEBUFF = 80;
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
  cara = loadImage("images/cabeza_alex.png");
  obstaculoS = loadImage("images/cabeza_wither.png");
  obstaculoS1 = loadImage("images/cabeza_esqueletowither.png");
  obstaculoS2 = loadImage("images/cabeza_cerdozombie.png");
  obstaculoS3 = loadImage("images/cabeza_esqueleto.png");
  comida = loadImage("images/manzana.png");
  powerup = loadImage("images/manzana_dorada.png");
  trampa = loadImage("images/ojo_araña.png");
  mapa = loadImage("images/nether.png");
  fuente = loadFont("minecraft.otf");
  vida = loadImage("images/vida.png");
  comidaInversa = loadImage("images/sopa_inversa.png");
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
  Mundo = {snake: [{x:3,y:1}, {x:2,y:1}, {x:1,y:1 }],dir:{x:1,y:0},food:{x:foodpos(),y:foodpos()},reverseFood: {x: foodpos(), y: foodpos(), debuff: false, timeDebuff: TIME_DEBUFF},score:0,trampas:{x:foodpos(),y:foodpos(),estado:false},contador:0,obstaculos:{movil:{x:foodpos(),y:foodpos()},estatico:{x:foodpos(),y:foodpos()},respawn:false},sonidos:{muerte: new buzz.sound("audio/muerte",{formats:["mp3"],volume: 40,preload:true}),comer:new buzz.sound("audio/comiendo",{formats:["mp3"],volume: 40,preload:true})},enemigos:{primero:new buzz.sound("audio/cerdo_zombie",{formats:["mp3"],volume: 40,preload:true}),segundo:new buzz.sound("audio/esqueleto",{formats:["mp3"],volume: 40,preload:true}),tercero:new buzz.sound("audio/esqueleto",{formats:["mp3"],volume: 40,preload:true}),cuarto:new buzz.sound("audio/wither",{formats:["mp3"],volume: 40,preload:true})},reproductor:true,vidas:3,contador_vidas:0,invencibilidad:false}
}
/*
Contrato: drawSnake coordenadas -> snake
coordenadas = puntos en los ejes "X" y "Y" de cada parte del cuerpo de la serpiente
serpiente = Lista de objects con coordenadas en "X" y "Y" que describen la posicion de una serpiente.
Proposito: Dibuja la serpiente.
Prototipo: drawSnake (snake) {}
*/
function drawSnake (snake) {
  fill(121,86,58);
  forEach(snake, s => {
  rect(s.x * dx, s.y * dy, dx, dy);});
  image(cara,(first(snake).x)*dx,(first(snake).y)*dy,dx,dy);
  fill(140,185,136);
  rect((first(rest(snake)).x)*dx,(first(rest(snake)).y)*dy,dx,dy);
  if (Mundo.contador_vidas%2!==0&&Mundo.contador_vidas<10) {
    fill('rgba(255,0,0,0.60)');
    forEach(snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);});
  }
}
// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar.
function drawGame(Mundo){
  background(mapa);
  drawFood(Mundo.food);
  if (Mundo.score>=0&&Mundo.score<5) {
    drawSnake(Mundo.snake);
    drawScore(Mundo.score);
    drawLives(Mundo.vidas);
  }
  else if (Mundo.score>=5&&Mundo.score<10) {
    drawReverseFood(Mundo.reverseFood);
    drawCheat(Mundo.trampas);
    drawSnake(Mundo.snake);
    drawScore(Mundo.score);
    drawLives(Mundo.vidas);
  }
  else if (Mundo.score>=10) {
    drawReverseFood(Mundo.reverseFood);
    drawCheat(Mundo.trampas);
    drawObstaclesm(Mundo.obstaculos.movil);
    drawObstaclesS(Mundo.obstaculos.estatico);
    drawSnake(Mundo.snake);
    drawScore(Mundo.score);
    drawLives(Mundo.vidas);
  }
}
function drawReverseFood(food){
  image(comidaInversa, food.x * dx, food.y * dy, dx, dy);
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
    if (Mundo.reproductor==true&&Mundo.vidas>0) {
      Mundo.enemigos.primero.play();
      image(obstaculoS2,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
    else {
      image(obstaculoS2,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
  }
  else if (Mundo.score>=20&&Mundo.score<30) {
    if (Mundo.reproductor==true&&Mundo.vidas>0) {
      Mundo.enemigos.segundo.play();
      image(obstaculoS3,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
    else {
      image(obstaculoS3,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
  }
  else if (Mundo.score>=30&&Mundo.score<50) {
    if (Mundo.reproductor==true&&Mundo.vidas>0) {
      Mundo.enemigos.tercero.play();
      image(obstaculoS1,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
    else {      
      image(obstaculoS1,obstaculo.x*dx,obstaculo.y*dy,dx,dy);
    }
  }
  else if (Mundo.score>=50) {
    if (Mundo.reproductor==true&&Mundo.vidas>0) {
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
Contrato: drawLives number -> image
Proposito: Dibuja la cantidad de vidas que se tienen disponibles a través de imagenes.
Prototipo: drawScore (lives) {}
Ejemplos: drawLives (3) -> Dibuja 3 veces la imagen;
          drawLives (2) -> Dibuja 2 veces la imagen;
          drawLives (0) -> No dibuja nada;
*/
function drawLives (lives) {
  if (lives==3) {
    image(vida,360,371,10,10);
    image(vida,370,371,10,10);
    image(vida,380,371,10,10);
  }
  else if (lives==2) {
    image(vida,360,371,10,10);
    image(vida,370,371,10,10);
  }
  else if (lives==1) {
    image(vida,360,371,10,10);
  }
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
    sonidoMuerte();
    return true;
  }
  else if ((first(lista).x==first(rest(lista)).x)&&(first(lista).y==first(rest(lista)).y)) {
    sonidoMuerte();
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
//Reproduce el sonido de muerte.
function sonidoMuerte () {
  if (Mundo.invencibilidad==false) {
    Mundo.enemigos.primero.stop();
    Mundo.enemigos.segundo.stop();
    Mundo.enemigos.tercero.stop();
    Mundo.enemigos.cuarto.stop();
    Mundo.sonidos.comer.stop();
    Mundo.sonidos.muerte.stop();
    Mundo.sonidos.muerte.play();
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
  //Estas 3 condiciones determinan si hubo colisión con una de las trampas estaticas que spawnean de forma aleatoria a partir de los 10 puntos.
  if (((((cabeza.x+1==obstaculoEstatico.x)&&(direccion.x==1))&&(cabeza.y==obstaculoEstatico.y))||(((cabeza.x-1==obstaculoEstatico.x)&&(direccion.x==-1)))&&(cabeza.y==obstaculoEstatico.y))&&Mundo.score>=10) {
    sonidoMuerte();
    return true;
  }
  else if (((((cabeza.y+1==obstaculoEstatico.y)&&(direccion.y==1))&&(cabeza.x==obstaculoEstatico.x))||(((cabeza.y-1==obstaculoEstatico.y)&&(direccion.y==-1)))&&(cabeza.x==obstaculoEstatico.x))&&Mundo.score>=10) {
    sonidoMuerte();
    return true;
  }
  //Estas 4 condiciones evaluan si hay un obstaculo estatico en el lateral opuesto al que se encuentra la serpiente realizando el traslado.
  else if (cabeza.x<=-1&&obstaculoEstatico.x==19) {
    if (obstaculoEstatico.y==cabeza.y) {
      sonidoMuerte();
      return true;
    }
    else if ((obstaculoEstatico.y==cabeza.y+1)&&direccion.y==1) {
      sonidoMuerte();
      return true;
    }
    else if ((obstaculoEstatico.y==cabeza.y-1)&&direccion.y==-1) {
      sonidoMuerte();
      return true;
    }
    else {
      return false;
    }
  }
  else if (cabeza.y<=-1&&obstaculoEstatico.y==19) {
    if (obstaculoEstatico.x==cabeza.x) {
      sonidoMuerte();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x+1)&&direccion.x==1) {
      sonidoMuerte();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x-1)&&direccion.x==-1) {
      sonidoMuerte();
      return true;
    }
    else {
      return false;
    }
  }
  else if (cabeza.x>=20&&obstaculoEstatico.x==0) {
    if (obstaculoEstatico.y==cabeza.y) {
      sonidoMuerte();
      return true;
    }
    else if ((obstaculoEstatico.y==cabeza.y+1)&&direccion.y==1) {
      sonidoMuerte();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x+1)&&direccion.x==1) {
      sonidoMuerte();
      return true;
    }
    else {
      return false;
    }
  }
  else if (cabeza.y>=20&&obstaculoEstatico.y==0) {
    if (obstaculoEstatico.x==cabeza.x) {
      sonidoMuerte();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x+1)&&direccion.x==1) {
      sonidoMuerte();
      return true;
    }
    else if ((obstaculoEstatico.x==cabeza.x-1)&&direccion.x==-1) {
      sonidoMuerte();
      return true;
    }
    else {
      return false;
    }
  }
  else if ((cabeza.x==Mundo.obstaculos.movil.x)&&(first(Mundo.snake).y==Mundo.obstaculos.movil.y)&&Mundo.score>=10) {
    if (Mundo.trampas.estado==true) {
      sonidoMuerte();
      return true;
    }
    //Esta condición determina si hubo colision con alguna de las trampas que spawnean cerca de la cabeza del snake (se incluye el contador para evitar que si una trampa spawnea justo en la posición de la cabeza del snake se pierda el juego de manera injusta).
    else if ((Mundo.contador<=1&&Mundo.trampas.estado==false)&&Mundo.obstaculos.respawn==true) {
      return false;
    }
    else {
      sonidoMuerte();
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
Ejemplos: fpscheat (0) -> 7.5
          fpscheat (10) -> 10
          fpscheat (20) -> 12.5
          fpscheat (30) -> 15
          fpscheat (50) -> 17.5
          fpscheat (69) -> 17.5
*/
function fpscheat () {
  if (Mundo.score>=0&&Mundo.score<10) {
    return 10
  }
  else if (Mundo.score>=10&&Mundo.score<20) {
    return 15
  }
  else if (Mundo.score>=20&&Mundo.score<30) {
    return 20
  }
  else if (Mundo.score>=30&&Mundo.score<50) {
    return 25
  }
  else if (Mundo.score>=50) {
    return 30
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
  const snake = Mundo.snake;
  const direccion = Mundo.dir;
  const aumentoScore = Mundo.score+1;
  const comida = verificadorComida(snake,foodpos(),foodpos());
  const movimiento = moveSnake(snake,direccion);
  const aumento = moveSnake(crecimiento(snake),direccion);
  const trampas = verificadorTrampas(snake,cheatpos(first(snake).x),cheatpos(first(snake).y));
  const reverseFood = verificadorTrampas(snake,cheatpos(first(snake).x),cheatpos(first(snake).y));
  const cabeza = first(snake);
  const invencibilidad = Mundo.contador_vidas<10&&Mundo.invencibilidad==true;
  const contadorVidas = Mundo.contador_vidas+1;
  const contador = Mundo.contador+1;
  const obsMovil = Mundo.obstaculos.movil;
  const obsEst = Mundo.obstaculos.estatico;
  function sonidoComida () {
    Mundo.sonidos.comer.stop();
    Mundo.sonidos.comer.play();
  }
  frameRate(fpscheat());
  //Si la funcion colisionparedes y colisionCabeza determinan si hubo colisión (retornando un "true"), esto se ejecuta para mostrar el puntaje alcanzado.
  if (Mundo.vidas==0) {
    fill(255);
    textFont(fuente,16);
    text("Puntuación: "+Mundo.score,143,190);
    text("Presiona cualquier tecla para continuar.",36,240);
    return update(Mundo,{contador_vidas:0});
  }
  /* Esta condición actualiza la dirección en "X" del en el Mundo, si la serpiente se mueve hacia la derecha y se presiona la tecla para mover a la 
  izquierda, para que permanezca moviendose hacia la derecha. */
  else if ((cabeza.x>first(rest(snake)).x)&&direccion.x==-1) {
    return update(Mundo,{snake: moveSnake(snake,{x:1,y:0}),dir:{x:1,y:0}});
  }
  //Realiza la misma labor que la condición anterior solo que en la dirección contaria y presionando la tecla contraria.
  else if ((cabeza.x<first(rest(snake)).x)&&direccion.x==1) {
    return update(Mundo,{snake: moveSnake(snake,{x:-1,y:0}),dir:{x:-1,y:0}});
  }
  //Realiza la misma labor que las condiciones anteriores solo que en el eje "Y".
  else if ((cabeza.y>first(rest(snake)).y)&&direccion.y==-1) {
    return update(Mundo,{snake: moveSnake(snake,{x:0,y:1}),dir:{x:0,y:1}});
  }
  else if ((cabeza.y<first(rest(snake)).y)&&direccion.y==1) {
    return update(Mundo,{snake: moveSnake(snake,{x:0,y:-1}),dir:{x:0,y:-1}});
  }
  //Quita el efecto de invencibilidad ante cualquier daño recibido cuando se pierde una vida, desactiva el efecto parpadeo rojo en la serpiente.
  else if (Mundo.contador_vidas>=10&&Mundo.invencibilidad==true) {
    return update(Mundo,{snake:moveSnake(snake,direccion),contador_vidas:0,invencibilidad:false});
  }
  else if ((colisionparedes(Mundo.snake)==true||colisionCabeza(Mundo.snake)==true)&&(Mundo.vidas>0&&Mundo.invencibilidad==false)) {
    if (Mundo.vidas==1) {
      return update(Mundo,{vidas:0,contador_vidas:1});
    }
    //Resta la vida que se perdió, activa el contador para activar el efecto de parpadeo rojo en la serpiente y activa una invencibilidad de 10 tics.
    else {
      return update(Mundo,{snake:moveSnake(snake,direccion),vidas:Mundo.vidas-1,contador_vidas:contadorVidas,invencibilidad:true});
    }
  }
  //Esta condicion se ejecuta cuando la serpiente toma la comida y la comida se encuentra en la misma posicion que un powerup de velocidad, esta condicion activa la suma del score y activa el efecto de aumento de velocidad.
  else if ((Mundo.food.x==Mundo.trampas.x&&Mundo.food.y==Mundo.trampas.y)&&((cabeza.x==Mundo.food.x)&&(cabeza.y==Mundo.food.y))&&Mundo.score>=5) {
    frameRate(fpscheat()+5);
    sonidoComida();
    //Verifica si el contador de las vidas está acivado para seguirlo sumando (arreglo de posibles bugs).
    if (invencibilidad) {
      return update(Mundo,{snake:aumento,food:comida,score:aumentoScore,trampas:{estado:true},contador:0,contador_vidas:contadorVidas});
    }
    else {
      return update(Mundo,{snake:aumento,food:comida,score:aumentoScore,trampas:{estado:true},contador:0});
    }
  }
  //Esta condición determina si hubo colisión entre la cabeza del snake y la comida.
  else if ((cabeza.x==Mundo.food.x)&&(cabeza.y==Mundo.food.y)) {
    if (Mundo.score>=5) {
      sonidoComida();
      if (invencibilidad) {
        return update(Mundo,{snake: aumento,food:comida,score:aumentoScore,contador:contador,contador_vidas:contadorVidas});
      }
      else {
        return update(Mundo,{snake: aumento,food:comida,score:aumentoScore,contador:contador});
      }
    }
    else {
      sonidoComida();
      if (invencibilidad) {
        return update(Mundo,{snake: aumento,food:comida,score:aumentoScore,contador_vidas:contadorVidas});
      }
      else {
        return update(Mundo,{snake: aumento,food:comida,score:aumentoScore});
      }
    }
  }








  //Esta condicion determina si hubo colisión entre la cabeza del snake y la comida inversa. Ademas, habilita el efecto de cambio de direccion
   else if (((cabeza.x==Mundo.reverseFood.x)&&(cabeza.y==Mundo.reverseFood.y))&&Mundo.score>=5) {
    sonidoComida();
    if (invencibilidad) {
      return update(Mundo,{snake: movimiento,reverseFood:{debuff:true},contador:0,contador_vidas:contadorVidas});
    }
    else {
      return update(Mundo,{snake: movimiento,reverseFood:{debuff:true},contador:0});
    }
  }

  //Esta condición es la encargada de hacer desaparecer el efecto de movimiento inverso
  else if (Mundo.contador>=80&&Mundo.reverseFood.debuff==true) {
    if (invencibilidad) {
      return update(Mundo,{snake: movimiento,reverseFood:reverseFood,obstaculos:{movil:{x:obsMovil.x,y:obsMovil.y},estatico:{x:obsEst.x,y:obsEst.y},respawn:false},contador:0,reproductor:false,contador_vidas:contadorVidas});
    }
    else {
      return update(Mundo,{snake: movimiento,reverseFood:reverseFood,obstaculos:{movil:{x:obsMovil.x,y:obsMovil.y},estatico:{x:obsEst.x,y:obsEst.y},respawn:false},contador:0,reproductor:false});
    }
  }

    //Estas condiciones determinan si la cabeza del snake se encuentra en los límites laterales del mapa, para asi realizar el cambio de posición.
  else if ((cabeza.x>=20||cabeza.x<=-1)||((cabeza.y<=-1)||(cabeza.y>=20))) {
    if (invencibilidad) {
      return update(Mundo,{snake:moveSnake(traslacion(snake),Mundo.dir),contador_vidas:contadorVidas});
    }
    else {
      return update(Mundo,{snake:moveSnake(traslacion(snake),Mundo.dir)});
    }
  }
  
  //Esta condición hace de cronometro cuando se toma una de las trampas.
  else if (Mundo.reverseFood.debuff==true && Mundo.contador<80) {
    if (invencibilidad) {
      return update(Mundo,{snake: movimiento,contador:contador,reproductor:false,contador_vidas:contadorVidas});  
    }
    else {
      return update(Mundo,{snake: movimiento,contador:contador,reproductor:false});
    }
  }

  //Esta condición actua como cronometro para spawnear una nueva trampa siempre y cuando el usuario no la haya cogido.
  else if ((Mundo.contador>=0&&Mundo.contador<40)&&(Mundo.reverseFood.debuff==false&&Mundo.score>=5)) {
    if (invencibilidad) {
      return update(Mundo,{snake: movimiento,contador:contador,reproductor:false,contador_vidas:contadorVidas});
    }
    else {   
      return update(Mundo,{snake: movimiento,contador:contador,reproductor:false});
    }
  }







   //Esta condicion determina si hubo colisión entre la cabeza del snake y una trampa, aparte de habilitar el efecto de aumento de velocidad, aumentando los FPS del juego 5.
   else if (((cabeza.x==Mundo.trampas.x)&&(cabeza.y==Mundo.trampas.y))&&Mundo.score>=5) {
    frameRate(fpscheat()+5);
    sonidoComida();
    if (invencibilidad) {
      return update(Mundo,{snake: movimiento,trampas:{estado:true},contador:0,contador_vidas:contadorVidas});
    }
    else {
      return update(Mundo,{snake: movimiento,trampas:{estado:true},contador:0});
    }
  }
   //Esta condición es la encargada de hacer desaparecer el efecto de aumento de velocidad en la serpiente luego de 20 segundos 
  else if (Mundo.contador>=80&&Mundo.trampas.estado==true) {
    if (invencibilidad) {
      return update(Mundo,{snake: movimiento,trampas:trampas,obstaculos:{movil:{x:obsMovil.x,y:obsMovil.y},estatico:{x:obsEst.x,y:obsEst.y},respawn:false},contador:0,reproductor:false,contador_vidas:contadorVidas});
    }
    else {
      return update(Mundo,{snake: movimiento,trampas:trampas,obstaculos:{movil:{x:obsMovil.x,y:obsMovil.y},estatico:{x:obsEst.x,y:obsEst.y},respawn:false},contador:0,reproductor:false});
    }
  }
  //Estas condiciones determinan si la cabeza del snake se encuentra en los límites laterales del mapa, para asi realizar el cambio de posición.
  else if ((cabeza.x>=20||cabeza.x<=-1)||((cabeza.y<=-1)||(cabeza.y>=20))) {
    if (invencibilidad) {
      return update(Mundo,{snake:moveSnake(traslacion(snake),Mundo.dir),contador_vidas:contadorVidas});
    }
    else {
      return update(Mundo,{snake:moveSnake(traslacion(snake),Mundo.dir)});
    }
  }
  //Esta condición hace de cronometro cuando se toma una de las trampas.
  else if (Mundo.trampas.estado==true&&Mundo.contador<80) {
    frameRate(fpscheat()+5);
    if (invencibilidad) {
      return update(Mundo,{snake: movimiento,contador:contador,reproductor:false,contador_vidas:contadorVidas});  
    }
    else {
      return update(Mundo,{snake: movimiento,contador:contador,reproductor:false});
    }
  }
  //Esta condición actua como cronometro para spawnear una nueva trampa siempre y cuando el usuario no la haya cogido.
  else if ((Mundo.contador>=0&&Mundo.contador<40)&&(Mundo.trampas.estado==false&&Mundo.score>=5)) {
    if (invencibilidad) {
      return update(Mundo,{snake: movimiento,contador:contador,reproductor:false,contador_vidas:contadorVidas});
    }
    else {   
      return update(Mundo,{snake: movimiento,contador:contador,reproductor:false});
    }
  }
   //Esta condicion spawnea una nueva trampa y nuevos obstaculos cada que la condicion anterior alcanza un valor de 40 en el parametro "contador" del mundo.
  else if (Mundo.contador>=40&&Mundo.trampas.estado==false) {
    if (invencibilidad) {
      return update(Mundo,{snake: movimiento,trampas:trampas, reverseFood: reverseFood, obstaculos:{movil:verificadorObstaculosM(snake,obspos(cabeza.x,direccion.x),obspos(cabeza.y,direccion.y)),estatico:verificadorObstaculosE(snake,cheatpos(cabeza.x),cheatpos(cabeza.y)),respawn:true},contador:0,reproductor:true,contador_vidas:contadorVidas});
    }
    else {
      return update(Mundo,{snake: movimiento,trampas:trampas, reverseFood: reverseFood, obstaculos:{movil:verificadorObstaculosM(snake,obspos(cabeza.x,direccion.x),obspos(cabeza.y,direccion.y)),estatico:verificadorObstaculosE(snake,cheatpos(cabeza.x),cheatpos(cabeza.y)),respawn:true},contador:0,reproductor:true});
    }
  }
  //Comprueba si la serpiente ha perdido una vida en un intervalo del 0 - 10 tics y aumenta el contador.
  else if (invencibilidad) {
    return update(Mundo,{snake:moveSnake(snake,direccion),contador_vidas:contadorVidas});
  }
  else {
    //Actualiza la posición del snake usando la función "moveSnake".
    return update(Mundo,{snake: movimiento});
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
  if(Mundo.reverseFood.debuff){
    return reverseDirectionChange(Mundo, keyCode);
  } else {
    return normalDirectionChange(Mundo, keyCode);
  }
}
function normalDirectionChange(Mundo, keyCode){
  if (((keyCode==UP_ARROW||keyCode==87)&&Mundo.dir.y!==1)&&Mundo.vidas>0){
      return update(Mundo, {dir: {y: -1, x: 0}});
  }
  else if (((keyCode==DOWN_ARROW||keyCode==83)&&Mundo.dir.y!==-1)&&Mundo.vidas>0) {
      return update(Mundo, {dir: {y: 1, x: 0}});
  }
  else if (((keyCode==LEFT_ARROW||keyCode==65)&&Mundo.dir.x!==1)&&Mundo.vidas>0) {
      return update(Mundo, {dir: {y: 0, x: -1}});
  }
  else if (((keyCode==RIGHT_ARROW||keyCode==68)&&Mundo.dir.x!==-1)&&Mundo.vidas>0) {
      return update(Mundo, {dir: {y: 0, x: 1}});
  }
  else if (Mundo.vidas==0) {
    window.open("game_over-alex-nether.html","_self")
    return update(Mundo,{});
  }
  else {
    return update(Mundo,{});
  }
}
function reverseDirectionChange(Mundo, keyCode){
  if (((keyCode==UP_ARROW||keyCode==87)&&Mundo.dir.y!== -1)&&Mundo.vidas>0){
      return update(Mundo, {dir: {y: 1, x: 0}});
  }
  else if (((keyCode==DOWN_ARROW||keyCode==83)&&Mundo.dir.y!== 1)&&Mundo.vidas>0) {
      return update(Mundo, {dir: {y: -1, x: 0}});
  }
  else if (((keyCode==LEFT_ARROW||keyCode==65)&&Mundo.dir.x!== -1)&&Mundo.vidas>0) {
      return update(Mundo, {dir: {y: 0, x: 1}});
  }
  else if (((keyCode==RIGHT_ARROW||keyCode==68)&&Mundo.dir.x!== 1)&&Mundo.vidas>0) {
      return update(Mundo, {dir: {y: 0, x: -1}});
  }
  else if (Mundo.vidas==0) {
    window.open("game_over-alex-nether.html","_self")
    return update(Mundo,{});
  }
  else {
    return update(Mundo,{});
  }
}
//Esta línea carga el fondo de la página a la par del script del juego para que no se vea retraso al cargar la página.
document.body.style.backgroundImage = "url('images/fondo_nether.png')";