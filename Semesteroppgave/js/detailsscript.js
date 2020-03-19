var befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";

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

        //Kommunenavn
        var tekstNavn = document.createTextNode(kommune);

        //Kommunenummer
        var tekstKommunenr = document.createTextNode(kommuneliste[kommune].kommunenummer);

        td1.appendChild(tekstNavn);
        td2.appendChild(tekstKommunenr);


        //Make cell contain a table with additional information 
        

        tr.appendChild(td1);
        tr.appendChild(td2);


        table.appendChild(tr);
    }
}



function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbox");
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1]; //Søk etter kommunenummer
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.indexOf(input.value) > -1) {
            table.style.display = "block"
            tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }  
      
      if (input.value === "") {
          table.style.display = "none";
      }
    }
  }