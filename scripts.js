const buttons = document.querySelectorAll(".button-30");
let displayText = document.querySelector("#display-text");
let displaySubText = document.querySelector("#display-sub-text");
const equalTo = document.getElementById("equal-to");
const allClear = document.getElementById("all-clear");
const deleteButton = document.getElementById("delete");

let operator = "";
let firstNumber = "";
let secondNumber = "";
let shouldResetDisplay = false;

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
    if (operator === "+") {
        return add(firstNumber, secondNumber);
    } else if (operator === "-") {
        return subtract(firstNumber, secondNumber);
    } else if (operator === "×") {
        return multiply(firstNumber, secondNumber);
    } else if (operator === "÷") {
        return divide(firstNumber, secondNumber);
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        // Number buttons
        if (!isNaN(value)) {

            if (shouldResetDisplay) {
                displayText.textContent = "";
                displaySubText.textContent = "0";
                firstNumber = "";
                secondNumber = "";
                shouldResetDisplay = false;
            }

            if (displayText.textContent === "0") {
                displayText.textContent = value;
            } else {
                displayText.textContent += value;
            }

            if (operator === "") {
                firstNumber += value;
            } else {
                secondNumber += value;
            }
        }

        // Operator buttons
        if (
            value === "+" ||
            value === "-" ||
            value === "×" ||
            value === "÷"
        ) {

            if (firstNumber === "") return;

            // Replace operator
            if (operator !== "" && secondNumber === "") {
                displayText.textContent =
                    displayText.textContent.slice(0, -1);
            }

            // Chain calculation
            else if (operator !== "" && secondNumber !== "") {

                displaySubText.textContent =
                    `${firstNumber} ${operator} ${secondNumber} =`;

                const result = operate(
                    operator,
                    Number(firstNumber),
                    Number(secondNumber)
                );

                displayText.textContent = result;

                firstNumber = result.toString();
                secondNumber = "";
            }

            operator = value;
            displayText.textContent += value;
        }
    });
});

// Equal
equalTo.addEventListener("click", () => {

    if (
        firstNumber === "" ||
        operator === "" ||
        secondNumber === ""
    ) {
        return;
    }

    displaySubText.textContent =
        `${firstNumber} ${operator} ${secondNumber} =`;

    const result = operate(
        operator,
        Number(firstNumber),
        Number(secondNumber)
    );

    displayText.textContent = result;

    if (result === "Error") {
        operator = "";
        firstNumber = "";
        secondNumber = "";
        shouldResetDisplay = true;
        return;
    }

    operator = "";
    firstNumber = result.toString();
    secondNumber = "";

    shouldResetDisplay = true;
});

// AC
allClear.addEventListener("click", () => {
    displayText.textContent = "0";
    displaySubText.textContent = "0";

    operator = "";
    firstNumber = "";
    secondNumber = "";

    shouldResetDisplay = false;
});

// DEL
deleteButton.addEventListener("click", () => {

    if (shouldResetDisplay) return;

    if (secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
        displayText.textContent =
            displayText.textContent.slice(0, -1);

    } else if (operator !== "") {
        operator = "";
        displayText.textContent =
            displayText.textContent.slice(0, -1);

    } else {
        firstNumber = firstNumber.slice(0, -1);
        displayText.textContent =
            displayText.textContent.slice(0, -1);
    }

    if (displayText.textContent === "") {
        displayText.textContent = "0";
    }
});