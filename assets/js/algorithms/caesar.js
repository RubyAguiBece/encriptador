// ======================================================
// ENCRIPTADOR STUDIO
// Algoritmo César
// ======================================================

function normalizeShift(shift) {

    const numericShift = Number(shift);

    if (!Number.isFinite(numericShift)) {
        return 3;
    }

    return ((numericShift % 26) + 26) % 26;

}


// ======================================================
// TRANSFORMAR TEXTO
// ======================================================

function transform(text, shift) {

    const normalizedShift =
        normalizeShift(shift);

    return text.replace(
        /[a-zA-Z]/g,
        (character) => {

            const code =
                character.charCodeAt(0);

            const base =
                code >= 65 && code <= 90
                    ? 65
                    : 97;

            return String.fromCharCode(
                (
                    code -
                    base +
                    normalizedShift
                ) % 26 + base
            );

        }
    );

}


// ======================================================
// ENCRIPTAR
// ======================================================

function encrypt(text, options = {}) {

    const shift =
        options.shift ?? 3;

    return transform(
        text,
        shift
    );

}


// ======================================================
// DESENCRIPTAR
// ======================================================

function decrypt(text, options = {}) {

    const shift =
        options.shift ?? 3;

    return transform(
        text,
        -shift
    );

}


// ======================================================
// DEFINICIÓN DEL ALGORITMO
// ======================================================

const caesarAlgorithm = {

    id: "caesar",

    name: "César",

    description:
        "Desplaza cada letra del alfabeto una cantidad determinada de posiciones.",

    category: "Sustitución",

    type: "Educativo",

    reversible: true,

    requiresKey: false,

    customizable: true,

    requiresConfiguration: true,

    configuration: {

        type: "range",

        label: "Desplazamiento",

        defaultValue: 3,

        min: 1,

        max: 25

    },

    encrypt,

    decrypt

};


// ======================================================
// EXPORTAR
// ======================================================

export default caesarAlgorithm;