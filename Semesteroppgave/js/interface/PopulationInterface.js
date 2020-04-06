function PopulationInterface(dataset) {
    this.dataset = dataset;

    this.getNames = function () {
        return popnames(this.dataset);
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

    this.getPopulationFigureBothGenderFromMunicipalityAllYears = function (name) {
        return populationFigureBothGenderFromMunicipalityAllYears(this.dataset, name);
    }

    this.getPopulationFromGenderFromMunicipalityAllYears = function(name, gender) {
        return populationFromGenderFromMunicipalityAllYears(this.dataset, name, gender)
    }

    this.getPopulationBothGenderFromNameAllYears = function(name) {
        return populationBothGenderFromNameAllYears(this.dataset, name);
    }


    /* TODO:
    Lag en generell metode som henter ut al 
    Deretter, lag metoder som henter ut spesifik data fra denne generelle metoden

    getPopulationBothGenderAllYears() {
        return et objekt med to lister
    }


    bruk de tidligere metodene
    getPopulationBothGenderSingleYear(year)
        
    getPopulationMenAllYears()
        return 
    */
};
