import { useContext, useState } from "react";
import { MenuButton } from "./Button";
import { MenuButtonDescription } from "@/app/pages/ListPage/widgets/MonthChart/SelectGender";
const { Column, Row } = require("./Container");

const TabContext = createContext();

export default function Switch({ children, defaultValue, setUpperState }) {
	const [index, setIndex] = useState(defaultValue);

	const changeIndex = (e) => {
		setIndex(e.currentTarget.path);
		setUpperState instanceof Function && setUpperState(e.currentTarget.path);
	};

	return (
		<TabContext.Provider value={{ index, changeIndex }}>
			<Column>{children}</Column>
		</TabContext.Provider>
	);
}

Switch.TabList = function TabList({ children }) {
	return <Row>{children}</Row>;
};

Switch.Tab = function Tab({ children, to }) {
	const { index, changeIndex } = useContext(TabContext);

	const handleMenuClick = (e) => {
		if (index === e.currentTarget.to) return;
		changeIndex(e);
	};

	return (
		<MenuButton to={to} onClick={handleMenuClick} $isActive={to === index}>
			<MenuButtonDescription>{children}</MenuButtonDescription>
		</MenuButton>
	);
};

Switch.TabContent = function Content({ children, path }) {
	const { index } = useContext(TabContext);
	return (
		<ul style={{ display: path === index ? "grid" : "none" }}>{children}</ul>
	);
};
