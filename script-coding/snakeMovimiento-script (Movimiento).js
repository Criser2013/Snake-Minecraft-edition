//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/

// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = functionalLight;

const x1 = function posx () {
  return Math.ceil(Math.random() * (19 - 2)) + 2;
};
const y1 = function posy () {
  return Math.ceil(Math.random() * (19 - 2)) + 2;
};
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

const dx = 20;
const dy = 20;

/***
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(5);
  createCanvas(400, 400);
  background(15, 200, 50);
  Mundo = {snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: {x: 1, y: 0}, food: {x: 10, y: 10 },score:0,contador:0};
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo){
  background(10, 200, 50);
  drawFood(Mundo.food);
  drawScore(Mundo.score);
  fill(240, 240, 240);
  forEach(Mundo.snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);
  });
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
function drawFood(food) {
  fill (200,20,10);
  ellipse((food.x*dx)-10,(food.y*dy)-10,dx,dy);
}
function drawScore (score) {
  textFont("Arial",14);
  fill(1);
  text("Score: "+score,10,380);
}
// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
  if (first(Mundo.snake).x==0||first(Mundo.snake).x==19) {
    textFont("Arial",16);
    text("Haz perdido, tu puntuaci\xf3n es: "+Mundo.score,90,200);
    return Mundo
  }
  else if (first(Mundo.snake).y==0||first(Mundo.snake).y==19) {
    textFont("Arial",16);
    text("Haz perdido, tu puntuaci\xf3n es: "+Mundo.score,90,200);
    return Mundo
  }
  else if ((first(Mundo.snake).x+1==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y)) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),food:{x:x1(),y:y1()},score:Mundo.score+1})
  }
  else if (((first(Mundo.snake).x==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y))&&((Mundo.dir.y!==1)&&(Mundo.dir.x!==0))) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),food:{x:x1(),y:y1()},score:Mundo.score+1})
  }
  else {
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
  switch (keyCode) {
    case UP_ARROW:
      return update(Mundo, {dir: {y: -1, x: 0}});
      break;
    case DOWN_ARROW:
      return update(Mundo, {dir: {y: 1, x: 0}});
      break;
    case LEFT_ARROW:
      return update(Mundo, {dir: {y: 0, x: -1}});
      break;
    case RIGHT_ARROW:
      return update(Mundo, {dir: {y: 0, x: 1}});
      break;
    default:
      console.log(keyCode);
      return update(Mundo, {});
  }
}
