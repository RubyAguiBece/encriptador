
function encriptar() {
    const textoInput = document.getElementById('text-input').value.trim();

    // Verificar si el texto no está vacío y contiene caracteres no permitidos
    if (textoInput && !/^[a-z\s]+$/.test(textoInput)) {
        alert('Por favor, ingrese solo letras minúsculas y espacios.');
        return;
    }

    const textoEncriptado = textoInput
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
        
    mostrarResultado(textoEncriptado, 'Texto Encriptado');
}

function desencriptar() {
    const textoInput = document.getElementById('text-input').value.toLowerCase();
    const textoDesencriptado = textoInput
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
        
    mostrarResultado(textoDesencriptado, 'Texto Desencriptado');
}

function mostrarResultado(texto, titulo) {
    document.getElementById('text-output-title').innerText = texto ? titulo : 'Lo sentimos';
    document.getElementById('text-output-text').innerText = texto || 'Ningún mensaje fue encontrado';
    document.getElementById('text-output-text').classList.toggle('text-encriptado', titulo === 'Texto Encriptado');
    document.getElementById('text-output-text').classList.toggle('text-desencriptado', titulo === 'Texto Desencriptado');
    document.getElementById('text-output-image').classList.toggle('hidden', texto.length > 0);
}

function copiar() {
    const textoOutput = document.getElementById('text-output-text').innerText;
    navigator.clipboard.writeText(textoOutput).then(() => {
        alert('Texto copiado');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}
