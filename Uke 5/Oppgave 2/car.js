function constructCar(letters, numbers) {
    var newObject = Object.create(constructCar.prototype);
    newObject.letters = letters;
    newObject.numbers = numbers;
    return newObject;
}

// NEW 2.e)
constructCar.prototype.regnr = function() {
    return this.letters + this.numbers;
}


/* OLD 2.a)
var methods = {
    regnr: function() {
        return this.letters + this.numbers;
    }
}
*/