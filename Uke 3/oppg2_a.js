//2.a) 
var o1 = {
    bokstaver: "EL", 
    tall: 12345
}

//2.b)
console.log(o1)


//2.c) 
o1.bokstaver = "ST" //Ved punktum-notasjon
o1["tall"] = 23456 //Ved firkantparanteser

console.log(o1)


//2.d) 
var o2 = {
    bokstaver: "EL",
    tall: 12345,
    regNr: "",

    get getRegNr() {
        return this.regNr
    }
}

console.log(o2.regNr)


//2.e) 
var p = {
    fornavn: "Philip", 
    etternavn: "Hoang",

    get navn() {
        return this.fornavn + " " + this.etternavn 
    }
}


console.log(p.navn)


//2.f)
var fam = [
    p1 = {
        fornavn: "A",
        etternavn: "a",
        get navn() {
            return this.fornavn + " " + this.etternavn 
        }
    },
    p2 = {
        fornavn: "B",
        etternavn: "b",
        get navn() {
            return this.fornavn + " " + this.etternavn 
        }
    },
    p3 = {
        fornavn: "C",
        etternavn: "c",
        get navn() {
            return this.fornavn + " " + this.etternavn 
        }
    }

]

//???
var person; 
for (person in fam) {
    console.log(person.navn)
}

//Alternative
for (i = 0; i < fam.length; i++) {
    console.log(fam[i].navn)
}

//console.log(fam[0].navn)
//console.log(fam[1].navn)