function EmployedInterface(dataset) {
    this.dataset = dataset;

    this.getNames = function() {
        return empNames(this.dataset);
    };

    this.getIDs = function() {
        return empIds(this.dataset, this.getNames());
    };

    this.getEmployedStatsMenn = function(year) {
        return employedStats(this.dataset, this.getNames(), "Menn", year);
    };

    this.getEmployedStatsByMunicipality = function(name, gender, year) {
        return employedStatsByMunicipality(this.dataset, name, gender, year);
    };
}
