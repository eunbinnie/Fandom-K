import { useEffect, useRef, useState } from "react";
import { useGetData } from "./useGetData";
import useCustomInView from "./useCustomInView";

export default function useInfiniteScroll(fetchFunction, options) {
	const rootRef = useRef(null);
	const [items, setItems] = useState([]);
	const [cursor, setCursor] = useState(0);
	const [status, wrappedFunction] = useGetData(fetchFunction);
	const { ref, inView } = useCustomInView({
		threshold: 0,
		root: rootRef.current,
	});
	async function executeRefresh() {
		const { idols, nextCursor } = await wrappedFunction({
			...options,
			cursor,
		});
		if (!idols) return;
		setCursor(nextCursor);
		setItems([...items, ...idols]);
	}

	useEffect(() => {
		if (inView && cursor !== null && cursor !== 0) {
			executeRefresh();
		} else if (items.length === 0) {
			executeRefresh();
		}
	}, [inView]);

	return { items, ref, status, rootRef };
}
