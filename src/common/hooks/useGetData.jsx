import { useState } from "react";

export const useGetData = (funcAsync) => {
	const [status, setStatus] = useState({
		isLoading: true,
		errorMessage: null,
	});
	const wrappedFunction = async (...args) => {
		try {
			setStatus((prevStatus) => ({
				...prevStatus,
				isLoading: true,
				errorMessage: null,
			}));
			return await funcAsync(...args);
		} catch (error) {
			setStatus((prevStatus) => ({
				...prevStatus,
				errorMessage: error,
			}));
			return;
		} finally {
			setStatus((prevStatus) => ({
				...prevStatus,
				isLoading: false,
			}));
		}
	};
	return [status, wrappedFunction];
};
