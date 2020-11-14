// Algoritmo Round Robin en consola JS

var QUANTUM = 5;
var tiempoTotal = 0;
var cantidad = prompt("Ingrese cantidad de procesos: ");

console.log("Cantidad de procesos: " + cantidad);

var arrayTiempoProcesos = new Array(parseInt(cantidad));

console.log("Tiempo de ejecución");
console.log("-------------------");
for (let i = 0; i < arrayTiempoProcesos.length; i++) {
  arrayTiempoProcesos[i] = parseInt(prompt("Ingrese tiempo de ejecución del proceso #" + (i+1)));
  while (arrayTiempoProcesos[i] <= 0){
    arrayTiempoProcesos[i] = parseInt(prompt("(MAYOR A CERO) Ingrese tiempo de ejecución del proceso #" + (i+1)));
  }

  console.log("Proceso #" + (i+1) + ": " + arrayTiempoProcesos[i]);
  tiempoTotal+= arrayTiempoProcesos[i];
}

console.log("PROCESO DE EJECUCIÓN");
console.log("--------------------");
var j = 0;
while(tiempoTotal > 0){
  if (arrayTiempoProcesos[j] > 0) {
    if ((arrayTiempoProcesos[j] - QUANTUM) >= 0){
      tiempoTotal -= QUANTUM;
    } else {
      tiempoTotal -= arrayTiempoProcesos[j]
    }

    arrayTiempoProcesos[j] -= QUANTUM

    if(arrayTiempoProcesos[j] <= 0){
      console.log("Proceso #" + (j+1) + ": Terminó" );
    } else{
      console.log("Proceso #" + (j+1) + ": " + arrayTiempoProcesos[j]);
    }

    if(j == (cantidad-1)){
      j = 0;
    }else{
      j++;
    }
  } else{
    j++
  }
}

