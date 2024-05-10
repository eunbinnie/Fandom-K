import { useEffect, useState } from "react"; import "./index.scss";

import { Outlet } from "react-router-dom";

export default function App()
{
	const [modal, set_modal] = useState(null);

	useEffect(() =>
	{
		Modal.addEventListener((event) =>
		{
			set_modal(event.detail);
		});
	},
	[])

	return (
		<>
			<Outlet></Outlet>

			<section id="modal"
				//
				// events
				//
				onClick={(event) =>
				{
					if (event.target === event.currentTarget)
					{
						modal?.["onClickOutSide"]?.();
					}
				}}
			>
			{
				modal?.["element"]
			}
			</section>
		</>
	);
}

export class Modal
{
	static #self = new EventTarget(); static #timeout = null;

	static open(element, onClickOutSide)
	{
		// prevent scroll
		document.body.style.setProperty("overflow", "hidden");

		Modal.#self.dispatchEvent(new CustomEvent(Modal.name, { detail: { ["element"]: element, ["onClickOutSide"]: onClickOutSide } }));
	}

	static close()
	{
		// allow scroll
		document.body.style.setProperty("overflow", "unset");

		Modal.#self.dispatchEvent(new CustomEvent(Modal.name, { detail: { ["element"]: null, ["onClickOutSide"]: null } }));
	}

	static shake()
	{
		Modal.#timeout = clearTimeout(Modal.#timeout);

		document.getElementById("modal").classList.add("shake");

		Modal.#timeout = setTimeout(() => document.getElementById("modal").classList.remove("shake"), 1000);
	}

	static addEventListener(callback)
	{
		Modal.#self.addEventListener(Modal.name, callback);
	}

	static removeEventListener(callback)
	{
		Modal.#self.removeEventListener(Modal.name, callback);
	}
}
