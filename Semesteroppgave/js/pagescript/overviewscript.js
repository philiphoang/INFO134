//Field (Global) variables
var overviewDiv = document.getElementById("overviewDiv");
var tableHeadList = ["Municipality", "Municipality id", "Population figure (2018)", "Population change in %"]

//Overivewscript has its own load as it execute createOverViewTable() as a callback function
load(populationURL, populationInterface, function() {createOverivewTable()});

/**
 * Read and parse the dataset for url. 
 * 
 * @param {String} url Link to the dataset  
 * @param {Object} obj Object to save the parsed data 
 * @param {Function} callback Function to get executed 
 */
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
	request.send();
};

/**
 * Create a table with all the municipalities and their corresponding data. 
 */
function createOverivewTable() {
    var table = document.createElement("table");
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");

	addMultipleTableRowElement(table, tr, tableHeadList, "th");

	thead.appendChild(tr);
	table.appendChild(thead);

    var names = populationInterface.getNames();
	var ids = populationInterface.getIDs();
	
    for (var i = 0; i < names.length; i++) {
        var tr = document.createElement("tr"); //Create new table row
     
        //Total population figure (both gender) 
        var pop2018 = populationInterface.getPopulationBothGenderFromNameAllYears(names[i])[2018];

        //Population figure in percent
        var pop2017 = populationInterface.getPopulationBothGenderFromNameAllYears(names[i])[2017];
        var percent = ((pop2018 - pop2017) / pop2017) * 100;
        var roundPercent = Math.round(percent * 100) / 100;
	
		createTableRowElement(table, tr, names[i], "td", tableHeadList[0]);
		createTableRowElement(table, tr, ids[i], "td", tableHeadList[1]);
		createTableRowElement(table, tr, pop2018, "td", tableHeadList[2]);
		createTableRowElement(table, tr, roundPercent, "td", tableHeadList[3]);
	}
	
	overviewDiv.appendChild(table);
}
