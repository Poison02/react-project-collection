import { lazy } from "react";

const MyLayout = lazy(() => import("../layout/index"));
const Home = lazy(() => import("../pages/Home/index"));
const Category = lazy(() => import("../pages/Category/index"));

export const routes = [
	{
		path: "/",
		component: MyLayout,
		children: [
			{
				path: "/",
				component: Home
			},
			{
				path: "category",
				component: Category
			}
		]
	}
];
