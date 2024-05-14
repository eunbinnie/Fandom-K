import { useEffect, useState } from "react";
import "./index.scss";

import { Outlet } from "react-router-dom";
import ScrollToTop from "@/common/ui/ScrollToTop";

export default function App() {
	const [modal, set_modal] = useState(null);

	useEffect(() => {
		Modal.addEventListener((event) => {
			set_modal(event.detail);
		});
	}, []);

	return (
		<ScrollToTop>
			<Outlet></Outlet>
			<section
				id="modal"
				//
				// events
				//
				onClick={(event) => {
					if (event.target === event.currentTarget) {
						modal.onClickOutSide?.(modal);
					}
				}}
			>
				{modal?.element}
			</section>
		</ScrollToTop>
	);
}

export class Modal {
	/** @type {?Modal} */ static instance;
	static core = new EventTarget();

	element;
	timeout;
	onClickOutSide;

	constructor(element, onClickOutSide) {
		this.element = element;
		this.onClickOutSide = onClickOutSide;
	}

	open() {
		Modal.instance = this;

		document.body.style.setProperty("overflow", "hidden");

		Modal.core.dispatchEvent(new CustomEvent(Modal.name, { detail: this }));
	}

	close() {
		if (Modal.instance === this) {
			Modal.instance = null;

			document.body.style.setProperty("overflow", null);

			Modal.core.dispatchEvent(new CustomEvent(Modal.name, { detail: null }));
		}
	}

	shake() {
		if (Modal.instance === this) {
			this.timeout = clearTimeout(this.timeout);

			document.getElementById("modal").classList.add("shake");

			this.timeout = setTimeout(
				() => document.getElementById("modal").classList.remove("shake"),
				750,
			);
		}
	}

	static addEventListener(callback) {
		Modal.core.addEventListener(Modal.name, callback);
	}

	static removeEventListener(callback) {
		Modal.core.removeEventListener(Modal.name, callback);
	}
}
