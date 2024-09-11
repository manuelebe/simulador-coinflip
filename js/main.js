let resultado;
let lado;
let vida;
const documentMain = document.getElementById("main");
const puntajeContainer = document.getElementById("puntajeContainer");
const topContainer = document.getElementById("topContainer");
const containerInventario = document.getElementById("containerInventario");
const botonCara = document.getElementById("botonCara");
const botonCruz = document.getElementById("botonCruz");
const puntajeText = document.querySelector(".puntajeText");
const botones = document.querySelectorAll(".boton");
const formNombre = document.getElementById("formNombre");
const inputNombre = document.getElementById("inputNombre");
const mensajeContainer = document.getElementById("mensajeContainer");
const coinImg = document.getElementById("coinImg");
const coinContainer = document.getElementById("coinContainer");
const ultimoHighscore = parseFloat(localStorage.getItem("puntaje"));
const ultimoInventario = localStorage.getItem("inventario");
const ultimoPersonaje = localStorage.getItem("personaje");
const ultimaVida = parseFloat(localStorage.getItem("vida"));
const highscoreText = document.getElementById("highscoreText");
const botonReload = document.getElementById("botonReload");
const vidaContainer = document.getElementById("vidaContainer");

const personaje = [];
const inventarioCrear = [];
const inventarioActual = [];
const puntos = [];
const totalPuntos = [];

//--------------------------------------------------------------------------------

function moneda(){
    return Math.floor(Math.random() * 2) + 1;
}
function resultadoMoneda(){
    resultado = moneda();
    if (resultado === 1){
        lado = "cara";
    } else if (resultado === 2){
        lado = "cruz";
    }
}
function itemRandom(){
    return Math.floor(Math.random() * 21);
}
function crearItem(item){
    const card = document.createElement("div");
    card.className = "itemCard";

    const imgItem = document.createElement("img");
    imgItem.src = item.src;
    imgItem.className = "itemImg"

    const nombreItem = document.createElement("h2");
    nombreItem.innerText = item.nombre;
    nombreItem.className = "itemName";
    
    const puntajeItem = document.createElement("h2");
    puntajeItem.innerText = item.puntaje;
    puntajeItem.className = "itemPoints";

    card.append(imgItem);
    card.append(nombreItem);
    card.append(puntajeItem);
    containerInventario.append(card);
}
function crearPersonaje(el){
    el.preventDefault();
    const nombreText = document.createElement("h2");
    nombreText.innerText = inputNombre.value;
    nombreText.className = "nombreText";

    localStorage.personaje = inputNombre.value;
    personaje.push(inputNombre.value);

    topContainer.prepend(nombreText);
    inputNombre.remove();
}
function cargarPersonaje(){
    const nombreText = document.createElement("h2");
    nombreText.innerText = ultimoPersonaje;
    nombreText.className = "nombreText";

    personaje.push(ultimoPersonaje);

    topContainer.prepend(nombreText);
    inputNombre.remove();
}
async function items(){
    const response = await fetch('./data/itemlist.json');
    const itemlist = await response.json();
    resultado = itemRandom();
    inventarioCrear.unshift(itemlist[resultado]);
    inventarioCrear.forEach(el => {
        crearItem(el);
    })
    inventarioActual.push(itemlist[resultado]);
    localStorage.inventario = JSON.stringify(inventarioActual);
    puntos.unshift(itemlist[resultado].puntaje);
    
    let puntajeTotal = 0;
    puntos.forEach(el => puntajeTotal += el);
    totalPuntos.unshift(puntajeTotal);
    if(isNaN(ultimoHighscore) || totalPuntos[0] > ultimoHighscore){
        highscoreText.innerText = "Puntaje más alto: " + totalPuntos[0];
        localStorage.puntaje = totalPuntos[0];
    }
    puntajeText.innerText = "Puntaje total: " + totalPuntos[0];
    clearAlert();
    alertWin();
    crearMoneda();
}
function clearItems(){
    inventarioCrear.shift();
    totalPuntos.shift();
}
function crearMoneda(){
    coinImg?.remove();
    if(lado === "cara"){
        const coinResultado = document.createElement("img");
        coinResultado.src = "./imagenes/cara.webp";
        coinResultado.className = "coinResultado animate__animated animate__flip";
        coinContainer.prepend(coinResultado);
    }
    if(lado === "cruz"){
        const coinResultado = document.createElement("img");
        coinResultado.src = "./imagenes/cruz.webp";
        coinResultado.className = "coinResultado animate__animated animate__flip";
        coinContainer.prepend(coinResultado);
    }
}
function crearVida(img){
    const vidaImg = document.querySelector(".vidaImg");
    vidaImg?.remove();

    const vidaActual = document.createElement("img");
    vidaActual.src = "./imagenes/barrasDeVida/vida" + img + ".png";
    vidaActual.className = "vidaImg";

    vidaContainer.append(vidaActual);
}
function calcularDaño(daño){
    vida = vida - daño;
    localStorage.vida = vida;
    if(vida >= 90 && vida < 100){
        crearVida(9);
    } else if(vida >= 80 && vida < 90){
        crearVida(8);
    } else if(vida >= 70 && vida < 80){
        crearVida(7);
    } else if(vida >= 60 && vida < 70){
        crearVida(6);
    } else if(vida >= 50 && vida < 60){
        crearVida(5);
    } else if(vida >= 40 && vida < 50){
        crearVida(4);
    } else if(vida >= 30 && vida < 40){
        crearVida(3);
    } else if(vida >= 20 && vida < 30){
        crearVida(2);
    } else if(vida >= 10 && vida < 20){
        crearVida(1);
    } else if(vida <= 0){
        crearVida(0);
        Swal.fire({
            title: personaje[0] + " ha muerto...",
            text: "Tu partida sera reiniciada.",
            timer: 3000,
            showConfirmButton: false,
            background: "#000000f0",
            color: "#c5c1b2",
        })
        .then(() => {
            localStorage.removeItem("personaje");
            localStorage.removeItem("inventario");
            localStorage.removeItem("vida");
            window.location.reload();
        })
    }
}
function alertWin(){
    const card = document.createElement("div");
    card.className = "mensajeCard";

    const mensajeText = document.createElement("h2");
    mensajeText.innerText = "Recibiste";
    mensajeText.className = "mensajeText";

    const itemText = document.createElement("h2");
    itemText.innerText = inventarioCrear[0].nombre + "!";
    itemText.className = "mensajeItem";

    card.append(mensajeText);
    card.append(itemText);
    mensajeContainer.append(card);
}
async function alertFail(){
    let chanceFail = Math.floor(Math.random() * 3) + 1;
    if(chanceFail === 1){
        const card = document.createElement("div");
        card.className = "mensajeCard";

        const mensajeText = document.createElement("h2");
        mensajeText.innerText = "Desafortunadamente no recibiste nada...";
        mensajeText.className = "mensajeText";

        card.append(mensajeText);
        mensajeContainer.append(card);
    } else{
        const response = await fetch('./data/mensajes.json');
        const mensajes = await response.json();
        let chanceMensaje = Math.floor(Math.random() * 7);

        const card = document.createElement("div");
        card.className = "mensajeCardVida";

        const mensajeText = document.createElement("h2");
        mensajeText.innerText = mensajes[chanceMensaje].mensaje;
        mensajeText.className = "mensajeText";

        const alertVida = document.createElement("h2");
        alertVida.innerText = "Pierdes " + mensajes[chanceMensaje].daño + " de vida...";
        alertVida.className = "mensajeItem";

        card.append(mensajeText);
        card.append(alertVida);
        mensajeContainer.append(card);

        calcularDaño(mensajes[chanceMensaje].daño);
    }
}
function clearAlert(){
    const removeCoinResultado = document.querySelector(".coinResultado");
    const mensajeCard = document.querySelector(".mensajeCard");
    const mensajeCardVida = document.querySelector(".mensajeCardVida");
    removeCoinResultado?.remove();
    mensajeCard?.remove();
    mensajeCardVida?.remove();
}
function botonClick(value){
    resultadoMoneda();
    if(lado === value){
        clearItems();
        items();
    } else{
        clearAlert();
        alertFail();
        crearMoneda();
    }
}
function alertPersonaje(){
    Swal.fire({
        title: "Ingresa el nombre de tu personaje antes de comenzar",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        background: "#000000f0",
        color: "#c5c1b2",
    })
}

