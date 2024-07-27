let opcion;
let resultado;
let lado;

const puntajeContainer = document.getElementById("puntajeContainer");
const topContainer = document.getElementById("topContainer");

const personaje = [];
const inventario = [];
const puntos = [];
const totalPuntos = [];

class Objeto{
    constructor(nombre){
        this.nombre = nombre;
    }
}

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

function crearPersonaje(nombrePersonaje){
    const card = document.createElement("div");
    card.className = "charDiv";

    const nombre = document.createElement("h2");
    nombre.innerText = nombrePersonaje.nombre;
    nombre.className = "nombre__personaje"

    card.append(nombre);
    topContainer.append(card);
}

function itemRandom(){
    return Math.floor(Math.random() * 21);
}
function crearCard(item){
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
    container.append(card);
}
function calcularPuntos(point){
    const puntosText = document.createElement("h2");
    puntosText.innerText = point;
    puntosText.className = "puntaje__text puntaje__total"
    puntajeContainer.append(puntosText);
}
function items(){
    resultado = itemRandom();
    inventario.unshift(itemlist[resultado]);
    inventario.forEach(el => {
        crearCard(el);
    })
    puntos.unshift(itemlist[resultado].puntaje);
    let puntajeTotal = 0;
    puntos.forEach(el => puntajeTotal += el);
    totalPuntos.unshift(puntajeTotal);
}
function clearItems(){
    inventario.shift();
    totalPuntos.shift();
}

const nuevoObjeto = new Objeto(prompt("Ingresa el nombre de tu personaje"));
personaje.unshift(nuevoObjeto);
personaje.forEach(el => {
    crearPersonaje(el);
})

do{
    opcion = prompt("Bienvenido al simulador de cara o cruz.\n\n Ingresá 'cara' o 'cruz' para continuar\n Ingresá 'salir' para salir.").toUpperCase();
    if(opcion === "SALIR"){
        alert("Saliste exitosamente.");
    } else if(opcion === "CARA"){
        resultadoMoneda();
        if (lado === "cara"){
            alert("¡El resultado es " + lado + ". Ganaste!");
            clearItems();
            items();
        }
        if (lado === "cruz"){
            alert("El resultado es " + lado + ". Perdiste...");
        }
    } else if (opcion === "CRUZ"){
        resultadoMoneda();
        if (lado === "cruz"){
            alert("¡El resultado es " + lado + ". Ganaste!");
            items();
        }
        if (lado === "cara"){
            alert("El resultado es " + lado + ". Perdiste...");
        }
    } else{
        alert("Ingresa una opción valida.");
    }
} while(opcion !== "SALIR"){
    totalPuntos.forEach(el => {
        calcularPuntos(el);
    })
}

const itemsValiosos = itemlist.filter(el => el.puntaje >= 300);
console.log(itemsValiosos);
// no se me ocurre como añadir el filtrado al proyecto