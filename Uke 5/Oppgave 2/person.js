function constructPerson(first, last) {
    var newObject = Object.create(constructPerson.prototype);
    newObject.first = first;
    newObject.last = last;
    return newObject;
}

// NEW 2.e)
constructPerson.prototype.name = function() {
    return this.first + " " + this.last;
}

/* OLD 2.a)
var methods = {
    name: function() {
        return this.first + " " + this.last;
    }
}
*/