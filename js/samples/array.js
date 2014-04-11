//UTILIZZO ARRAY IN JAVASCRIPT
var arr = ['a', 'b', 'c'];	//Array Literal
console.log(arr.length); 	//=max(indice+1) , viene mantenuta in automatico ed è read-only!

//Come aggiungere elementi
arr[arr.length] = 'd';	
arr.push('e');
console.log(arr.length); //5

//Come eliminare elementi
arr[2] = undefined; //così annullo un elemento ma NON lo elimina -> ho un Array Sparso!
//anche se uso 	delete a[4];  
console.log(arr.length + '> ' + arr); //5> a,b,,d,e

//Per eliminare un elemento usare splice(fromIndex, howMany, ?addItm1, ?addItm2, ...); 
arr.splice(2,1);	//SLICE ALTERA ARRAY
console.log(arr.length + '> ' + arr); //4> a,b,d,e

//ATTENZIONE: splice <> slice	slice(fromIndex, ?toIndex);
var dup = arr.slice(2,2);	//SLICE ESTRA UNA COPIA (NUOVO ARRAY), MA NON ALTERA QUELLO INIZIALE
console.log(dup.length + '> ' + dup); //2> d,e
console.log(arr.length + '> ' + arr); //4> a,b,d,e

//ATTENZIONE AD UTILIZZARE IL COSTRUTTORE new Array(...) CAMBIA RISULTATO IN BASE AL TIPO/NUMERO PARAMETRI PASSATO!!!
var a = new Array(10);	//n intero>0 E' LA DIMENSIONE dell'array
var b = new Array(-2);  //n intero<0 o anche se decimale ECCEZIONE RangeError!!!
var d = new Array("5"); //stringa numerica NON fà coercizione, NON E' LA DIMENSIONE!!! è inserito come elemento
var c = new Array(1,2,-3,4); //elementi dell'array NON LE DIMENSIONI!!!

XE.showJSON(true);
a.xè('a');
c.xè('c');
d.xè('d');


//ELENCO DI TUTTI I METODI PER MANIPOLARE ARRAY
XE.showMethods(true);
arr.xè();