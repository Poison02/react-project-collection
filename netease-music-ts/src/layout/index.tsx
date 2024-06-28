import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./index.scss";
import { BackTop } from "@douyinfe/semi-ui";
import { IconArrowUp } from "@douyinfe/semi-icons";

function Layout() {
	return (
		<div className="cloud-music-layout">
			<NavBar />
			<Outlet></Outlet>
			<BackTop>
				<IconArrowUp />
			</BackTop>
		</div>
	);
}

export default Layout;
