//Field (Global) variables
var levelList = ["Grunnskolenivå", "Videregående skole-nivå", "Fagskolenivå", "Universitets- og høgskolenivå kort", "Universitets- og høgskolenivå lang", "Uoppgitt eller ingen fullført utdanning"];
var comparingDiv = document.getElementById("comparingDiv");

/**
 * Checks the user inputs against the list of municipality ids from educationInterface.
 * Clears the page (table) first. If user inputs are valid, then create table with information. Else, show error message.
 * 
 * @return false stops the form from redirecting and refresh the page  
 */
function readInput() {
    clear("comparingDiv")

    input1 = document.getElementById("searchbox1").value;
    input2 = document.getElementById("searchbox2").value;

    var list = educationInterface.getIDs();

    if (!list.includes(input1) || !list.includes(input2)) 
        comparingDiv.appendChild(document.createTextNode("Invalid input. Please check that both field contain valid ids."));
    else 
        createComparisionTables(input1.toString(), input2.toString());

    return false;
}

/**
 * Create the tables from the two municipalities ids. 
 * First, the function finds the data (both gender) for both municipalities. 
 * Second, creates tables for corresponding gender. 
 * 
 * @param {String} id1 
 * @param {String} id2 
 */
function createComparisionTables(id1, id2) {
    //First municipality
    var firstMunMen = educationInterface.getAllEducationByMunicipalityIdAndYear(id1, 2017)[0]; //Men
    var firstMunWomen = educationInterface.getAllEducationByMunicipalityIdAndYear(id1, 2017)[1]; //Women
    
    //Second municipality 
    var secondMunMen = educationInterface.getAllEducationByMunicipalityIdAndYear(id2, 2017)[0];
    var secondMunWomen = educationInterface.getAllEducationByMunicipalityIdAndYear(id2, 2017)[1];
    
    var firstMunName = educationInterface.getNameById(id1);
    var secondMunName = educationInterface.getNameById(id2)

    var tableMen = createTable(firstMunName, secondMunName, "Men"); 
    addTableRow(tableMen, firstMunMen, secondMunMen, firstMunName, secondMunName, "men");

    var tableWomen = createTable(firstMunName, secondMunName, "Women");
    addTableRow(tableWomen, firstMunWomen, secondMunWomen, firstMunName, secondMunName, "women");
}

/**
 * Add data for each row in the given table 
 * 
 * @param {Table (Element)} table Table which contains the data  
 * @param {List} firstMun Data for first municipality
 * @param {List} secondMun Data for second municipality
 * @param {String} firstMunName First municipality name
 * @param {String} secondMunName Second municipality name
 * @param {String} gender Gender, used in announceWinner()
 */
function addTableRow(table, firstMun, secondMun, firstMunName, secondMunName, gender) {
    var counter1 = 0;
    var counter2 = 0;

    for (var i = 0; i < firstMun.length; i++) {
        var tr = document.createElement("tr");

        createTableRowElement(table, tr, levelList[i], "td", "Education level");
        createTableRowElement(table, tr, firstMun[i], "td", firstMunName);
        createTableRowElement(table, tr, secondMun[i], "td", secondMunName);

        //Compare values, add winner's name to tablerow beside the data
        if (firstMun[i] > secondMun[i]) { 
            counter1 = counter1 + 1;
            createTableRowElement(table, tr, firstMunName, "td", "Winner");
        }
        else if (firstMun[i] < secondMun[i]) {
            counter2 = counter2 + 1;
            createTableRowElement(table, tr, secondMunName, "td", "Winner");
        }
        else 
            createTableRowElement(table, tr, "Tie", "td", "Winner");
    }
    
    announceWinner(firstMunName, secondMunName, counter1, counter2, gender)
}

/**
 * Announce the municipality as winner based on its counter. 
 * 
 * @param {String} firstMunName First municipality name
 * @param {String} secondMunName Second municipality name
 * @param {Number} counter1 Counter for first municipality
 * @param {Number} counter2 Counter for second municipality
 * @param {String} gender Gender, used to announce category 
 */
function announceWinner(firstMunName, secondMunName, counter1, counter2, gender) {
    var winnerTextNode;
 
    var winner = document.createElement("p")
    winner.setAttribute("class", "winner")
       
    var string = "Overall winner in " + gender + "-category: ";
    if (counter1 > counter2) 
        winnerTextNode = document.createTextNode(string + firstMunName);
    else if (counter1 < counter2) 
        winnerTextNode = document.createTextNode(string + secondMunName);
    else 
        winnerTextNode = document.createTextNode("Tie between the municipalities");
    

    winner.appendChild(winnerTextNode);
    comparingDiv.appendChild(winner);
}

/**
 * Create and initialize a table with titles. Also add title (gender) to table 
 * 
 * @param {String} name1 First municipality  
 * @param {String} name2 Second municipality
 * @param {String} gender Gender
 * 
 * @return a table 
 */
function createTable(name1, name2, gender) {
    var title = document.createElement("h3");
    title.appendChild(document.createTextNode(gender))
    
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var tableHead = document.createElement("thead");

    var headList = ["Education Level", name1, name2, "Winner"];
    addMultipleTableRowElement(table, tr, headList, "th");
    
    tableHead.appendChild(tr);
    table.appendChild(tableHead)
    
    comparingDiv.appendChild(title);
    comparingDiv.appendChild(table);

    return table;
}