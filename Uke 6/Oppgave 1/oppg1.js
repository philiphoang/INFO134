window.onload = function() {
    //1.b)
    function func1() {
        console.log("Button 1");
    }

    var button2 = document.getElementById("button2");
    button2.onclick = function() {
        console.log("Button 2");
    }

    var button3 = document.getElementById("button3");
    button3.addEventListener("click", function() {
        console.log("Button 3");
    });   
}


function func1() {
    console.log("Button 1");
}

function version1() {
    console.log("Version 1 - on body load");
}

//1.c)
function giveFunction() {
    var thatButton = document.getElementById("thatButton");
    thatButton.disabled = false;
    thatButton.addEventListener("click", function() {
        document.getElementById("text").innerText = "Hello world";
    });
}

//1.d) 
function version1() {
    console.log("Version 1 - on body load");
}

function version2() {
    console.log("Version 2 - onload function");
}

function version3() {
    console.log("Version 3 - eventlistener")
}

document.onload = version2();

window.addEventListener("load", version3());




