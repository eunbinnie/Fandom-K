// 마이페이지 idol 목록 불러오기 api

const getIdols = async (pageSize = 16, cursor = 0) => {
	try {
		const response = await fetch(
			"https://fandom-k-api.vercel.app/6-11/idols?" +
				new URLSearchParams({
					pageSize,
					cursor,
				}),
		);
		const body = await response.json();
		return body;
	} catch (error) {
		throw new Error("getIdols api error", error);
	}
};

export default getIdols;
