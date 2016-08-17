window.onload = function() {
  var userInput = [];

  //handle digits 
  $(".digit").each(function(index, button) {
    var value = $(this).text();
    // console.log(value);
    $(this).click(function(e) {
      userInput.push(value);
      $("#output").text(userInput.join(""));
      console.log(userInput);
    });
  });

  // handle math operators
  $(".operator").each(function(index, button) {
    var operator = $(this).text();
    $(this).click(function(e) {
      if (checkLastCharIsOperator(userInput)) {
        userInput.pop();
      }
      userInput.push(operator);
      $("#output").text(userInput.join(""));

    });
  });

  // clear all input
  $("#clear-all").click(function(e) {
    $("#output").text("");
    userInput = []
    console.log(userInput);
  });

  // clear last number
  $("#clear-last").click (function (e) {
    if (userInput !== []) {
      while (!checkLastCharIsOperator(userInput)) {
        userInput.pop();
      }
      $("#output").text(userInput.join(""));
    }
  });

  // handle equal input
  $("#equal").click(function(e) {
    userInput.push($(this).text());
    var currNumber = [];
    var currentExpression = [];
    userInput.forEach(function(element) {
      var digits = /[0-9]/;
      if (digits.test(element)) {
        currNumber.push(element);
      }
      else if (element === "="){
        currentExpression.push(currNumber.join(""));
      }
      else {
        currentExpression.push(currNumber.join(""), element);
        currNumber = [];
      }
    })
    userInput = [];
    console.log("input ", userInput);
    console.log("result ", currentExpression);
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