
var wikiURL1 = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=';
var wikiURL2 = '&limit=4&namespace=0&format=json';
var searchQuery;

window.onload = function() {
  document.getElementById('txtSearch').onkeypress = function searchKeyPress(event) {
    if (event.keyCode == 13) {
      document.getElementById('btnSearch').click();
    }
  };

  document.getElementById('btnSearch').onclick = search;
}

var search = function() {
  var userSearch = document.getElementById('txtSearch').value;
  searchQuery = wikiURL1 + userSearch + wikiURL2;

  jsonAPI(searchQuery).then(function(x) {console.log(x)});
}

function jsonAPI(myURL) {

  // Testing
  console.log(myURL);

  var data;

  var request = new XMLHttpRequest();
  request.open('GET', myURL, true);

  request.onreadystatechange = function() {

    // Testing
    console.log(this.readyState);

    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {

        // Success!
        console.log("Success");

        data = JSON.parse(this.responseText);
        console.log(data);
      } else {
        // Error :(
        console.log("Error");
      }
    } else {
      console.log("Not ready");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
  request = null;

  return data;
}
