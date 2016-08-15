var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

function getChannelsInfo () {
  channels.forEach(function(channel) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?callback=?', function(data) {
      // console.log(data);
      var status, statusType;

      if (data.stream === undefined) {
        status = "does not exist";
        statusType = "offline-li";
      }
      else if (data.stream === null) {
        status = "offline";
        statusType = "offline-li";
      }
      else {
        status = data.stream.game + ": " + data.stream.channel.status;
        statusType = "online-li";
      }
      $.getJSON('https://api.twitch.tv/kraken/channels/' + channel + '?callback=?', function(data) {
        // console.log("channels ", data);
        var channelName, url, logoUrl;
        if (data.display_name === undefined) {
          channelName = channel;
          url = "https://www.twitch.tv/";
          logoUrl = "http://dummyimage.com/100x100/000/fff.png&text=0x3F";
        }
        else {
          channelName = data.display_name;
          url = data.url;
          logoUrl = data.logo;
        }
        if (statusType === "online-li") {
          $("#channels-list").prepend('<li class=' + statusType + '><img class="logo" src="' + logoUrl + '"alt="Stream Logo"><a href="' + url + '" target="_blank">' + channelName + '</a> - ' + status + ' </li>');
        }
        else {
          $("#channels-list").append('<li class=' + statusType + '><img class="logo" src="' + logoUrl + '"alt="Stream Logo"><a href="' + url + '" target="_blank">' + channelName + '</a> - ' + status + ' </li>');
        }
      });
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

