var populationURL = "http://wildboy.uib.no/~tpe056/folk/104857.json";

var populationInterface; 

readDataFromUrl(populationURL, function(x) {
    var data = x;
    populationInterface = new PopulationInterface(data);

    createTable(populationInterface);
});


function Interface(dataset) {
    this.dataset = dataset;

    this.getNames = function () {
        return names(this.dataset);
    };

    this.getIDs = function () {
        return ids(this.dataset, this.getNames());
    };

    this.getPopuluationFigureMen = function (year) {
        return populationfigure(this.dataset, this.getNames(), "Menn", year);
    }

    this.getPopuluationFigureWomen = function (year) {
        return populationfigure(this.dataset, this.getNames(), "Kvinner", year);
    }
};


function createTable(interface) {
    var table = document.getElementById("table");

    var names = interface.getNames();
    var ids = interface.getIDs();
    
    var men2018 = interface.getPopuluationFigureMen(2018);
    var women2018 = interface.getPopuluationFigureWomen(2018);

    var men2017 = interface.getPopuluationFigureMen(2017);
    var women2017 = interface.getPopuluationFigureWomen(2017);


    for (var i = 0; i < names.length; i++) {
        var tr = document.createElement("tr"); //Create new table row
        var nameEl = document.createElement("td"); //Table element
        var idEl = document.createElement("td"); 
        var pfEl = document.createElement("td");
        var ppEl = document.createElement("td");

        var nameNode = document.createTextNode(names[i]); //Municipality
        var idNode = document.createTextNode(ids[i]); //Municipality ID

        //Total population figure (both gender) 
        var sum2018 = men2018[i] + women2018[i];
        var pfNode = document.createTextNode(sum2018);

        //Population figure in percent
        var sum2017 = men2017[i] + women2017[i];
        var percent = ((sum2018 - sum2017) / sum2017) * 100;
        var ppNode = document.createTextNode(Math.round(percent * 100) / 100);

        //Add textnodes 
        nameEl.appendChild(nameNode);
        idEl.appendChild(idNode);
        pfEl.appendChild(pfNode);
        ppEl.appendChild(ppNode);

        //Make cell contain a table with additional information 
        tr.appendChild(nameEl);
        tr.appendChild(idEl);
        tr.appendChild(pfEl);
        tr.appendChild(ppEl);
        
        table.appendChild(tr);
    }
}

function readDataFromUrl(url, readData) {
    var request = new XMLHttpRequest();
    request.open("GET", url)
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        var data = JSON.parse(request.responseText);
        console.log(data);
        if (readData) {
            readData(data)
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