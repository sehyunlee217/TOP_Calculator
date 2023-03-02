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

// operate() takes an operator and 2 numbers and calls funciton.
function operate(num1, sign, num2) {
    // initialize variable to return 
    num1 = Number(num1);
    num2 = Number(num2);
    console.log(num1, num2);

    let returnVal;
    // given, operator sign, apply operator function to 2 numbers
    if (sign == "+") returnVal = add(num1, num2);
    else if (sign == "-") returnVal = subtract(num1, num2);
    else if (sign == "x") returnVal = multiply(num1, num2);
    else if (sign == "÷") returnVal = divide(num1, num2);
    // return rounded number after operation
    return (returnVal);
};


// variable to hold the display for the calculator
let calcResult = "0";
// variables that hold values during operations
const calcVariables = {
    num1: "",
    operator: "",
    num2: ""
};
// list of numbers used in calculator to distinguish numbers and operators
const operatorList = ["+", "-", "x", "÷", "="];
let inOperation = false;

// add click events for each button.
function buttonClick(e) {
    // select class="result" 
    const calcDisplay = document.querySelector(".result");

    // if AC(all clear) is clicked, set result to 0.
    if (this.textContent == "AC") {
        calcResult = 0;
    }
    // If operator is clicked, store variables in calcVariables object
    else if (operatorList.includes(this.textContent)) {
        // when equal sign is clicked, run operation
        if (this.textContent == "=") {
            if (calcVariables.num1 != "" || calcVariables.num2 != "") {
                calcVariables.num2 = calcResult;
                calcResult = operate(calcVariables.num1, calcVariables.operator, calcVariables.num2);
            }
            else {
                calcResult = 0;
            }
            console.log(calcVariables);
        }
        else {
            calcVariables.num1 = calcResult;
            calcVariables.operator = this.textContent;
            inOperation = true;
        }
    }
    else if (this.textContent == "+/-") {
        calcResult = Number(calcResult) * -1;
    }
    else if (this.textContent == "%") {
        calcResult = Number(calcResult) * 0.01;
    }

    // If number is clicked,
    else {
        // handles case when AC is clicked and 0 remains stuck in front
        if (calcResult == 0) {
            calcResult = this.textContent;
        }
        else if (inOperation) {
            calcResult = this.textContent;
            inOperation = false;
        }
        else {
            calcResult += this.textContent;
        }
    }

    console.log(calcResult);
    calcDisplay.textContent = calcResult;
};

const btns = document.querySelectorAll("button");
btns.forEach((btn) => { btn.addEventListener("click", buttonClick); });;
