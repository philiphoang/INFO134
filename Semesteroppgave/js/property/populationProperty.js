function names(data) {
    var list = []
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