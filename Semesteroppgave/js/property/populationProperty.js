function popnames(data) {
    var list = [];
    for (var x in data.elementer) {
        list.push(x);
    }

    return list;
}

function ids(data, names) {
    var list = []

    var i;
    for (i = 0; i < names.length; i++) {
        list.push(data.elementer[names[i]].kommunenummer)
    }

    return list;
}

function populationfigure(data, names, gender, year) {
    var list = []

    var i;
    for (i = 0; i < names.length; i++) {
        list.push(data.elementer[names[i]][gender][year]);
    }

    return list
}

function populationFigureBothGenderFromMunicipalityAllYears(data, name) {
    var list = [];

    var men = data.elementer[name]["Menn"];
    var women = data.elementer[name]["Kvinner"];

    list.push(men); list.push(women);
    return list;
}

function populationFromGenderFromMunicipalityAllYears(data, name, gender) {
    if (gender == "Menn")
        return populationFigureBothGenderFromMunicipalityAllYears(data, name)[0];
    else if (gender == "Kvinner")
        return populationFigureBothGenderFromMunicipalityAllYears(data, name)[1];
}

function populationBothGenderFromNameAllYears(data, name) {
    var obj = {}
    var men = data.elementer[name]["Menn"];
    var women = data.elementer[name]["Kvinner"];

    for (x in men) {
        obj[x] = men[x] + women[x]
    }

    return obj;
}

//Lag en funksjon som tar alle data opptil et viss år 