import { useEffect, useState } from "react"

/** @see https://usehooks-ts.com/react-hook/use-media-query */
export default function useMediaQuery(query)
{
	const [matches, set_matches] = useState(get_matches(query));

	function get_matches(query)
	{
		if (typeof window === "undefined")
		{
			return false;
		}
		return window.matchMedia(query).matches;
	}

	useEffect(() =>
	{
		const media_query = window.matchMedia(query);

		function onChange()
		{
			set_matches(get_matches(query));
		}

		onChange();

		if (media_query.addListener)
		{
			media_query.addListener(onChange);
		}
		else
		{
			media_query.addEventListener("change", onChange);
		}

		return () =>
		{
			if (media_query.removeListener)
			{
				media_query.removeListener(onChange);
			}
			else

			{
				media_query.removeEventListener("change", onChange);
			}
		}
	},
	[query]);

	return matches;
}
