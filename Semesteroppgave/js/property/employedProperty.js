/**
 * Find employed stats for all municipalities by giving it the corresponding parameters
 * 
 * @param {Object} data Object with multiple values inside it.  
 * @param {Object} names Object with municipalities name.   
 * @param {String} gender Gender
 * @param {String} year Year
 * 
 * @return a list with employed stats for all municipalities for given year
 */
function employedStats(data, names, gender, year) {
    var list = [];
    for (var i = 0; i < names.length; i++) 
        list.push(data.elementer[names[i]][gender][year]);
    
    return list;
}

/**
 * Find stats for one year by giving it the correspond parameters
 * 
 * @param {Object} data Object with multiple values inside it.  
 * @param {Object} names Object with municipalities name.   
 * @param {String} gender Gender
 * @param {String} year Year
 * 
 * @return stats for the given gender and year for a municipality
 */
function employedStatsByMunicipalityByYear(data, name, gender, year) {
    return data.elementer[name][gender][year];
}

/**
 * Find stats for all years by giving it the correspond parameters
 * 
 * @param {Object} data Object with multiple values inside it.  
 * @param {Object} names Object with municipalities name.   
 * @param {String} gender Gender
 * 
 * @return a list of all stats for all years to a municipality 
 */
function employedstatsByNameAllYears(data, name, gender) {
    return data.elementer[name][gender];
}