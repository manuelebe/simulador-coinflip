let opcion;
let resultado;
let lado;

function moneda(cara, cruz){
    return Math.floor(Math.random() * (cruz - cara) ) + cara;
}
function resultadoMoneda(){
    resultado = moneda(1, 3);
    if (resultado === 1){
        lado = "cara";
    } else if (resultado === 2){
        lado = "cruz";
    }
}

do{
    opcion = prompt("Bienvenido al simulador de Cara o cruz.\n\n Ingresá 'cara' o 'cruz' para continuar\n Ingresá 'salir' para salir.").toUpperCase();
    if(opcion === "SALIR"){
        alert("Saliste exitosamente.");
    } else if(opcion === "CARA"){
        resultadoMoneda();
        if (lado === "cara"){
            alert("¡El resultado es " + lado + ". Ganaste!");
        }
        if (lado === "cruz"){
            alert("El resultado es " + lado + ". Perdiste...");
        }
    } else if (opcion === "CRUZ"){
        resultadoMoneda();
        if (lado === "cruz"){
            alert("¡El resultado es " + lado + ". Ganaste!");
        }
        if (lado === "cara"){
            alert("El resultado es " + lado + ". Perdiste...");
        }
    } else{
        alert("Ingresa una opción valida.");
    }
} while(opcion !== "SALIR");