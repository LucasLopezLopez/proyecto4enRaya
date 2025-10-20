import '../stylesSeleccionarJuego.scss'

document.addEventListener('DOMContentLoaded', () => {

let contenedorModos = document.getElementById("seleccionarJuego");
contenedorModos.innerHTML="<button id='jugarClassic'>Classic <br> <img src='/img/iconoConecta4.png'></button> <button id='jugarOnline'>Online Multiplayer<br> <img src='/img/iconoOnline.png'></button>";



  document.getElementById('jugarClassic').addEventListener('click', () => {
    window.location.href = './index.html'; 
  });

});