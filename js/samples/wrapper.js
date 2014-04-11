//MOSTRA TUTTI I METODI PRESENTI NEL WRAPPER DEI PRIMITIVE TYPES
XE.showMethods(true);
var n=123, s='ciao', b=false;

n.xè('n'); //Number.prototype
s.xè('s'); //String.prototype

XE.showMethods(true,true); //deep fino ad Object
b.xè('b'); //Boolean.prototype --> Object.prototype