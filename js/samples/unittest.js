XE.showJSON(true);


//UNIT-TEST
console.warn('--- UNDEFINED + NULL ---');
Object.prototype.xè.call(undefined);
Object.prototype.xè.call(null);
console.warn('--- PRIMITIVE TYPES ---');
true.xè();
1..xè();
'ciao'.xè();
console.warn('--- SPECIAL OBJECTS ---');
new Date().xè();
/d+/gi.xè();
[1,2,'a',false].xè();
var f = function (x,y){return x+y};
f.xè("F");
console.warn('--- OBJECT LITERALS ---');
({baz: 'bar', foo: function() { return this.baz; }}).xè();
var base={
  f: f,
  a: 123,
  b: true,  
  c: { s: 'ciao' , n: null, w: ['x','y','z'] },  
  u: undefined
};
base.xè("base");
console.warn('--- INHERITS OBJECT ---');
var ext = Object.create(base);
ext.a = 456;
ext.add = 'new prop';
ext.m = function(p) {return console.log(this.id + p||'')};
ext.c.s = "changed pippo";
ext.c.n = f;
ext.c.w.push('pushed');
ext.xè("ext");
console.error("!!! modificato solo base.c --> Nested Object BYREF!!!");
base.xè();
console.warn('--- CLASSICAL MODEL ---');
function Base(value) {
  this._val = value;
};
Base.prototype.get = function fn() {
  return this._val;
};

function Ext(value) {
  Base.call(this,value);
  this.now = new Date();
}
//Imposto Prototype-chain per ereditarietà
Ext.prototype = Object.create(Base.prototype);
Ext.prototype.constructor = Ext;

Ext.prototype.get = function fnOverride() {
  return Base.prototype.get.call(this) + ' alle ' + this.now;
};
Ext.prototype.all = function() {
  return {v: this._val, t: this.now};
};
(new Base(123)).xè('BASE');
(new Ext('ciao')).xè('EXT');
console.warn('--- WRAPPER METHODS ---');
Number.xè();
String.xè();
Array.xè();
Function.xè();
RegExp.xè();
Math.xè();