var populationURL = "http://wildboy.uib.no/~tpe056/folk/104857.json";

var populationInterface = new PopulationInterface();

load(populationURL, populationInterface, function() {createOverivewTable(populationInterface)});

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

function createOverivewTable(interface) {
	var overviewDiv = document.getElementById("overviewDiv");
    var table = document.createElement("table");
	table.setAttribute("class", "table");

	var thead = document.createElement("thead");
	var tr = document.createElement("tr");

	createTableRowElement(table, tr, "Municipality", "th");
	createTableRowElement(table, tr, "Municipality id", "th");
	createTableRowElement(table, tr, "Population figure (2018)", "th");
	createTableRowElement(table, tr, "Population change in %", "th");

	thead.appendChild(tr);
	table.appendChild(thead);

    var names = interface.getNames();
	var ids = interface.getIDs();
	
    for (var i = 0; i < names.length; i++) {
        var tr = document.createElement("tr"); //Create new table row
     
        //Total population figure (both gender) 
        var pop2018 = interface.getPopulationBothGenderFromNameAllYears(names[i])[2018];

        //Population figure in percent
        var pop2017 = interface.getPopulationBothGenderFromNameAllYears(names[i])[2017];
        var percent = ((pop2018 - pop2017) / pop2017) * 100;
        var pround = Math.round(percent * 100) / 100;
	
		createTableRowElement(table, tr, names[i], "td", "Municipality");
		createTableRowElement(table, tr, ids[i], "td", "Municipality id");
		createTableRowElement(table, tr, pop2018, "td", "Population figure (2018)");
		createTableRowElement(table, tr, pround, "td", "Population change in %");
	}
	
	overviewDiv.appendChild(table);
}

function createTableRowElement(table, row, text, element, label) {
	var element = document.createElement(element);
	element.setAttribute("data-label", label);
    var textNode = document.createTextNode(text)
	
    element.appendChild(textNode);
    row.appendChild(element);
    table.appendChild(row)
}


function search() {
	var input, table, tr, td, i, txtValue;
    input = document.getElementById("searchbox");
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
    	td = tr[i].getElementsByTagName("td")[1]; 
    	if (td) {
        	txtValue = td.textContent || td.innerText;
        	if (txtValue.indexOf(input.value) > -1) {
            	tr[i].style.display = "";
        	} else {
          		tr[i].style.display = "none";
        	}
      	}  
    }
}