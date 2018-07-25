import { mixIn } from "./MixIn";
const applyInConstructor: boolean = false; // Choose when the mix-ins are applied


/**
 * Mix-in classes
 */

class A {
	a: number = 1; // Property field
	aMethod(): void { console.log("I am in A: a =", this.a); }
}

abstract class B {
	get b(): number { return 2; } // Getter
	bMethod(): void { console.log("I am in B: b =", this.b); }
}

class C {
	constructor(public c: number) {}
	cMethod(): void { console.log("I am in C: c =", this.c); }
}

abstract class D {
	constructor(public d: number) {}
	dMethod(): void { console.log("I am in D: d =", this.d); }
}


/**
 * Class to apply mix-ins to
 */

class X implements A, B, C, D {
	// Mix-ins
	/* A */ a: typeof A.prototype.a; aMethod: typeof A.prototype.aMethod;
	/* B */ b: typeof B.prototype.b; bMethod: typeof B.prototype.bMethod;
	/* C */ c: typeof C.prototype.c; cMethod: typeof C.prototype.cMethod;
	/* D */ d: typeof D.prototype.d; dMethod: typeof D.prototype.dMethod;

	// Normal class properties and methods
	x: number = 4;
	xMethod(): void { console.log("I am in X: a + b + c + d + Math.PI =", this.x); }

	constructor(dNumber: number) {
		// Apply mix-ins to a class instance from within its constructor
		if (applyInConstructor)
			mixIn(this, [
				A, // Normal class
				B, // Abstract class
				new C(3), // Class instance
				[D, dNumber] // Normal/abstract class with constructor arguments
			]);
		
		this.x = this.a + this.b + this.c + this.d + this.x; // At this point, all mix-in fields are accessible
	}
}

// Apply mix-ins to the class itself
if (!applyInConstructor)
	mixIn(X, [
		A, // Normal class
		B, // Abstract class
		new C(3), // Class instance
		[D, Math.PI] // Normal/abstract class with constructor arguments
	]);


/**
 * Test mix-in properties and methods
 */

const x: X = new X(Math.PI);

// Mix-ins from class A
console.log("a =", x.a); // a = 1
x.aMethod(); // I am in A: a = 1

// Mix-ins from class B
console.log("b =", x.b); // b = 2
x.bMethod(); // I am in B: b = 2

// Mix-ins from class C
console.log("c =", x.c); // c = 3
x.cMethod(); // I am in C: c = 3

// Mix-ins from class D
console.log("d =", x.d); // d = 3.141592653589793
x.dMethod(); // I am in D: d = 3.141592653589793

// Class X's own fields
console.log("x =", x.x); // x = 13.141592653589793
x.xMethod(); // I am in X: a + b + c + d + Math.PI = 13.141592653589793
