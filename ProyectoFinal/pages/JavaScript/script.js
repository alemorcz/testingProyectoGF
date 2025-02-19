//----------------BOTON PARA DESGLOZAR MENU (RESPONSIVO)---------------------
function addclass() {
    document.getElementById('hamburger').classList.toggle('activeBtn')
}

//--------------------------CUENTA REGRESIVA---------------------------
const days = document.getElementById("day");
const hours = document.getElementById("hour");
const mins = document.getElementById("minute");
const seconds = document.getElementById("second");

const concert = '26 Feb 2025';

function countTimer() {
    const concertDate = new Date(concert);
    const currentDate = new Date();

    const totalSeconds = (concertDate - currentDate) / 1000;

    const daysCalc = Math.floor(totalSeconds / 3600 / 24);
    const hoursCalc = Math.floor(totalSeconds / 3600) % 24;
    const minsCalc = Math.floor(totalSeconds / 60) % 60;
    const secondsCalc = Math.floor(totalSeconds % 60);

    days.innerHTML = daysCalc;
    hours.innerHTML = hoursCalc;
    mins.innerHTML = minsCalc;
    seconds.innerHTML = secondsCalc;
}
countTimer();

setInterval(countTimer, 1000);

//-------------------VALIDACIÓN NOMBRE----------------------
document.getElementById('miFormulario').addEventListener('submit', function (e) {
    const nombre = document.getElementById('nombre').value;
    const regex = /^[A-Za-zÀ-ÿÑñ\s]{1,49}$/;

    if (!regex.test(nombre)) {
        e.preventDefault(); 
        alert('El nombre solo puede contener letras y espacios, y debe tener un máximo de 20 caracteres.');
    }
});

//------------------VALIDACION CORREO -------------------------------
document.getElementById('miFormulario').addEventListener('submit', function (e) {
    const email = document.getElementById('email').value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
        e.preventDefault();
        alert('Por favor, introduce un correo electrónico válido.');
    }
});