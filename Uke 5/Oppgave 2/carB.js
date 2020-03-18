function CarB(letters, numbers) {
    this.letters = letters;
    this.numbers = numbers;
}

CarB.prototype.regnr = function() {
    return this.letters + this.numbers;
}