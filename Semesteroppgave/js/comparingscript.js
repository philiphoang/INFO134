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

        //Add municipality name to the list 
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

    //TODO: Move this to createTable()
    var tableMen = document.createElement("table");
    var tr = document.createElement("tr");
    var tableHeadMen = document.createElement("th");
    var menTextNode = document.createTextNode("Menn");

    tableHeadMen.appendChild(menTextNode);
    tr.appendChild(tableHeadMen);
    tableMen.appendChild(tr);
    
    document.getElementById("comparing").appendChild(tableMen);

    addTableRow(tableMen, levelList, menList1, menList2);

    var womenList1 = list1[1];
    var womenList2 = list2[1];

    var tableWomen = document.createElement("table");
    var tr = document.createElement("tr");
    var tableHeadWomen = document.createElement("th");
    var womenTextNode = document.createTextNode("Kvinner");

    tableHeadWomen.appendChild(womenTextNode);
    tr.appendChild(tableHeadWomen);
    tableWomen.appendChild(tr);

    document.getElementById("comparing").appendChild(tableWomen);


    addTableRow(tableWomen, levelList, womenList1, womenList2);

    tableMen.style.display = "block";
    tableWomen.style.display = "block";
}

function createTable() {
    //TODO: Create a common function for creating municipality table
    
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

    compareCells(list1, list2);
}

function compareCells(list1, list2) {
    var counter1 = 0, counter2 = 0;
    var municipality1 = list1[0];
    var municipality2 = list2[0];


    for (var i = 1; i < list1.length; i++) {
        if (list1[i] > list2[i]) {
            counter1 = counter1 + 1;
            console.log(list1[i]); 
         
        }
        else if (list1[i] < list2[i]) {
            console.log(list2[i]);
            counter2 = counter2 + 1;
        }
        else { 
            console.log("Tie");
        }
    }  



    compareWinner(municipality1, municipality2, counter1, counter2)
  
}

function compareWinner(municipality1, municipality2, counter1, counter2) {
    var winnerTextNode;
    var winner = document.createElement("p")
  
    if (counter1 > counter2) {
        winnerTextNode = document.createTextNode(municipality1);
    }
    else if (counter1 < counter2) {
        winnerTextNode = document.createTextNode(municipality2);

    }
    else {
        winnerTextNode = document.createTextNode("It is a tie");
    }
    winner.appendChild(winnerTextNode);

    document.body.appendChild(winner);
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
