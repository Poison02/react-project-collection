import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./index.scss";
import { BackTop, Layout } from "@douyinfe/semi-ui";
import { IconArrowUp } from "@douyinfe/semi-icons";
import { useIsFetching } from "@tanstack/react-query";
import MyFooter from "./components/Footer";

const { Header, Footer, Content } = Layout;

function MyLayout() {
	const isFetching = useIsFetching();
	return (
		<Layout className="cloud-music-layout pt-[60px]">
			<Header className="fixed top-0 z-50 w-full backdrop-blur">
				<NavBar />
			</Header>
			<Content>
				<Outlet></Outlet>
			</Content>
			<Footer>
				<MyFooter />
			</Footer>
			<BackTop>
				<IconArrowUp />
			</BackTop>
		</Layout>
	);
}

export default MyLayout;
