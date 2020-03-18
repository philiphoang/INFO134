function PersonB(first, last) {
    this.first = first;
    this.last = last;
}

PersonB.prototype.name = function() {
    return this.first + " " + this.last;
}