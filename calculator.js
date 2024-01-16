//global variables
let var1;
let var2;
let operator;
let isResult;

const numbers = document.querySelectorAll(".numberPad");
const operators = document.querySelectorAll(".operators");
// const equal = document.querySelector("#equal");
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equal");
const keyDel = document.querySelector("#keyDel");

//main program
resetAll();
updateDisplay();

// event listeners
clear.addEventListener("click", () => {
  resetAll();
  updateDisplay();
});

numbers.forEach((target) =>
  target.addEventListener("click", () => {
    //State 1: only one number is on display
    //if it's a result the display must be cleared

    if (operator === "") {
      updateOperand("var1", target.textContent);
    } else {
      //State2 A number and an operator are displayed
      //and State 3 a number with an operator and a number (var2)
      {
        updateOperand("var2", target.textContent);
      }
    }

    // if (result !== "") {
    //   resetAll();
    //   updateDisplay();
    // }

    // if (isFirst) {
    //   updateOperand("var1", target.textContent);
    // } else {
    //   updateOperand("var2", target.textContent);
    //   isFirst = false;
    // }
  })
);
operators.forEach((target) => {
  target.addEventListener("click", () => {
    //State 1: only one number is on display
    //State2 A number and an operator are displayed

    if (var2 === "" && !isNaN(var1)) {
      operator = target.textContent;
      updateDisplay();
    } else {
      //state 3

      calculate();
      operator = target.textContent;
      updateDisplay();
    }
  });
});

equal.addEventListener("click", () => {
  calculate();
});

keyDel.addEventListener("click", () => {
  //State 1: only one number is on display

  if (operator === "") {
    if (var1.length === 1) {
      var1 = "0";
      updateDisplay();
    } else {
      if (!isNaN(var1)) {
        var1 = var1.slice(0, -1);
        updateDisplay();
      }
    }
  } else {
    //State2 A number and an operator are displayed
    if (var2 === "") {
      operator = "";
      updateDisplay();
    } else {
      //state 3
      if (var2.length === 1) {
        var2 = "";
        updateDisplay();
      } else {
        var2 = var2.slice(0, -1);
        updateDisplay();
      }
    }
  }
});
//functions
function resetAll() {
  var1 = "0";
  var2 = "";
  operator = "";
  isResult = false;
}

function updateDisplay() {
  display.textContent = var1 + operator + var2;
}

function updateOperand(variable, number) {
  if (variable === "var1" && (number !== "." || !var1.includes("."))) {
    if (var1 === "0" || isResult) {
      var1 = number;
      isResult = false;
    } else {
      var1 += number;
    }
  }
  if (variable === "var2" && (number !== "." || !var2.includes("."))) {
    {
      if (var2 === "") {
        var2 = number;
      } else {
        var2 += number;
      }
    }
  }
  updateDisplay();
}

function calculate() {
  let myRegex = /(-?\d+\.?\d*)([+\-*/])(\d+\.?\d*)/;
  let displayText = var1 + operator + var2;
  let matches = displayText.match(myRegex);
  matches.forEach((item) => console.log("item: ", item));
  switch (matches[2]) {
    case "+":
      var1 = add(Number(matches[1]), Number(matches[3]));

      break;
    case "-":
      var1 = substruct(Number(matches[1]), Number(matches[3]));
      break;
    case "*":
      var1 = multiply(Number(matches[1]), Number(matches[3]));
      break;
    case "/":
      var1 = divide(Number(matches[1]), Number(matches[3]));
      break;
  }
  operator = "";
  var2 = "";
  updateDisplay();
  isResult = true;
}

function add(a, b) {
  return a + b;
}
function substruct(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return "Error Division by 0";
  return a / b;
}
