/* 1.a) 
1. variable i 
2. function f() returns i 
3. No function are similar to f()

Output: Array window has i items where each item name starts
with "f" and a number. 
Each item has the function f. 
*/

var i = 0;
while (i < 3) {
    function f() {
        return i;
    }
    window["f" + i] = f;
    i++;
}
i = 0;

/* 1.b)
1. function example(), variable i
2. function f() returns i
3. No functions are similiar to each other
*/

function example() {
    var i = 0;
    while (i < 3) {
        function f() {
            return i;
        }
        window["f" + i] = f;
        i++;
    }
    i = 0;
}

example();


/* 1.c)


*/

function example() {
    i = 0;
    while (i < 3) {
        function f() {
            return i;
        }
        window["f" + i] = f;
        i++;
    }
    i = 0;
}

example();


/* 1.d) 

*/

function example() {
    i = 0; 
    while (i < 3) {
        f = function() {
            return i;
        }
        window["f" + i] = f;
        i++;
    }
    i = 0;
}

example();


/* 1.e)

*/

function example() {
    i = 0;
    while (i < 3) {
        var f = function() {
            return i;
        }
        window["f" + i] = f;
        i++;
    }
    var i = 0;
}

example();