window.onload = function() {
  var time = 10;
  var pauseTime = 5;
  $("#clock").text(time);
  $("#workTime").text(time);
  $("#pauseTime").text(pauseTime);
  $("#start").click(function(e) {
    var timeLeft = time;
    var pauseTimeLeft = pauseTime;
    var timeInterval = setInterval(function() {
      if (timeLeft >= 0) {
        $("#clock").text("Work: " + timeLeft);
        timeLeft --;
      }
      else {
        clearInterval(timeInterval);
        var pauseInterval = setInterval(function() {
          if (pauseTimeLeft >= 0) {
            $("#clock").text("Pause: " + pauseTimeLeft);
            pauseTimeLeft--;
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
      $("#clock").text(time);
    });
  });

  $("#timerUp").click(function(e) {
    time++;
    $("#clock").text(time);
    $("#workTime").text(time);
  });

  $("#timerDown").click(function(e) {
    if (time > 0) {
      time--;
    }
    $("#clock").text(time);
    $("#workTime").text(time);
  });
  $("#pauseUp").click(function(e) {
    pauseTime ++;
    $("#pauseTime").text(pauseTime);
  });

  $("#pauseDown").click(function(e) {
    if (pauseTime > 0) {
      pauseTime --;
      $("#pauseTime").text(pauseTime);
    }
  });

}