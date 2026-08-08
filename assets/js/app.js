// ======================================================
// ENCRIPTADOR STUDIO
// Aplicación principal
// ======================================================

import {
    getAlgorithm,
    getAllAlgorithms
} from "./core/algorithm-registry.js";


// ======================================================
// ESTADO DE LA APLICACIÓN
// ======================================================

const state = {

    selectedAlgorithm: "classic",

    operation: null,

    inputText: "",

    outputText: ""

};


// ======================================================
// ELEMENTOS DEL DOM
// ======================================================

const elements = {

    input: document.getElementById("text-input"),

    output: document.getElementById("text-output-text"),

    outputTitle: document.getElementById(
        "text-output-title"
    ),

    outputImage: document.getElementById(
        "text-output-image"
    ),

    algorithmSelect: document.getElementById(
        "algorithm-select"
    ),

    algorithmDescription: document.getElementById(
    "algorithm-description"
    ),

    algorithmMetadata: document.getElementById(
        "algorithm-metadata"
    ),

    algorithmConfiguration: document.getElementById(
        "algorithm-configuration"
    ),

    encryptButton: document.getElementById(
        "encrypt-button"
    ),

    decryptButton: document.getElementById(
        "decrypt-button"
    ),

    copyButton: document.getElementById(
        "copy-button"
    ),

    pasteButton: document.getElementById(
        "paste-button"
    ),

    clearButton: document.getElementById(
        "clear-button"
    ),

    downloadButton: document.getElementById(
        "download-button"
    ),

    characterCounter: document.getElementById(
        "contadorCaracteres"
    ),

    wordCounter: document.getElementById(
        "contadorPalabras"
    ),

    toast: document.getElementById(
        "toast"
    )

};


// ======================================================
// OBTENER ALGORITMO ACTUAL
// ======================================================

function getCurrentAlgorithm() {

    return getAlgorithm(
        state.selectedAlgorithm
    );

}

// ======================================================
// OBTENER OPCIONES DEL ALGORITMO
// ======================================================

function getAlgorithmOptions() {

    return {
        ...state.algorithmOptions
    };

}

// ======================================================
// ENCRIPTAR
// ======================================================

function encryptText(text) {

    const algorithm =
        getCurrentAlgorithm();

    if (!algorithm) {

        throw new Error(
            `No se encontró el algoritmo "${state.selectedAlgorithm}".`
        );

    }

    state.inputText = text;

    state.outputText =
        algorithm.encrypt(
            text,
            getAlgorithmOptions()
        );

    state.operation = "encrypt";

    return state.outputText;

}


// ======================================================
// DESENCRIPTAR
// ======================================================

function decryptText(text) {

    const algorithm =
        getCurrentAlgorithm();

    if (!algorithm) {

        throw new Error(
            `No se encontró el algoritmo "${state.selectedAlgorithm}".`
        );

    }

    state.inputText = text;

    state.outputText =
        algorithm.decrypt(
            text,
            getAlgorithmOptions()
        );

    state.operation = "decrypt";

    return state.outputText;

}


// ======================================================
// CAMBIAR ALGORITMO
// ======================================================

function setAlgorithm(algorithmId) {

    const algorithm =
        getAlgorithm(algorithmId);

    if (!algorithm) {

        throw new Error(
            `El algoritmo "${algorithmId}" no está registrado.`
        );

    }

    state.selectedAlgorithm =
        algorithmId;

    updateAlgorithmDescription();

    updateAlgorithmConfiguration();

}


// ======================================================
// MOSTRAR RESULTADO
// ======================================================

function showResult(text, operation) {

    elements.output.innerText = text;

    elements.outputTitle.innerText =
        operation === "encrypt"
            ? "🔒 Texto Encriptado"
            : "🔓 Texto Desencriptado";

    elements.outputImage.classList.add(
        "hidden"
    );

    elements.output.classList.remove(
        "text-encriptado",
        "text-desencriptado"
    );

    elements.output.classList.add(
        operation === "encrypt"
            ? "text-encriptado"
            : "text-desencriptado"
    );

    // Reiniciar animación

    elements.output.style.animation = "none";

    void elements.output.offsetWidth;

    elements.output.style.animation =
        "aparecer .45s ease";

}


// ======================================================
// ESTADO INICIAL DEL RESULTADO
// ======================================================

function resetResult() {

    elements.outputTitle.innerText =
        "Ningún mensaje fue encontrado";

    elements.output.innerText =
        "Ingresa un texto para comenzar.";

    elements.outputImage.classList.remove(
        "hidden"
    );

    elements.output.classList.remove(
        "text-encriptado",
        "text-desencriptado"
    );

    elements.output.style.animation = "none";

    state.operation = null;

    state.outputText = "";

}


// ======================================================
// ACTUALIZAR CONTADORES
// ======================================================

