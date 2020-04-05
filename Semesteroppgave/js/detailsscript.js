var populationURL = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var employedURL = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var educationURL = "http://wildboy.uib.no/~tpe056/folk/85432.json";

 
var populationInterface = new PopulationInterface(); //Grensensitt foreløpig begrenset til scope
var employedInterface = new EmployedInterface();
var educationInterface = new EducationInterface();

readDataFromUrl(populationURL, populationInterface, function() {console.log(populationInterface)});
readDataFromUrl(employedURL, employedInterface, function() {console.log(employedInterface)});
readDataFromUrl(educationURL, educationInterface, function() {console.log(educationInterface)});


function readDataFromUrl(url, obj, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      obj.dataset = JSON.parse(request.responseText);
      if (callback) {
          callback(obj.dataset)
      }
    };
  }
  request.send()
}


function searchForMunicipality() { 
	// var detailsDiv = document.getElementById("detailsDiv");
	// detailsDiv.innerHTML = "";//Clear tables
	
	input = document.getElementById("searchbox").value;

	if (input == "") {
		var p = document.createElement("p");
		p.appendChild(document.createTextNode("Empty field"));
		document.body.appendChild(p);
		return false;
	}

	if (true) { //Check if id exists
		var id = input.toString();

		// Change this 
		var input1Edu2017 = educationInterface.getAllEducationByMunicipalityIdAndYear(id, 2017);

		if (input1Edu2017 == "undefined") {
			console.log("id doesnt exist")
			return false;
		}
		
		createTable(id);
	}    

	return false;
}

function createTable(id) {
	var overviewDiv = document.getElementById("overviewDiv")
	var table = document.getElementById("table");

	var name = educationInterface.getNameById(id);
	var population = populationInterface.getPopulationFigureBothGenderFromMunicipalityAllYears(name);
	console.log(population)

	var popmen = populationInterface.getPopulationFromGenderFromMunicipalityAllYears(name, "Menn");
	var popwomen = populationInterface.getPopulationFromGenderFromMunicipalityAllYears(name, "Women");
	var pop2018 = popmen[2018] + popwomen[2018]
	
	var edumen = interface.getHigherEducationLongByMunicipality(names[i], "Kvinner", 2017)
	var eduwomen = educationInterface.getHigherEducationLongByMunicipality(names[i], "Menn", 2017)
	var educationBothGender2017 = edumen + eduwomen; 

	var emp2017
	var employedNode = document.createTextNode(employedInterface.getEmployedStatsByMunicipality(names[i], "Begge kjønn", 2018));


	console.log(popmen[2018] + popwomen[2018])


	var tr = document.createElement("tr");

	var td = document.createElement("td");

}


function createTableElement(text) {
	var td = document.createElement("td");

	var textNode = document.createTextNode(text)

	td.appendChild(textNode);
}







function putPopulationInTable(interface) {
    var table = document.getElementById("table");

    var names = populationInterface.getNames();
    var ids = populationInterface.getIDs();

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
    var names = employedInterface.getNames();
    var ids = employedInterface.getIDs();
    console.log(ids.length)
    console.log("Employed: " + names.length)

    
    for (var i = 0; i < ids.length; i++) {
        var tr = document.getElementById(names[i]);
        var employedEl = document.createElement("td");
        var employedNode = document.createTextNode(employedInterface.getEmployedStatsByMunicipality(names[i], "Begge kjønn", 2018));
        
        employedEl.appendChild(employedNode);
        
        tr.appendChild(employedEl);
    }
}


function putEducationInTable(interface) {
    var names = educationInterface.getAllNames();
    var ids = educationInterface.getIDs();

    console.log("Education: " + names.length)

    for (var i = 0; i < names.length; i++) {
        var tr = document.getElementById(names[i]);
        if (tr == null) {
            tr = document.createElement("tr");
        }
        var educationEl = document.createElement("td");   
        
        console.log(names[i]);
        console.log(i)
        var educationBothGender2017 = educationInterface.getHigherEducationLongByMunicipality(names[i], "Menn", 2017) + interface.getHigherEducationLongByMunicipality(names[i], "Kvinner", 2017)
        
        var educationNode = document.createTextNode(Math.round(educationBothGender2017 * 100) / 100);

        educationEl.appendChild(educationNode);
        tr.appendChild(educationEl);
    }
}


