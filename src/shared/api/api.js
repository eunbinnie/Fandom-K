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