function updateCounters() {

    const text =
        elements.input.value;

    const characters =
        text.length;

    const words =
        text.trim()
            ? text.trim().split(/\s+/).length
            : 0;

    elements.characterCounter.innerText =
        `${characters} caracteres`;

    elements.wordCounter.innerText =
        `${words} palabras`;

}


// ======================================================
// ACTUALIZAR DESCRIPCIÓN DEL ALGORITMO
// ======================================================

function updateAlgorithmDescription() {

    const algorithm =
        getCurrentAlgorithm();

    if (!algorithm) {
        return;
    }

    elements.algorithmDescription.innerText =
        algorithm.description;


    const metadata = [];


    if (algorithm.category) {

        metadata.push(
            `📂 ${algorithm.category}`
        );

    }


    if (algorithm.type) {

        metadata.push(
            `🎓 ${algorithm.type}`
        );

    }


    if (algorithm.reversible) {

        metadata.push(
            "🔄 Reversible"
        );

    }


    if (algorithm.requiresKey) {

        metadata.push(
            "🔑 Requiere clave"
        );

    }


    if (algorithm.customizable) {

        metadata.push(
            "⚙ Personalizable"
        );

    }


    elements.algorithmMetadata.innerHTML =
        metadata
            .map(item => `<span>${item}</span>`)
            .join("");

}

// ======================================================
// ACTUALIZAR CONFIGURACIÓN DEL ALGORITMO
// ======================================================

function updateAlgorithmConfiguration() {

    const algorithm =
        getCurrentAlgorithm();

    const container =
        elements.algorithmConfiguration;


    // Limpiar configuración anterior

    container.innerHTML = "";

    container.classList.add("hidden");


    // Si el algoritmo no necesita configuración,
    // no mostramos nada.

    if (
        !algorithm ||
        !algorithm.requiresConfiguration
    ) {

        return;

    }


    const configuration =
        algorithm.configuration;

    if (!configuration) {
        return;
    }


    // ==================================================
    // CONTENEDOR
    // ==================================================

    container.classList.remove("hidden");

    // ==================================================
    // LABEL
    // ==================================================

    const label =
        document.createElement("label");

    label.setAttribute(
        "for",
        "algorithm-config-value"
    );

    label.textContent =
        configuration.label;


    // ==================================================
    // CONTENEDOR DEL CONTROL
    // ==================================================

    const controlWrapper =
        document.createElement("div");

    controlWrapper.className =
        "algorithm-config-control";


    // ==================================================
    // INPUT
    // ==================================================

    const input =
        document.createElement("input");

    input.id =
        "algorithm-config-value";

    input.type =
        configuration.type || "text";

    input.value =
        configuration.defaultValue ?? "";


    if (
        configuration.min !== undefined
    ) {

        input.min =
            configuration.min;

    }


    if (
        configuration.max !== undefined
    ) {

        input.max =
            configuration.max;

    }


    input.className =
        "algorithm-config-input";


    // ==================================================
    // VALOR
    // ==================================================

    const value =
        document.createElement("span");

    value.id =
        "algorithm-config-display";

    value.className =
        "algorithm-config-display";

    value.textContent =
        `Valor: ${input.value}`;


    // ==================================================
    // ACTUALIZAR VALOR
    // ==================================================

    input.addEventListener(
        "input",
        () => {

            value.textContent =
                `Valor: ${input.value}`;


            state.algorithmOptions = {

                ...state.algorithmOptions,

                shift: Number(
                    input.value
                )

            };

        }
    );


    // ==================================================
    // VALOR INICIAL
    // ==================================================

    if (
        algorithm.id === "caesar"
    ) {

        state.algorithmOptions = {

            ...state.algorithmOptions,

            shift: Number(
                input.value
            )

        };

    }


    // ==================================================
    // CONSTRUIR CONTROL
    // ==================================================

    controlWrapper.appendChild(
        input
    );

    controlWrapper.appendChild(
        value
    );


    // ==================================================
    // CONSTRUIR INTERFAZ
    // ==================================================

    container.appendChild(
        label
    );

    container.appendChild(
        controlWrapper
    );
}


// ======================================================
// MOSTRAR TOAST
// ======================================================

function showToast(message) {

    elements.toast.innerText =
        message;

    elements.toast.classList.add(
        "mostrar"
    );

    setTimeout(() => {

        elements.toast.classList.remove(
            "mostrar"
        );

    }, 2500);

}


// ======================================================
// COPIAR
// ======================================================

async function copyResult() {

    const text =
        state.outputText;

    if (!text) {

        showToast(
            "No hay ningún resultado para copiar."
        );

        return;

    }

    try {

        await navigator.clipboard.writeText(
            text
        );

        showToast(
            "✅ Texto copiado al portapapeles."
        );

    } catch (error) {

        console.error(error);

        showToast(
            "❌ No fue posible copiar el texto."
        );

    }

}


