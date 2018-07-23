export abstract class MixedIn<
	T1 extends Function = Function, T2 extends Function = Function, T3 extends Function = Function, T4 extends Function = Function, T5 extends Function = Function,
	T6 extends Function = Function, T7 extends Function = Function, T8 extends Function = Function, T9 extends Function = Function, T10 extends Function = Function
> {
	constructor(...Mixins: [
		T1 | [T1, ...any[]], (T2 | [T2, ...any[]])?, (T3 | [T3, ...any[]])?, (T4 | [T4, ...any[]])?, (T5 | [T5, ...any[]])?,
		(T6 | [T6, ...any[]])?, (T7 | [T7, ...any[]])?, (T8 | [T8, ...any[]])?, (T9 | [T9, ...any[]])?, (T10 | [T10, ...any[]])?
	]) {
		for (const _Mixin of Mixins) {
			const Mixin: any = _Mixin instanceof Array ? _Mixin[0] : _Mixin, _arguments: any[] = _Mixin instanceof Array ? _Mixin.slice(1) : [];

			// Copy mixin prototype fields (mainly methods)
			const prototypeProperties: {} = Object.getOwnPropertyDescriptors(Mixin.prototype);
			Object.defineProperties(this.constructor.prototype, (delete prototypeProperties.constructor) && prototypeProperties);

			// Copy mixin values defined at instantiation time
			Object.defineProperties(this, Object.getOwnPropertyDescriptors(new Mixin(..._arguments)));
		}
	}
}