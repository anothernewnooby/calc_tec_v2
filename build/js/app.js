let masFGlobal = 0; // Variable global para almacenar el valor de masF
let masElement = document.querySelector('.mas'); // Mover la definición de masElement aquí

// Selecciona todos los botones
let botones = document.querySelectorAll('.boton_tec');

// Añade un event listener a cada botón
botones.forEach((boton) => {
    boton.addEventListener('click', function() {
        // Elimina la clase 'seleccionado' de todos los botones
        botones.forEach((btn) => {
            btn.classList.remove('seleccionado');
        });

        // Añade la clase 'seleccionado' al botón que fue clickeado
        this.classList.add('seleccionado');
    });
}); 

//! Calculo de la Tecnica

function calcular() {
    //* valores de los inputs
    let constanteElement = document.querySelector('#constante');
    let espesorElement = document.querySelector('#espesor');
    let baseElement = document.querySelector('#base');

    let constante = constanteElement.value ? parseFloat(constanteElement.value) : 0;
    let espesor = espesorElement.value ? parseFloat(espesorElement.value) : 0;
    let base = baseElement.value ? parseFloat(baseElement.value) : 0;

    //* formulas de calculo
    let formula = Math.ceil(espesor * 2 + constante);
    let masBasica = base;
    //* tecnica intermedia
    let tecnicaInter = Math.ceil(formula * 1.15);
    let masInter = (masBasica / 2).toFixed(1);
    //* tecnica homogenizada
    let tecnicaHomo = Math.ceil(tecnicaInter * 1.15);
    let masHomo = (masInter / 2).toFixed(1);
    //* tecnica ultra homogenizada
    let tecnicaUltra = Math.ceil(espesor * 2 + constante);
    let masUltra = (masBasica / 8).toFixed(1);
    let tecnicaUltraInter = Math.ceil(tecnicaUltra * 1.15);
    let tecnicaUltraHomo = Math.ceil(tecnicaUltraInter * 1.15);
    let tecnicaUltra3 = Math.ceil(tecnicaUltraHomo * 1.15);

    //* valores de kvp y mAs
    let kvpElement = document.querySelector('.kvp');

    // Botones
    let boton1 = document.querySelector('.boton1');
    let boton2 = document.querySelector('.boton2');
    let boton3 = document.querySelector('.boton3');
    let boton4 = document.querySelector('.boton4');

    boton1.addEventListener('click', function() {
        kvpElement.textContent = formula.toString().padStart(2, '0');
        masElement.textContent = masBasica.toFixed(1).padStart(2, '0');
        masFGlobal = masBasica; // Almacenar el valor en la variable global
    });

    boton2.addEventListener('click', function() {
        kvpElement.textContent = tecnicaInter.toString().padStart(2, '0');
        masElement.textContent = masInter.padStart(2, '0');
        masFGlobal = parseFloat(masInter); // Almacenar el valor en la variable global
    });

    boton3.addEventListener('click', function() {
        kvpElement.textContent = tecnicaHomo.toString().padStart(2, '0');
        masElement.textContent = masHomo.padStart(2, '0');
        masFGlobal = parseFloat(masHomo); // Almacenar el valor en la variable global
    });

    boton4.addEventListener('click', function() {
        kvpElement.textContent = tecnicaUltra3.toString().padStart(2, '0');
        masElement.textContent = masUltra.padStart(2, '0');
        masFGlobal = parseFloat(masUltra); // Almacenar el valor en la variable global
    });

    //* Simula un clic en el botón 1
    boton1.click();

    return formula;
}

console.log(calcular());

//! Compensacion
let compensarButton = document.querySelector('.compensar button');
compensarButton.removeEventListener('click', compensar);
compensarButton.addEventListener('click', compensar);

function compensar() {
    let inputDIElement = document.querySelector('.inputDI');
    let inputDFElement = document.querySelector('.inputDF');

    let inputDI = parseFloat(inputDIElement.value) || 0;
    let inputDF = parseFloat(inputDFElement.value) || 0;
    let mas = masFGlobal; // Usar el valor de la variable global

    let diSquared = Math.pow(inputDI, 2);
    let dfSquared = Math.pow(inputDF, 2);

    let masF = mas / diSquared * dfSquared;

    console.log(masF);
    masElement.textContent = masF.toFixed(1).padStart(2, '0');
}

//! factor Bucky
function calcularFactorBucky() {
    let inputFactorizarElement = document.querySelector('.factorizar'); // Selecciona el input correcto
    let factorizar = parseFloat(inputFactorizarElement.value) || 0;

    masFGlobal = parseFloat(masElement.textContent); // Actualiza masFGlobal con el valor actual en <h3 class="mas">

    let factorBucky = masFGlobal * factorizar;

    console.log(factorBucky);
    masElement.textContent = factorBucky.toFixed(1).padStart(2, '0'); // Actualiza el texto en <h3 class="mas">
    console.log(masFGlobal); // Imprimir el valor de masFGlobal
    // Aquí puedes hacer lo que necesites con factorBucky
}