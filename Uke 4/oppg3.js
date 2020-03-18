//3.a)
var anum = 0;

function a() {
    if (anum % 2 == 0) {
        anum += 1;
    }
    console.log("Last number: " + anum);

    console.log("Curent number: " + (++anum + 1));
}

a();
a();
console.log("-------------------");

//3.b) 
var bnum = 0;
function b(t) {
    if (t !== undefined) {
        bnum = t;
    }
    console.log("Last number: " + bnum);

    console.log("Curent number: " + (++bnum));
}

b();
b(4);
console.log("-------------------");

//3.c) 
/*
function counterFunction() {
    this.counter = 0; //Next number that should be printed out
    this.step = 1; //How much counter should increase with
    this.limit = 0; //How much counter can increase too
    this.loop = false; //Either infinite or 

};

//3.d) 
function makeCounter(limit, counter, step, loop) {
    var climit = counterFunction.prototype.limit;
    var ccounter = counterFunction.prototype.counter;
    var cstep = counterFunction.prototype.step;
    var cloop = counterFunction.prototype.loop = loop;;
    climit = limit;  

    if (counter !== undefined) {
        ccounter = counter;
    };

    if (step !== undefined) {
        counterFunction.prototype.step = step;
    };

    if (loop !== undefined) {
        cloop = loop;
    };

    if (ccounter <= cloop) {
        ccounter += cstep;
        console.log(ccounter);
    }
    else if (ccounter > cloop) {
        if (ccounter > climit) {
            cstep = 0;
        }
        if (climit === 'false') {
            ccounter = undefined;
        }
    }

    return counterFunction;
};

c = makeCounter(3);
c();
c();
*/

function counterFunction() {
    if (typeof counterFunction.limit == 'undefined') {
        counterFunction.limit = 0;
    }

    if (typeof counterFunction.counter == 'undefined') {
        counterFunction.counter = 0;
    }

    if (typeof counterFunction.step == 'undefined') {
        counterFunction.step = 1;
    } 

    if (typeof counterFunction.loop == 'undefined') {
        counterFunction.loop = true;
    } 

    if (counterFunction.counter < counterFunction.limit) {
        console.log(counterFunction.counter);
        counterFunction.counter += counterFunction.step
    } 
    else if (counterFunction.loop === false) {
        counterFunction.counter = 'undefined';
        console.log(counterFunction.counter);
    }
    else {
        counterFunction.counter = 0;
        console.log(counterFunction.counter);
    }
}

    


function makeCounter(limit = 1 , counter, step, loop) {
    counterFunction.limit = limit;

    if (counter !== 'undefined') {
        counterFunction.counter = counter;
    }

    if (step !== 'undefined') {
        counterFunction.step = step;
    }

    if (loop !== 'undefined') {
        counterFunction.loop = loop;
    }

    return counterFunction;
}

var c = makeCounter(3);

c();
c();
c();
c();
console.log("-------------------");

var c = makeCounter(10, 1, 4, false);

c();
c();
c();
c();
c();