import {
	createContext,
	useContext,
	useRef,
	useState,
	useEffect,
	Children,
	cloneElement,
	forwardRef,
} from "react";
import "./index.scss";
import widget from "@/common/utilities/widget";

import Capsule from "@/common/models/Capsule";

const Context = createContext();

export default function Carousel(
	props = {
		/* html */ id: null,
		class: [],
		style: {},
		children: null,
		/* props */ swipe: null,
		columns: null,
		sensitivity: 100,
	},
) {
	const [count, set_count] = useState(0);
	const [index, set_index] = useState(0);

	const [min, max] = [0, count >= props.columns ? count - props.columns : 0];

	return (
		<Context.Provider
			value={{
				props: {
					swipe: props.swipe,
					columns: props.columns,
					sensitivity: props.sensitivity,
				},
				data: {
					index_min: min,
					index_max: max,
				},
				state: {
					count: new Capsule({
						get() {
							return count;
						},
						set(value) {
							set_count(value);
						},
					}),
					index: new Capsule({
						get() {
							return index;
						},
						set(value) {
							set_index(value < min ? min : max < value ? max : value);
						},
					}),
				},
			}}
		>
			<section {...widget("Carousel", props)}>{props.children}</section>
		</Context.Provider>
	);
}

Carousel.Item = forwardRef(function Item(
	props = {
		/* html */ id: null,
		class: [],
		style: {},
		children: null /* props */,
	},
	ref,
) {
	return (
		<section ref={ref} {...widget("Carousel.Item", props)}>
			{props.children}
		</section>
	);
});

Carousel.Button = forwardRef(function Button(
	props = {
		/* html */ id: null,
		class: [],
		style: {},
		children: null,
		/* props */ to: null,
	},
	ref,
) {
	const ctx = useContext(Context);

	function onClick(event) {
		switch (props.to) {
			case "prev": {
				ctx.state.index.set((index) =>
					event.shiftKey ? -Infinity : index - ctx.props.columns,
				);
				break;
			}
			case "next": {
				ctx.state.index.set((index) =>
					event.shiftKey ? +Infinity : index + ctx.props.columns,
				);
				break;
			}
			default: {
				ctx.state.index.set(props.to);
				break;
			}
		}
	}
	// omit if (index === first_index)
	if (props.to === "prev" && ctx.state.index.get() === ctx.data.index_min) {
		return null;
	}
	// omit if (index === last_index)
	if (props.to === "next" && ctx.state.index.get() === ctx.data.index_max) {
		return null;
	}

	return (
		<section
			ref={ref}
			{...widget("Carousel.Button", props)}
			//
			// events
			//
			onClick={onClick}
		>
			{props.children}
		</section>
	);
});

Carousel.Slider = forwardRef(function Container(
	props = {
		/* html */ id: null,
		class: [],
		style: {},
		children: null,
		/* props */ gap: 0,
	},
	ref,
) {
	const ctx = useContext(Context);

	const container = useRef(null);

	useEffect(() => {
		ctx.state.count.set(
			Children.toArray(props.children).filter(
				(child) => child.type === Carousel.Item,
			).length,
		);
	}, [props.children]);

	class CSS {
		static width() {
			return `calc(+${100 / ctx.props.columns}% - ${props.gap * ((ctx.props.columns - 1) / ctx.props.columns)}px)`;
		}
		static transform(offset) {
			return (
				"translateX(" +
				`calc(-${(100 / ctx.props.columns) * ctx.state.index.get()}% - ${(props.gap / ctx.props.columns) * ctx.state.index.get() + offset}px)` +
				")"
			);
		}
	}
	let [down_x, move_x, up_x] = [null, null, null];
	//
	// handlers
	//
	function handle_down(value) {
		down_x = value;
	}
	function handle_move(value) {
		if (down_x === null) return;

		move_x = value;

		if (
			ctx.state.index.get() !==
			(down_x <= move_x ? ctx.data.index_min : ctx.data.index_max)
		) {
			const delta = down_x - move_x;

			if (Math.abs(delta) < ctx.props.sensitivity) {
				container.current.style.setProperty("transform", CSS.transform(delta));
			} else {
				container.current.style.setProperty(
					"transform",
					CSS.transform(
						down_x > move_x ? +ctx.props.sensitivity : -ctx.props.sensitivity,
					),
				);
			}
		}
	}

	function handle_up(value) {
		if (down_x === null) return;

		up_x = value;

		if (Math.abs(down_x - up_x) <= ctx.props.sensitivity) {
			container.current.style.setProperty("transform", CSS.transform(0));
		} else if (down_x >= up_x) {
			// move right
			ctx.state.index.set(
				(index) => index + (ctx.props.swipe ?? ctx.props.columns),
			);
		} else if (down_x <= up_x) {
			// move left
			ctx.state.index.set(
				(index) => index - (ctx.props.swipe ?? ctx.props.columns),
			);
		}
		// reset
		[down_x, move_x, up_x] = [null, null, null];
	}

	function onMouseMove(event) {
		handle_move(event.clientX);
	}

	function onMouseUp(event) {
		handle_up(event.clientX);
	}

	useEffect(() => {
		window.addEventListener("mousemove", onMouseMove);
		return () => window.removeEventListener("mousemove", onMouseMove);
	}, [onMouseMove]);

	useEffect(() => {
		window.addEventListener("mouseup", onMouseUp);
		return () => window.removeEventListener("mouseup", onMouseUp);
	}, [onMouseUp]);

	return (
		<section
			ref={ref}
			{...widget("Carousel.Slider", props)}
			//
			// events
			//
			onMouseDown={() => handle_down(event.clientX)}
			onTouchStart={(event) => handle_down(event.touches[0].clientX)}
			onTouchMove={(event) => handle_move(event.changedTouches[0].clientX)}
			onTouchEnd={(event) => handle_up(event.changedTouches[0].clientX)}
		>
			<div
				ref={container}
				className="container"
				style={{ gap: props.gap, transform: CSS.transform(0) }}
			>
				{Children.toArray(props.children)
					.filter((child) => child.type === Carousel.Item)
					.map((child) => {
						return cloneElement(child, {
							...child.props,
							style: { ...child.props.style, width: CSS.width() },
						});
					})}
			</div>
		</section>
	);
});
