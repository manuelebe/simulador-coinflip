let resultado;
let lado;
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
const highscoreText = document.getElementById("highscoreText");

const personaje = [];
const inventarioCrear = [];
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

    topContainer.prepend(nombreText);
    inputNombre.remove();
}
function items(){
    resultado = itemRandom();
    inventarioCrear.unshift(itemlist[resultado]);
    inventarioCrear.forEach(el => {
        crearItem(el);
    })
    puntos.unshift(itemlist[resultado].puntaje);
    
    let puntajeTotal = 0;
    puntos.forEach(el => puntajeTotal += el);
    totalPuntos.unshift(puntajeTotal);
    if(isNaN(ultimoHighscore) || totalPuntos[0] > ultimoHighscore){
        highscoreText.innerText = "Puntaje más alto: " + totalPuntos[0];
        localStorage.puntaje = totalPuntos[0];
    }
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
function alertFail(){
    const card = document.createElement("div");
    card.className = "mensajeCard";

    const mensajeText = document.createElement("h2");
    mensajeText.innerText = "Desafortunadamente no recibiste nada...";
    mensajeText.className = "mensajeText";

    card.append(mensajeText);
    mensajeContainer.append(card);
}
function clearAlert(){
    const removeCoinResultado = document.querySelector(".coinResultado");
    const mensajeCard = document.querySelector(".mensajeCard");
    removeCoinResultado?.remove();
    mensajeCard?.remove();
}

//--------------------------------------------------------------------------------

formNombre.addEventListener("submit", crearPersonaje);

if(isNaN(ultimoHighscore)){
    highscoreText.innerText = "Puntaje más alto: 0";
} else{
    highscoreText.innerText = "Puntaje más alto: " + localStorage.puntaje;
}

botones.forEach(function(el){
    el.addEventListener("mousedown", function(){
        el.className = "boton botonDown";
    })
    el.addEventListener("mouseup", function(){
        el.className = "boton";
    })
})
botonCara.addEventListener("click", () =>{
    resultadoMoneda();
    if(lado === "cara"){
        clearItems();
        items();
        puntajeText.innerText = "Puntaje total: " + totalPuntos[0];
        clearAlert();
        alertWin();
        crearMoneda();
    } else{
        clearAlert();
        alertFail();
        crearMoneda();
    }
})
botonCruz.addEventListener("click", () =>{
    resultadoMoneda();
    if(lado === "cruz"){
        clearItems();
        items();
        puntajeText.innerText = "Puntaje total: " + totalPuntos[0];
        clearAlert();
        alertWin();
        crearMoneda();
    } else{
        clearAlert();
        alertFail();
        crearMoneda();
    }
})