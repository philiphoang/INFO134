var populationURL = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";

var populationDataset = {};

var populationInterface; 

readDataFromUrl(populationURL, function(x) {
    populationInterface = new Interface(x);

    createTable(populationInterface);
});


function Interface(dataset) {
    this.dataset = dataset;
    this.getNames = function () {return names(this.dataset)};
    this.getIDs = function () {return ids(this.dataset, this.getNames())};
};


function createTable(interface) {
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

        //Make cell contain a table with additional information 
        tr.appendChild(nameEl);
        tr.appendChild(idEl);
        
        table.appendChild(tr);
    }
}

function readDataFromUrl(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url)
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        var data = JSON.parse(request.responseText);
        console.log(data);
        if (callback) {
          callback(data)
        }
  
      };
    }
    request.send()
}


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