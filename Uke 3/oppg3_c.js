//3.a)
var protoPerson = {
    fornavn: "",
    etternavn: "",
    get navn() {
        return this.fornavn + " " + this.etternavn
    }
}

console.log(protoPerson.navn)


//3.b)
var ola = Object.create(protoPerson)
ola.fornavn = "Ola"
ola.etternavn = "Nielsen"

console.log(ola.navn)


//3.c)
function person(fornavn, etternavn) {
    var p = Object.create(protoPerson)
    p.fornavn = fornavn
    p.etternavn = etternavn
    return p
}

var familie = {
    ola: person("Ola", "Nielsen"),
    kari: person("Kari", "Nielsen"),
    mor: person("Mor", "Nielsen"),
    far: person("Far", "Nielsen")
}

for (var nøkkel in familie) {
    var verdi = familie[nøkkel];
    console.log(verdi.navn);
}
    
//3.d) 
//Oppretter en funksjon til protoPerson med navn hils
protoPerson.hils = function() {
    console.log("Hei, " + this.navn + "!")
}

familie.ola.hils()