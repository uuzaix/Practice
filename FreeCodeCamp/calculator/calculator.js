window.onload = function() {
  var userInput = [];
  var result = 0;

  //handle digits 
  $(".digit").each(function(index, button) {
    var digit = $(this).text();
    // console.log(digit);
    $(this).click(function(e) {
      if (userInput.length < 18) {
        if (userInput.length === 0) {
          $("#result").text("0");
          result = 0;
        }
        userInput.push(digit);
        $("#all-input").text(userInput.join(""));
        console.log(userInput);
      }
    });
  });
  //handle dot
  $(".dot").click(function(e) {
    var dot = $(this).text();
    if (userInput.length === 0) {
      userInput.push("0");
      userInput.push(dot);
      $("#all-input").text(userInput.join(""));
      $("#result").text("0");
      result = 0;
    }
    else if (userInput.length <18) {
      userInput.push(dot);
      $("#all-input").text(userInput.join(""));
s    }
  })

  // handle math operators
  $(".operator").each(function(index, button) {
    var operator = $(this).text();
    $(this).click(function(e) {
      if (userInput.length < 17) {
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
          $("#result").text("0");
          result = 0;
        }
      }
    });
  });

  // clear all input
  $("#clear-all").click(function(e) {
    $("#all-input").text("0");
    $("#result").text("0");
    result = 0;
    userInput = []
    console.log(userInput);
  });

  // clear last number
  $("#clear-last").click (function (e) {
    //console.log("clear", userInput);
    if (userInput.length !== 0 && checkInputIncludesOperator(userInput)) {
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
  }
  else if (currOperator === "\xF7") {
    result /= parseFloat(value.join(""));
    console.log("divide ", result);
  }
  else if (currOperator === "\xD7") {
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
          var result_string = result.toString();
          if (result_string.length > 8) {
            if (result_string.indexOf(".") !== -1 && result_string.indexOf(".") < 8) {
              result = result.toFixed(7-result_string.indexOf("."));
            }
            else {
              result = "too big";
            }
          }
          // $("#all-input").append(result);
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

var operators =["-", "+", "\xD7", "\xF7"];

// returns true if last input char is operator, if digit - false
function checkLastCharIsOperator (input) {
  if (operators.includes(input[input.length - 1])) {
    return true;
  }
  else {
    return false;
  }
}
//checks if input contains at least one operator
function checkInputIncludesOperator(input) {
  var givenOperators = operators.filter(function(op) {
    return input.includes(op)
  });
  return givenOperators.length > 0 ? true : false;
}