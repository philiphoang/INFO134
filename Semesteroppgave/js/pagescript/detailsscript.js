//Field (Global) variables 
var firstHeadList = ["Municipality", "Municipality id", "Population (2018)", "Employement (2018)", "Employement in % (2018)", "Education (2017)", "Education in % (2017)"];
var secondHeadList = ["Year", "Number of change in population", "Population change in %", "Number of change in employement", "Employement change in %",  "Number of change in education", "Education change in %"];
var MIN_YEAR = 2008;
var MAX_YEAR = 2017
var detailsDiv = document.getElementById("detailsDiv");

/**
 * Checks the user input against the list of municipality ids from populationInterface.
 * Clears the page (table) first. If user input is valid, then create table with information. Else, show error message.
 * 
 * @return false stops the form from redirecting and refresh the page  
 */
function readInput() {
    var list = populationInterface.getIDs();
    clear("detailsDiv"); //Clear table 

    var input = document.getElementById("searchbox").value;
    if (list.includes(input)) 
        createDetailTable(input.toString());
    else {
        detailsDiv.appendChild(document.createTextNode("Invalid input. Please type in a valid municipality id."));
    }
    return false; 
}

/**
 * Create tables with information taken from population, employement and education dataset.
 * First table contains name, id, and the latest informations from the datasets. 
 * Second table contains number and change in percent from the datasets from MIN_YEAR to MAX_YEAR (years that occurs in all datasets).
 *  
 * @param {String} id Municipality id  
 */
function createDetailTable(id) {
    var name = educationInterface.getNameById(id); //Municipality name
    var popList = populationInterface.getPopulationBothGenderFromNameAllYears(name); //Population figure for all years (both gender summed)
    var empList = employedInterface.getEmployedStatsByNameAllYears(name, "Begge kjønn"); //Employement rate (percent) for all years (both gender summed)
    var numEmployement = findNumberGivenPercent(empList, popList); //Employement number for all years 
    var eduList = educationInterface.getHigherEducationBothGenderFromNameAllYears(name); //Education rate (percent) for all years
    var numEducation = findNumberGivenPercent(eduList, popList); //Education number for all years 
    
    //Create first table
    var firstTable = document.createElement("table");
    var rowHeader = document.createElement("tr");
    addMultipleTableRowElement(firstTable, rowHeader, firstHeadList, "th"); //Add title head to first table
    
    var firstTextNodes = [];
    firstTextNodes.push(name); //Municipality name
    firstTextNodes.push(id); //Municipality id
    firstTextNodes.push(popList[2018]); //Population figure 2018
    firstTextNodes.push(numEmployement[2018]); //Employment number 2018
    firstTextNodes.push(empList[2018]); //Employment in percent 2018
    firstTextNodes.push(numEducation[2017]); //Education number 2017
    firstTextNodes.push(eduList[2017]); //Education in percent 2017
    
    var firstTr = document.createElement("tr");
    addMultipleTableRowElementWithLabelList(firstTable, firstTr, firstTextNodes, "td", firstHeadList); //Add data to first table
    
    //Create second table
    var secondTable = document.createElement("table");
    var secondTr = document.createElement("tr");
    addMultipleTableRowElement(secondTable, secondTr, secondHeadList, "th"); //Add title head to second table
    
    for (var i = MIN_YEAR; i <= MAX_YEAR; i++) {
        var yearTr = document.createElement("tr");
        
        createTableRowElement(secondTable, yearTr, i, "td", secondHeadList[0]); //Add year
        calculateGrowth(popList[i], popList[i-1], secondTable, yearTr, secondHeadList[1], secondHeadList[2]); //Add population number and percent
        calculateGrowth(numEmployement[i], numEmployement[i-1], secondTable, yearTr, secondHeadList[3],secondHeadList[4]); //Add employment number and percent
        calculateGrowth(numEducation[i], numEducation[i-1], secondTable, yearTr, secondHeadList[5], secondHeadList[6]); //Add education number and percent
    }
    
    //Add tables to page (div)
    var firstThead = document.createElement("thead");
    firstThead.appendChild(rowHeader);
    firstTable.appendChild(firstThead);
    
    var secondThead = document.createElement("thead");
    secondThead.appendChild(secondTr);
    secondTable.appendChild(secondThead);

    detailsDiv.appendChild(firstTable);
    detailsDiv.appendChild(secondTable);
}

/**
 * Find the number from population figure by percent from list 
 * 
 * @param {Object} list Object containing years with percents for each of them 
 * @param {Object} populationList Object containing years with population figure for each of them  
 * 
 * @return {List} A list of numbers after finding its number from percent
 */
function findNumberGivenPercent(percentList, populationList) {
    var calculatedList = {};

    for (x in populationList) {
        var num = (populationList[x] * percentList[x]) / 100; 
        calculatedList[x] = Math.round(num);
    }
    return calculatedList; 
}

/**
 * Calculate percent change by giving the function past and current year
 * 
 * @param {Number} currentYear current year
 * @param {Number} pastYear past year
 * @param {Table (Element)} table table to be put in 
 * @param {Tablerow (Element)} row tablerow to be put in
 * @param {String} title1 Title used for label
 * @param {String} title2 Title used for label
 */
function calculateGrowth(currentYear, pastYear, table, row, title1, title2) {
        var diff = currentYear - pastYear;
        var percent = ((diff) / pastYear) * 100;
        var roundPercent = Math.round(percent * 100) / 100;
        
        createTableRowElement(table, row, diff, "td", title1)
        createTableRowElement(table, row, roundPercent, "td", title2);
}

