var populationURL = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var employedURL = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";

//Gjør disse grensesnittene globalt 
var populationInterface; 
var employedInterface;
var educationInterface;

//
readDataFromUrl(populationURL, function(x) {
    populationInterface = new PopulationInterface(x); //Grensensitt foreløpig begrenset til scope

    putPopulationInTable(populationInterface);
});

readDataFromUrl(employedURL, function(x) {
    educationInterface = new EducationInterface(x);
});

readDataFromUrl(employedURL, function(x) {
    employedInterface = new EmployedInterface(x);

    putEmployedInTable(employedInterface);
    
    //TODO: Lag en metode som henter ut table row (tr) ved id og legger data til den raden
})

function readDataFromUrl(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var data = JSON.parse(request.responseText);
      console.log(data); //print 
      if (callback) {
        callback(data)
      }

    };
  }
  request.send()
}


function putEmployedInTable(interface) {
  var table = document.getElementById("table");

  var names = interface.getNames();
  var ids = interface.getIDs();
  var employedMenn2018 = interface.getEmployedStatsMenn(2018);

  for (var i = 0; i < ids.length; i++) {
    var tr = document.getElementById(names[i]);
    var employedEl = document.createElement("td");
    var employedNode = document.createTextNode(interface.getEmployedStatsByMunicipality(names[i], "Begge kjønn", 2018));

    employedEl.appendChild(employedNode);

    tr.appendChild(employedEl);
  }
}

 

function putPopulationInTable(interface) {
    var table = document.getElementById("table");

    var names = interface.getNames();
    var ids = interface.getIDs();

    for (var i = 0; i < names.length; i++) {
        var tr = document.createElement("tr"); //Create new table row
        var nameEl = document.createElement("td"); //Table element
        var idEl = document.createElement("td");

        var nameNode = document.createTextNode(names[i]);
        var idNode = document.createTextNode(ids[i]);

        nameEl.appendChild(nameNode);
        idEl.appendChild(idNode);

        tr.setAttribute("id", names[i]);
        tr.appendChild(nameEl);
        tr.appendChild(idEl);
        
        table.appendChild(tr);
    }
}

//TODO
//Lag en felles table function
//Legg til id på rad
//Legg til headers i Javascript istedet 



  function search() {
    var input, table, tr, td, i, txtValue;
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