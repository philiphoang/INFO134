//1.a)
var p1 = {
    firstname: "Philip",
    lastname: "Hoang"
}

var p2 = {
    firstname: "Thao",
    lastname: "Hoang"
}

var fam = [p1, p2];

for (var personID in fam) {
    var personObj = fam[personID];
    console.log(personObj.firstname);
}

var numbers = [0, 1, 2, 3, 4, 6];
for (var i in numbers) {
    console.log(numbers[i]);
}

//1.b)
var list1 = [
    [1, 2],
    [3, 4],
    [5, 6],
];

for (var i in list1) {
    var n0 = list1[i][0];
    var n1 = list1[i][1];
    console.log(n0 + " + " + n1 + " = " + (n0 + n1));
}

var list2 = [
    [1, 1],
    [1, 2],
    [2, 3],
    [3, 5],
    [5, 8],
    [8, 13]
]


for (var i in list2) {
    var n0 = list2[i][0];
    var n1 = list2[i][1];
    console.log(n0 + " + " + n1 + " = " + (n0 + n1));
}

//1.c)
var i = 0; 
console.log("length list:" + list1.length)
while(i < list1.length) {
    var n0 = list1[i][0];
    var n1 = list1[i][1];
    console.log(n0 + " + " + n1 + " = " + (n0 + n1));
    i++;
}


//1.d)
for (var i = 0; i < list2.length; i++) {
    var n0 = list2[i][0];
    var n1 = list2[i][1];
    console.log(n0 + " + " + n1 + " = " + (n0 + n1));
}