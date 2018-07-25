# TypeScript Mix-in Composer
A mix-in composer for TypeScript that can be apply mix-ins to a class itself or to its instances from within its constructor

## Why?
You may have already seen the mixin methodology listed in [TypeScript's handbook](https://www.typescriptlang.org/docs/handbook/mixins.html), which does look cleaner. However, if you initialize non-method properties within the constructor or in the outer body of your mixin classes, they will not be mixed into your base class. This is because TypeScript transpiles your classes so that all non-method property instantiations occur within the constructor itself. Therefore, any instance of your mixed-in class created using the method in TypeScript's handbook will not have access to its mixed-in properties because they are not defined in your mixin classes' prototypes.
