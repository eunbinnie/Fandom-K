import { useEffect, useRef, useState } from "react";

export default function useCustomInView(option) {
	const [inView, setInView] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		const observer = new IntersectionObserver(
			([{ isIntersecting }]) => {
				setInView(isIntersecting);
			},
			{ ...option },
		);

		if (ref.current && ref.current instanceof Element) {
			observer.observe(ref.current);
		}
		return () => {
			if (observer) observer.disconnect();
		};
	}, [option]);

	return { ref, inView };
}
