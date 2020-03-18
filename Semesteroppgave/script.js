var befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";

var getJSON = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);

            console.log(data);
            getNames(data);
        }
    };
    
    xhr.send();
}

getJSON(befolkning);

// Returner listen av alle kommunenavnene 
function getNames(array) {
    var table = document.getElementById("ul_befolkning");
    
    
    for (var kommuner in array.elementer) {
        var tr = document.createElement("tr"); //Table row
        var td = document.createElement("td"); //
        var tekstNavn = document.createTextNode(kommuner);

        td.appendChild(tekstNavn);

        tr.appendChild(td);

        
        console.log(kommuner.kommunenummer);

        table.appendChild(tr);

    }
}
