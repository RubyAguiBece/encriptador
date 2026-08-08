// ======================================================
// ENCRIPTADOR STUDIO
// Registro de algoritmos
// ======================================================

import classicAlgorithm from "../algorithms/classic.js";
import rot13Algorithm from "../algorithms/rot13.js";
import caesarAlgorithm from "../algorithms/caesar.js";


// ======================================================
// ALGORITMOS DISPONIBLES
// ======================================================

const algorithms = new Map();


// ======================================================
// REGISTRAR ALGORITMO
// ======================================================

function registerAlgorithm(algorithm) {

    if (!algorithm || !algorithm.id) {

        throw new Error(
            "El algoritmo debe tener un identificador."
        );

    }

    if (
        typeof algorithm.encrypt !== "function" ||
        typeof algorithm.decrypt !== "function"
    ) {

        throw new Error(
            `El algoritmo "${algorithm.id}" debe implementar encrypt() y decrypt().`
        );

    }

    algorithms.set(
        algorithm.id,
        algorithm
    );

}


// ======================================================
// OBTENER ALGORITMO
// ======================================================

function getAlgorithm(id) {

    return algorithms.get(id);

}


// ======================================================
// OBTENER TODOS LOS ALGORITMOS
// ======================================================

function getAllAlgorithms() {

    return Array.from(
        algorithms.values()
    );

}


// ======================================================
// REGISTRAR ALGORITMOS INICIALES
// ======================================================

registerAlgorithm(
    classicAlgorithm
);

registerAlgorithm(
    rot13Algorithm
);

registerAlgorithm(
    caesarAlgorithm
);


// ======================================================
// EXPORTAR REGISTRO
// ======================================================

export {

    registerAlgorithm,

    getAlgorithm,

    getAllAlgorithms

};