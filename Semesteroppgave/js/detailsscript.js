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
	var overviewDiv = document.getElementById("overviewDiv");
	overviewDiv.innerHTML = ""; //Clear tables
	
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
    
    var table = document.createElement("table");
    var rowHeader = document.createElement("tr");
    table.setAttribute("class", "table table-hover row-clickable");
    var tr = document.createElement("tr");
    
    createTableRowElement(table, rowHeader, "Municipality", "th");
    createTableRowElement(table, rowHeader, "Population", "th");
    createTableRowElement(table, rowHeader, "Employement (2018)", "th")
    createTableRowElement(table, rowHeader, "Employement in % (2018)", "th");
    createTableRowElement(table, rowHeader, "Education (2017)", "th")
    createTableRowElement(table, rowHeader, "Education in % (2017)", "th");

    //Add municipality name
    var name = educationInterface.getNameById(id);
    createTableRowElement(table, tr, name, "td");

    //Add population
    var poplist = populationInterface.getPopulationBothGenderFromNameAllYears(name);
    console.log(poplist)
	var pop2018 = poplist[2018];
    createTableRowElement(table, tr, pop2018, "td");

    //Add employed both gender (also percent)
    var emplist = employedInterface.getEmployedRateByNameAllYears(name, "Begge kjønn");
    var emp2018 = emplist[2018];
    
    var numEmployement = findNumberGivenPercent(emplist, poplist);

    createTableRowElement(table, tr, numEmployement[2018], "td");
    createTableRowElement(table, tr, emp2018, "td");

    //Add education both gender
    var edulist = educationInterface.getHigherEducationBothGenderFromNameAllYears(name);
    var edu2017 = edulist[2017]; //This is percent 
    
    var numEducation = findNumberGivenPercent(edulist, poplist);

    createTableRowElement(table, tr, numEducation[2017], "td");
    createTableRowElement(table, tr, edu2017, "td");

   
  
    //TODO: Create table for population-, employed and education growth
    //Calculate growth by taking the past year and check it up with the next year
    //For loop this shit 

    var growthTable = document.createElement("table");
    growthTable.setAttribute("class", "table");
    var growthTr = document.createElement("tr");

    createTableRowElement(growthTable, growthTr, "Year", "th");
    createTableRowElement(growthTable, growthTr, "Number of change in population", "th");
    createTableRowElement(growthTable, growthTr, "Population change in %", "th")

    createTableRowElement(growthTable, growthTr, "Number of change in employement", "th");
    createTableRowElement(growthTable, growthTr, "Employement change in %", "th")

    createTableRowElement(growthTable, growthTr, "Number of change in education", "th");
    createTableRowElement(growthTable, growthTr, "Population change in %", "th")
  
    //TODO: Somehow give the same row for each year
    //Dobbel for-loop?? Each year, fill row, next year, fill row, repeat

    for (var i = 2008; i <= 2017; i++) {
        var yearTr = document.createElement("tr");

        createTableRowElement(growthTable, yearTr, i, "td");

        calculateGrowth(poplist[i - 1], poplist[i], growthTable, yearTr);

        calculateGrowth(numEmployement[i - 1], numEmployement[i], growthTable, yearTr);

        calculateGrowth(numEducation[i - 1], numEducation[i], growthTable, yearTr);
    }

    overviewDiv.appendChild(table);

    overviewDiv.appendChild(growthTable);

}

function findNumberGivenPercent(list, pop) {
    var newList = {};

    for (x in pop) {
        var num = (pop[x] * list[x]) / 100; 
        newList[x] = Math.round(num);
    }
    return newList; 
}


function calculateGrowth(sumPast, sumNow, table, row) {

        var sum = sumNow - sumPast;
        var percent = ((sum) / sumPast) * 100;
        var roundPercent = Math.round(percent * 100) / 100;
        
        createTableRowElement(table, row, sum, "td")
        createTableRowElement(table, row, roundPercent, "td");
    
}


function createTableRowElement(table, row, text, element) {
	var element = document.createElement(element);
    var textNode = document.createTextNode(text)
    
    element.appendChild(textNode);
    row.appendChild(element);
    table.appendChild(row)
}