var populationURL = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var employedURL = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var educationURL = "http://wildboy.uib.no/~tpe056/folk/85432.json";

 
var populationInterface = new PopulationInterface();
var employedInterface = new EmployedInterface();
var educationInterface = new EducationInterface();

load(populationURL, populationInterface, function() {console.log(populationInterface)});
load(employedURL, employedInterface, function() {console.log(employedInterface)});
load(educationURL, educationInterface, function() {console.log(educationInterface)});


function load(url, obj, callback) {
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

function validateInput() {
    var list = populationInterface.getIDs();
    var overviewDiv = document.getElementById("overviewDiv");
	overviewDiv.innerHTML = ""; //Clear tables

    var input = document.getElementById("searchbox");
    if (!list.includes(input.value)) {
        overviewDiv.appendChild(document.createTextNode("Not valid"));
        return false;
    }
    else  
        createTable(input.value.toString());

    return false;
}

function createTable(id) {
	var overviewDiv = document.getElementById("overviewDiv")
    
    var table = document.createElement("table");
    var rowHeader = document.createElement("tr");

    var tr = document.createElement("tr");

    var thead = document.createElement("thead");
    createTableRowElement(table, rowHeader, "Municipality", "th");
    createTableRowElement(table, rowHeader, "Population", "th");
    createTableRowElement(table, rowHeader, "Employement (2018)", "th")
    createTableRowElement(table, rowHeader, "Employement in % (2018)", "th");
    createTableRowElement(table, rowHeader, "Education (2017)", "th")
    createTableRowElement(table, rowHeader, "Education in % (2017)", "th");
    thead.appendChild(rowHeader);
    table.appendChild(thead);

    //Add municipality name
    var name = educationInterface.getNameById(id);
    createTableRowElement(table, tr, name, "td", "Municipality");

    //Add population
    var poplist = populationInterface.getPopulationBothGenderFromNameAllYears(name);
    console.log(poplist)
	var pop2018 = poplist[2018];
    createTableRowElement(table, tr, pop2018, "td", "Population");

    //Add employed both gender (also percent)
    var emplist = employedInterface.getEmployedRateByNameAllYears(name, "Begge kjønn");
    var emp2018 = emplist[2018];
    
    var numEmployement = findNumberGivenPercent(emplist, poplist);

    createTableRowElement(table, tr, numEmployement[2018], "td", "Employement (2018)");
    createTableRowElement(table, tr, emp2018, "td", "Employement in % (2018)");

    //Add education both gender
    var edulist = educationInterface.getHigherEducationBothGenderFromNameAllYears(name);
    var edu2017 = edulist[2017]; //This is percent 
    
    var numEducation = findNumberGivenPercent(edulist, poplist);

    createTableRowElement(table, tr, numEducation[2017], "td", "Education (2017)");
    createTableRowElement(table, tr, edu2017, "td", "Education in % (2017)");

    var growthTable = document.createElement("table");
    growthTable.setAttribute("class", "table");
    var growthTr = document.createElement("tr");
    var growthThead = document.createElement("thead");

    createTableRowElement(growthTable, growthTr, "Year", "th");
    createTableRowElement(growthTable, growthTr, "Number of change in population", "th");
    createTableRowElement(growthTable, growthTr, "Population change in %", "th")

    createTableRowElement(growthTable, growthTr, "Number of change in employement", "th");
    createTableRowElement(growthTable, growthTr, "Employement change in %", "th")

    createTableRowElement(growthTable, growthTr, "Number of change in education", "th");
    createTableRowElement(growthTable, growthTr, "Population change in %", "th")

    growthThead.appendChild(growthTr);
    growthTable.appendChild(growthThead);
  

    for (var i = 2008; i <= 2017; i++) {
        var yearTr = document.createElement("tr");

        createTableRowElement(growthTable, yearTr, i, "td", "Year");

        calculateGrowth(poplist[i - 1], poplist[i], growthTable, yearTr, "Number of change in population", "Population change in %");

        calculateGrowth(numEmployement[i - 1], numEmployement[i], growthTable, yearTr, "Number of change in employement", "Employement change in %");

        calculateGrowth(numEducation[i - 1], numEducation[i], growthTable, yearTr, "Number of change in education", "Population change in %");
    }

    overviewDiv.appendChild(table);

    overviewDiv.appendChild(growthTable);

}

function createTableRowElement(table, row, text, element, label) {
	var element = document.createElement(element);
    element.setAttribute("data-label", label)
    var textNode = document.createTextNode(text)
    
    element.appendChild(textNode);
    row.appendChild(element);
    table.appendChild(row)
}

function findNumberGivenPercent(list, pop) {
    var newList = {};

    for (x in pop) {
        var num = (pop[x] * list[x]) / 100; 
        newList[x] = Math.round(num);
    }
    return newList; 
}


function calculateGrowth(sumPast, sumNow, table, row, title1, title2) {

        var sum = sumNow - sumPast;
        var percent = ((sum) / sumPast) * 100;
        var roundPercent = Math.round(percent * 100) / 100;
        
        createTableRowElement(table, row, sum, "td", title1)
        createTableRowElement(table, row, roundPercent, "td", title2);

}


