function EducationInterface(dataset) {
    this.dataset = dataset;

    this.getNames = function () {
        return eduNames(this.dataset);
    };

    this.getIDs = function () {
        return eduIds(this.dataset);
    };

    this.getEducation = function(level, year) {
        return education(this.dataset, this.getNames, level, year);
    }

    this.getHigherEducationLongMenByMunicipality = function(name, year) {
        return higherEducationLongMenByMunicipality(this.dataset, name, year)
    }

    this.getHigherEducationLongWomenByMunicipality = function(year) {
        return higherEducationLongWomenByMunicipality(this.dataset, name, year)
    }

    this.getHigherEducationLongByMunicipality = function(name, gender, year) {
        return higherEducationLongByMunicipality(this.dataset, name, gender, year)
    }

}

// "01": "Grunnskolenivå",
// "02a": "Videregående skole-nivå",
// "11": "Fagskolenivå",
// "03a": "Universitets- og høgskolenivå kort",
// "04a": "Universitets- og høgskolenivå lang",
// "09a": "Uoppgitt eller ingen fullført utdanning"