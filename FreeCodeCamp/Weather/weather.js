window.onload = function() {

  var lat;
  var lon;
  var url;

  var geoOptions = {
    timeout: 10 * 1000
  }

  var geoSuccess = function(position) {
    var startPos;
    startPos = position;
    lat = startPos.coords.latitude;
    lon = startPos.coords.longitude;
    console.log(lat, lon);
    url = "https://api.wunderground.com/api/bbb07fbe6c47678a/conditions/q/" + lat + "," + lon + ".json";
    parseWeatherReasponse(url);
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

  function parseWeatherReasponse(url) {
    $.getJSON(url, function(data) {
      console.log(data);
      // console.log(data.current_observation.icon_url);
      var currentTemp = [data.current_observation.temp_c, "C"];
      $(".location").text("Current weather in  " + data.current_observation.display_location.full);
      $("#temperature").html('Temperature: <b><span id="grads"></span></b>');
      $("#grads").text(currentTemp.join(" \u00B0"));
      $("#pressure").text("Pressure: " + data.current_observation.pressure_mb +" mB");
      $("#precipitation").text(data.current_observation.weather);
      $("#humidity").text("Relative humidity: " + data.current_observation.relative_humidity);
      $("#icon").prop('src',  "http://icons.wxug.com/i/c/i/" + data.current_observation.icon + ".gif");
      chooseBackgroundColor(data.current_observation.weather.split(" "));
      $("#grads").click(function() {
        if (currentTemp[1] === "C") {
          currentTemp = [data.current_observation.temp_f, "F"];
        }
        else {
          currentTemp = [data.current_observation.temp_c, "C"];
        }
          $("#grads").text(currentTemp.join(" \u00B0"));
        });
      });
    }
    function chooseBackgroundColor (weather) {
      var colors = {"sun": "#FED388", "cloud": "#6BC5DF", "rain": "#7B98E1", "storm" : "#947DE3", "snow": "#FFFCEE", "mist": "#9DA8C3", "default": "#57BC90"};
      var color;
      switch (weather[weather.length-1]) {
        case "Clear": case "Sunny":
          color = colors.sun;
          break;
        case "Cloudy":
          color = colors.cloud;
          break;
        case "Rain": case "Sleet":
          color = colors.rain;
          break;
        case "Thunderstorm": case "Flurries":
          color = colors.storm;
          break;
        case "Snow":
          color = colors.snow;
          break;
        case "Hazy":
          color = colors.mist;
          break;
        default:
          color = colors.default;
      }
      $(".table_container").css("background-color", color);
    }
  }

