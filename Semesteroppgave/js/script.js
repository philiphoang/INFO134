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
    var table = document.getElementById("table");

    var kommuneliste = array.elementer;

    for (var kommune in kommuneliste) {
        var tr = document.createElement("tr"); //Table row
        var td1 = document.createElement("td"); //Table element
        var td2 = document.createElement("td"); 
        var td3 = document.createElement("td"); 
        var td4 = document.createElement("td"); 

        //Kommunenavn
        var tekstNavn = document.createTextNode(kommune);

        //Kommunenummer
        var tekstKommunenr = document.createTextNode(kommuneliste[kommune].kommunenummer);
        
        //Totale befolkningstall (begge kjønn)
        var tallMenn2018 = kommuneliste[kommune].Menn["2018"]
        var tallKvinner2018 = kommuneliste[kommune].Kvinner["2018"];
        var total2018 = tallMenn2018 + tallKvinner2018;
        var tekstTotal2018 = document.createTextNode(total2018);

        //Befokningsvekst i prosent
        var tallMenn2017 = kommuneliste[kommune].Menn["2017"]
        var tallKvinner2017 = kommuneliste[kommune].Kvinner["2017"];
        var total2017 = tallMenn2017 + tallKvinner2017;

        var prosent = ((total2018 - total2017) / total2017) * 100; 
        var tekstProsent = document.createTextNode(Math.round(prosent * 100) / 100);

        td1.appendChild(tekstNavn);
        td2.appendChild(tekstKommunenr);
        td3.appendChild(tekstTotal2018);
        td4.appendChild(tekstProsent);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        table.appendChild(tr);
    }
}

