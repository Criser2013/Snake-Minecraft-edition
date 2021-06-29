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
  Mundo = {snake: [{x:3,y:1}, {x:2,y:1}, {x:1,y:1 }],dir:{x:1,y:0},food:{x:Math.ceil(Math.random()*(20-0))+0,y:Math.ceil(Math.random()*(20-0))+0},score:0,colision:false,trampas:{x:Math.ceil(Math.random()*(20-0))+0,y:Math.ceil(Math.random()*(20-0))+0,estado:false},contador:0,obstaculos:{movil:{x:Math.ceil(Math.random()*(19-0))+0,y:Math.ceil(Math.random()*(19-0))+0,},estatico:{x:Math.ceil(Math.random()*(20-0))+0,y:Math.ceil(Math.random()*(20-0))+0}}}
}
// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar.
function drawGame(Mundo){
  if (Mundo.score>=5&&Mundo.trampas.estado==false) {
    if (Mundo.score>=10&&Mundo.trampas.estado==false) {
      background(10, 200, 50);
      drawFood(Mundo.food);
      drawScore(Mundo.score);
      drawCheat(Mundo.trampas);
      drawObstaclesm(Mundo.obstaculos.movil);
      drawObstaclesS(Mundo.obstaculos.estatico);
      fill(240, 240, 240);
      forEach(Mundo.snake, s => {
      rect(s.x * dx, s.y * dy, dx, dy);});
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
    else {
      background(10, 200, 50);
      //Esta linea llama a la función drawFood para dibujar la comida.
      drawFood(Mundo.food);
      //Esta linea llama a la función drawScore para dibujar el puntaje.
      drawScore(Mundo.score);
      //Estas linea llama a la función drawCheat para dibujar las trampas.
      drawCheat(Mundo.trampas);
      fill(240, 240, 240);
      //Esta función se encarga de dibujar cada elemento del snake, incluida la cabeza de la serpiente, todo se dibuja con la misma apariencia y características.
      forEach(Mundo.snake, s => {
      rect(s.x * dx, s.y * dy, dx, dy);});
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
  else {
    background(10, 200, 50);
    drawFood(Mundo.food);
    drawScore(Mundo.score);
    fill(240, 240, 240);
    forEach(Mundo.snake, s => {
    rect(s.x * dx, s.y * dy, dx, dy);});
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
function drawObstaclesm (obstaculo) {
  fill(1);
  ellipse((obstaculo.x*dx)-10,(obstaculo.y*dy)-10,dx,dy);
}
function drawObstaclesS (obstaculo) {
  fill(128,128,128);
  rect(obstaculo.x*dx,obstaculo.y*dy,dx,dy);
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
Proposito: Determina la posición en "X" (posx) y "Y" (posy) de la las trampas de forma aleatoria dentro del mapa.
Prototipo: cheatposx,cheatposy () {}
Ejemplos: cheatposx,cheatposy () -> {x:4,y:7}
          cheatposx,cheatposy () -> {x:1,y;1}
*/
function cheatposx () {
  if ((first(Mundo.snake).x<=16)&&(first(Mundo.snake).x>=3)) {
    return Math.ceil(Math.random() * (((first(Mundo.snake).x)+3)-(first(Mundo.snake).x-4))+(first(Mundo.snake).x)-4);
  }
  else if (first(Mundo.snake).x==2) {
    const x2 = Math.ceil(Math.random() * (4+1)-1);
    if (x2==-0) {
      return 0
    }
    else {
      return x2
    }
  }
  else if (first(Mundo.snake).x==1) {
    const x1 = Math.ceil(Math.random() * (2+1)-1);
    if (x1==-0) {
      return 0
    }
    else {
      return x1
    }
  }
  else if (first(Mundo.snake).x==0) {
    const x0 = Math.ceil(Math.random() * (3+1)-1);
    if (x0==-0) {
      return 0
    }
    else {
      return x0
    }
  }
  else if (first(Mundo.snake).x==17) {
    return Math.ceil(Math.random() * (19-15)+15);
  }
  else if (first(Mundo.snake).x==18) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
  else if (first(Mundo.snake).x==19) {
    return Math.ceil(Math.random() * (19-16)+16);
  }
};
function cheatposy () {
  if ((first(Mundo.snake).y<=16)&&(first(Mundo.snake).y>=3)) {
    return Math.ceil(Math.random() * (((first(Mundo.snake).y)+3)-(first(Mundo.snake).y-4))+first(Mundo.snake).y-4);
  }
  else if (first(Mundo.snake).y==2) {
    const y2 = Math.ceil(Math.random() * (4+1)-1);
    if (y2==-0) {
      return 0
    }
    else {
      return y2
    }
  }
  else if (first(Mundo.snake).y==1) {
    const y1 = Math.ceil(Math.random() * (2+1)-1);
    if (y1==-0) {
      return 0
    }
    else {
      return y1
    }
  }
  else if (first(Mundo.snake).y==0) {
    const y0 = Math.ceil(Math.random() * (3+1)-1);
    if (y0==-0) {
      return 0
    }
    else {
      return y0
    }
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
};
function obsposx () {
  if (Mundo.dir.x==1&&(first(Mundo.snake).x<=16)&&(first(Mundo.snake).x>=3)) {
    return Math.ceil(Math.random()*(((first(Mundo.snake).x)+3)-(first(Mundo.snake).x-1))+first(Mundo.snake).x-1);
  }
  else if (Mundo.dir.x==-1&&(first(Mundo.snake).x<=16)&&(first(Mundo.snake).x>=3)) {
    return Math.ceil(Math.random()*((first(Mundo.snake).x)-(first(Mundo.snake).x-4))+first(Mundo.snake).x-4);
  }
  else if ((first(Mundo.snake).x==2)&&(Mundo.dir.x==1)) {
    const obsx2 = Math.ceil(Math.random()*(5-1)+1);
    if (Math.sign(obsx2)==-0) {
      return obsx2*-1
    }
    else {
      return obsx2
    }
  }
  else if ((first(Mundo.snake).x==2)&&(Mundo.dir.x==-1)) {
    const obsxl2 = Math.ceil(Math.random()*(2+1)-1);
    if (Math.sign(obsxl2)==-0) {
      return obsxl2*-1
    }
    else {
      return obsxl2
    }
  }
  else if ((first(Mundo.snake).x==1)&&(Mundo.dir.x==1)) {
    const obsx1 = Math.ceil(Math.random() * (4-0)+0);
    if (Math.sign(obsx1)==-0) {
      return obsx1*-1
    }
    else {
      return obsx1
    }
  }
  else if ((first(Mundo.snake).x==1)&&(Mundo.dir.x==-1)) {
    const obsxl1 = Math.ceil(Math.random() * (1+1)-1);
    if (Math.sign(obsxl1)==-0) {
      return obsxl1*-1
    }
    else {
      return obsxl1
    }
  }
  else if ((first(Mundo.snake).x==0)&&(Mundo.dir.x==1)) {
    const obsx0 = Math.ceil(Math.random() * (3+1)-1);
    if (obsx0==-0) {
      return 0
    }
    else {
      return obsx0
    }
  }
  else if ((first(Mundo.snake).x==0)&&(Mundo.dir.x==-1)) {
    const obsxl0 = Math.ceil(Math.random() * (2+1)-1);
    if (obsxl0==-0) {
      return 0
    }
    else {
      return obsxl0
    }
  }
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
  else if (Mundo.dir.x==0&&((first(Mundo.snake).x<=16)&&(first(Mundo.snake).x>=3))) {
    const x0i = Math.ceil(Math.random()*(((first(Mundo.snake).x)+3)-(first(Mundo.snake).x-4))+first(Mundo.snake).x-4);
      if (x0i==-0) {
        return 0
      }
      else {
        return x0i
      }
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
    const x0 = Math.ceil(Math.random()*(3+1)-1);
      if (x0==-0) {
        return 0;
      }
      else {
        return x0;
      }
  }
  else if ((first(Mundo.snake).x==1)&&(Mundo.dir.x==0)) {
    const x01 = Math.ceil(Math.random() * (4+1)-1)
      if (x01==-0) {
        return 0
      }
      else {
        return x01
      }
  }
  else if ((first(Mundo.snake).x==2)&&(Mundo.dir.x==0)) {
    const x02 = Math.ceil(Math.random() * (5+1)-1);
    if (x02==-0) {
      return 0
    }
    else {
      return x02
    }
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
    const obsy2 = Math.ceil(Math.random()*(4-2)+2);
    if (Math.sign(obsy2)==-0) {
      return obsy2*-1
    }
    else {
      return obsy2
    }
  }
  else if ((first(Mundo.snake).y==2)&&(Mundo.dir.y==-1)) {
    const obsyl2 = Math.ceil(Math.random()*(1+1)-1);
    if (Math.sign(obsyl2)==-0) {
      return obsyl2*-1
    }
    else {
      return obsyl2
    }
  }
  else if ((first(Mundo.snake).y==1)&&(Mundo.dir.y==1)) {
    const obsy1 = Math.ceil(Math.random() * (4-1)+1);
    if (Math.sign(obsy1)==-0) {
      return obsy1*-1
    }
    else {
      return obsy1
    }
  }
  else if ((first(Mundo.snake).y==1)&&(Mundo.dir.y==-1)) {
    const obsyl1 = Math.ceil(Math.random()*(2+1)-1);
    if (Math.sign(obsyl1)==-0) {
      return obsyl1*-1
    }
    else {
      return obsyl1
    }
  }
  else if ((first(Mundo.snake).y==0)&&(Mundo.dir.y==1)) {
    const obsy0 = Math.ceil(Math.random() * (4-1)+1);
    if (obsy0==-0) {
      return 0
    }
    else {
      return obsy0
    }
  }
  else if ((first(Mundo.snake).y==0)&&(Mundo.dir.y==-1)) {
    const obsyl0 = Math.ceil(Math.random() * (3-1)+1);
    if (obsyl0==-0) {
      return 0
    }
    else {
      return obsyl0
    }
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
    const y0i = Math.ceil(Math.random()*(((first(Mundo.snake).y)+3)-(first(Mundo.snake).y-4))+first(Mundo.snake).y-4);
      if (y0i==-0) {
        return 0
      }
      else {
        return y0i
      }
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
    const y0 = Math.ceil(Math.random()*(3+1)-1);
      if (y0==-0) {
        return 0;
      }
      else {
        return y0;
      }
  }
  else if ((first(Mundo.snake).y==1)&&(Mundo.dir.y==0)) {
    const y01 = Math.ceil(Math.random() * (4+1)-1)
      if (y01==-0) {
        return 0
      }
      else {
        return y01
      }
  }
  else if ((first(Mundo.snake).y==2)&&(Mundo.dir.y==0)) {
    const y02 = Math.ceil(Math.random() * (5+1)-1);
    if (y02==-0) {
      return 0
    }
    else {
      return y02
    }
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
  if ((((first(Mundo.snake).y==0)&&(Mundo.dir.y==-1))||(first(Mundo.snake).y==19)&&(Mundo.dir.y==1))&&Mundo.colision==false) {
    return true
  }
  else if (((((first(Mundo.snake).x+1==Mundo.obstaculos.estatico.x)&&(Mundo.dir.x==1))&&(first(Mundo.snake).y==Mundo.obstaculos.estatico.y))||(((first(Mundo.snake).x-1==Mundo.obstaculos.estatico.x)&&(Mundo.dir.x==-1)))&&(first(Mundo.snake).y==Mundo.obstaculos.estatico.y))&&Mundo.score>=10) {
    return true
  }
  else if (((((first(Mundo.snake).y+1==Mundo.obstaculos.estatico.y)&&(Mundo.dir.y==1))&&(first(Mundo.snake).x==Mundo.obstaculos.estatico.x))||(((first(Mundo.snake).y-1==Mundo.obstaculos.estatico.y)&&(Mundo.dir.y==-1)))&&(first(Mundo.snake).x==Mundo.obstaculos.estatico.x))&&Mundo.score>=10) {
    return true
  }
  else if ((first(Mundo.snake).x==Mundo.obstaculos.estatico.x)&&(first(Mundo.snake).y==Mundo.obstaculos.estatico.y)) {
    return false
  }
  else if (((first(Mundo.snake).x==Mundo.obstaculos.movil.x)&&(first(Mundo.snake).y==Mundo.obstaculos.movil.y))&&(Mundo.contador>=0&&Mundo.contador<=15)) {
    return false
  } 
  else if ((first(Mundo.snake).x+1==Mundo.obstaculos.movil.x)&&(first(Mundo.snake).y+1==Mundo.obstaculos.movil.y)&&Mundo.score>=10) {
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
  if (colisionparedes(Mundo.snake)==true) {
    textFont("Arial",16);
    text("Haz perdido, tu puntuaci\xf3n es: "+Mundo.score,90,200);
    fill(255);
    rect(145,220,110,20);
    fill(1);
    textFont("Arial",14);
    text("Jugar de nuevo",150,235);
    return update(Mundo,{colision:true});
  }
  //Realiza lo mismo que la condición anterior, solo que ahora es con la colisión de la cabeza del snake con alguna parte de su cuerpo.
  else if (colisionCabeza(Mundo.snake)==true) {
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
  //Estas 2 condiciones determinan si hubo colisión entre la cabeza del snake y la comida.
  else if ((first(Mundo.snake).x+1==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y)) {
  return update(Mundo,{snake: moveSnake(crecimiento(Mundo.snake),Mundo.dir),food:{x:foodposx(),y:foodposy()},score:Mundo.score+1})
  }
  else if (((first(Mundo.snake).x==Mundo.food.x)&&(first(Mundo.snake).y+1==Mundo.food.y))&&((Mundo.dir.y!==1)&&(Mundo.dir.x!==0))) {
    return update(Mundo,{snake: moveSnake(crecimiento(Mundo.snake),Mundo.dir),food:{x:foodposx(),y:foodposy()},score:Mundo.score+1})
  }
   //Estas 2 condiciones determinan si hubo colisión entre la cabeza del snake y una trampa, aparte de habilitar el efecto de aumento de velocidad, aumentando los FPS del juego 5.
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
   //Estas 2 condiciones determinan si hubo colisión entre la cabeza del snake y la comida.
  else if (Mundo.trampas.estado==true&&Mundo.contador<80) {
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),contador:Mundo.contador+1})
  }
   //Esta condición actua como cronometro para spawnear una nueva trampa siempre y cuando el usuario no la haya cogido.
  else if ((Mundo.contador>=0&&Mundo.contador<40)&&Mundo.trampas.estado==false) {
    frameRate(fpscheat());
    return update(Mundo,{snake: moveSnake(Mundo.snake,Mundo.dir),contador:Mundo.contador+1})
  }
   //Esta condicion spawnea una nueva trampa cada que la condicion anterior alcanza un valor de 40 en el parametro "contador" del mundo.
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