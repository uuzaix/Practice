var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getChannelsInfo () {
  channels.forEach(function(channel) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?callback=?', function(data) {
      console.log(data);
      var status;
      if (data.stream === null) {
        status = "offline";
      }
      else {
        status = data.stream.game;
      }
      $("#channels-list").append('<li><a href="' + data._links.channel + '">' + channel + '</a> - ' + status +' </li>');
    });
  });
}

window.onload = function() {
  getChannelsInfo();
}