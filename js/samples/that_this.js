//CLOSURE  var that=this  - UTILE PER CATTURARE IL CONTESTO (this) PER UNA SUCCESSIVO UTILIZZO IN UNA CHIAMA ASINCRONA (callback)
var Obj = {
    name: "Pippo",
    greet: function() {
        console.log("Ciao " + this.name);
    },
    //voglio scrivere una funzione che saluta dopo n secondi
    later: function(time) {
        //var THAT = this; //DECCOMENTARE PER STEP-3!!! //CLOSURE CHE CATTURA this PER SUCCESSIVO UTILIZZO NELLA CALLBACK!
        setTimeout(
            //STEP-0: Quando JS (passati gli n sec) CHIAMA greet
            this.greet //LA CHIAMA, MA NON HO PIU' this CORRETTO PER ACCEDERE A this.name!!!
            
            //STEP-1: Provo a usare greet.call(this)             
            //this.greet.call(this) //PECCATO CHE COSI' STO INVOCANDO SUBITO NON ASPETTO NIETE!!!
            
            //STEP-2: Provo a fare una funzione che chiama greet.call(this)    
            //CONCETTUALMENTE E' GIUSTA MA SONO RICADUTO NEL PROBLEMA DEL THIS
            //function() { console.error('dopo ' + time +'sec'); this.greet.call(this); } 
            
            //STEP-3: SOLUZIONE USO UNA CLOSURE SU THAT
            //function() { console.log('FINALMENTE DOPO ' + time + 'sec'); THAT.greet.call(THAT); }
            
            //STEP-4: QUESTO ERA IL CONTESTO PERFETTO PER LA .bind(this); ma volevo mostrae le Closure
            //this.greet.bind(this)            
            ,time * 1000);
        console.warn('Attendi ' + time + 'sec...');        
    }
};

//TEST
Obj.later(5);