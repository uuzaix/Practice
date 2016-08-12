var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

function getChannelsInfo () {
  channels.forEach(function(channel) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?callback=?', function(data) {
      console.log(data);
      var status, link;

      if (data.stream === undefined) {
        status = "does not exist";
        link = "_blank";
        statusType = "offline-li";
      }
      else {
        link = data._links.channel;
        if (data.stream === null) {
          status = "offline";
          statusType = "offline-li";
        }
        else {
          status = data.stream.game + ": " + data.stream.channel.status;
          statusType = "online-li";
        }
      }
      $("#channels-list").append('<li class=' + statusType + '><a href="' + link + '">' + channel + '</a> - ' + status + ' </li>');
    });
  });
}

window.onload = function() {
  getChannelsInfo();
  $("#online-btn").click(function(e) {
    $(".offline-li").css("display", "none");
    $(".online-li").css("display", "list-item");
  });
  $("#offline-btn").click(function(e) {
    $(".online-li").css("display", "none");
    $(".offline-li").css("display", "list-item");
  });
  $("#all-btn").click(function(e) {
    $(".offline-li").css("display", "list-item");
    $(".online-li").css("display", "list-item");
  })
}