/**
 * Find population figure for all municipalities by giving it the corresponding parameters
 * 
 * @param {Object} data Object with multiple values inside it.  
 * @param {Object} names Object with municipalities name.   
 * @param {String} gender Gender
 * @param {String} year Year
 * 
 * @return a list with population figure for all municipalities for given year
 */
function populationFigure(data, names, gender, year) {
    var list = []
    for (var i = 0; i < names.length; i++) 
        list.push(data.elementer[names[i]][gender][year]); 

    return list;
}

/**
 * Find population figure of both for given municipality for both gender for all years
 * 
 * @param {Object} data Object with multiple values inside it.  
 * @param {String} name Municipality name 
 * 
 * @return one list with two list inside it (one for population for men, the other for women)
 */
function populationFigureBothGenderFromMunicipalityAllYears(data, name) {
    var list = [];

    var men = data.elementer[name]["Menn"];
    var women = data.elementer[name]["Kvinner"];

    list.push(men); list.push(women);
    return list;
}

/**
 * Find population figure for one specific gender by giving the function municipality name and gender
 * Will use populationFigureBothGenderFromMunicipalityAllYears() to get desired data
 * 
 * @param {Object} data Object with multiple values inside it.  
 * @param {String} name Municipality name 
 * @param {String} gender Gender
 * 
 * @return list with population figure for given gender 
 */
function populationFromGenderFromMunicipalityAllYears(data, name, gender) {
    if (gender == "Menn")
        return populationFigureBothGenderFromMunicipalityAllYears(data, name)[0];
    else if (gender == "Kvinner")
        return populationFigureBothGenderFromMunicipalityAllYears(data, name)[1];
}


/**
 * Calculate the sum by taking the population figure from both gender for all years and add them together. 
 * 
 * @param {Object} data Object with multiple values inside it.  
 * @param {String} name Municipality name 
 * 
 * @return a object with the sum of population for both gender and its corresponding year
 */
function populationBothGenderFromNameAllYears(data, name) {
    var obj = {}
    var men = populationFromGenderFromMunicipalityAllYears(data, name, "Menn");
    var women = populationFromGenderFromMunicipalityAllYears(data, name, "Kvinner");

    for (x in men) 
        obj[x] = men[x] + women[x]
    
    return obj;
}