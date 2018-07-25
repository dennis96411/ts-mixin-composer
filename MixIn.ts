type Instance = { constructor: Function; prototype?: never; [Symbol.unscopables]?(): never; [property: string]: any; };
type Class = { constructor: Function; prototype: object; };

export function mixIn(Base: Instance | Class, Mixins: (Instance | Class | [Class, ...any[]])[]): void {
    for (const _Mixin of Mixins) {
        const   Mixin: any = _Mixin instanceof Array ? _Mixin[0] : _Mixin,
                constructorArguments: any[] = _Mixin instanceof Array ? _Mixin.slice(1) : [],
                prototypeProperties: {} = Object.getOwnPropertyDescriptors(Mixin.prototype || Mixin.constructor.prototype);

        Object.defineProperties(Base.prototype || Base.constructor.prototype, Object.assign(
            (delete prototypeProperties.constructor) && prototypeProperties, // Mix-in class prototype fields (mainly methods; excluding constructor)
            Object.getOwnPropertyDescriptors(Mixin.prototype ? new Mixin(...constructorArguments) : Mixin) // Mix-in instance values defined at instantiation time
        ));
    }
}
