import { MixedIn } from "./MixedIn";

// Mixin classes
abstract class A { a: number = 1; aMethod(): void { console.log("I am in A:", this.a); } }
abstract class B { b: number = 2; bMethod(): void { console.log("I am in B:", this.b); } }
class C {
	public c: number;
	constructor(c: number) { this.c = c; }
	cMethod(): void { console.log("I am in C:", this.c); }
}

// Base class for mixins
class Z extends MixedIn/*<typeof A, typeof B, typeof C>*/ implements A, B, C {
	// Mixin properties and methods; needed to satisfy compiler for implementing the mixins
	/* A */ a: typeof A.prototype.a; aMethod: typeof A.prototype.aMethod;
	/* B */ b: typeof B.prototype.b; bMethod: typeof B.prototype.bMethod;
	/* C */ c: typeof C.prototype.c; cMethod: typeof C.prototype.cMethod;

	// Normal class properties
	z: number = 3; zMethod(): void { console.log("I am in Z:", this.z); }

	constructor(cNumber: number) {
		super(A, B, [C, cNumber]); // mixin A; mixin B; mixin C with constructor argument cNumber
		this.z = this.a + this.b + this.c + this.z; // At this point, all mixin properties are accessible within our instance
	}
}

// Create an instance of Z with mixins from A, B, and C
const z: Z = new Z(Math.PI);

// A mixins
console.log(z.a); // 1
z.aMethod(); // I am in A: 1

// B mixins
console.log(z.b); // 2
z.bMethod(); // I am in B: 2

// C mixins
console.log(z.c); // 3.141592653589793 
z.cMethod(); // I am in C: 3.141592653589793

// Z
console.log(z.z); // 9.141592653589793
z.zMethod(); // I am in Z: 9.141592653589793
