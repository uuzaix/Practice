window.onload = function() {
  var timeLeft = 10;
  var pauseTimeLeft = 5;
  $("#clock").text(timeLeft);
  $("#start").click(function(e) {
    var timeInterval = setInterval(function() {
      if (timeLeft >= 0) {

        $("#clock").text(timeLeft);
        timeLeft --;
      }
      else {
        clearInterval(timeInterval);
        var pauseInterval = setInterval(function() {
          if (pauseTimeLeft >= 0) {
          $("#clock").text(pauseTimeLeft);
          pauseTimeLeft --;
        }
        else {
          clearInterval(pauseInterval);
          }
        }, 1000);
      }
    }, 1000);

    $("#pause").click(function(e) {
      clearInterval(timeInterval);
    });
    $("#stop").click(function(e) {
      clearInterval(timeInterval);
      timeLeft = 10;
      $("#clock").text(timeLeft);
    });
  });

  $("#timerUp").click(function(e) {
    timeLeft ++;
    $("#clock").text(timeLeft);
  });

  $("#timerDown").click(function(e) {
    timeLeft --;
    $("#clock").text(timeLeft);
  });

}