function EmployedInterface(dataset) {
    this.dataset = dataset;

    this.getNames = function() {return names(this.dataset)};
    this.getIDs = function() {return ids(this.dataset, this.getNames())};
    this.getEmployedStatsMenn = function(year) {return employedStats(this.dataset, this.getNames(), "Menn", year)};
    this.getEmployedStatsByMunicipality = function(name, gender, year) {return employedStatsByMunicipality(this.dataset, name, gender, year)}
}
