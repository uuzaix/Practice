window.onload = function() {
  var userInput = [];
  var result = 0;

  //handle digits 
  $(".digit").each(function(index, button) {
    var value = $(this).text();
    // console.log(value);
    $(this).click(function(e) {
      if (userInput.length === 0) {
        $("#result").text("");
        result = 0;
      }
      userInput.push(value);
      $("#all-input").text(userInput.join(""));
      console.log(userInput);
    });
  });

  // handle math operators
  $(".operator").each(function(index, button) {
    var operator = $(this).text();
    $(this).click(function(e) {
      if (userInput.length !== 0) {
        if (checkLastCharIsOperator(userInput)) {
          userInput.pop();
        }
        userInput.push(operator);
        $("#all-input").text(userInput.join(""));
      }
      if (userInput.length === 0 && result !== 0) {
        userInput.push(result);
        userInput.push(operator);
        $("#all-input").text(userInput.join(""));
        $("#result").text("");
        result = 0;
      }
    });
  });

  // clear all input
  $("#clear-all").click(function(e) {
    $("#all-input").text("");
    $("#result").text("");
    result = 0;
    userInput = []
    console.log(userInput);
  });

  // clear last number
  $("#clear-last").click (function (e) {
    if (userInput !== []) {
      while (!checkLastCharIsOperator(userInput)) {
        userInput.pop();
      }
      $("#all-input").text(userInput.join(""));
    }
  });

function calculate (value, currOperator, result) {
  if (currOperator === "+") {
    result += parseFloat(value.join(""));
  }
  else if (currOperator === "-") {
    result -= parseFloat(value.join(""));
    console.log("minus ", result);
  }
  else if (currOperator === "/") {
    result /= parseFloat(value.join(""));
  }
  else if (currOperator === "*") {
    result *= parseFloat(value.join(""));
  }
  return result;
}

  // handle equal input
  $("#equal").click(function(e) {
    if (userInput.length !== 0 && !checkLastCharIsOperator(userInput)) {
      userInput.push($(this).text());
      $("#all-input").text(userInput.join(""));
      var currNumber = [];
      currentOperator = "+"
      var currentExpression = [];
      userInput.forEach(function(element) {
        var digits = /[0-9.]/;
        if (digits.test(element)) {
          currNumber.push(element);
        }
        else if (element === "="){
          currentExpression.push(currNumber.join(""));
          // console.log("= ", currNumber.join(""));
          result = calculate(currNumber, currentOperator, result);
          $("#all-input").append(result);
          $("#result").text(result);
        }
        else {
          currentExpression.push(currNumber.join(""), element);
          result = calculate(currNumber, currentOperator, result);
          currentOperator = element;
          currNumber = [];
        }
      });
      userInput = [];
      console.log("input ", userInput);
      console.log("currentExpression ", currentExpression);
    }
  });
}

// returns true if last input char is operator, if digit - false
function checkLastCharIsOperator (input) {
  var operators =["-", "+", "*", "/"]
  if (operators.includes(input[input.length - 1])) {
    return true;
  }
  else {
    return false;
  }
}