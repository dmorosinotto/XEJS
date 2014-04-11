XE.showProto('\n>');
var parent = {
	get: function fn() {
		return this.val;
	},
	val: 42
};

//STEP-1
parent.xè();

/*//STEP-2
var child = Object.create(parent);
child.val = 3.14159;
child.xè();
*/

/*//STEP-3
var grandchild = Object.create(child);
grandchild.xè();
*/