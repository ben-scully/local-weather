var request = new XMLHttpRequest();
request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=2179538&appid=44db6a862fba0b067b1930da0d769e98', true);

request.onreadystatechange = function() {
  console.log(this.readyState);
  if (this.readyState === 4) {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      console.log("Success");
      data = JSON.parse(this.responseText);
      updateWeather();
      updateDisplay();
    } else {
      // Error :(
      console.log("Error");
    }
  } else {
    console.log("Not ready");
  }
};

request.send();
request = null;

function updateWeather() {
  loc = data["name"] + ", " + data["sys"]["country"];
  kelvins = data["main"]["temp"];
  weather = data["weather"][0]["main"];
  symbol = data["weather"][0]["icon"];

  console.log(loc);
  console.log(kelvins);
  console.log(weather);
}

var data;
var loc;
var kelvins;
var weather;
var symbol;
var symbolURL;

var tempType = true;
var temp;
var tempSymbol;

function updateDisplay() {
  var x = document.querySelector("#loc");
  x.innerHTML = "" + loc;

  changeTemp();

  var y = document.querySelector("#weather");
  y.innerHTML = "" + weather;

  symbolURL = 'http://openweathermap.org/img/w/' + symbol + '.png';
  var z = document.querySelector("#symbol");
  z.innerHTML = '<img src=' + symbolURL + ' width="100" height="100" />';
}

function updateTemp() {
  if (tempType) {
    temp = Math.ceil( kelvins - 273.15 ) + "\xB0C";
    tempSymbol = "Change to \xB0F";
  } else {
    temp = Math.ceil( (kelvins * (9/5)) - 459.67 ) + "\xB0F";
    tempSymbol = "Change to \xB0C";
  }
}

function changeTemp() {
  tempType = !tempType;
  updateTemp();
  var y = document.querySelector("#temp");
  y.innerHTML = "" + temp;
  var m = document.querySelector("#change");
  m.innerHTML = "" + tempSymbol;
}
