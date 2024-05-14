import IdolChartCard from "@/app/pages/ListPage/widgets/cards/ui/IdolChartCard";
import { getCharts } from "@/common/api/api";
import IdolChartCardSkeleton from "@/app/pages/ListPage/widgets/cards/skeleton/IdolChartCardSkeleton";
import styled from "styled-components";

import useInfiniteScroll from "@/common/hooks/useInfiniteScroll";

const ChartList = styled.ul`
	width: 100%;
	height: 418px;
	overflow: auto;
	column-gap: 24px;
	grid-template: repeat(5, 1fr) / 1fr 1fr;
	@media (width<=1199px) {
		grid-template: repeat(5, 1fr) / 1fr;
	}
`;

export default function MonthChartList({ gender, isactive }) {
	const { items, ref, status, rootRef } = useInfiniteScroll(getCharts, {
		gender,
	});

	return (
		<ChartList
			ref={rootRef}
			style={{ display: isactive === true ? "grid" : "none" }}
		>
			{items?.map((item, index) => (
				<IdolChartCard key={item.id} item={item} index={index} ref={ref} />
			))}
			{status.isLoading &&
				Array.from(Array(10)).map((_, index) => (
					<IdolChartCardSkeleton key={index} />
				))}
		</ChartList>
	);
}
