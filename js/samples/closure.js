﻿//CLOSURE SAMPLEfunction makeCounter(init) {  var cnt = init || 0;    //QUANDO ESEGUO makeCounter RITORNO LA FUNZIONE INTERNA showIncr  //CHE CATTURA NEL SUO CONTESTO (SCOPE) LA VARIABILE cnt  //DELLA FUNZIONE ESTERNA.     return function showIncr(msg) {    cnt +=1; //QUESTA E' UNA CLOSURE!    console.log(msg + cnt);  };}//GRAZIE ALLA CLOSURE LA FUNZIONE showIncr CHE E' RITORNATA E MEMORIZZATA IN c1 e c2//MANTIENE IL SUO CONTESTO DI ESECUZIONE (PRIVATO) E PUO' CONTINUARE AD INCREMENTARE//IL CONTATORE cnt IN MODO INDIPENDENTE!var c1 = makeCounter();c1('c1= ');	//c1= 1c1('c1= '); //c1= 2var c2 = makeCounter(5);c1('c1= '); //c1= 3c2('c2= '); //c2= 6c1('c1= '); //c1= 4c2('c2= '); //c2= 7c2('c2= '); //c2= 8c1('c1= '); //c2= 5