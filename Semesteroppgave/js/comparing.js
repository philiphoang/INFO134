var educationURL = "http://wildboy.uib.no/~tpe056/folk/85432.json"; 

var educationInterface; 

readDataFromUrl(educationURL, function(x) {
    educationInterface = new EducationInterface(x);


});


function readDataFromUrl(url, readData) {
    var request = new XMLHttpRequest();
    request.open("GET", url)
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        var data = JSON.parse(request.responseText);
        console.log(data);
        if (readData) {
            readData(data)
        }
  
      };
    }
    request.send()
}


function compareMunicipalities() {
    input1 = document.getElementById("searchbox1");
    input2 = document.getElementById("searchbox2");

    var compareTable = document.getElementById("compareTable");
    var p = document.createElement("p");

    var pnode = document.createTextNode("hello world");
    p.appendChild(pnode);
    compareTable.appendChild(p)

    document.getElementById("compareTable").style.display = "block";
}