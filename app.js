
// creacion de divs dinamicos para la calculadora

function createButtons (containerClass, characters, btnClass){
    // containerClass: es el nombre de la clase del div donde van los botone
    // characters: arreglo con los caracteres que irán como texto en los botones
    // btnClass: clase CSS que va en los botones

    const container = document.querySelector(`.${containerClass}`); // selecciona el contenedor donde van los botones

    characters.forEach((character, index) => {
        const newBtn = document.createElement('button');
        newBtn.textContent = character;
        newBtn.classList.add(btnClass);
        newBtn.id = `btn-${containerClass}-${index + 1}`;
        container.appendChild(newBtn);
    });
}

// Operators buttons:
createButtons('div1', ['C', '/', '*', '-'], 'btn-calculator-operator');
createButtons('div2', ['+'], 'btn-calculator-operator');
createButtons('div4', ['='], 'btn-calculator-operator');

// numbers buttons:
createButtons('div3', ['1', '2', '3', '4', '5', '6', '7', '8', '9'], 'btn-calculator-number');
createButtons('div5', ['0'], 'btn-calculator-number');
createButtons('div6', ['.'], 'btn-calculator-number');


// logica calculadora

// variables para almacenar numero actual, operador y numero anterior.
let currentInpunt = '';
let firstNumber = null;
let operator = null;
let waitSecondNumber = false;

// actualizo el display de la calculadora -- recibe un valor.
function updateDisplay(value) {
    display.innerHTML = value;
}

// manejo eventos de los botones
const operators = document.querySelectorAll('.btn-calculator-operator');
const numbers = document.querySelectorAll('.btn-calculator-number');

numbers.forEach(button => {
    button.addEventListener('click', () => {

        // valido segundo numero
        if (waitSecondNumber) { // si se esta esperando digitar el segundo numero, se limpia el input actual
            currentInpunt ='';
            waitSecondNumber = false;
            console.log(currentInpunt)
        }
        // agrego el numero ingresado
        currentInpunt += button.textContent;
        console.log(currentInpunt)
        updateDisplay(currentInpunt);
    });
})

operators.forEach(button => {
    button.addEventListener('click', () => {

        const operadorBtn = button.textContent;

        // valido si el boton es el de resetear o no
        if (operadorBtn === 'C') {
            currentInpunt = '';
            firstNumber = null;
            operator = null;
            waitSecondNumber = false;
            updateDisplay('');
            return; // termina la funcion
        }

        if(operadorBtn === '=') {
            // calculo la operacion
            if (firstNumber !== null && operator && currentInpunt) {
                const result = calculateNumber(firstNumber, operator, parseFloat(currentInpunt))
                updateDisplay(result);
                currentInpunt = result.toString();
                console.log(currentInpunt)
                firstNumber = null;
                operator = null;
            }
            return; // termina la funcion
        }

        if(currentInpunt){
            firstNumber = parseFloat(currentInpunt);
            operator = operadorBtn;
            waitSecondNumber = true;
            console.log(firstNumber)
        }
    })
})

function calculateNumber(number1, operator, number2) {
    switch (operator) {
        case '+':
            return number1 + number2;
        case '-':
            return number1 - number2;
        case '*':
            return number1 - number2;
        case '/':
             return number1 / number2;
        default:
            return 'Error';
    }
}