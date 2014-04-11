//MONKEY-PATCHING: un modo per correggere o aumentare il linguaggio
if (typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1");
	};
}

if (!Number.prototype.trunc) { //codice difensivo per non ridefinire funzioni esistenti!
	Number.prototype.trunc = function trunc(n) {
		return Math[n>=0 ? 'floor' : 'ceil'](n);
	}
}