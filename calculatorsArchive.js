console.log("This is the calculator script");
let var1 = "";
let var2 = "";
let operator = "";
let displayText = "0";
let result = "";
let isFirst = true;
const numbers = document.querySelectorAll(".numberPad");
const operators = document.querySelectorAll(".operators");
// const equal = document.querySelector("#equal");
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  resetAll();
  updateDisplay();
});
numbers.forEach((target) =>
  target.addEventListener("click", () => {
    if (result !== "") {
      resetAll();
      updateDisplay();
    }

    if (isFirst) {
      updateOperand("var1", target.textContent);
    } else {
      updateOperand("var2", target.textContent);
      isFirst = false;
    }
  })
);

operators.forEach((target) => {
  target.addEventListener("click", () => {
    if (result === "") {
      if (var2 !== "") {
        calculate();

        isFirst = true;
        updateDisplay();
        [var1, var2] = [result, ""];
        operator = "";
      } else if (target.textContent !== "=") {
        operator = target.textContent;
        isFirst = false;
        updateDisplay();
      }
    } else if (target.textContent !== "=") {
      [var1, result, operator, isFirst] = [
        result,
        "",
        target.textContent,
        false,
      ];
      updateDisplay();
    }
  });
});

function updateOperand(variable, number) {
  if (variable === "var1" && (number !== "." || !var1.includes("."))) {
    var1 += number;
  }
  if (variable === "var2" && (number !== "." || !var2.includes("."))) {
    {
      var2 += number;
      isFirst = false;
    }
  }
  updateDisplay();
}

function updateDisplay() {
  if (result === "") {
    if (var2 === "") {
      displayText = var1 + operator;
    } else {
      displayText = var1 + operator + var2;
    }
  } else displayText = result;
  display.textContent = displayText;
}

function resetAll() {
  var1 = "";
  var2 = "";
  operator = "";
  displayText = "0";
  result = "";
  isFirst = true;
}
function calculate() {
  let myRegex = /(\d+\.?\d*)([+\-*/])(\d+\.?\d*)/;
  let matches = displayText.match(myRegex);
  matches.forEach((item) => console.log("item: ", item));
  switch (matches[2]) {
    case "+":
      result = add(Number(matches[1]), Number(matches[3]));
      break;
    case "-":
      result = substruct(Number(matches[1]), Number(matches[3]));
      break;
    case "*":
      result = multiply(Number(matches[1]), Number(matches[3]));
      break;
    case "/":
      result = divide(Number(matches[1]), Number(matches[3]));
      break;
  }
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
  return a / b;
}
