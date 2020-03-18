function test(obj) {
    var objectToInspect;     
	var result = [];
	
	for(var objectToInspect = obj; objectToInspect !== null; 
           objectToInspect = Object.getPrototypeOf(objectToInspect)) {  
        result = result.concat(
            Object.getOwnPropertyNames(objectToInspect)
        );  
    }
	
	return result; 
}

function beskriv(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        console.log("Bilen finnes");
    } 

    var s = "Bilen ";
    if ('farge' in obj) {
        s = "Den " + obj.farge + " bilen ";
    }

    if ('regNr' in obj) {
        s += "har registreringsnummer " + obj.regNr;
        if ('eier' in obj) {
            s += "og eies av " + obj.eier;
        }
    }
    else if ('eier' in obj) {
        s += "tilhører " + obj.eier;
    }
    
    console.log(s);

}


console.log(test({}));

beskriv({});

beskriv({eier: "Per"});

beskriv({eier: "Per", farge: "blå"});

beskriv({eier: "Per" , farge: "blå", regNr: "ST12345"});

beskriv({eier: "Per", regNr: "ST12345"})

beskriv({regNr: "ST12345"})