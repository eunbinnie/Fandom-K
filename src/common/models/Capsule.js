function TODO()
{
	throw new Error("Unimplemented");
}

export default class Capsule
{
	#getter;
	#setter;

	constructor({ get = TODO, set = TODO })
	{
		this.#getter = get;
		this.#setter = set;
	}

	get()
	{
		return this.#getter();
	}

	set(value)
	{
		this.#setter(value instanceof Function ? value?.(this.#getter()) : value);
	}
}
