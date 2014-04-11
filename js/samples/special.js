//METODI PRESENTI NEL PROTOTYPE DI ALCUNI SPECIAL OBJECT
XE.showMethods(true);
(new Date()).xè();    //Date.prototype;
[1,2,3].xè();         //Array.prototype;
(/d+/gi).xè();        //RegExp.prototype;

//ALTRI ESEMPI...
Math.xè("Math");      //Math built-in;

XE.showData(true);    //Mostro le proprietà di una funzione!!
(function fn(x,y){return x+y;}).xè("proprietà di fn");
Math.xè("Math constant"); //Costanti in Math come proprietà!!