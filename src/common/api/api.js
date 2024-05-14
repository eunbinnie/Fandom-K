import { BASE_URL } from "../constant/constant";

export async function getCharts({ gender, cursor }) {
	if (cursor == null) {
		return;
	}
	const URL = `${BASE_URL}/charts/{gender}`;
	const query = new URLSearchParams({ gender, cursor: cursor });
	const response = await fetch(`${URL}?${query.toString()}`);
	return response.json();
}

export async function postVotes(Id) {
	const URL = `${BASE_URL}/votes`;
	const response = await fetch(URL, {
		method: "POST",
		mode: "cors",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ idolId: +Id }),
	});
	return response.json();
}
// 마이페이지 idol 목록 불러오기 api

export async function getIdols(pageSize = 16, cursor = 0) {
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
}
