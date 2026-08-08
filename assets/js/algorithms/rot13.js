// ======================================================
// ENCRIPTADOR STUDIO
// Algoritmo ROT13
// ======================================================

function transform(text) {

    return text.replace(/[a-zA-Z]/g, (character) => {

        const code = character.charCodeAt(0);

        const base =
            code >= 65 && code <= 90
                ? 65
                : 97;

        return String.fromCharCode(
            ((code - base + 13) % 26) + base
        );

    });

}


// ======================================================
// ENCRIPTAR
// ======================================================

function encrypt(text) {

    return transform(text);

}


// ======================================================
// DESENCRIPTAR
// ======================================================

function decrypt(text) {

    // ROT13 es simétrico:
    // aplicar ROT13 dos veces devuelve
    // el texto original.

    return transform(text);

}


// ======================================================
// DEFINICIÓN DEL ALGORITMO
// ======================================================

const rot13Algorithm = {

    id: "rot13",

    name: "ROT13",

    description:
        "Sustituye cada letra por la que se encuentra 13 posiciones después en el alfabeto.",

    category: "Sustitución",

    type: "Educativo",

    reversible: true,

    requiresKey: false,

    customizable: false,

    encrypt,

    decrypt

};


// ======================================================
// EXPORTAR
// ======================================================

export default rot13Algorithm;