let { append, cons, first, isEmpty, isList, length, rest, map, forEach }  = require('functional-Light');
const prueba = {snake: [{ x: 20, y: 1 }, { x: 18, y: 1 }, { x: 19, y: 1 }]}
/*function colision (lista) {
    const derp = first(prueba.snake).x
    if (isEmpty(rest(lista))) {
        return "no colisiona"
    }
    else if (first(rest(lista)).x==derp) {
        return "colision"
    }
    else {
        return colision(rest(lista));
    }
}*/
function traslacion (lista) {
    if (isEmpty(rest(lista))&&first(lista).x==19) {
      return cons({x:0,y:first(lista).y},rest(lista));
    }
    else if (first(lista).x==19) {
      return cons({x:0,y:first(lista).y},[]);
    }
    else if (first(lista).x==-1) {
      return cons({x:20,y:first(lista).y},rest(lista));
    }
    else {
      return cons(first(lista),traslacion(rest(lista)))
    }
  }
console.log(Math.sign(-0)*-1);