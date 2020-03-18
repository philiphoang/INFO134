function PersonA(first, last) {
    this.first = first;
    this.last = last;
}

PersonA.prototype = {
    name: function() {
        return this.first + " " + this.last;
    }
};
