window.addEventListener("load", 
function() {
    var mainContainer = document.getElementById("container");
    var innerContainers = document.getElementsByClassName("innerContainer");

    var allButtons = document.getElementsByTagName("button");

    //1st button
    allButtons[0].addEventListener("click", function() {
        mainContainer.style.flexDirection = "row";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.flexDirection = "row";
        };
    });
    //changeStyle(allButtons[0], "flexDirection: row");

    //2nd button
    allButtons[1].addEventListener("click", function() {
        mainContainer.style.flexDirection = "column";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.flexDirection = "row";
        };
    });


    //3rd button
    allButtons[2].addEventListener("click", function() {
        mainContainer.style.flexDirection = "row";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.flexDirection = "column";
        };
    });


    //4th button
    allButtons[3].addEventListener("click", function() {
        mainContainer.style.flexDirection = "column";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.flexDirection = "column";
        };
    });

    //changeStyle(allButtons[3], "flexDirection: column");


    //5th button
    allButtons[4].addEventListener("click", function() {
        mainContainer.style.justifyContent = "stretch";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.justifyContent = "stretch";
        };
    });
    
    //changeStyle(allButtons[4], "justifyContent: stretch");


    //6th button
    allButtons[5].addEventListener("click", function() {
        mainContainer.style.justifyContent = "space-between";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.justifyContent = "space-between";
        };
    });

    //changeStyle(allButtons[5], "justifyContent: space-between");

    //7th button
    allButtons[6].addEventListener("click", function() {
        mainContainer.style.justifyContent = "space-around";
        
        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.justifyContent = "space-around";
        };
    });

    //changeStyle(allButtons[6], "justifyContent: space-around");


    //8th button
    allButtons[7].addEventListener("click", function() {
        mainContainer.style.justifyContent = "flex-end";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.justifyContent = "flex-end";
        };
    });

    //changeStyle(allButtons[7], "justifyContent: flex-end");


    //9th button
    allButtons[8].addEventListener("click", function() {
        mainContainer.style.alignItems = "stretch";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.alignItems = "stretch";
        };
    });

    //changeStyle(allButtons[8], "align-items: stretch");


    //10th button
    allButtons[9].addEventListener("click", function() {
        mainContainer.style.alignItems = "flex-start";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.alignItems = "flex-start";
        };
    });

    //changeStyle(allButtons[9], "align-items: flex-start");


    //11th button
    allButtons[10].addEventListener("click", function() {
        mainContainer.style.alignItems = "center";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.alignItems = "center";
        };
    });

    //changeStyle(allButtons[10], "align-items: center");


    //12th button
    allButtons[11].addEventListener("click", function() {
        mainContainer.style.alignItems = "flex-end";

        for (var i = 0; i < innerContainers.length; i++) {
            innerContainers[i].style.alignItems = "flex-end";
        };
    });

    // changeStyle(allButtons[11], "align-items: flex-end");

    function changeStyle(button, value) {
        button.addEventListener("click", function() {
            mainContainer.setAttribute("style", value);
            
            for (var i = 0; i < innerContainers.length; i++) {
                innerContainers[i].setAttribute("style", value);
            };
        });
    }
});


