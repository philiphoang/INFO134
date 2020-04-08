/**
 * Interface for employement 
 * 
 * @param {String} url Link to the dataset  
 */
function EmployedInterface(dataset) {
    this.dataset = dataset;

    this.getNames = function() {
        return names(this.dataset);
    };

    this.getIDs = function() {
        return ids(this.dataset, this.getNames());
    };

    this.getEmployedStatsMenn = function(year) {
        return employedStats(this.dataset, this.getNames(), "Menn", year);
    };

    this.getEmployedStatsByMunicipalityByYear = function(name, gender, year) {
        return employedStatsByMunicipalityByYear(this.dataset, name, gender, year);
    };

    this.getEmployedStatsByNameAllYears = function(name, gender) {
        return employedstatsByNameAllYears(this.dataset, name, gender)
    }

}

//Initialize interface for global use
var employedInterface = new EmployedInterface();

//Read and parse URL, and give it to the interface
load(employedURL, employedInterface, function() { console.log(employedInterface)});