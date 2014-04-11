// Object Literal
var myObject = {
    a: 1,
    b: 2,
    c: 3,
};

//GETTER
console.log(myObject.a); 
console.log(myObject["A"]); //undefined //JS E' CASE SENSITIVE!

//SETTER
myObject.a = 123;
myObject["b"] = false; //cambio tipo

reflectionPrint(myObject); //REFLECTION: elenca tutti i membri con for(k in obj) //NOTA: percorre anche Property-chain

//ADD
myObject.x = 'nuova proprieta';
if ("x" in myObject) { console.log("ok aggiunta"); } //REFLECTION: test esistenza membro con if ("exp" in obj) //NOTA: controlla su tutta Prototype-chain

//DELETE
myObject["c"] = undefined; //sbianca
if (myObject.hasOwnProperty("c")) { console.log("esiste ancora"); } //REFLECTION: Controllo solo membri diretti
delete myObject.c; //elimina completamente
console.log(JSON.stringify(myObject)); //REFLECTION "alternativa"

function reflectionPrint(obj) {	
    for (var k in obj) {
        console.log(k + " = " + obj[k]);      
    }
}

//BASTARDATA
//myObject.hasOwnProperty = function() { return false; };
//if (Object.prototype.hasOwnProperty.call(obj,k)) { //CORRETTA SEMPRE!

