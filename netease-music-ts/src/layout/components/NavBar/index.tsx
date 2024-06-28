import React, { useState } from "react";
import { Avatar, Nav } from "@douyinfe/semi-ui";
import { IconMoon, IconPulse, IconSun } from "@douyinfe/semi-icons";
import "./index.scss";

function NavBar() {
	// 模式切换
	const [themeMode, setThemeMode] = useState<"dark" | "light">("light");
	const switchMode = () => {
		const body = document.body;
		if (body.hasAttribute("theme-mode")) {
			body.removeAttribute("theme-mode");
			setThemeMode("light");
		} else {
			body.setAttribute("theme-mode", "dark");
			setThemeMode("dark");
		}
	};
	return (
		<Nav
			mode={"horizontal"}
			className="cloud-layout-navbar px-24"
			items={[
				{ itemKey: "home", text: "首页" },
				{ itemKey: "category", text: "分类" }
			]}
			onSelect={(key) => console.log(key)}
			header={{
				logo: <IconPulse className="text-4xl" size="inherit" />,
				text: "CloudMusic",
				style: {
					cursor: "pointer"
				}
			}}
			footer={
				<div className="flex items-center">
					{themeMode === "dark" ? (
						<IconSun
							className="text-4xl cursor-pointer"
							size="inherit"
							onClick={switchMode}
						/>
					) : (
						<IconMoon
							className="text-4xl cursor-pointer"
							size="inherit"
							onClick={switchMode}
						/>
					)}

					<Avatar size="small" className="ml-3" color="red">
						M
					</Avatar>
				</div>
			}
		/>
	);
}

export default NavBar;
