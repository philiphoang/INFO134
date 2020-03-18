//skriv ut personen
var p = constructPerson("Per", "Nielsen");
console.log(p.name());

//skriv ut verbet
console.log("... owns ...");

//skriv ut bilen 
var c = constructCar("ST", 12345);
console.log(c.regnr());


//2.f)
var pA = new PersonA("Philip", "Hoang");
console.log(pA.name());

console.log("... owns ...");

var cA = new CarA("EL", 54321);
console.log(cA.regnr());


//2.g)
var pB = new PersonB("Thao", "Hoang");
console.log(pB.name());

console.log("... owns ...");

var cB = new CarB("XY", 67890);
console.log(cB.regnr());
