function eduNames(data) {
    var list = [];
    for (var x in data.elementer) { 
        //Fix this shit 
        x = x.replace(/ *\(-2017*\) */g, '');
        list.push(x);
    }
    return list;
}

function eduIds(data) {
    var list = [];
    var names = data.elementer;

    for (var i = 0; i < names.length; i++) {
        list.push(data.elementer[names[i]].kommunenummer)
    }

    return list;
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
    // console.log(data.elementer[name])
    return data.elementer[name]["04a"][gender][year];

}