//--------------------------------------------------------------------------------

ultimoPersonaje ? cargarPersonaje() : formNombre.addEventListener("submit", crearPersonaje);

if(isNaN(ultimoHighscore)){
    highscoreText.innerText = "Puntaje más alto: 0";
} else{
    highscoreText.innerText = "Puntaje más alto: " + localStorage.puntaje;
}
if(isNaN(ultimaVida)){
    vida = 100;
} else{
    vida = ultimaVida;
    calcularDaño(0);
}
JSON.parse(ultimoInventario)?.forEach(el => {
    crearItem(el);
    inventarioActual.push(el);
    puntos.unshift(el.puntaje);
    let puntajeTotal = 0;
    puntos.forEach(el => puntajeTotal += el);
    totalPuntos.unshift(puntajeTotal);
    puntajeText.innerText = "Puntaje total: " + totalPuntos[0];
    totalPuntos.shift(puntajeTotal);
})
botones.forEach(function(el){
    el.addEventListener("mousedown", function(){
        el.className = "boton botonDown";
    })
    el.addEventListener("mouseup", function(){
        el.className = "boton";
    })
})
botonCara.addEventListener("click", () =>{
    personaje[0] ? botonClick("cara") : alertPersonaje();
})
botonCruz.addEventListener("click", () =>{
    personaje[0] ? botonClick("cruz") : alertPersonaje();
})
botonReload.addEventListener("click", () =>{
    Swal.fire({
        title: "¿Estas seguro de que quieres reiniciar tu progreso?",
        text: "Esta acción borrará tu puntaje más alto, tu personaje e inventario actual.",
        showDenyButton: true,
        confirmButtonText: "Reiniciar",
        denyButtonText: `Cancelar`,
        background: "#000000f0",
        color: "#c5c1b2",
        confirmButtonColor: "#44444499",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.reload();
        }
    });
})