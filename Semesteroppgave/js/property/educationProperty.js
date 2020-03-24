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

function higherEducationLongMenByMunicipality(data, name, year) {
    return data.elementer[name]["04a"]["Menn"][year];
}

function higherEducationLongWomenByMunicipality(data, name, year) {
    return data.elementer[name]["04a"]["Kvinner"][year];

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



