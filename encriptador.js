// ========================================
// ENCRIPTADOR 2.0
// Desarrollado por Ruby Aguilar
// ========================================

// Diccionario de reemplazos
const DICCIONARIO = {

    "a":"ai",
    "e":"enter",
    "i":"imes",
    "o":"ober",
    "u":"ufat",

    "á":"ái",
    "é":"énter",
    "í":"ímes",
    "ó":"óber",
    "ú":"úfat"

};

const DICCIONARIO_INVERSO = {};

for (const letra in DICCIONARIO) {

    DICCIONARIO_INVERSO[DICCIONARIO[letra]] = letra;

}

// =========================
// ENCRIPTAR
// =========================
function encriptar(){

    const texto = obtenerTexto();

    if(!texto.trim()){

        mostrarResultado("",false);

        return;

    }

    let resultado="";

    for(const caracter of texto){

        const minuscula = caracter.toLowerCase();

        if(DICCIONARIO[minuscula]){

            let reemplazo = DICCIONARIO[minuscula];

            if(caracter === caracter.toUpperCase()){

                reemplazo =
                    reemplazo.charAt(0).toUpperCase()
                    + reemplazo.slice(1);

            }

            resultado += reemplazo;

        }else{

            resultado += caracter;

        }

    }

    mostrarResultado(resultado,true);

}

// =========================
// DESENCRIPTAR
// =========================
function desencriptar(){

    const texto = obtenerTexto();

    if(!texto.trim()){

        mostrarResultado("",false);

        return;

    }

    let resultado = texto;

    // Ordenamos de mayor a menor longitud
    const claves = Object.keys(DICCIONARIO_INVERSO)
        .sort((a,b)=>b.length-a.length);

    claves.forEach(clave=>{

        resultado = resultado.replaceAll(
            clave,
            DICCIONARIO_INVERSO[clave]
        );

        const mayuscula =
            clave.charAt(0).toUpperCase()
            + clave.slice(1);

        const original =
            DICCIONARIO_INVERSO[clave].toUpperCase();

        resultado = resultado.replaceAll(
            mayuscula,
            original
        );

    });

    mostrarResultado(resultado,false);

}

// =========================
// COPIAR
// =========================
async function copiar() {

    const texto = document.getElementById("text-output-text").innerText;

    if (!texto || texto === "Ningún mensaje fue encontrado") {
        return;
    }

    try {

        await navigator.clipboard.writeText(texto);

        mostrarToast("✅ Texto copiado al portapapeles");

    } catch {

        mostrarToast("❌ No fue posible copiar el texto");

    }

}

// =========================
// OBTENER TEXTO
// =========================
function obtenerTexto() {

    return document
        .getElementById("text-input")
        .value;

}

// =========================
// MOSTRAR RESULTADO
// =========================
function mostrarResultado(texto, encriptado) {

    const titulo = document.getElementById("text-output-title");
    const contenido = document.getElementById("text-output-text");
    const imagen = document.getElementById("text-output-image");

    if (!texto) {

        contenido.classList.remove(
            "text-encriptado",
            "text-desencriptado"
        );

        titulo.innerText = "Ningún mensaje fue encontrado";

        contenido.innerText =
            "Ingresa el texto que desees encriptar o desencriptar";

        imagen.classList.remove("hidden");

        imagen.style.display = "";

        return;

    }

    titulo.innerText = encriptado
        ? "🔒 Texto Encriptado"
        : "🔓 Texto Desencriptado";

    contenido.style.animation = "none";

    void contenido.offsetWidth;

    contenido.innerText = texto;

    contenido.classList.remove(
        "text-encriptado",
        "text-desencriptado"
    );

    contenido.classList.add(
        encriptado
            ? "text-encriptado"
            : "text-desencriptado"
    );

    contenido.style.animation = "aparecer .45s ease";

    imagen.classList.add("hidden");

}

// =========================
// CAPITALIZAR
// =========================
function capitalizar(texto) {

    return texto.charAt(0).toUpperCase() + texto.slice(1);

}

// =========================
// TOAST
// =========================
function mostrarToast(mensaje) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        document.body.appendChild(toast);

    }

    toast.innerText = mensaje;

    toast.classList.add("mostrar");

    setTimeout(() => {

        toast.classList.remove("mostrar");

    }, 2500);

}