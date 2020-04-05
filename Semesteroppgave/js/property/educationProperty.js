function eduAllNames(data) {
    var list = [];
    for (var x in data.elementer) { 
        list.push(x);
    }
    return list;
}

function eduNamesExcept2017(data) {
    var list = [];
    for (var x in data.elementer) { 
        //Fix this shit, remove municipality with 2017
        x = x.replace(/ *\(-2017*\) */g, '');
        list.push(x);
    }
    return list;
}

function eduIds(data, names) {
    var list = [];

    var i;
    for (i = 0; i < names.length; i++) {
        list.push(data.elementer[names[i]].kommunenummer)
    }

    return list;
}

function nameById(data, names, id) {
    for (i = 0; i < names.length; i++) {
        if (data.elementer[names[i]].kommunenummer == id) {
            return names[i];
        }
    }
}

function education(data, names, level, year) {
    var list = [];

    return list;
}

function higherEducationLongBothGenderByNameAllYears(data, name) {
    var list = [];

    var men = data.elementer[name]["04a"]["Menn"];
    var women = data.elementer[name]["04a"]["Kvinner"];

    list.push(men); list.push(women);

    return list;
}

function higherEducationLongByGenderByName(data, name, gender) {
    if (gender == "Menn")
        return higherEducationLongBothGenderByNameAllYears(data, name)[0];
    else if (gender == "Kvinner")
        return higherEducationLongBothGenderByNameAllYears(data, name)[1];
}

function higherEducationLongByMunicipality(data, name, gender, year) {
    return data.elementer[name]["04a"][gender][year];
}

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


function higherEducationBothGenderFromNameAllYears(data, name) {
    var obj = {}
    var men = data.elementer[name]["04a"]["Menn"];
    var women = data.elementer[name]["04a"]["Kvinner"];

    for (x in men) {
        obj[x] = (men[x] + women[x])/2
    }

    return obj;
}




