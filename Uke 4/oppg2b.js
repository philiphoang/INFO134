function strangeEven(list, n, func) {
    var result = [];
    if (n === undefined) { //Missing second parameter
        for (var i = 0; i < list.length; i++) {
            if (list[i] % 2 === 0) {
                result.push(list[i]);
            }
        }
    }
    else if (func === undefined) { //Missing third paramater
        if (n > list.length) {
            n = list.length;
        }
    
        var i = 0;
        var counter = 0;
        while (counter < n) {
            if (list[i] % 2 === 0) {
                result.push(list[i]);
                counter++;
            }
            i++;

            if (result.length > n) {
                break;
            }
        }

    }
    else { //All parameters given 
        var newList = strangeEven(list, n);
        var anotherList = [];
        for (var i = 0; i < newList.length; i++) {
            var num = func(newList[i]);
            console.log(num);
            anotherList.push(num);
        }
        result = anotherList;
    }
    return result;
};

var list = [1, 2, 3, 4, 5, 6]

console.log(strangeEven(list));

console.log(strangeEven(list, 2));

//console.log(strangeEven(list, 100));

console.log(strangeEven(list, 2, function (n) { return n-1;}));