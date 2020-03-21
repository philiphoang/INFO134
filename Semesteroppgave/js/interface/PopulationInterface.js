function PopulationInterface(dataset) {
    this.dataset = dataset;

    this.getNames = function () {
        return names(this.dataset);
    };

    this.getIDs = function () {
        return ids(this.dataset, this.getNames());
    };

    this.getPopuluationFigureMen = function (year) {
        return populationfigure(this.dataset, this.getNames(), "Menn", year);
    }

    this.getPopuluationFigureWomen = function (year) {
        return populationfigure(this.dataset, this.getNames(), "Kvinner", year);
    }
};
