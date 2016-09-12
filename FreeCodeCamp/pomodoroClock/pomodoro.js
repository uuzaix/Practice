window.onload = function() {
  var timeLeft = 10;
  $("#start").click(function(e) {
    var timeInterval = setInterval(function() {
      $("#clock").text(timeLeft);
      timeLeft --;
      if (timeLeft < 0) {
        clearInterval(timeInterval);
      }
    }, 1000);
    $("#pause").click(function(e) {
      clearInterval(timeInterval);
    });
    $("#stop").click(function(e) {
      clearInterval(timeInterval);
      timeLeft = 10;
      $("#clock").text(0);
    });
  });
}