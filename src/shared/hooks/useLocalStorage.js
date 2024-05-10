import { useEffect, useState } from "react";

export default function useLocalStorage(key, fallback)
{
	function storage_get()
	{
		if (key in localStorage)
		{
			return deserialize(localStorage[key]);
		}
		return fallback;
	}

	function storage_set(value)
	{
		switch (value)
		{
			case null: case undefined:
			{
				delete localStorage[key];
				break;
			}
			default:
			{
				localStorage[key] = serialize(value);
				break;
			}
		}
	}

	const [value, set_value] = useState(storage_get());

	useEffect(() =>
	{
		function onStorage(event)
		{
			if (key === event.key && event.oldValue !== event.newValue && event.storageArea === window.localStorage)
			{
				set_value(storage_get());
			}
		}

		window.addEventListener("storage", onStorage);
		window.addEventListener("local-storage", onStorage);

		return () =>
		{
			window.removeEventListener("storage", onStorage);
			window.removeEventListener("local-storage", onStorage);
		};
	},
	[]);

	function setter(new_value)
	{
		const signal = new_value instanceof Function ? new_value(value) : new_value;

		storage_set(signal);

		window.dispatchEvent(new StorageEvent("local-storage", { key, storageArea: window.localStorage, oldValue: serialize(value), newValue: serialize(signal) }));

		set_value(signal);
	}

	return [value, setter];
}

function serialize(value)
{
	return JSON.stringify({ ["value"]: value });
}

function deserialize(value)
{
	return JSON.parse(value)["value"];
}
