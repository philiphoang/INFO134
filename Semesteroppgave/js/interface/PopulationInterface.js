/**
 * Interface for population 
 * 
 * @param {String} url Link to the dataset  
 */
function PopulationInterface(url) {
    this.dataset = url;

    this.getNames = function () {
        return names(this.dataset);
    };

    this.getIDs = function () {
        return ids(this.dataset, this.getNames());
    };

    this.getPopuluationFigureMen = function (year) {
        return populationFigure(this.dataset, this.getNames(), "Menn", year);
    }

    this.getPopuluationFigureWomen = function (year) {
        return populationfigure(this.dataset, this.getNames(), "Kvinner", year);
    }

    this.getPopulationFigureBothGenderFromMunicipalityAllYears = function (name) {
        return populationFigureBothGenderFromMunicipalityAllYears(this.dataset, name);
    }

    this.getPopulationFromGenderFromMunicipalityAllYears = function(name, gender) {
        return populationFromGenderFromMunicipalityAllYears(this.dataset, name, gender)
    }

    this.getPopulationBothGenderFromNameAllYears = function(name) {
        return populationBothGenderFromNameAllYears(this.dataset, name);
    }

};

//Initialize interface for global use
var populationInterface = new PopulationInterface();

//Read and parse URL, and give it to the interface
load(populationURL, populationInterface, function() { console.log(populationInterface)});
