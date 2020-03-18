var befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onreadystatechange = function() {
        var data = JSON.parse(xhr.responseText);

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var befolkningsArray = JSON.parse(this.responseText);
                presentArray(befolkningsArray);
            }
        }
    };
    
    xhr.send();
}

getJSON(befolkning)

function presentArray(array) {
    var htmlList = document.getElementById("ul_oversikt");
    for (var i = 0; i < array.length; i++) {
        var li = document.createElement("li");

        var text = document.createTextNode(
            array.features[0]
        );
        li.appendChild(text);

        htmlList.appendChild(li);
    }
}
