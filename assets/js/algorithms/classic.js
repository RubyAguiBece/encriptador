// ======================================================
// ENCRIPTADOR STUDIO
// Algoritmo Clásico
// ======================================================

const ENCRYPTION_MAP = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat",

    "á": "ái",
    "é": "énter",
    "í": "ímes",
    "ó": "óber",
    "ú": "úfat"
};


// ======================================================
// CREAR MAPA INVERSO
// ======================================================

const DECRYPTION_MAP = Object.entries(ENCRYPTION_MAP)
    .reduce((map, [original, encrypted]) => {

        map[encrypted] = original;

        return map;

    }, {});


// ======================================================
// ENCRIPTAR
// ======================================================

function encrypt(text) {

    let result = "";

    for (const character of text) {

        const lowerCharacter = character.toLowerCase();

        if (ENCRYPTION_MAP[lowerCharacter]) {

            let replacement = ENCRYPTION_MAP[lowerCharacter];

            // Mantener mayúsculas
            if (character === character.toUpperCase()) {

                replacement =
                    replacement.charAt(0).toUpperCase()
                    + replacement.slice(1);

            }

            result += replacement;

        } else {

            // Espacios, números, emojis,
            // signos y cualquier otro carácter
            // permanecen intactos.

            result += character;

        }

    }

    return result;
}


// ======================================================
// DESENCRIPTAR
// ======================================================

function decrypt(text) {

    let result = text;

    // Las claves más largas primero.
    // Esto evita conflictos entre reglas.

    const encryptedValues = Object.keys(DECRYPTION_MAP)
        .sort((a, b) => b.length - a.length);

    for (const encryptedValue of encryptedValues) {

        const originalCharacter =
            DECRYPTION_MAP[encryptedValue];

        // Versión minúscula
        result = result.replaceAll(
            encryptedValue,
            originalCharacter
        );

        // Versión con primera letra mayúscula
        const capitalizedEncrypted =
            encryptedValue.charAt(0).toUpperCase()
            + encryptedValue.slice(1);

        const uppercaseOriginal =
            originalCharacter.toUpperCase();

        result = result.replaceAll(
            capitalizedEncrypted,
            uppercaseOriginal
        );

    }

    return result;
}


// ======================================================
// DEFINICIÓN DEL ALGORITMO
// ======================================================

const classicAlgorithm = {

    id: "classic",

    name: "Clásico",

    description:
        "Algoritmo clásico de sustitución utilizado por Encriptador Studio.",

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

export default classicAlgorithm;