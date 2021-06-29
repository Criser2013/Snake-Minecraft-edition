//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/
// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = functionalLight;
debugger;
const x1 = function posx () {
  return Math.ceil(Math.random() * (20 - 1)) + 1;
};
const y1 = function posy () {
  return Math.ceil(Math.random() * (20 - 1)) + 1;
};
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

const dx = 20;
const dy = 20;

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(5);
  createCanvas(400, 400);
  background(15, 200, 50);
  Mundo = {snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: {x: 1, y: 0}, food: {x:Math.ceil(Math.random()*(20-1))+1, y:Math.ceil(Math.random()*(20-1))+1},score:0,colision:false}
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
function colisionp (lista) {
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
// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
  if (colisionp(Mundo.snake)==true) {
    textFont("Arial",16);
    text("Haz perdido, tu puntuaci\xf3n es: "+Mundo.score,90,200);
    return update(Mundo,{colision:true})
  }
  else if (((first(Mundo.snake).x>first(rest(Mundo.snake)).x)&&Mundo.dir.x==-1)&&colision(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:1,y:0}),dir:{x:1,y:0}});
  }
  else if (((first(Mundo.snake).x<first(rest(Mundo.snake)).x)&&Mundo.dir.x==1)&&colision(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:-1,y:0}),dir:{x:-1,y:0}})
  }
  else if (((first(Mundo.snake).y>first(rest(Mundo.snake)).y)&&Mundo.dir.y==-1)&&colision(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:0,y:1}),dir:{x:0,y:1}})
  }
  else if (((first(Mundo.snake).y<first(rest(Mundo.snake)).y)&&Mundo.dir.y==1)&&colision(Mundo.snake)==false) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,{x:0,y:-1}),dir:{x:0,y:-1}})
  }
  else if ((first(Mundo.snake).x+1==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y)) {
    return update(Mundo,{snake: moveSnake(crecimiento(Mundo.snake),Mundo.dir),food:{x:x1(),y:y1()},score:Mundo.score+1})
  }
  else if (((first(Mundo.snake).x==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y))&&((Mundo.dir.y!==1)&&(Mundo.dir.x!==0))) {
    return update(Mundo,{snake: moveSnake(crecimiento(Mundo.snake),Mundo.dir),food:{x:x1(),y:y1()},score:Mundo.score+1})
  }
  else if (first(Mundo.snake).x==20) {
    return update(Mundo,{snake:moveSnake(traslacion(Mundo.snake),Mundo.dir)})
  }
  else if (first(Mundo.snake).x==-1) {
    return update(Mundo,{snake:moveSnake(traslacion(Mundo.snake),Mundo.dir)})
  }
  else {
    if (colision(Mundo.snake)==true) {
        textFont("Arial",16);
        text("Haz perdido, tu puntuaci\xf3n es: "+Mundo.score,90,200);
        return update(Mundo,{});
    }
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