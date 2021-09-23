//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/
// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } =
  functionalLight;

////////////////////////////////////////////////////////////////////////////////////
/////        CREAMOS CONSTANTES QUE SERAN USADAS EN EL JUEGO                  //////
////////////////////////////////////////////////////////////////////////////////////

/* constantes de dirección */
const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const RIGHT = { x: 1, y: 0 };
const LEFT = { x: -1, y: 0 };

/* constantes para la altura y ancho del canvas */
const WIDTH = 400;
const HEIGHT = 400;

/* constante para el tamaño de las celdas del juego */
const CELL_SIZE = 20;

/* constantes para el numero de columnas y filas del juego */
const COLUMNS = WIDTH / CELL_SIZE - 1;
const ROWS = HEIGHT / CELL_SIZE - 1;

/* constante para definir la serpiente inicial de juego */
const SNAKE = [
  { x: 3, y: 10 },
  { x: 2, y: 10 },
  { x: 1, y: 10 },
];

/* constante para la velocidad inicial de la serpiente */
const SPEED = 10;

/* constante para el timepo de la invencibilidad de la serpiente */
const INVINCIBILITY_TIME = 20;

/* constante para la posición inicial de la comida */
const FOOD = { x: 6, y: 9 };

/* constante que determina el tiempo de respawneo de los obstaculos */
const MONSTER_TIME_RESPAWN = 80;
const POISONFOOD_TIME_RESPAWN = 80;
const UPGRADE_TIME_RESPAWN = 80;
const REVERSE_TIME_RESPAWN = 80;
const UPGRADE_TIME_BUFF = 100;
const REVERSE_TIME_DEBUFF = 80;

/* constante para la configuracion inicial de las frutas de velocidad y movimiento inverso */
const UPGRADE_FOOD = {
  x: null,
  y: null,
  buff: false,
  timeBuff: UPGRADE_TIME_BUFF,
  respawn: false,
  timeRespawn: REVERSE_TIME_RESPAWN,
};
const REVERSE_FOOD = {
  x: null,
  y: null,
  debuff: false,
  timeDebuff: REVERSE_TIME_DEBUFF,
  respawn: false,
  timeRespawn: UPGRADE_TIME_RESPAWN,
};

////////////////////////////////////////////////////////////////////////////////////
/////    CREAMOS VARIABLES QUE SERA USADAS(SOLO PARA CARGAR SPRITES)          //////
////////////////////////////////////////////////////////////////////////////////////

let Mundo = {};
let cara = null;
let obstaculoS = null;
let obstaculoS1 = null;
let obstaculoS2 = null;
let obstaculoS3 = null;
let mapa = null;
let comida = null;
let powerup = null;
let trampa = null;
let fuente = null;
let comidaInversa = null;

////////////////////////////////////////////////////////////////////////////////////
/////                    INICIAMOS CON EL CODIGO DEL JUEGO                    //////
////////////////////////////////////////////////////////////////////////////////////

/**
 * carga todos los sprites que seran usados en el juego
 */
function preload() {
  cara = loadImage("images/cerdo.png");
  obstaculoS = loadImage("images/cabeza_enderdragon.png");
  obstaculoS1 = loadImage("images/cabeza_enderman.png");
  obstaculoS2 = loadImage("images/cabeza_endermite.png");
  obstaculoS3 = loadImage("images/cabeza_shulker.png");
  comida = loadImage("images/manzana.png");
  comidaInversa = loadImage("images/sopa_inversa.png");
  powerup = loadImage("images/manzana_dorada.png");
  comidaEnvenenada = loadImage("images/fruta_coral.png");
  mapa = loadImage("images/end.png");
  fuente = loadFont("minecraft.otf");
  vida = loadImage("images/vida.png");
}

/**
 * crea o asigna los valores que va a tener el mundo de nuestro juego
 */
