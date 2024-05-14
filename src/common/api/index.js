function TODO() {
	throw new Error("Unimplemented");
}

/** @see https://fandom-k-api.vercel.app/docs/ */
export default class API {
	static #query(object) {
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(object)) {
			switch (value) {
				case null:
				case undefined: {
					// or continue
					break;
				}
				default: {
					params.set(key, value);
					break;
				}
			}
		}
		return params.toString();
	}

	static get ["{teamName}/idols"]() {
		return new Request({
			/**
			 * @param {{ teamName: string; } & { pageSize: number; } & { cursor?: number; keyword?: string; }}
			 **/
			// eslint-disable-next-line no-unused-vars
			GET({ teamName = "6-11", ...query }) {
				return `https://fandom-k-api.vercel.app/${teamName}/idols?${API.#query(query)}`;
			},
		});
	}

	static get ["{teamName}/donations"]() {
		return new Request({
			/**
			 * @param {{ teamName: string; } & { pageSize: number; } & { cursor?: number; priorityIdolIds?: number[]; }}
			 **/
			// eslint-disable-next-line no-unused-vars
			GET({ teamName = "6-11", ...query }) {
				return `https://fandom-k-api.vercel.app/${teamName}/donations?${API.#query(query)}`;
			},
			/**
			 * @param {{ teamName: string; } & { } & { }}
			 **/
			// eslint-disable-next-line no-unused-vars
			POST({ teamName = "6-11", ...query }) {
				return `https://fandom-k-api.vercel.app/${teamName}/donations`;
			},
		});
	}

	static get ["{teamName}/donations/{id}"]() {
		return new Request({
			/**
			 * @param {{ teamName: string; id: number; } & { } & { }}
			 **/
			// eslint-disable-next-line no-unused-vars
			PUT({ teamName = "6-11", id = 0, ...query }) {
				return `https://fandom-k-api.vercel.app/${teamName}/donations/${id}`;
			},
			/**
			 * @param {{ teamName: string; id: number; } & { } & { }}
			 **/
			// eslint-disable-next-line no-unused-vars
			DELETE({ teamName = "6-11", id = 0, ...query }) {
				return `https://fandom-k-api.vercel.app/${teamName}/donations/${id}`;
			},
		});
	}

	static get ["{teamName}/donations/{id}/contribute"]() {
		return new Request({
			/**
			 * @param {{ teamName: string; id: number; } & { } & { }}
			 **/
			// eslint-disable-next-line no-unused-vars
			PUT({ teamName = "6-11", id = 0, ...query }) {
				return `https://fandom-k-api.vercel.app/${teamName}/donations/${id}/contribute`;
			},
		});
	}
}

class Request {
	#GET;
	#PUT;
	#POST;
	#DELETE;

	constructor({ GET = TODO, PUT = TODO, POST = TODO, DELETE = TODO }) {
		this.#GET = GET;
		this.#PUT = PUT;
		this.#POST = POST;
		this.#DELETE = DELETE;
	}
	/**
	 * @type {typeof Parameters<this["#GET"]>} query
	 **/
	async GET(query) {
		return await (await fetch(this.#GET(query), { method: "GET" })).json();
	}

	async PUT(query, body) {
		return await (
			await fetch(this.#PUT(query), {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			})
		).json();
	}

	async POST(query, body) {
		return await (
			await fetch(this.#POST(query), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			})
		).json();
	}

	async DELETE(query) {
		return await (
			await fetch(this.#DELETE(query), { method: "DELETE" })
		).json();
	}
}
