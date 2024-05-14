export function countdown(from, until, { year, month, day, hour, minute, second })
{
	const [time, stamp] = [new Date(until.getTime() - from.getTime()), []];

	if (0 < time.getFullYear() - 1970)
	{
		stamp.push(time.getFullYear() - 1970 + year);
	}
	if (0 < time.getMonth())
	{
		stamp.push(time.getMonth() + month);
	}
	if (0 < time.getDate())
	{
		stamp.push(time.getDate() + day);
	}
	if (0 < time.getHours())
	{
		stamp.push(time.getHours() + hour);
	}
	if (0 < time.getMinutes())
	{
		stamp.push(time.getMinutes() + minute);
	}
	if (0 < time.getSeconds())
	{
		stamp.push(time.getSeconds() + second);
	}

	return stamp.join("\u0020");
}