function setup() {
  frameRate(SPEED);
  createCanvas(WIDTH, HEIGHT);
  background(mapa);
  Mundo = {
    snake: SNAKE,
    dir: RIGHT,
    food: FOOD,
    score: 0,
    speed: SPEED,
    lives: {
      num: 3,
      invincibility: false,
      timeInvincibility: INVINCIBILITY_TIME,
    },
    gameOver: false,
    reverseFood: REVERSE_FOOD,
    upgradeFood: UPGRADE_FOOD,
    poisonFood: {
      x: null,
      y: null,
      respawn: false,
      timeRespawn: POISONFOOD_TIME_RESPAWN,
    },
    monster: {
      x: null,
      y: null,
      respawn: false,
      timeRespawn: MONSTER_TIME_RESPAWN,
    },
    sonidos:{
      ambiente:new buzz.sound("audio/calm",{formats:["mp3"],volume: 60,preload:true,loop:true}),
      comer:new buzz.sound("audio/comiendo",{formats:["mp3"],volume: 40,preload:true}),
      muerte:new buzz.sound("audio/muerte",{formats:["mp3"],volume: 40,preload:true}),
      enemigos:{
        primero:new buzz.sound("audio/endermite",{formats:["mp3"],volume: 40,preload:true}),
        segundo:new buzz.sound("audio/shulker",{formats:["mp3"],volume: 40,preload:true}),
        tercero:new buzz.sound("audio/enderman",{formats:["mp3"],volume: 40,preload:true}),
        cuarto:new buzz.sound("audio/enderdragon",{formats:["mp3"],volume: 40,preload:true})},
    },
    reproductor:true
  };
}

/**
 * funcion creada para mantener el paradigma funcional. Actualiza los atributos del objeto y retorna una copia profunda
 * @param {Object} data
 * @param {Object} attribute
 * @returns {Object}
 * @example update({a: 10, b: 10}, {a: 20}); // => {a: 20, b: 10}
 */
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

////////////////////////////////////////////////////////////////////////////////////
/////                      INICIAMOS FASE DE DIBUJO                           //////
////////////////////////////////////////////////////////////////////////////////////

/**
 * Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar.
 * @param {Object} Mundo
 */
function drawGame(Mundo) {
  Mundo.sonidos.ambiente.play();
  background(mapa);
  drawFood(Mundo.food);
  if (Mundo.score < 5) {
    drawSnake(Mundo.snake);
    drawScore(Mundo.score);
    drawLives(Mundo.lives.num);
  }
  else if (Mundo.score >= 5 && Mundo.score< 10) {
    drawCheat(Mundo.upgradeFood);
    drawReverseFood(Mundo.reverseFood);
    drawSnake(Mundo.snake);
    drawScore(Mundo.score);
    drawLives(Mundo.lives.num);
  }
  else if (Mundo.score >= 10) {
    drawCheat(Mundo.upgradeFood);
    drawReverseFood(Mundo.reverseFood);
    drawObstaclesm(Mundo.poisonFood);
    drawObstaclesS(Mundo.monster, Mundo.score);
    drawSnake(Mundo.snake);
    drawScore(Mundo.score);
    drawLives(Mundo.lives.num);
  }
  if (Mundo.lives.invincibility) {
    drawSnake(Mundo.snake);
    drawInvincibility(Mundo.snake, Mundo.lives.timeInvincibility);
    drawScore(Mundo.score);
    drawLives(Mundo.lives.num);
  }
}

/**
 * dibuja el sprite "powerUp" en el canvas. Esto, tomando encuenta las corrdenadas del Objeto "upgradeFood"
 * @param {Object} upgradeFood
 */
