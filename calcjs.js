// list of basic operator functions
function add(num1, num2) {
    return roundedNum(num1 + num2);
};
function subtract(num1, num2) {
    return roundedNum(num1 - num2);
};
function multiply(num1, num2) {
    return roundedNum(num1 * num2);
};
function divide(num1, num2) {
    if (num2 == 0) {
        return "ERROR";
    }
    else {
        return roundedNum(num1 / num2);
    };
};

// function that would return value at 2nd digit
let roundedNum = (num) => (Math.round((num) * 100)) / 100;

const operatorList = ["+", "-", "x", "÷"];

// operate() takes an operator and 2 numbers and calls funciton.
function operate(equation) {

    let returnVal;

    if (equation.includes("+")) {
        equation = equation.split("+");
        returnVal = add(Number(equation[0]), Number(equation[1]));
    }
    if (equation.includes("-")) {
        equation = equation.split("-");
        returnVal = subtract(Number(equation[0]), Number(equation[1]));
    }
    if (equation.includes("x")) {
        equation = equation.split("x");
        returnVal = multiply(Number(equation[0]), Number(equation[1]));
    }
    if (equation.includes("÷")) {
        equation = equation.split("÷");
        returnVal = divide(Number(equation[0]), Number(equation[1]));
    }

    // // return rounded number after operation
    return roundedNum(returnVal);
};

// variable to hold the display for the calculator
let calcDisplay = "0";
// variables that hold values during operations
const calcVariables = {
    num1: "",
    operator: "",
    num2: ""
};
// list of numbers used in calculator to distinguish numbers and operators
const numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// inOperation is only true when an operator is clicked
let inOperation = false;

// add click events for each button.
function buttonClick(e) {
    // select class="result" 
    const calcDisplay = document.querySelector(".result");
    // if AC(all clear) is clicked, set result to 0.
    if (this.textContent == "AC") {
        calcResult = 0;
        calcVariables.num1 = calcVariables.num2 = 0;
    }
    // If operator is clicked, store variables in calcVariables object
    else if (operatorList.includes(this.textContent)) {
        // when equal sign is clicked, run operation
        if (this.textContent == "=") {
            if (calcVariables.num1 != "" || calcVariables.num2 != "") {
                console.log(calcVariables);
                console.log("before:", calcResult);
                console.log("operate:", operate(calcVariables.num1, calcVariables.operator, calcVariables.num2));
                // if we're doing the same operation again => pressing "=" consecutively,
                if (calcResult == operate(calcVariables.num1, calcVariables.operator, calcVariables.num2)) {
                    console.log("= pressed again");
                }
                // set the second number as the number displayed right before pressing "="
                calcVariables.num2 = calcResult;

                // proceed with operation with operate() function declared above
                calcResult = operate(calcVariables.num1, calcVariables.operator, calcVariables.num2);
                // as operator is clicked, operation is now in place
                // the numbers clicked after the operator should not write over the previous number
                console.log("after", calcResult);
                inOperation = true;
            }
            else {
                calcResult = 0;
            }
        }
        else {
            calcVariables.num1 = calcResult;
            calcVariables.operator = this.textContent;
            inOperation = true;
        }
    }
    // if "+/-" is clicked, multiply it my -1
    else if (this.textContent == "+/-") {
        calcResult = Number(calcResult) * -1;
    }
    // if "%" is clicked, divide by 100
    else if (this.textContent == "%") {
        calcResult = Number(calcResult) * 0.01;
    }
    // if "." is clicked, 
    else if (this.textContent == ".") {
        // if "." is clicked more than once, user should be unable to click .
        if (calcResult.split(".").length <= 1) {
            calcResult += this.textContent;
        }
    }
    // If number is clicked,
    else {
        // handles case when AC is clicked and 0 remains stuck in front
        if (calcResult == 0) {
            calcResult = this.textContent;
        }
        // 
        else if (inOperation) {
            calcResult = this.textContent;
            inOperation = false;
        }
        // when click event of button, add it to the result of calculation
        else {
            calcResult += this.textContent;
        }
    }

    // display the calculation Result to the calcDisplay portion
    calcDisplay.textContent = calcResult;
};

let operationString = "";
inOperation = false;

function buttonClick2(e) {
    const resultDisplay = document.querySelector(".result");
    operationString += this.textContent;
    // if AC is clicked,
    if (this.textContent == "AC") {
        calcDisplay = 0;
        operationString = "";
    }
    // if number is clicked,
    else if (String(numList).includes(this.textContent)) {
        console.log(operationString);
        // to remove 0 adding up in front of the calcDisplay
        if (calcDisplay == 0) {
            calcDisplay = this.textContent;
        }
        else if (inOperation) {
            calcDisplay = this.textContent;
            inOperation = false;
        }
        else {
            calcDisplay += this.textContent;
        }
    }
    // if operators are clicked, if (num)[operator1](num)[operator2] => (num)[operator1](num) takes place
    else {
        if (this.textContent == "=") {
            calcDisplay = operate(operationString.split("=")[0]);
            operationString = calcDisplay;
        }
        inOperation = true;
    }

    resultDisplay.textContent = calcDisplay;
}

//  Add click event to all buttons in the html
const btns = document.querySelectorAll("button");
btns.forEach((btn) => { btn.addEventListener("click", buttonClick2); });