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


function readInput() {
    var comparingDiv = document.getElementById("comparing");
    comparingDiv.innerHTML = "";//Clear tables
    
    input1 = document.getElementById("searchbox1").value;
    input2 = document.getElementById("searchbox2").value;

    if (input1 == "" || input2 == "") {
        var p = document.createElement("p");
        p.appendChild(document.createTextNode("Empty field"));
        comparingDiv.appendChild(p);
        return false;
    }

    if (true) { //Check if input is empty
        var id1 = input1.toString();
        var id2 = input2.toString();

        var input1Edu2017 = educationInterface.getAllEducationByMunicipalityIdAndYear(id1, 2017);
        var input2Edu2017 = educationInterface.getAllEducationByMunicipalityIdAndYear(id2, 2017);

        if (input1Edu2017 == "undefined" || input2Edu2017 == "undefined") {
            console.log("input doesnt exist")
            return false;
        }

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
    var tableMen = createTable("Menn"); 
    addTableRow(tableMen, levelList, menList1, menList2, "men");

    var womenList1 = list1[1];
    var womenList2 = list2[1];
    var tableWomen = createTable("Kvinner");
    document.getElementById("comparing").appendChild(tableWomen);

    addTableRow(tableWomen, levelList, womenList1, womenList2, "women");

    tableMen.style.display = "block";
    tableWomen.style.display = "block";
}

function createTable(gender) {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var tableHead = document.createElement("th");
    var textNode = document.createTextNode(gender);
    table.setAttribute("class", "table");

    tableHead.appendChild(textNode);
    tr.appendChild(tableHead);
    table.appendChild(tr);
    
    document.getElementById("comparing").appendChild(table);

    return table;
}

function addTableRow(table, level, list1, list2, gender) {
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

        //Add winner beside each category/row?

        table.appendChild(tr);
    }

    compareCells(list1, list2, gender);
}

function compareCells(list1, list2, gender) {
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

    announceWinner(municipality1, municipality2, counter1, counter2, gender)
  
}

function announceWinner(municipality1, municipality2, counter1, counter2, gender) {
    var winnerTextNode;
 
    
    var winner = document.createElement("p")
       
    var string = "Winner in " + gender + "-category: ";
    if (counter1 > counter2) {
        winnerTextNode = document.createTextNode(string + municipality1);
    }
    else if (counter1 < counter2) {
        winnerTextNode = document.createTextNode(string + municipality2);

    }
    else {
        winnerTextNode = document.createTextNode("Tie between the municipalities");
    }

    winner.appendChild(winnerTextNode);
    document.getElementById("comparing").appendChild(winner);
    
}