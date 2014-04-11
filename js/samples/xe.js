window.XE = (function() {  
  // *** CALLBACK HELPERS ***// 
  function _showJSONfn(key,value) {
    return (typeof value === 'function') ? value.toString() : value;
  }
  
  function _onlyNotXE(prop) {    
    return !(typeof prop === 'function' && prop.name === 'xè');
  }
  
  function _onlyMethods(prop) {
    return (typeof prop === 'function' && prop.name !== 'xè');
  }
  
  // *** TEST OBJECT TYPE *** //
  
  function _isNothing(obj) {
    return (obj === undefined || obj === null);
  }
  
  function _isObject(obj) {    
    return (obj && typeof obj === 'object');
  }
        
  function _isPrimitive(obj) {
    switch (typeof obj) {
      case 'boolean': case 'number': case 'string': return true;
      default: return false;
    }
  }
  
  function _isFunction(obj) {
    return (obj && typeof obj === 'function');
  }

  function _getProto(obj) {    
    //return Object.getPrototypeOf(Object(obj)); //codice più conciso, ma ha overhead di generare un Object per far il boxing dei tipi primitivi
    if (obj === undefined || obj === null) return null;
    switch (typeof obj) {
      case 'boolean': return Boolean.prototype; 
      case 'number': return Number.prototype;
      case 'string': return String.prototype;
      case 'function' : return obj.prototype; //Function.prototype --> constructor
      case 'object' : return Object.getPrototypeOf(obj); //Object.prototype o altri oggetti specializzati (ex: Date.prototype, Array.prototype ... )
    }
  }
  
  function _getTypeName(obj) {
    if (obj === null) return "Null";
    switch (typeof obj) {
      case 'undefined': return "Undefined";
      case 'boolean': return "Boolean";
      case 'number': return "Number";
      case 'string': return "String";
      case 'function': return ((obj.name||"<???>") + "()");
      case 'object': 
        var proto = Object.getPrototypeOf(obj);
        return ((proto && proto.constructor) ? (proto.constructor.name||"<?__proto__.constructor?>") : "Object");
    }
  }
  
  function _getProtoName(obj) {
    if (obj === undefined || obj === null) return "";
    switch (typeof obj) {
      case 'boolean': return "Boolean.prototype";
      case 'number': return "Number.prototype";
      case 'string': return "String.prototype";
      case 'function': 
        return ((obj.name||"Function")+".prototype");
      case 'object': 
        var proto = Object.getPrototypeOf(obj);
        return ((proto && proto.constructor) ? (proto.constructor.name||"<?__proto__?>")+".prototype" : "Object");
    }
  }
  
  function _getProtoChain(obj,sep) {    
	sep = sep || ' > ';
    var chain = [];    
    var o = obj;
    chain.push(_getTypeName(obj));
    while (!_isNothing(o)) {        
        chain.push(_getProtoName(o));
        o = _getProto(o);
    } 
    return chain.join(sep);
  }
  
  // *** REFLECTION ***
  function _xè(obj, chain, prefix, space) {
    //Rappresentazione di default     xè :Tipo > Prototype-Chain = JSON(valore)
    chain = !!chain; //default false
    prefix = prefix || '';
    space = space || '';
    return ( prefix + (chain?_getProtoChain(obj):_getTypeName(obj)) + ' = ' + JSON.stringify(obj,_showJSONfn,space) );
  }
  
  function _treeForIn(obj, chain, only, invoke, prefix, print) {
    //FOR IN cicla automaticamente anche Prototype-Chain, ma mostra solo proprieta Enumerable (niente builtins)!!!
    chain = !!chain; //default false
    prefix = prefix || '';
    print = print || 'log';
    
    //Stampa la catena del Prototype-chain
    chain && console.warn(prefix + ' :' + _getProtoChain(obj));
    
    if (obj === undefined) {
      if (only(obj)) console[print](prefix + ' = undefined');        
    } else if (obj === null) {
      if (only(obj)) console[print](prefix + ' = null');
    } else if (only){
      switch (typeof obj) {
        case 'undefined': break;
        case 'boolean':        
        case 'number':
        case 'string':
          if (only(obj)) console[print](prefix + ' = ' + obj[invoke]());
          break;
        case 'function':
          if (only(obj)) console[print](prefix + ' = ' + obj[invoke]());
          break;
        case 'object':          
          console[print](prefix + "= " +((obj instanceof Array)?'[':'{'));
          for(var k in obj) {
            if (only(obj[k])) {
              _treeForIn(obj[k],chain,only,invoke, prefix+'  .'+k ,print);
            }
          }
          console[print](prefix + "  " +((obj instanceof Array)?']':'}'));
          break;        
      }
    }    
  }
  
  function _methods(obj,builtin,deep,source,prefix) {
    //uso Object.getOwnPropertyNames(obj) per ricavare tutte le proprieta' (anke quelle NON Enumerable) , pero' devo navigare a mano la Property-Chain navigando Object.getPrototypeOf(obj)
    builtin = !!builtin; //default false
    source = !!source; //default false
    deep = !!deep; //default false
    prefix = prefix || '';
    
    
    var proto = _getProto(obj);
    var own, i, k; 
    if (!(_isNothing(obj) || _isPrimitive(obj))) {      
      own = Object.getOwnPropertyNames(obj);
      for(i=0;i<own.length;i++) { k=own[i];
        if (_isFunction(obj[k]) && (builtin || obj.propertyIsEnumerable(k)) && k!=='prototype' && k !=='xè') {
          console[obj.propertyIsEnumerable(k)?'log':'warn'](prefix + '\t.' + k + '()' + (source?'\t='+obj[k].toSource():'\t#'+obj[k].length));
        } else if(deep && _isObject(obj[k]) && k!=='prototype') {
          obj[k].xè(prefix + '\t.'+k);
          //_methods(obj[k],builtin,deep,source,prefix + '\t.'+k);          
        }
      }
    }
    //Prototype-Chain
    if (proto && proto.constructor && proto.constructor !== obj ) {
      if ( deep || !(proto === Function.prototype || proto === Object.prototype)) {
        //console.error(prefix + "\t!<<ctor>>\t = " + _getTypeName(proto.constructor));
        //_methods(proto.constructor,builtin,deep,source,prefix + " ! "); //SONO I METODI STATIC - Non posso richiamarli da obj.func(); - Ma solo da TipoCtor.func();
        
        console.error(prefix + ' >\t__proto__\t = [[ ' + _getProtoName(obj) + ' ]]');
        _methods(proto,builtin,deep,source,prefix + ' >');
      }
    }
  }
  
  function _data(obj,builtin,prefix,print) {
    "use strict";
    //uso Object.getOwnPropertyNames(obj) per ricavare tutte le proprieta' (anke quelle NON Enumerable) , pero' devo navigare a mano la Property-Chain navigando Object.getPrototypeOf(obj)
    builtin = !!builtin; //default false
    prefix = prefix || '';
    print = print || 'log';
        
    var proto = _getProto(obj);
    var own, i, k; 
    if (_isNothing(obj)) {
      console[print](prefix + '\t= ' + obj + '\t<' + _getTypeName(obj) + '>'); //null or undefined
    } else if (_isPrimitive(obj)) {
      console[print](prefix + '\t= ' + obj + '\t<' + _getTypeName(obj) + '>'); //primitive values
    } else {
      //Constructor      
      if (proto && proto.constructor && proto.constructor !== obj ) {
        console.error(prefix + '\t!' + _getTypeName(proto.constructor) + '\t:= ' + obj.valueOf() + '\t<' + _getTypeName(obj) + '>');
        //_data(proto.constructor,false,prefix + " ! ",print); //SONO LE PROPRIETA' STATIC
      }
      //Elenco proprietà dell'oggetto + ricorsione se trovo sotto-oggetti complessi
      own = Object.getOwnPropertyNames(obj);      
      for(i=0;i<own.length;i++) { k=own[i];
        if (!_isFunction(obj[k]) && (builtin || obj.propertyIsEnumerable(k)) && k!=='prototype') {
          _data(obj[k],builtin,prefix+'\t.'+k,obj.propertyIsEnumerable(k)?'log':'warn');
        }
      }
      //Prototype-Chain
      if (proto && proto.constructor && proto.constructor !== obj ) {        
          console.error(prefix + "\t| __proto__\t= [[ " + _getProtoName(obj)+ " ]]");
          _data(proto,builtin,prefix + '\t| ',print);
      }      
    }    
  }
  
  return {
    showJSON: function(chain) {
      Object.prototype.xè = function xè(prefix) {
        "use strict";
        prefix = prefix || '';
        console.log(_xè(this,chain,prefix + ' xè :','\t'));
        console.log('\n');
      }
    },
    showProto: function(sep) {
      Object.prototype.xè = function xè(prefix) {
        "use strict";
        prefix = prefix || '';
        console.log(prefix + _getProtoChain(this,sep));
        console.log('\n');
      };      
    },
    showValue: function(chain) {
      Object.prototype.xè = function xè(prefix) {
        "use strict";
        _treeForIn(this,chain,_onlyNotXE,'valueOf',prefix,'log');
        console.log('\n');
      };      
    },
    showSource: function(chain) {
      Object.prototype.xè = function xè(prefix) {
        "use strict";
        _treeForIn(this,chain,_onlyMethods,'toSource',prefix,'warn');
        console.log('\n');
      };      
    },
    showMethods: function(builtin,deep,source) {
      Object.prototype.xè = function xè(prefix) {
        "use strict";
        prefix = prefix || '';
        console.log(_xè(this,false,prefix+' :',''));
        _methods(this,builtin,deep,source,prefix)
        console.log('\n');
      };
    },    
    showData: function(builtin) {
      Object.prototype.xè = function xè(prefix) {
        "use strict";
        _data(this,builtin,prefix,'log');
        console.log('\n');
      };
    },
    remove: function() {
      "use strict";
      delete Object.prototype.xè;
    }
    
  };
}());