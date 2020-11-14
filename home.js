// Realizado por Juan David Hdez @jdhl27

// Declaración de variables y utilizando DOM 
const QUANTUM = 5; // Constante
var tiempoTotal = 0;
var contadorVeces = 0;
var arrayTiempoProcesos = new Array(); // Declaración Array con tiempos de los procesos
var colores = ['#ff5e00','#2196F3','#8BC34A','#FFC107','#F00','#D83AF7', 
              '#7EE772','#F08C56','#83ACFF','#FF8383'];

// Objetos del DOM
var mensajeError = document.getElementById('messageError');
var cuadroProcesos = document.getElementById('process-content');
var tituloTiempos = document.getElementsByClassName('title-time');
var tiemposAgregados = document.getElementById('tiemposAgregados');
var botonEnviar = document.getElementById('btn-enviar');
var progressBar = document.getElementById('progress-bar');

// Función para agregar tiempos al Array
function btnAdd() {
  
  // Trayendo el objeto input
  var inputTiempos = document.getElementById('time');

  // Validando que el número a ingresar sea mayor a cero
  if(inputTiempos.value > 0 ){
    // Contador las veces que agregó un tiempo a la lista
    contadorVeces++;

    if (contadorVeces <= 10) {
      // Eliminando información de la tabla
      var infoProcesos = document.getElementsByClassName('info-process');
      var cantidad = infoProcesos.length
      for (let i = 0; i < cantidad; i++) {
        cuadroProcesos.removeChild(infoProcesos[0]);
      }

      // Eliminando barra de procesos
      var procesos = document.getElementsByClassName('process');
      var cantidad = procesos.length
      for (let i = 0; i < cantidad; i++) {
        progressBar.removeChild(procesos[0]);
      }

      //Mostrando y ocultando objetos
      tiemposAgregados.style.display = 'block';
      tituloTiempos[0].style.display = 'block';
      botonEnviar.style.display = 'block';
      mensajeError.style.display = 'none';
      progressBar.style.width = '0%';

      // Insertando dato al Array
      arrayTiempoProcesos.push(parseInt(inputTiempos.value))

      // Mostrando Array en el DOM
      tiemposAgregados.innerHTML = arrayTiempoProcesos;

      // Vaciando y enfocando el input
      inputTiempos.value = "";
      inputTiempos.focus();
    } else {
      // Mostrando mensaje de error
      mensajeError.innerHTML = "No se exceda. Máximo 10 procesos"
      mensajeError.style.display = 'block';
    }  
  } else {
    
    // Vaciando y enfocando el input
    inputTiempos.value = "";
    inputTiempos.focus();
    
    // Mostrando mensaje de error
    mensajeError.innerHTML = "Ingrese un número mayor a cero"
    mensajeError.style.display = 'block';
  }
}

// Función encargada del Algoritmo Round Robin
function btnClick() {

  // Eliminando datos del contador
  contadorVeces = 0;

  // Calculando el tiempo total
  for (let i = 0; i < arrayTiempoProcesos.length; i++) {
    tiempoTotal+= arrayTiempoProcesos[i];
  }

  progressBar.style.width = '75%';

  var percentilProgreso = 0;
  var porcentajeProgreso = 0;
  var tiempoTotalCopia = tiempoTotal; // Debido a que abajo se opera con el tiempo total
  
  // Declarar indicador posiciones del Array
  var j = 0;

  // Se realiza de esta manera debido a que no se sabe con exactitud cuantas veces se tenga que ejecutar
  // Se ejecuta hasta que el tiempo total sea igual o menor a cero
  while(tiempoTotal > 0){
    // Validar que sea mayor de cero para no volver a mostrar que terminó el proceso
    if (arrayTiempoProcesos[j] > 0) {
      // Validación para restar correctamente el tiempo total
      if ((arrayTiempoProcesos[j] - QUANTUM) >= 0){
        tiempoTotal -= QUANTUM;
        percentilProgreso = QUANTUM // Barra de procesos
      } else {
        tiempoTotal -= arrayTiempoProcesos[j]
        percentilProgreso = arrayTiempoProcesos[j] // Barra de procesos
      }

      // Operar porcentaje para la barra de los procesos
      porcentajeProgreso = (percentilProgreso * 100) / tiempoTotalCopia;

      // Crear elementos para mostrar información en el progress Bar
      var divProcess = document.createElement("div");
      divProcess.setAttribute("class", "process");
      divProcess.style.width = porcentajeProgreso + "%";
      divProcess.style.backgroundColor = colores[j];
      divProcess.innerHTML = (j+1)

      // Imprimiendo elementos creados para la barra de procesos
      progressBar.appendChild(divProcess);

      // Se resta el valor del Quantum
      arrayTiempoProcesos[j] -= QUANTUM

      // Crear elementos para mostrar información
      var span = document.createElement("span");
      span.setAttribute("class", "info-process");
      var br = document.createElement("br")
      br.setAttribute("class", "info-process");

      // Validar el resultado al restar el Quantum
      if(arrayTiempoProcesos[j] <= 0){
        // Proceso terminado
        
        // Modificando el texto del cuadro
        span.innerHTML = "Proceso #" + (j+1) + ": Terminó";
      } else{
        // Proceso en proceso jeje
        
        // Modificando el texto del cuadro
        span.innerHTML = "Proceso #" + (j+1) + ": " + arrayTiempoProcesos[j];
      }
      // Imprimiendo en la tabla información del proceso
      cuadroProcesos.appendChild(span)
      cuadroProcesos.appendChild(br)
      cuadroProcesos.style.height = '22.45vw'

      // Validar si J es igual a la última posición del Array
      if(j == (arrayTiempoProcesos.length - 1)){
        j = 0;
      }else{
        j++;
      }

    } else{
      // Validar si J es igual a la última posición del Array
      if(j == (arrayTiempoProcesos.length - 1)){
        j = 0;
      }else{
        j++;
      }
    }
  }
  // Vaciando el Array de los tiempos para iniciar nuevos procesos
  arrayTiempoProcesos = [];
}

// Funcion para abrir información
const openInfo = () => {
  swal({
    title: "Información",
    text: "Es un método para seleccionar todos los abstractos en un grupo de manera equitativa y en un orden racional, normalmente comenzando por el primer elemento de la lista hasta llegar al último y empezando de nuevo desde el primer elemento. En operaciones computacionales, un método para ejecutar diferentes procesos de manera concurrente, para la utilización equitativa de los recursos del equipo, es limitando cada proceso a un pequeño período (quantum)  y luego suspendiendo este proceso para dar oportunidad a otro proceso y así sucesivamente.",
    button: "Ok",
  });
}