// ======================================================
// PEGAR
// ======================================================

async function pasteText() {

    try {

        const text =
            await navigator.clipboard.readText();

        elements.input.value =
            text;

        updateCounters();

        showToast(
            "📋 Texto pegado correctamente."
        );

    } catch (error) {

        console.error(error);

        showToast(
            "❌ No fue posible acceder al portapapeles."
        );

    }

}


// ======================================================
// LIMPIAR
// ======================================================

function clearAll() {

    elements.input.value = "";

    updateCounters();

    resetResult();

    showToast(
        "🗑 Todo ha sido limpiado."
    );

}


// ======================================================
// DESCARGAR RESULTADO
// ======================================================

function downloadResult() {

    if (!state.outputText) {

        showToast(
            "No hay ningún resultado para descargar."
        );

        return;

    }

    const blob =
        new Blob(
            [state.outputText],
            {
                type: "text/plain;charset=utf-8"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "mensaje-encriptado.txt";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showToast(
        "⬇ Archivo descargado."
    );

}


// ======================================================
// EVENTO: ENCRIPTAR
// ======================================================

elements.encryptButton.addEventListener(
    "click",
    () => {

        const text =
            elements.input.value;

        if (!text.trim()) {

            resetResult();

            showToast(
                "Escribe un mensaje primero."
            );

            return;

        }

        const result =
            encryptText(text);

        showResult(
            result,
            "encrypt"
        );

    }
);


// ======================================================
// EVENTO: DESENCRIPTAR
// ======================================================

elements.decryptButton.addEventListener(
    "click",
    () => {

        const text =
            elements.input.value;

        if (!text.trim()) {

            resetResult();

            showToast(
                "Escribe un mensaje primero."
            );

            return;

        }

        const result =
            decryptText(text);

        showResult(
            result,
            "decrypt"
        );

    }
);


// ======================================================
// EVENTO: CAMBIAR ALGORITMO
// ======================================================

elements.algorithmSelect.addEventListener(
    "change",
    (event) => {

        setAlgorithm(
            event.target.value
        );

        showToast(
            `🔐 Algoritmo: ${getCurrentAlgorithm().name}`
        );

    }
);


// ======================================================
// EVENTO: CONTADOR
// ======================================================

elements.input.addEventListener(
    "input",
    updateCounters
);


// ======================================================
// EVENTO: COPIAR
// ======================================================

elements.copyButton.addEventListener(
    "click",
    copyResult
);


// ======================================================
// EVENTO: PEGAR
// ======================================================

elements.pasteButton.addEventListener(
    "click",
    pasteText
);


// ======================================================
// EVENTO: LIMPIAR
// ======================================================

elements.clearButton.addEventListener(
    "click",
    clearAll
);


// ======================================================
// EVENTO: DESCARGAR
// ======================================================

elements.downloadButton.addEventListener(
    "click",
    downloadResult
);


// ======================================================
// ATAJOS DE TECLADO
// ======================================================

document.addEventListener(
    "keydown",
    (event) => {

        // Ctrl + Enter = Encriptar

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            elements.encryptButton.click();

        }


        // Ctrl + Shift + Enter = Desencriptar

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            elements.decryptButton.click();

        }


        // Escape = Limpiar

        if (
            event.key === "Escape"
        ) {

            clearAll();

        }

    }
);


// ======================================================
// INICIALIZAR SELECTOR DE ALGORITMOS
// ======================================================

function initializeAlgorithms() {

    const algorithms =
        getAllAlgorithms();

    elements.algorithmSelect.innerHTML = "";

    algorithms.forEach(
        (algorithm) => {

            const option =
                document.createElement("option");

            option.value =
                algorithm.id;

            option.textContent =
                `🔐 ${algorithm.name}`;

            elements.algorithmSelect.appendChild(
                option
            );

        }
    );

    elements.algorithmSelect.value =
        state.selectedAlgorithm;

    updateAlgorithmDescription();

}

// ======================================================
// OBTENER ESTADO
// ======================================================

function getState() {

    return {
        ...state
    };

}


// ======================================================
// OBTENER ALGORITMOS
// ======================================================

function getAlgorithms() {

    return getAllAlgorithms();

}

// ======================================================
// INICIALIZAR APLICACIÓN
// ======================================================

function initializeApp() {

    initializeAlgorithms();

    updateCounters();

    resetResult();

    updateAlgorithmConfiguration();

}


// ======================================================
// INICIAR
// ======================================================

initializeApp();


// ======================================================
// API PÚBLICA
// ======================================================

export {

    encryptText,

    decryptText,

    setAlgorithm,

    getState,

    getAlgorithms

};