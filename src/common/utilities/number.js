export function seperate(value, seperator = ",")
{
	return value.toString().split("").map((digit, index, array) => 0 < index && (array.length - index) % 3 === 0 ? seperator + digit : digit).join("");
}