function drawCheat(upgradeFood) {
  image(
    powerup,
    upgradeFood.x * CELL_SIZE,
    upgradeFood.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
}

function drawReverseFood(reverseFood) {
  image(
    comidaInversa,
    reverseFood.x * CELL_SIZE,
    reverseFood.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
}

/**
 * dibuja los sprites "obstaculoS(n)" en el canvas. Esto, tomando encuenta las coordenadas del Objeto "monster"
 * @param {Object} monster
 */
function drawObstaclesS(monster, score) {
  if (score >= 10 && score < 20) {
    image(
      obstaculoS2,
      monster.x * CELL_SIZE,
      monster.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    if (Mundo.reproductor==true) {
      Mundo.sonidos.enemigos.primero.play();
    }
  } else if (score >= 20 && score < 30) {
    image(
      obstaculoS3,
      monster.x * CELL_SIZE,
      monster.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    if (Mundo.reproductor==true) {
      Mundo.sonidos.enemigos.segundo.play();
    }
  } else if (score >= 30 && score < 50) {
    image(
      obstaculoS1,
      monster.x * CELL_SIZE,
      monster.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    if (Mundo.reproductor==true) {
      Mundo.sonidos.enemigos.tercero.play();
    }
  } else {
    image(
      obstaculoS,
      monster.x * CELL_SIZE,
      monster.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    if (Mundo.reproductor==true) {
      Mundo.sonidos.enemigos.cuarto.play();
    }
  }
}
function sonidoMuerte () {
  if (Mundo.lives.invincibility==false) {
    Mundo.sonidos.enemigos.primero.stop();
    Mundo.sonidos.enemigos.segundo.stop();
    Mundo.sonidos.enemigos.tercero.stop();
    Mundo.sonidos.enemigos.cuarto.stop();
    Mundo.sonidos.comer.stop();
    Mundo.sonidos.muerte.stop();
    Mundo.sonidos.muerte.play();
  }
}
function sonidoComida () {
  Mundo.sonidos.comer.stop();
  Mundo.sonidos.comer.play();
}
/**
 * dibuja el sprite "comidaEnvenenada" en el canvas. Esto, tomando encuenta las coordenadas del Objeto "poisonFood"
 * @param {Object} poisonFood
 */
function drawObstaclesm(poisonFood) {
  image(
    comidaEnvenenada,
    poisonFood.x * CELL_SIZE,
    poisonFood.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
}

function drawLives(lives) {
  if (lives == 3) {
    image(vida, 360, 371, 10, 10);
    image(vida, 370, 371, 10, 10);
    image(vida, 380, 371, 10, 10);
  } else if (lives == 2) {
    image(vida, 360, 371, 10, 10);
    image(vida, 370, 371, 10, 10);
  } else if (lives == 1) {
    image(vida, 360, 371, 10, 10);
  }
}

/**
 * dibuja el sprite "comida" en el canvas. Esto, tomando en cuenta las coodenadas del objeto "food"
 * @param {Object} food
 */
function drawFood(food) {
  image(comida, food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawInvincibility(snake, timeInvincibility){
  if(timeInvincibility % 2 == 0){
    forEach(snake, s => {
      fill("rgba(255,0,0,0.60)")
      rect(s.x * CELL_SIZE, s.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    })
  } else {
    drawSnake(snake);
  }
}

/**
 * dibuja las diferentes partes de la serpiente en el canvas. Esto, tomando en cuenta los objetos
 * dentro del Array "snake"
 * @param {Array} snake
 */
function drawSnake(snake) {
  fill(255,166,194);
  forEach(snake, s => {
    rect(s.x * CELL_SIZE, s.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });
  image(cara, first(Mundo.snake).x * CELL_SIZE, first(Mundo.snake).y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

/**
 *
 */
function drawScore(score) {
  stroke(1);
  fill(255);
  textFont(fuente, 14); //18
  text("Puntuación: " + score, 10, 380);
}

/**
 * dibuja la pantalla de muerte del juego
 */
function drawGameOver(score) {
  fill(1);
  textFont(fuente, 16);
  text("Puntuación: " + score, 143, 190);
  text("Presiona cualquier tecla para continuar.", 36, 240);
}

//////////////////////////////////////////////////////////////////////////////////////
/////                     LOS CICLOS QUE REALIZA EL JUEGO                      //////
////////////////////////////////////////////////////////////////////////////////////

function onTic(mundo) {
  // determina la velocidad por cada vuelta de ciclo
  frameRate(mundo.speed);
  const cabeza = first(mundo.snake);
  const direccion = mundo.dir;
  // cambia el estado de GameOver a true. Esto siempre y cuando
  // la serpiente haya chocado
  if (Mundo.gameOver == true) {
    Mundo.sonidos.ambiente.stop();
    drawGameOver(Mundo.score);
    return update(Mundo,{ gameOver: true });
  }
  if (
    collision(mundo.snake, mundo.monster, mundo.poisonFood) &&
    !mundo.lives.invincibility
  ) {
    if (mundo.lives.num == 1) {
      return update(mundo, {lives:{num:Mundo.lives.num-1}, gameOver: true, reproductor:false });
    } else {
      mundo = update(mundo, {
        lives: update(mundo.lives, {
          num: mundo.lives.num - 1,
          invincibility: true,
        }),
      });
    }
  }

  if (mundo.lives.invincibility) {
    if (mundo.lives.timeInvincibility == 0) {
      mundo = update(mundo, {
        lives: update(mundo.lives, {
          invincibility: false,
          timeInvincibility: INVINCIBILITY_TIME,
        }),
      });
    } else {
      mundo = update(mundo, {
        lives: update(mundo.lives, {
          timeInvincibility: mundo.lives.timeInvincibility - 1,
        }),
      });
    }
  }

  // activa el respawn de la manzana dorada y la comida inversa. Ademas, les genera una
  // coordenada
  if (mundo.score == 5 && !mundo.upgradeFood.respawn) {
    mundo = update(mundo, {
      reverseFood: update(mundo.reverseFood, {
        x: cheatpos(cabeza.x),
        y: cheatpos(cabeza.y),
        respawn: true,
      }),
      upgradeFood: update(mundo.upgradeFood, {
        x: cheatpos(cabeza.x),
        y: cheatpos(cabeza.y),
        respawn: true,
      }),
    });
  }

  // activa el respawn de los monstruos y la comida envenenada
  // una vez el escore sea 10
  if (mundo.score == 10 && !mundo.monster.respawn) {
    mundo = update(mundo, {
      monster: update(mundo.monster, {
        x: obspos(cabeza.x, direccion.x),
        y: obspos(cabeza.y, direccion.y),
        respawn: true,
      }),
      poisonFood: update(mundo.poisonFood, {
        x: obspos(cabeza.x, direccion.x),
        y: obspos(cabeza.y, direccion.y),
        respawn: true,
      })
    });
  }

  // respawnea los enemigos una vez el tiempo de respawn haya acabado
  // en caso de no haberlo hecho, disminuye el tiempo en 1
  if (mundo.monster.respawn && mundo.poisonFood.respawn) {
    // verifica si el tiempo es cero para dar una nueva coordenada de respawn
    if (mundo.monster.timeRespawn <= 0) {
      mundo = update(mundo, {
        monster: update(mundo.monster, {
          x: obspos(cabeza.x, direccion.x),
          y: obspos(cabeza.y, direccion.y),
          timeRespawn: MONSTER_TIME_RESPAWN,
        }),
        poisonFood: update(mundo.poisonFood, {
          x: obspos(cabeza.x, direccion.x),
          y: obspos(cabeza.y, direccion.y),
          timeRespawn: POISONFOOD_TIME_RESPAWN,
        }),
        reproductor:true
      });
    } else {
      mundo = update(mundo, {
        monster: update(mundo.monster, {
          timeRespawn: mundo.monster.timeRespawn - 1,
        }),
        poisonFood: update(mundo.poisonFood, {
          timeRespawn: mundo.poisonFood.timeRespawn - 1,
        }),
        reproductor:false
      });
    }
  }

  //Operaciones que se deben realizar una vez haya spawneado la manzana dorada (fruta de velocidad),
  //En caso de no haber spawneado se omite todo esto
  if (mundo.upgradeFood.respawn) {
    // verifica si comio la manzana dorada, en tal caso aumenta la velocidad y activa el buff
    if (eatFood(mundo.snake, mundo.upgradeFood)) {
      mundo = update(mundo, {
        speed: mundo.speed + 5,
        upgradeFood: {
          buff: true,
          timeBuff: UPGRADE_TIME_BUFF,
          respawn: true,
          timeRespawn: UPGRADE_TIME_RESPAWN,
        },
      });
    }

    //verifica si acabo el tiemo del buffo, en tal caso, elimina el la velocidad añadida
    // en caso contrario, baja en uno el tiempo de buff de la manzana dorada
    if (mundo.upgradeFood.buff) {
      if (mundo.upgradeFood.timeBuff == 0) {
        mundo = update(mundo, {
          speed: mundo.speed - 5,
          upgradeFood: {
            x: cheatpos(cabeza.x),
            y: cheatpos(cabeza.y),
            buff: false,
            timeBuff: UPGRADE_TIME_BUFF,
            respawn: true,
            timeRespawn: UPGRADE_TIME_RESPAWN,
          },
        });
      } else {
        mundo = update(mundo, {
          upgradeFood: update(mundo.upgradeFood, {
            timeBuff: mundo.upgradeFood.timeBuff - 1,
          }),
        });
      }
    }

    // respawnea las frutas dorada una vez el tiempo de respawn haya acabado,
    // el tiempo disminuye siempre y cuando el efecto de las mismas este desactivado.
    // cada vez que se come esta fruta o respawnea, el tiempo es reiniciado.
    if (!mundo.upgradeFood.buff) {
      if (mundo.upgradeFood.timeRespawn == 0) {
        mundo = update(mundo, {
          upgradeFood: update(mundo.upgradeFood, {
            x: cheatpos(cabeza.x),
            y: cheatpos(cabeza.y),
            timeRespawn: UPGRADE_TIME_RESPAWN,
          }),
        });
      } else {
        mundo = update(mundo, {
          upgradeFood: update(mundo.upgradeFood, {
            timeRespawn: mundo.upgradeFood.timeRespawn - 1,
          }),
        });
      }
    }
  }

  // Operaciones que se deben realizar una vez spawneado la comida de movimiento inverso.
  // En caso contrario, se omite
  if (mundo.reverseFood.respawn) {
    // verifica si comio la fruta inversa, en caso de hacerlo aplica el debuff
    if (eatFood(mundo.snake, mundo.reverseFood)) {
      mundo = update(mundo, {
        reverseFood: {
          debuff: true,
          timeDebuff: REVERSE_TIME_DEBUFF,
          respawn: true,
          timeRespawn: REVERSE_TIME_RESPAWN,
        },
      });
    }

    // quita el debuff de la fruta inversa, y da una nueva dirección a las coordenadas en
    // en caso de que el tiempo del debuff acabara, sino, disminuye el tiempo en 1
    if (mundo.reverseFood.debuff) {
      if (mundo.reverseFood.timeDebuff == 0) {
        mundo = update(mundo, {
          reverseFood: {
            x: cheatpos(cabeza.x),
            y: cheatpos(cabeza.y),
            debuff: false,
            timeDebuff: REVERSE_TIME_DEBUFF,
            respawn: true,
            timeRespawn: REVERSE_TIME_RESPAWN,
          },
        });
      } else {
        mundo = update(mundo, {
          reverseFood: update(mundo.reverseFood, {
            timeDebuff: mundo.reverseFood.timeDebuff - 1,
          }),
        });
      }
    }

    // respawnea las frutas dorada e inversa una vez el tiempo de respawn haya acabado,
    // el tiempo disminuye siempre y cuando el efecto de las mismas este desactivado.
    // cada vez que se coma una de estas frutas, el tiempo es reiniciado.
    if (!mundo.reverseFood.debuff) {
      if (mundo.reverseFood.timeRespawn == 0) {
        mundo = update(mundo, {
          reverseFood: update(mundo.reverseFood, {
            x: cheatpos(cabeza.x),
            y: cheatpos(cabeza.y),
            timeRespawn: UPGRADE_TIME_RESPAWN,
          }),
        });
      } else {
        mundo = update(mundo, {
          reverseFood: update(mundo.reverseFood, {
            timeRespawn: mundo.reverseFood.timeRespawn - 1,
          }),
        });
      }
    }
  }

  // determina si la serpiente comio la manzana. En tal caso
  // incrementa el cuerpo, el score y cambia la coordenada de la comida
  if (eatFood(mundo.snake, mundo.food)) {
    mundo = update(mundo, {
      speed: increaseSpeed(mundo.score, mundo.speed),
      snake: increaseBody(mundo.snake, mundo.dir),
      score: mundo.score + 1,
      food: { x: newCoordinate(), y: newCoordinate() },
    });
  }

  // mueve la serpiente, usando la funcion moveSnake
  return update(mundo, {
    snake: moveSnake(mundo.snake, mundo.dir),
  });
}

//////////////////////////////////////////////////////////////////////////////////////
/////                     FUNCIONES QUE UTILIZA ONTIC                          //////
////////////////////////////////////////////////////////////////////////////////////

/**
 * determina si la serpiente choco con ella misma o algun otro objeto,
 * en tal caso, retorna verdadero, en caso contrario, retorna falso.
 * @param {Array} snake
 * @param {Object} monster
 * @param {Object} poisonFood
 * @returns {boolean}
 * @example collision([{x:1, y:1}], {x:1, y:1}, {x:2, y:2}); // => true (sepiente choca con monstruo)
 */
function collision(snake, monster, poisonFood) {
  if (collisionWithBody(first(snake), rest(snake))){
    sonidoMuerte();
    // cuando choca contra el cuerpo
    return true;
  }
  if (collisionWithObstacle(first(snake), monster)) {
    // cuando choca contra los monstruos
    sonidoMuerte();
    return true;
  }
  if (collisionWithObstacle(first(snake), poisonFood)) {
    // cuando choca contra las comida envenenada
    sonidoMuerte();
    return true;
  }
  return false; // si no choca
}

/**
 * determina si la serpiente choco contra su cuerpo
 * @param {Object} head
 * @param {Array} body
 * @returns {boolean}
 * @example collisionWithBody({x:1, y:2}, [{x:2, y:2},{x:3, y:2}]) // => false
 */
function collisionWithBody(head, body) {
  const top = first(body);

  if (length(body) == 0) return false;
  else if (head.x == top.x && head.y == top.y) return true;
  else return collisionWithBody(head, rest(body));
}

/**
 * determina si la serpiente choco contra algun obstaculo(monstruo o comida envenenada)
 * @param {Object} headSnake
 * @param {Object} obstacle
 * @returns {boolean}
 * @example collisionWithObstacle({x:1, y:1}, {x:1, y:1}) // => true
 */
function collisionWithObstacle(headSnake, obstacle) {
  if (obstacle.respawn) {
    if ((headSnake.x == obstacle.x && headSnake.y == obstacle.y) && obstacle.timeRespawn<77) return true;
    else if ((headSnake.x == obstacle.x && headSnake.y == obstacle.y) && obstacle.timeRespawn>77) return false;
    else return false;
  } else {
    return false;
  }
}

function cheatpos(cabeza) {
  //Determina la posición en "X" sumando o restando 4, mientras la cabeza se encuentre entre 3 - 16.
  if (cabeza <= 16 && cabeza >= 3) {
    return Math.ceil(Math.random() * (cabeza + 3 - (cabeza - 4)) + cabeza - 4);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=2, el rango es diferente al resto.
  else if (cabeza == 2) {
    return Math.ceil(Math.random() * (4 - 0) + 0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=1, el rango es diferente al resto.
  else if (cabeza == 1) {
    return Math.ceil(Math.random() * (2 - 0) + 0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=0, el rango es diferente al resto.
  else if (cabeza == 0) {
    return Math.ceil(Math.random() * (3 - 0) + 0);
  }
  //Condiciones dadas si la cabeza se encuentra en las ultimas 3 casillas del mapa (la diferencia es que varían en las posiciones en las que puede spawnear).
  else if (cabeza == 17) {
    return Math.ceil(Math.random() * (19 - 15) + 15);
  } else if (cabeza == 18 || cabeza == 19) {
    return Math.ceil(Math.random() * (19 - 16) + 16);
  } else if (cabeza > 19) {
    return Math.ceil(Math.random() * (2 - 0) + 0);
  } else if (cabeza < 0) {
    return Math.ceil(Math.random() * (19 - 16) + 16);
  }
}

function obspos(cabeza, direccion) {
  //Determina la posición en "X" sumando o restando 4, mientras la cabeza se encuentre entre 3 - 16, cuando la serpiente se dirige hacia la derecha.
  if (direccion == 1 && cabeza <= 16 && cabeza >= 3) {
    return Math.ceil(Math.random() * (cabeza + 3 - (cabeza - 1) + cabeza - 1));
  }
  //Determina la posición en "X" sumando o restando 4, mientras la cabeza se encuentre entre 3 - 16, cuando la serpiente se dirige hacia la izquierda.
  else if (direccion == -1 && cabeza <= 16 && cabeza >= 3) {
    return Math.ceil(Math.random() * (cabeza - (cabeza - 4)) + cabeza - 4);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=2 y la serpiente se dirige hacia la derecha, el rango es diferente al resto.
  else if (cabeza == 2 && direccion == 1) {
    return Math.ceil(Math.random() * (4 - 2) + 2);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=2 y la serpiente se dirige hacia la izquierda, el rango es diferente al resto.
  else if (cabeza == 2 && direccion == -1) {
    return Math.ceil(Math.random() * (2 - 0) + 0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=1 y la serpiente se dirige hacia la derecha, el rango es diferente al resto.
  else if (cabeza == 1 && direccion == 1) {
    return Math.ceil(Math.random() * (4 - 0) + 0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=1 y la serpiente se dirige hacia la izquierda, el rango es diferente al resto.
  else if (cabeza == 1 && direccion == -1) {
    return Math.ceil(Math.random() * (2 - 0) + 0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=0 y la serpiente se dirige hacia la derecha, el rango es diferente al resto.
  else if (cabeza == 0 && direccion == 1) {
    return Math.ceil(Math.random() * (4 - 0) + 0);
  }
  //Condición dada si la cabeza del snake se encuenta en la posición "X"=0 y la serpiente se dirige hacia la izquierda, el rango es diferente al resto.
  else if (cabeza == 0 && direccion == -1) {
    return Math.ceil(Math.random() * (3 - 0) + 0);
  }
  //Condiciones dadas si la cabeza del snake se encuentra en las posiciones X:17 - 19, cambian los intervalos en función de la dirección de movimiento.
  else if (cabeza == 17 && direccion == 1) {
    return Math.ceil(Math.random() * (19 - 16) + 16);
  } else if (cabeza == 17 && direccion == -1) {
    return Math.ceil(Math.random() * (17 - 13) + 13);
  } else if (cabeza == 18 && direccion == 1) {
    return Math.ceil(Math.random() * (19 - 17) + 17);
  } else if (cabeza == 18 && direccion == -1) {
    return Math.ceil(Math.random() * (18 - 15) + 15);
  } else if (cabeza == 19 && direccion == 1) {
    return Math.ceil(Math.random() * (19 - 16) + 16);
  } else if (cabeza == 19 && direccion == -1) {
    return Math.ceil(Math.random() * (19 - 16) + 16);
  }
  //Condiciones dadas cuando la dirección en "X"=0, son las mismas condiciones que las anteriores solo que cambiando los intervalos :c
  else if (direccion == 0 && cabeza <= 16 && cabeza >= 3) {
    return Math.ceil(Math.random() * (cabeza + 3 - (cabeza - 3)) + cabeza - 3);
  } else if (cabeza == 19 && direccion == 0) {
    return Math.ceil(Math.random() * (19 - 16) + 16);
  } else if (cabeza == 18 && direccion == 0) {
    return Math.ceil(Math.random() * (19 - 15) + 15);
  } else if (cabeza == 17 && direccion == 0) {
    return Math.ceil(Math.random() * (19 - 14) + 14);
  } else if (cabeza == 0 && direccion == 0) {
    return Math.ceil(Math.random() * (3 - 0) + 0);
  } else if (cabeza == 1 && direccion == 0) {
    return Math.ceil(Math.random() * (4 - 0) + 0);
  } else if (cabeza == 2 && direccion == 0) {
    return Math.ceil(Math.random() * (5 - 0) + 0);
  }
  //Condiciones dadas cuando se realiza el traslado de un lateral del mapa a otro.
  else if (cabeza < 0) {
    return Math.ceil(Math.random() * (19 - 16) + 16);
  } else if (cabeza > 19) {
    return Math.ceil(Math.random() * (2 - 0) + 0);
  }
}

/**
 * determina si la posicion de la cabeza de snake y food son iguales.
 * En tal caso, retorna verdadero
 * @param {Array} snake
 * @param {Object} food
 * @returns {boolean}
 * @example eatFood([{x:1, y:1}, {x:2, y:1}], {x:1, y:1}) // => true
 */
function eatFood(snake, food) {
  const head = first(snake);
  if (head.x == food.x && head.y == food.y) {
    sonidoComida();
    return true
  }
  else return false;
}

/**
 * retorna el array dado, con una instancía nueva al final de este.
 * @param {Array} snake
 * @param {Object} dir
 * @returns {Array}
 */
function increaseBody(snake, dir) {
  const tail = tailSnake(snake);
  const body = append(snake, { x: tail.x - dir.x, y: tail.y - dir.y });

  return body;
}

/**
 * retorna la ultima instancia de un array
 * @param {Array} snake
 * @returns {Object}
 */
function tailSnake(snake) {
  if (length(snake) == 1) return first(snake);
  else return tailSnake(rest(snake));
}

/**
 * retorna una direccion al azar
 * @returns {Object}
 * @example newDirection(); // => {x: 4, y: 12}
 */
function newCoordinate() {
  return Math.round(Math.random() * COLUMNS);
}

/**
 * incrementa la velocidad en 2.5 cada vez que el puntaje
 * es multiplo de 10
 * @param {Number} score
 * @returns {Number}
 * @example increaseSpeed(20, 12); // => 14.5
 */
function increaseSpeed(score, speed) {
  if (score == 9) {
    return speed + 5;
  } else if (score == 19) {
    return speed + 5;
  } else if (score == 29) {
    return speed + 5;
  } else if (score == 49) {
    return speed + 5;
  } else {
    return speed;
  }
}

/**
 * crea una nueva instancia al principio del array en una dirección dada.
 * dando el movimiento a la serpiente
 * @param {Array} snake
 * @param {Object} dir
 * @returns {Array}
 */
function moveSnake(snake, dir) {
  const head = first(snake);
  const body = snake.slice(0, length(snake) - 1);

  // mover en los bordes del escenarío
  if (head.x <= 0 && dir == LEFT) return cons({ x: COLUMNS, y: head.y }, body);

  if (head.x >= COLUMNS && dir == RIGHT) return cons({ x: 0, y: head.y }, body);

  if (head.y <= 0 && dir == UP) return cons({ x: head.x, y: ROWS }, body);

  if (head.y >= ROWS && dir == DOWN) return cons({ x: head.x, y: 0 }, body);

  // mover en el resto del escenarío
  return cons({ x: head.x + dir.x, y: head.y + dir.y }, body);
}

/**
 * Reacciona a eventos del teclado
 * @param {Object} Mundo
 * @param {Object} keyCode
 * @returns {Object}
 */
function onKeyEvent(Mundo, keyCode) {
  if (Mundo.reverseFood.debuff) {
    return reverseDirectionChange(Mundo, keyCode);
  } else {
    return normalDirectionChange(Mundo, keyCode);
  }
}

function normalDirectionChange(Mundo, keyCode) {
  if (Mundo.gameOver) {
    window.open("perdido(porky-overworld).html", "_self");
    return update(Mundo, {});
  } else if (keyCode == UP_ARROW && Mundo.dir != DOWN) {
    return update(Mundo, { dir: UP });
  } else if (keyCode == DOWN_ARROW && Mundo.dir != UP) {
    return update(Mundo, { dir: DOWN });
  } else if (keyCode == LEFT_ARROW && Mundo.dir != RIGHT) {
    return update(Mundo, { dir: LEFT });
  } else if (keyCode == RIGHT_ARROW && Mundo.dir != LEFT) {
    return update(Mundo, { dir: RIGHT });
  } else {
    return update(Mundo, {});
  }
}

function reverseDirectionChange(Mundo, keyCode) {
  if (Mundo.gameOver) {
    window.open("perdido(porky-overworld).html", "_self");
    return update(Mundo, {});
  } else if (keyCode == UP_ARROW && Mundo.dir != UP) {
    return update(Mundo, { dir: DOWN });
  } else if (keyCode == DOWN_ARROW && Mundo.dir != DOWN) {
    return update(Mundo, { dir: UP });
  } else if (keyCode == LEFT_ARROW && Mundo.dir != LEFT) {
    return update(Mundo, { dir: RIGHT });
  } else if (keyCode == RIGHT_ARROW && Mundo.dir != RIGHT) {
    return update(Mundo, { dir: LEFT });
  } else {
    return update(Mundo, {});
  }
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
  return update(Mundo, {});
}

//Esta línea carga el fondo de la página a la par del script del juego para que no se vea retraso al cargar la página.
document.body.style.backgroundImage = "url('images/fondo_overworld.png')";
