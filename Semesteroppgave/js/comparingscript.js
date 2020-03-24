var educationURL = "http://wildboy.uib.no/~tpe056/folk/85432.json"; 

var educationInterface = new EducationInterface(); 
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



function compareMunicipalities() {
    input1 = document.getElementById("searchbox1").value;
    input2 = document.getElementById("searchbox2").value;


    if (true) { //Check if input is empty
        var id1 = input1 .toString();
        var id2 = input2.toString();

        var input1Edu2017 = educationInterface.getAllEducationByMunicipalityIdAndYear(id1, 2017);
        var input2Edu2017 = educationInterface.getAllEducationByMunicipalityIdAndYear(id2, 2017);

        input1Edu2017[0].unshift(educationInterface.getNameById(id1));
        input2Edu2017[0].unshift(educationInterface.getNameById(id2));

        input1Edu2017[1].unshift(educationInterface.getNameById(id1));
        input2Edu2017[1].unshift(educationInterface.getNameById(id2));

        createMunicipalityTable(input1Edu2017, input2Edu2017);

    }
    return false;
}


function createMunicipalityTable(list1, list2) {
    var levelList = ["Education levels", "Grunnskolenivå", "Videregående skole-nivå", "Fagskolenivå",
                     "Universitets- og høgskolenivå kort", "Universitets- og høgskolenivå lang",
                     "Uoppgitt eller ingen fullført utdanning"];

    var menList1 = list1[0];
    var menList2 = list2[0];
    var tableMen = document.getElementById("tableMen");

    addTableRow(tableMen, levelList, menList1, menList2);

    var womenList1 = list1[1];
    var womenList2 = list2[1];
    var tableWomen = document.getElementById("tableWomen");

    addTableRow(tableWomen, levelList, womenList1, womenList2);

    tableMen.style.display = "block";
    tableWomen.style.display = "block";
}

function addTableRow(table, level, list1, list2) {
    for (var i = 0; i < list1.length; i++) {
        var tr = document.createElement("tr");
        var leveltd = document.createElement("td");
        var data1td = document.createElement("td");
        var data2td = document.createElement("td");

        leveltd.appendChild(document.createTextNode(level[i]));
        data1td.appendChild(document.createTextNode(list1[i])); //Municipality 1
        data2td.appendChild(document.createTextNode(list2[i])); //Municipality 2

        tr.appendChild(leveltd);
        tr.appendChild(data1td);
        tr.appendChild(data2td);

        table.appendChild(tr);
    }
}

/*
    var womenList = list[1];
    
    var compareTable = document.getElementById("compareTableMen");

    var th = document.createElement("th");
    var nameEl = document.createElement("td")
    var nameNode = document.createTextNode(educationInterface.getNameById(id));
    nameEl.appendChild(nameNode);
    th.appendChild(nameEl);

    var tr = document.createElement("tr");

    var edu1 = document.createElement("td");
    var edu1Node = document.createTextNode(menList);
    edu1.appendChild(edu1Node);

    tr.appendChild(edu1);

    compareTable.appendChild(th);
    compareTable.appendChild(tr);
*/
