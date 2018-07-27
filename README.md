# TypeScript Mix-in Composer

A mix-in composer for TypeScript that applies mix-ins classes and/or class instances to a class (outside of its constructor) or to its instances (from within its class' constructor)


## What does it do?

[A comprehensive example on mix-ins has been provided by TypeScript's handbook](https://www.typescriptlang.org/docs/handbook/mixins.html). This module aims to perform the same task with a slight tweak to correct an inheritence problem.


## How is this different from the method in [TypeScript's handbook](https://www.typescriptlang.org/docs/handbook/mixins.html)?

If you initialize non-method properties within the constructor or in the outer body of your mix-in classes, they will not be mixed into your base class.

```ts
class A {
	public property: string = "hi";
	public method(): void {}
}

class X implements A {
	// TypeScript would compile these fine, which would lead you to believe that "property" and "method" both exist in class A's prototype
	public property!: typeof A.prototype.property;
	public method!: typeof A.prototype.method;
}
applyMixins(X, [A]); // Function from TypeScript's handbook; available below

// Methods will be mixed in properly because TypeScript defines them in the class' prototype outside of its constructor
console.log(X.prototype.method); // method() { ... }
console.log(new X().method); // method() { ... }

// However, properties will not be mixed in properly because they are defined in the class' constructor
console.log(X.prototype.property); // undefined
console.log(new X().property); // undefined
```

This is because TypeScript transpiles your classes so that all non-method property instantiations occur within the constructor itself. The class A defined above is transpiled to the following JavaScript:

```js
class A {
    constructor() {
        this.property = "hi";
    }
    method() { }
}
```

If you look at TypeScript's code for `applyMixins`, it simply copies properties in mix-ins' prototypes to your base class' prototype.

```ts
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```

Therefore, any instance of your mixed-in class created using the method in TypeScript's handbook will not have access to its mixed-in non-method properties because they are not defined in your mixin classes' prototypes. You could make this method work by rewriting your mix-in classes to initialize non-method properties outside of the class, or by initializing them in your base class, but this breaks the ability TypeScript has provided to create coherent-looking classes.

```ts
class A {
	public property!: string;
	public method(): void {}
}
A.prototype.property = "hi";

// ...

console.log(X.prototype.property); // hi
console.log(new X().property); // hi
```


## How do I use it?

You could use it just as the way `applyMixins` is used above.

```ts
import { mixIn } from "./MixIn";

class A {
	public property: string = "hi";
	public method(): void {}
}

class X implements A {
	// Stand-in declarations for the mix-in properties
	public property!: typeof A.prototype.property;
	public method!: typeof A.prototype.method;
}
mixIn(X, [A]);

console.log(X.prototype.method); // method() { ... }
console.log(new X().method); // method() { ... }
console.log(X.prototype.property); // hi
console.log(new X().property); // hi
```

You could also call `mixIn` from inside the constructor to avoid polluting your class' prototype, which also makes it possible to pass along arguments to the constructors of your mix-in classes at instantiation time.

```ts
import { mixIn } from "./MixIn";

class A {
	constructor(public property: string) {};
	public method(): void {}
}

class X implements A {
	// Stand-in declarations for the mix-in properties
	public property!: typeof A.prototype.property;
	public method!: typeof A.prototype.method;
	
	constructor(property: string) {
		mixIn(this, [
			[A, property] // Calls class A's constructor with the argument array [property]
		]);
	}
}

console.log(X.prototype.method); // undefined (the method is copied into instances of X at instantiation time)
console.log(new X("hello").method); // method() { ... }
console.log(X.prototype.property); // undefined (the property is copied into instances of X at instantiation time)
console.log(new X("hello").property); // hello
```

A more complete example with various usage methods can be found in [Example.ts](Example.ts).
