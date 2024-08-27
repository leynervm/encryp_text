document.addEventListener('DOMContentLoaded', () => {
    console.log('Loaded');
    var texto = document.getElementById('input-text-encript');
    var result;

    const diccionarioEncryptar = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const diccionarioDesencriptar = Object.fromEntries(
        Object.entries(diccionarioEncryptar).map(([k, v]) => [v, k])
    );

    document.getElementById('encryptar').addEventListener('click', () => {

        if (texto.value.trim() == '') {
            alert('Ingresar texto a encriptar !');
            return false;
        }
        if (!validar(texto.value)) {
            alert('Por favor, ingresa solo letras minúsculas sin acentos ni caracteres especiales.');
            return false;
        }

        encryptar()
    })

    document.getElementById('desencryptar').addEventListener('click', () => {
        if (texto.value.trim() == '') {
            alert('Ingresar texto a desencriptar !');
            return false;
        }
        if (!validar(texto.value)) {
            alert('Por favor, ingresa solo letras minúsculas sin acentos ni caracteres especiales.');
            return false;
        }

        desencryptar()
    })

    document.getElementById('copiar').addEventListener('click', () => {
        copy()
    })

    function validar(texto) {
        const regex = /^[a-z\s]+$/;
        return regex.test(texto);
    }

    function encryptar() {
        let resultado = texto.value.split('').map(char => diccionarioEncryptar[char] || char).join('');
        viewTexto(resultado);
    }

    function desencryptar() {
        let resultado = texto.value;
        for (const [key, value] of Object.entries(diccionarioDesencriptar)) {
            resultado = resultado.split(key).join(value);
        }
        viewTexto(resultado);
    }

    function viewTexto(texto) {
        document.getElementById('container-no-response').classList.add('hidden');
        document.getElementById('box-response-text').classList.remove('hidden');
        document.getElementById('box-response-text').classList.add('show');

        document.getElementById('text-container-response').innerText = texto;
        document.getElementById('text-container-response').classList.add('show');
    }

    function copy() {
        const resultado = document.getElementById('text-container-response');
        navigator.clipboard.writeText(resultado.textContent).then(() => {
            console.log(resultado.textContent);
            alert('Texto copiado al portapapeles!');
        }).catch(err => {
            console.error('Error al copiar al portapapeles:', err);
        });

        // const resultado = document.getElementById('text-container-response');
        // resultado.select();
        // document.execCommand('copy');
        // alert('Texto copiado al portapapeles!');
    }
})
