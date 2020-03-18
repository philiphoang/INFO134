//Object
var message = {
    text : "Hello World!",
    greet : function() {
        console.log(this.text);
    },
    btn : document.getElementById("button"),
    button : function() {
        if (message.btn === null) {
            var newButton = document.createElement("button");
            newButton.setAttribute("id", "button");
            newButton.setAttribute("onclick", "message.greet();"); //HTML attribute
            newButton.innerHTML = "Click me";
            document.getElementById("3c").appendChild(newButton);
            message.btn = newButton;
            return message.btn;
        }
        else {
            console.log("Already defined");
            return message.btn;
        }
    }
};

window.onload = function() {
    var b1 = document.getElementById("b1");
    b1.onclick = function() {
        console.log(message.greet());
    };
};

