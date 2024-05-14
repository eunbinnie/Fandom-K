import { useMediaQuery } from "react-responsive";

export const useCustomMediaQuery = () => {
	const isNotDesktop = useMediaQuery({ maxWidth: 1199 });
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
	const isMobile = useMediaQuery({ maxWidth: 767 });
	return { isNotDesktop, isTablet, isMobile };
};
