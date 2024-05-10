import { useEffect, useRef, useState } from "react";
import "./index.scss";
// widgets
import Carousel from "@/widgets/Carousel";
// assets/icons
import ArrowLeft from "@/shared/assets/icons/ArrowLeft";
import ArrowRight from "@/shared/assets/icons/ArrowRight";

import API from "@/shared/api";

import Donate from "@/widgets/Donate";

import useViewport from "@/shared/hooks/useViewport";

export default function PendingDonations() {
	const { isDesktop, isTablet, isMobile } = useViewport();

	function get_columns() {
		return isDesktop ? 4 : isTablet ? 3 : isMobile ? 3 : 0;
	}

	const [cursor, set_cursor] = useState(null);
	const [donations, set_donations] = useState([]);
	const [columns, set_columns] = useState(get_columns());

	const last_child = useRef();

	useEffect(() => {
		set_columns(get_columns());
	}, [isDesktop, isTablet, isMobile]);

	useEffect(() => {
		if (columns) {
			API["{teamName}/donations"]
				.GET({ pageSize: columns })
				.then((response) => {
					set_donations(response.list);
					set_cursor(response.nextCursor);
				});
		}
	}, [columns]);

	useEffect(() => {
		console.log(donations);
	}, [donations]);

	useEffect(() => {
		if (cursor) {
			const observer = new IntersectionObserver(
				(entries, observer) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							API["{teamName}/donations"]
								.GET({ pageSize: columns, cursor: cursor })
								.then((response) => {
									set_donations((idols) => [...idols, ...response.list]);
									set_cursor(
										response.list.length >= columns
											? response.nextCursor
											: null,
									);
								});
							// big brother is gone...
							observer.disconnect();
						}
					}
				},
				{
					threshold: 0.25,
				},
			);
			// big brother
			observer.observe(last_child.current);
		}
	}, [cursor]);

	return (
		<section data-widget="PendingDonations">
			<Carousel
				swipe={isDesktop ? null : 1}
				columns={columns}
				sensitivity={100}
			>
				<Carousel.Button
					to="prev"
					style={{ left: -80 }}
					class={["hide-on-tablet", "hide-on-mobile"]}
				>
					<ArrowLeft></ArrowLeft>
				</Carousel.Button>
				<Carousel.Slider gap={25}>
					{[
						...donations,
						...new Array(
							cursor ? columns : donations.length ? 0 : columns,
						).fill(null),
					].map((donation, index, array) => {
						return (
							<Carousel.Item
								key={index}
								ref={index === array.length - 1 ? last_child : null}
							>
								<Donate
									donation={donation}
									onContribute={() => {
										API["{teamName}/donations"]
											.GET({ pageSize: 1, priorityIdolIds: [donation.idolId] })
											.then((response) => {
												set_donations((donations) => {
													donations[index] = response.list[0];

													return [...donations];
												});
											});
									}}
								></Donate>
							</Carousel.Item>
						);
					})}
				</Carousel.Slider>
				<Carousel.Button
					to="next"
					style={{ right: -80 }}
					class={["hide-on-tablet", "hide-on-mobile"]}
				>
					<ArrowRight></ArrowRight>
				</Carousel.Button>
			</Carousel>
		</section>
	);
}
