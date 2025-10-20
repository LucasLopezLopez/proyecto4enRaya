// Import our custom CSS
import '../styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
  let filas = 6;
  let columnas = 7;
  let grid = Array.from({ length: filas }, () => Array(columnas).fill(null));
  let celdas = Array.from({ length: filas }, () => Array(columnas).fill(null));
  const tablero = document.getElementById("tablero");
  const divTurno = document.getElementById("turno");
  let turno =0; divTurno.innerHTML = "Turno de " + (turno%2===0 ? "Jugador 1" : "Jugador 2");
  let celdasGanadoras = [];
  let juegoActivo=true;
  const mensajeVictoria = document.getElementById("mensajeVictoria");
  const btnReiniciar = document.createElement("button");
  btnReiniciar.classList.add('botoReiniciarPartida');
  btnReiniciar.addEventListener("click", reiniciarJuego);
  let victorias1 =0;
  let victorias2 =0;
  const marcador = document.getElementById("marcador");
  marcador.innerHTML = 
  "<span class='red'>Red Team:</span> " + victorias1 + 
  " &nbsp;&nbsp; <br><span class='yellow'>Yellow Team:</span> " + victorias2;




    //Generar Grid
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        const celda = document.createElement('div');
        celda.dataset.row = i;
        celda.dataset.col = j;
        celda.classList.add("celda");
        tablero.appendChild(celda);
        grid[i][j] = null;
        celdas[i][j] = celda; 
      }
    }

  //Generar Botons Anyadir Ficha
    let botons = document.getElementById("botons");
    for (let index = 0; index <=filas; index++) {
      const bot = document.createElement('button')   
      bot.classList.add("botoAnyadir");
      bot.id = "boto"+index;

      //Metode ficar ficha
     bot.addEventListener("click", function() {
    if (!juegoActivo) return;

    for (let i = filas - 1; i >= 0; i--) {
        if (grid[i][index] === null) {
            let jugador = turno % 2 === 0 ? "X" : "O";
            grid[i][index] = jugador;
            celdas[i][index].style.backgroundColor = jugador === "X" ? "#ff6f61" : "#ffe066";

            if (comprobarVictoria(grid, i, index)) {
                mostrarCeldasGanadoras();
                juegoActivo = false;
                
                if (jugador === "X") {
                  mensajeVictoria.innerHTML = "🎉 ¡Victoria del Jugador 1!";
                  victorias1++;
                  marcador.innerHTML = 
                  "<span class='red'>Red Team:</span> " + victorias1 + 
                  " &nbsp;&nbsp; <span class='yellow'>Yellow Team:</span> " + victorias2;

                } else {
                  mensajeVictoria.innerHTML = "🎉 ¡Victoria del Jugador 2!";
                  victorias2++
                  marcador.innerHTML = 
                  "<span class='red'>Red Team:</span> " + victorias1 + 
                  " &nbsp;&nbsp; <span class='yellow'>Yellow Team:</span> " + victorias2;

                }

                mensajeVictoria.appendChild(document.createElement("br")); 
                mensajeVictoria.appendChild(btnReiniciar);
                mensajeVictoria.style.display = "block";
                divTurno.style.display = "none";
            } else if (tableroLleno()) {
                juegoActivo = false;
                mensajeVictoria.innerHTML = "🤝 ¡Empate!";
                mensajeVictoria.appendChild(document.createElement("br"));
                mensajeVictoria.appendChild(btnReiniciar);
                mensajeVictoria.style.display = "block";
                divTurno.style.display = "none";
            } else {
                turno++;
                divTurno.innerHTML = "Turno de " + (turno % 2 === 0 ? "Jugador 1" : "Jugador 2");
            }

            break; 
        }
    }
});

  


      botons.appendChild(bot); 
      
    }

    function comprobarVictoria(grid, fila, columna) {

     let valor=grid[fila][columna];
      //Comprovar Horizontal
      let count =1;

      //Comprovar Dreta
      let col=columna+1;
      let celdas = [[fila, columna]];


      while (col<columnas && grid[fila][col]===valor) {
        count++;
        celdas.push([fila, col]);
        col++;
      }

      //Comprovar Esquerre
      col=columna-1;

      while (col>=0 && grid[fila][col]===valor) {
        count++;
        celdas.unshift([fila, col]);
        col--;
      }

      if (count >= 4) {
        celdasGanadoras = celdas;
        return true;
    }

      count=1;
      celdas = [[fila, columna]];
      //Comprovar Vertical

      //Comprovar Dalt
      let row=fila+1;

      while (row<filas && grid[row][columna]===valor) {
        count++;
        celdas.push([row, columna]);
        row++;
      }

      //Comprovar Baix
      row=fila-1;

      while (row>=0 && grid[row][columna]===valor) {
        count++;
        celdas.unshift([row, columna]);
        row--;
      }

       if (count >= 4) {
        celdasGanadoras = celdas;
        return true;
    }

      count=1;
     celdas = [[fila, columna]];

      //Comprovar Diagonal 

      //Comprovar Dreta Baix
      col=columna+1
      row=fila+1

      while (col<columnas && row<filas && grid[row][col]===valor) {
        count++;
        celdas.push([row, col]);
        col++;
        row++;
      }

      //Comprovar Esquerre Dalt

      col=columna-1
      row=fila-1

      while (col>=0 && row>=0 && grid[row][col]===valor) {
        count++;
        celdas.unshift([row, col]);
        col--;
        row--;
      }

      if (count >= 4) {
        celdasGanadoras = celdas;
        return true;
    }

     count=1;
    celdas = [[fila, columna]];
      //Comprovar Dreta Dalt
      col=columna-1
      row=fila+1

      while (col>=0 && row<filas && grid[row][col]===valor) {
        count++;
        celdas.push([row, col]);
        col--;
        row++;
      }

      //Comprovar Esquerre Baix

      //Comprovar Esquerre Dalt

      col=columna+1
      row=fila-1

      while (col<columnas && row>=0 && grid[row][col]===valor) {
        count++;
        celdas.unshift([row, col]);
        col++;
        row--;
      }
       if (count >= 4) {
        celdasGanadoras = celdas;
        return true;
    }

    return false;
    }

    function tableroLleno() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (grid[i][j] === null) return false;
        }
    }
    console.log("ple")
    return true;
}

    function mostrarCeldasGanadoras() {
       const todasCeldas = document.querySelectorAll('#tablero .celda');
      todasCeldas.forEach(celda => celda.classList.add('atenuada'));
       celdasGanadoras.forEach(([r, c]) => {
        const index = r * columnas + c; 
        todasCeldas[index].classList.remove('atenuada');
        todasCeldas[index].classList.add('ganadora');

        mensajeVictoria.style.display = "block";
    });
    }

    
    function reiniciarJuego() {
  
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            grid[i][j] = null;
            celdas[i][j].style.backgroundColor = "";
            celdas[i][j].classList.remove('ganadora', 'atenuada');
        }
    }

    turno = 0;
    celdasGanadoras = [];
    juegoActivo = true;
    divTurno.style.display = "block";
    divTurno.innerHTML = "Turno de Jugador 1";
    
    mensajeVictoria.style.display = "none";
    mensajeVictoria.innerHTML = "";
}

  
});






