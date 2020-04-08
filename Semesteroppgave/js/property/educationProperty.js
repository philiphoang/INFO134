/**
 * Find municipality name by its id 
 * @param {Object} data Object with multiple values inside it
 * @param {Object} names Object with municipalities name
 * @param {Strinf} id Municipality id
 * 
 * @return municipality name 
 */
function nameById(data, names, id) {
    for (i = 0; i < names.length; i++) 
        if (data.elementer[names[i]].kommunenummer == id) 
            return names[i];
}

/**
 * Find data for specified education for both gender for all years 
 * 
 * @param {Object} data Object with multiple values inside it
 * @param {String} name Municipality name. 
 * @param {String} level Education level. 
 * 
 * @return one list with two list inside it (one data for men, the other for women)
 */
function educationLevelBothGenderByNameAllYears(data, name, level) {
    var list = [];
    var men = data.elementer[name][level]["Menn"];
    var women = data.elementer[name][level]["Kvinner"];

    list.push(men); list.push(women);

    return list;
}


/**
 * Find data for higher (long) education for both gender for all years 
 * 
 * @param {Object} data Object with multiple values inside it 
 * @param {String} name Municipality name
 * 
 * @return one list with two list inside it (one data for men, the other for women)
 */
function higherEducationLongBothGenderByNameAllYears(data, name) {
    var list = [];
    var men = data.elementer[name]["04a"]["Menn"];
    var women = data.elementer[name]["04a"]["Kvinner"];

    list.push(men); list.push(women);

    return list;
}

/**
 * Find data for higher education for a given gender for all years 
 * Calls the higherEducationLongBothGenderByNameAllYears()
 * 
 * @param {Object} data Object with multiple values inside it
 * @param {String} name Municipality name 
 * @param {String} gender Gender
 * 
 * @return a list for a gender with corresponding education data 
 */
function higherEducationLongByGenderByName(data, name, gender) {
    if (gender == "Menn")
        return higherEducationLongBothGenderByNameAllYears(data, name)[0];
    else if (gender == "Kvinner")
        return higherEducationLongBothGenderByNameAllYears(data, name)[1];
}

/**
 * Find data for higher education (long) for given municipality by giving it the corresponding parameters
 *
 * @param {Object} data Object with multiple values inside it
 * @param {String} name Municipality name  
 * @param {String} gender Gender
 * @param {String} year Year
 * 
 * @return the education stat for given municipality, gender and year
 */
function higherEducationLongByMunicipality(data, name, gender, year) {
    return data.elementer[name]["04a"][gender][year];
}


/**
 * Find all education by giving it an id and a specific year
 * 
 * @param {Object} data Object with multiple values inside it
 * @param {String} name Municipality name  
 * @param {String} id Municipality id
 * @param {String} year Year
 * 
 * @return a list for all education data for a specific year
 */
function allEducationByMunicipalityIdAndYear(data, names, id, year) {
    var list = [];
    var listMen = [];
    var listWomen = []

    for (var i = 0; i < names.length; i++) {
        if (data.elementer[names[i]].kommunenummer == id) {
            for (var level in data.elementer[names[i]]) {
                if (level !== "kommunenummer") {
                    listMen.push(data.elementer[names[i]][level]["Menn"][year]);
                    listWomen.push(data.elementer[names[i]][level]["Kvinner"][year]);
                } 
            }
        }
    }
    list.push(listMen); list.push(listWomen);
    return list;
}


/**
 * Calculate the average by taking education data from both gender all years 
 * 
 * @param {Object} data Object with multiple values inside it.  
 * @param {String} name Municipality name 
 * 
 * @return a object with the average percent for both gender and its corresponding year
 */
function higherEducationBothGenderFromNameAllYears(data, name) {
    var obj = {}
    var men = data.elementer[name]["04a"]["Menn"];
    var women = data.elementer[name]["04a"]["Kvinner"];

    for (x in men) 
        obj[x] = (men[x] + women[x])/2

    return obj;
}