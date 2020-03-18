var timeoutID;
function timeoutFunction() {
    console.log("Loading...");
    timeoutID = setTimeout(stopTimeoutFunction(), 2000);
    
};

window.onload = 
    timeoutFunction();


function stopTimeoutFunction() {
    clearTimeout(timeoutID);
    console.log("Canceled");
};

//2.c
window.onload = function() {
    var elt = document.getElementById("avsnittetMitt");
    elt.innerHTML = "Siden er lastet.";
};

//2.d
function freeze(tryToFreeze) {
    tryToFreeze = tryToFreeze || 4000; // standard: 4 sekunder
    var work = 30;

    // en funksjon som tar tid å bergne
    // (funksjonen regner ut det n-te tallet i Fibonacci-sekvensen)
    function workALittle(n) {
        if (n < 2) {
            return 1;
        }

        return workALittle(n-1) + workALittle(n-2);
    }
    // forsøk å utfør (meningsløst) arbeid i ‘tryToFreeze’ antall
    // millisekunder
    var start = performance.now();
    var timeSpent = 0;
    while(timeSpent < tryToFreeze) {
        workALittle(work);
        timeSpent = (performance.now() - start);
    }

    alert("Total time spent:" + timeSpent);
    }

setTimeout(alert("Hei"), 1000);
document.onload(freeze());

