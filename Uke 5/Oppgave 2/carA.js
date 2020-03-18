function CarA(letters, numbers) {
    this.letters = letters;
    this.numbers = numbers;
}

CarA.prototype = {
    regnr: function() {
        return this.letters + this.numbers;
    }
};
