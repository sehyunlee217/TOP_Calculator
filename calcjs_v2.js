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

// function that would run calculation given calcVariable object
function operate(calcObj) {

    calcObj.num1 = Number(calcObj.num1);
    calcObj.num2 = Number(calcObj.num2);

    if (calcObj.sign == "+") {
        calcObj.result = add(calcObj.num1, calcObj.num2);
    }
    else if (calcObj.sign == "-") {
        calcObj.result = subtract(calcObj.num1, calcObj.num2);
    }
    else if (calcObj.sign == "*") {
        calcObj.result = multiply(calcObj.num1, calcObj.num2);
    }
    else {
        calcObj.result = divide(calcObj.num1, calcObj.num2);
    }
};


// main part of calculator operation

// constants used in operation
const operatorList = ["+", "-", "*", "/"];
const numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."];

// string to store number of "=" stored; used in line 102
let operationString = "";


// variable that would display numbers on calculator
let calcDisplay = document.querySelector(".result");
let calcResult = "";
let inOperation = false;

// object that will store values for calculation
const calcVariables = {
    num1: "",
    sign: "",
    num2: "",
    result: ""
};

// function executed on click,
function buttonClick(e) {
    // Items added to calculator display
    // ----------------------------------------------------------------
    // if a number or "." is clicked, 
    if (numList.includes(Number(this.textContent)) || this.textContent == ".") {
        // removes 0 stuck in front
        if (calcResult == "0") {
            calcResult = this.textContent;
        }
        // if "." is clicked
        else if (this.textContent == ".") {
            // there could be only one "." displayed 
            if (calcResult.split(".").length < 2) {
                calcResult += this.textContent;
            }
        }
        // add numbers to result to be displayed
        else {
            // if operation is taken place, clear previous screen
            if (inOperation) {
                calcResult = this.textContent;
                inOperation = false;
            }
            else {
                calcResult += this.textContent;
            }
        }
        operationString = "";
    }
    // Items that do not change calculator display
    // ----------------------------------------------------------------
    else {
        // if "=" is clicked, (has multiple sensitive cases)
        if (this.textContent == "=") {
            // check if "=" is clicked consecutively, 
            // have a string to keep track of "=" clicked
            operationString += this.textContent;
            if ((operationString.length < 2)) {
                calcVariables.num2 = calcResult;
                operate(calcVariables);
                calcResult = calcVariables.result;
            }
            // when "=" is clicked consecutively, 
            // instead of calculating the displayed value(calcResult) as num2,
            // replace the num1 with the result and keep num2 to repeat calculation.

            // pressing "=" twice (without this case)
            // e.g num1: 3 | sign: + | num2: 1 | result: 4 
            // e.g num1: 3 | sign: + | num2: 4 | result: 7 
            // : this is NOT the desired result

            // pressing "=" twice (with this case)
            // e.g num1: 3 | sign: + | num2: 1 | result: 4 
            // e.g num1: 4 | sign: + | num2: 1 | result: 5
            // : this is the desiDred result

            else {
                calcVariables.num1 = calcResult;
                operate(calcVariables);
                calcResult = calcVariables.result;
            }
        }
        // if operator is clicked
        else if (operatorList.includes(this.className)) {
            calcVariables.num1 = calcResult;
            calcVariables.sign = this.className;
            inOperation = true;
        }
        // ----------------------------------------------------------------
        // if + / - is clicked
        else if (this.className == "+/-") {
            calcResult *= -1;
        }
        // if % is clicked,
        else if (this.className == "percent") {
            calcResult *= 0.01;
        }
        // if AC is clicked,
        else {
            calcResult = 0;
            calcVariables.num1 = calcVariables.num2 = "";
        }
    }
    // display calculation result
    calcDisplay.textContent = calcResult;
}


//  Add click event to all buttons in the html
const btns = document.querySelectorAll("button");
btns.forEach((btn) => { btn.addEventListener("click", buttonClick); });