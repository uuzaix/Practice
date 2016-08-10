window.onload = function() {
  $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?', function(data) {
    console.log(data);
    $("#user").html("<a href='" + data._links.channel + "'>FreecodeCamp</a>");
    if (data.stream === null) {
      $("#status").text(" is offline");
    }
    else {
      $("#status").text(" is online");
    }
    
  });
}