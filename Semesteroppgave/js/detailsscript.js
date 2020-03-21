var populationURL = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var employedURL = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var educationURL = "http://wildboy.uib.no/~tpe056/folk/85432.json";

//Gjør disse grensesnittene globalt 
var populationInterface; 
var employedInterface;
var educationInterface;

// Maybe a solution 
// var populationDataset = {} 

// test(populationURL, populationDataset, function(x) {
//   var populationInterface = new PopulationInterface(x); //Grensensitt foreløpig begrenset til scope

//   putPopulationInTable(populationInterface);
// });


readDataFromUrl(populationURL, function(x) {
    var populationInterface = new PopulationInterface(x); //Grensensitt foreløpig begrenset til scope

    putPopulationInTable(populationInterface);
});

readDataFromUrl(employedURL, function(x) {
    employedInterface = new EmployedInterface(x);

    putEmployedInTable(employedInterface);
})

readDataFromUrl(educationURL, function(x) {
    educationInterface = new EducationInterface(x);

    putEducationInTable(educationInterface);
});


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
 

function putPopulationInTable(interface) {
    var table = document.getElementById("table");

    var names = interface.getNames();
    var ids = interface.getIDs();

    console.log("Population: " + names.length)

    for (var i = 0; i < names.length; i++) {
        var tr = document.createElement("tr"); //Create new table row

        var nameEl = document.createElement("td"); //Table element
        var idEl = document.createElement("td"); 

        var nameNode = document.createTextNode(names[i]); //Municipality
        var idNode = document.createTextNode(ids[i]); //Municipality ID

        nameEl.appendChild(nameNode);
        idEl.appendChild(idNode);

        tr.setAttribute("id", names[i]);
        tr.appendChild(nameEl);
        tr.appendChild(idEl);

        table.appendChild(tr);
    }
}

function putEmployedInTable(interface) {
    var names = interface.getNames();
    var ids = interface.getIDs();

    console.log("Employed: " + names.length)

    
    for (var i = 0; i < ids.length; i++) {
        var tr = document.getElementById(names[i]);
        var employedEl = document.createElement("td");
        var employedNode = document.createTextNode(interface.getEmployedStatsByMunicipality(names[i], "Begge kjønn", 2018));
        
        employedEl.appendChild(employedNode);
        
        tr.appendChild(employedEl);
    }
}


function putEducationInTable(interface) {
    var names = interface.getNames();
    var ids = interface.getIDs();

    console.log("Education: " + names.length)

    for (var i = 0; i < names.length; i++) {
        var tr = document.getElementById(names[i]);
        if (tr == null) {
            tr = document.createElement("tr");
        }
        var educationEl = document.createElement("td");   
        
        console.log(names[i]);
        console.log(i)
        var educationBothGender2017 = interface.getHigherEducationLongByMunicipality(names[i], "Menn", 2017) + interface.getHigherEducationLongByMunicipality(names[i], "Kvinner", 2017)
        
        var educationNode = document.createTextNode(Math.round(educationBothGender2017 * 100) / 100);

        educationEl.appendChild(educationNode);
        tr.appendChild(educationEl);
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