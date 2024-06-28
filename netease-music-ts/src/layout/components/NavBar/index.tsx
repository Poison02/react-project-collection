import React, { useMemo, useState } from "react";
import { Avatar, Nav, Tooltip } from "@douyinfe/semi-ui";
import { IconMoon, IconPulse, IconSun } from "@douyinfe/semi-icons";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const selectKeys = useMemo(() => [pathname], [pathname]);
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
			className="cloud-layout-navbar px-32"
			items={[
				{ itemKey: "/", text: "首页" },
				{ itemKey: "/category", text: "分类" }
			]}
			selectedKeys={selectKeys}
			onClick={(item) => {
				navigate(item.itemKey as string);
			}}
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
						<Tooltip content="切换到亮色模式" position="bottom">
							<IconSun
								className="text-4xl cursor-pointer"
								size="inherit"
								onClick={switchMode}
							/>
						</Tooltip>
					) : (
						<Tooltip content="切换到暗色模式" position="bottom">
							<IconMoon
								className="text-4xl cursor-pointer"
								size="inherit"
								onClick={switchMode}
							/>
						</Tooltip>
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
