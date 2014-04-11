/* CONVERSIONE TRA TIPI */
var b,n,s;
var str="...";
var exp = ...;
XE.showJSON();

//Conversione a BOOLEANO
b = Boolean(exp);    //Esplicita
b = !!exp;           //Implicita (!! doppia negazione)
b.xè();

//Conversione a NUMERICO
n = Number(exp);  //Esplicita
n = +exp;         //Implicita (+ usato come segno)
//Utilizzando di metodi espliciti da stringa a numero
n = parseInt(str, 10); //ricordarsi la BASE!
n = Number.parseFloat(str);
n.xè();

//Conversiona a STRINGA
s = String(exp); //Esplicita
s = ""+exp;      //Implicita (+ usato come concatenazione)
s.xè();