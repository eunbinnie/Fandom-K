import useMediaQuery from "./useMediaQuery";

export default function useViewport()
{
	return { isDesktop: useMediaQuery("(1200px <= width)"), isTablet: useMediaQuery("(768px <= width < 1200px)"), isMobile: useMediaQuery("(375px <= width < 768px)") };
}
