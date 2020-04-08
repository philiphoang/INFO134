/**
 * Interface for education 
 * 
 * @param {String} url Link to the dataset  
 */
function EducationInterface(url) {
    this.dataset = url;

    this.getAllNames = function() {
        return names(this.dataset);
    };

    this.getIDs = function() {
        return ids(this.dataset, this.getAllNames());
    };

    this.getNameById = function(id) {
        return nameById(this.dataset, this.getAllNames(), id);
    }

    this.getEducation = function(level, year) {
        return education(this.dataset, this.getNames, level, year);
    }

    this.getEducationLevelBothGenderByNameAllYears = function(name, level) {
        return educationLevelBothGenderByNameAllYears(this.dataset, name, level);
    }

    this.getHigherEducationLongMenByMunicipality = function(name, year) {
        return higherEducationLongMenByMunicipality(this.dataset, name, year);
    }

    this.getHigherEducationLongWomenByMunicipality = function(year) {
        return higherEducationLongWomenByMunicipality(this.dataset, name, year);
    }

    this.getHigherEducationLongByMunicipality = function(name, gender, year) {
        return higherEducationLongByMunicipality(this.dataset, name, gender, year);
    }

    this.getAllEducationByMunicipalityIdAndYear = function(id, year) {
        return allEducationByMunicipalityIdAndYear(this.dataset, this.getAllNames(), id, year);
    }
    
    this.getHigherEducationLongBothGenderByNameAllYears = function(name) {
        return higherEducationLongBothGenderByNameAllYears(this.dataset, name);
    }

    this.getHigherEducationLongByGenderByName = function(name, gender) {
        return higherEducationLongByGenderByName(this.dataset, name, gender)
    }

    this.getHigherEducationBothGenderFromNameAllYears = function(name) {
        return higherEducationBothGenderFromNameAllYears(this.dataset, name)
    }

}

//Initialize interface for global use
var educationInterface = new EducationInterface();

//Read and parse URL, and give it to the interface
load(educationURL, educationInterface, function() { console.log(educationInterface)});