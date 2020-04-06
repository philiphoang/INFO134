var educationURL = "http://wildboy.uib.no/~tpe056/folk/85432.json"; 

var educationInterface = new EducationInterface(); 
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

function readInput() {
    var comparingDiv = document.getElementById("comparing");
    comparingDiv.innerHTML = ""; //Clear tables
    
    input1 = document.getElementById("searchbox1").value;
    input2 = document.getElementById("searchbox2").value;

    var list = educationInterface.getIDs();

    if (!list.includes(input1) || !list.includes(input2)) {
        comparingDiv.appendChild(document.createTextNode("Not valid"));
        return false;
    }
    else { //Check if input is empty
        var id1 = input1.toString();
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
    var levelList = ["Grunnskolenivå", "Videregående skole-nivå", "Fagskolenivå",
                     "Universitets- og høgskolenivå kort", "Universitets- og høgskolenivå lang",
                     "Uoppgitt eller ingen fullført utdanning"];

    

    var menList1 = list1[0];
    var menList2 = list2[0];
    var tableMen = createTable("Menn", menList1[0], menList2[0]); 
    addTableRow(tableMen, levelList, menList1, menList2, "men");

    var womenList1 = list1[1];
    var womenList2 = list2[1];
    var tableWomen = createTable("Kvinner", womenList1[0], womenList2[0]);
    document.getElementById("comparing").appendChild(tableWomen);

    addTableRow(tableWomen, levelList, womenList1, womenList2, "women");


}

function createTable(gender, name1, name2) {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var tableHead = document.createElement("thead");

    createTableRowElement(table, tr, gender, "th", "Gender");
    createTableRowElement(table, tr, name1, "th", "First municipality")
    createTableRowElement(table, tr, name2, "th", "Second municipality")
    createTableRowElement(table, tr, "Winner", "th", "Winner")
    tableHead.appendChild(tr);
    table.appendChild(tableHead)

    document.getElementById("comparing").appendChild(table);

    return table;
}

function addTableRow(table, level, list1, list2, gender) {
    for (var i = 0; i < list1.length-1; i++) {
        var tr = document.createElement("tr");

        createTableRowElement(table, tr, level[i], "td", "Education level");
        createTableRowElement(table, tr, list1[i+1], "td", list1[0]);
        createTableRowElement(table, tr, list2[i+1], "td", list2[0]);

        if (list1[i+1] > list2[i+1]) 
            createTableRowElement(table, tr, list1[0], "td", "Winner");
        else if (list1[i+1] < list2[i+1])
            createTableRowElement(table, tr, list2[0], "td", "Winner");
        else 
            createTableRowElement(table, tr, "Tie", "td", "Winner");
    }
    
    compareCells(list1, list2, gender);
}

function compare(table, row, value1, value2) {

}

//TODO: Remove this 
function compareCells(list1, list2, gender) {
    var counter1 = 0, counter2 = 0;
    var municipality1 = list1[0];
    var municipality2 = list2[0];

    for (var i = 1; i < list1.length; i++) {
        if (list1[i] > list2[i]) {
            counter1 = counter1 + 1;  
        }
        else if (list1[i] < list2[i]) {
            counter2 = counter2 + 1;
        }
    }  

    announceWinner(municipality1, municipality2, counter1, counter2, gender)
}

function announceWinner(municipality1, municipality2, counter1, counter2, gender) {
    var winnerTextNode;
 
    var winner = document.createElement("p")
       
    var string = "Overall winner in " + gender + "-category: ";
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

function createTableRowElement(table, row, text, element, label) {
    var element = document.createElement(element);
    element.setAttribute("data-label", label);
    var textNode = document.createTextNode(text)
    
    element.appendChild(textNode);
    row.appendChild(element);
    table.appendChild(row)
}
