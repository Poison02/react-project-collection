import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Divider, Spin } from "@douyinfe/semi-ui";
import { routes } from "./routes";

const NotFoundPage = lazy(() => import("./pages/404/index"));

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map((route) => {
					const { path, children } = route;
					if (children?.length > 0) {
						return (
							<Route
								key={path}
								path={path}
								element={
									<Suspense
										fallback={
											<div className="w-full h-full flex items-center justify-center">
												<Spin size="large" />
											</div>
										}
									>
										<route.component />
									</Suspense>
								}
							>
								{children.map((childRoute) => {
									const { path } = childRoute;
									return (
										<Route
											key={path}
											path={path}
											element={
												<Suspense
													fallback={
														<div className="w-full h-full flex items-center justify-center">
															<Spin size="large" />
														</div>
													}
												>
													<childRoute.component />
												</Suspense>
											}
										/>
									);
								})}
							</Route>
						);
					}
					return (
						<Route
							key={path}
							path={path}
							element={
								<Suspense fallback={<Spin />}>
									<route.component />
								</Suspense>
							}
						/>
					);
				})}
				<Route
					path="*"
					element={
						<Suspense fallback={<Spin />}>
							<NotFoundPage />
						</Suspense>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
