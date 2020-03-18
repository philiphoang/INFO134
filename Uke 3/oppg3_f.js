var protoSpesPerson = protoPerson.prototype

protoSpesPerson.alder = function() {
    return 2018 - this.født;
}

var elizabeth = {
    p: person("Elizabeth", "II"),
    født: 1926
}

console.log(elizabeth.alder)