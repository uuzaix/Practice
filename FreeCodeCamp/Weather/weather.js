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
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=0e64fd19006ed36b06872f0cb94f4540";
    console.log(url);
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
    $.getJSON(url,function(data) {
      console.log(data.main.pressure);
      var currentTemp = [Math.round(data.main.temp -273.15), "C"];
      $(".location").text("Current weather in  " + data.name);
      $("#temperature").text(currentTemp.join(" \u00B0"));
      $("#pressure").text("Pressure: " + data.main.pressure +" hPa");
      // $("#weather-type").text(data.weather[0].main);
      $("#precipitation").text(data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1));
      $("#icon").prop('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
      // $("#icon").text(data.weather[0].icon);
      chooseBackgroundColor(data.weather[0].icon);
      $("#temperature").click(function() {
        if (currentTemp[1] === "C") {
          currentTemp = [Math.round(data.main.temp*9/5 - 459.67), "F"];
        }
        else {
          currentTemp = [Math.round(data.main.temp -273.15), "C"];
        }
          $("#temperature").text(currentTemp.join(" \u00B0"));
        });
      });
    }
    function chooseBackgroundColor (icon) {
      var colors = {"sun": "#FED388", "cloud": "#6BC5DF", "rain": "#7B98E1", "storm" : "#947DE3", "snow": "#FFFCEE", "mist": "#9DA8C3", "default": "#57BC90"};
      var color;
      switch (icon.slice(0,2)) {
        case "01": case "02":
          color = colors.sun;
          break;
        case "03": case "04":
          color = colors.cloud;
          break;
        case "09": case "10":
          color = colors.rain;
          break;
        case "11":
          color = colors.storm;
          break;
        case "13":
          color = colors.snow;
          break;
        case "50":
          color = colors.mist;
          break;
        default:
          color = colors.default;
      }
      $(".table_container").css("background-color", color);
    }
  }
