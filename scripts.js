const buttons = document.querySelectorAll(".button-30");
let displayText = document.querySelector("#display-text");
let displaySubText = document.querySelector("#display-sub-text");
const equalTo = document.getElementById("equal-to");

let operator = "";
let firstNumber = "";
let secondNumber = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error";
    }

    return a / b;
}

function operate(operator, firstNumber, secondNumber) {
    if (operator == "+") {
        return add(firstNumber, secondNumber);
    } else if (operator == "-") {
        return subtract(firstNumber, secondNumber);
    } else if (operator == "×") {
        return multiply(firstNumber, secondNumber);
    } else if (operator == "÷") {
        return divide(firstNumber, secondNumber);
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        if (!isNaN(value)) {
            displayText.textContent += value;
            if (operator === "") {
                firstNumber += value;
            } else {
                secondNumber += value;
            }
        }
        if (value === "+" ||
            value === "-" ||
            value === "×" ||
            value === "÷"){
            operator = value;
             displayText.textContent += value;
        }
    });
});