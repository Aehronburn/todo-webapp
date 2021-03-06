import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import TodoPage from "./components/TodoPage";
import PrivateRoute from "./components/PrivateRoute";
import TokenContextProvider from "./contexts/TokenContext";
import HomePage from "./components/HomePage";
import UserContextProvider from "./contexts/UserContext";
import "antd/dist/antd.css";

const App = () => {
	const [authenticated, setAuthenticated] = useState(false);

	const logout = () => {
		setAuthenticated(false);
	};

	return (
		<div className="App">
			<TokenContextProvider>
				<UserContextProvider>
					<BrowserRouter>
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<LoginPage
										{...props}
										authenticated={[authenticated, setAuthenticated]}
									/>
								)}
							/>
							<Route
								exact
								path="/register"
								render={(props) => (
									<RegistrationPage
										{...props}
										authenticated={[authenticated, setAuthenticated]}
									/>
								)}
							/>
							<PrivateRoute
								exact
								path="/home"
								component={HomePage}
								authenticated={authenticated}
								logout={logout}
							/>
							<PrivateRoute
								exact
								path="/todo"
								component={TodoPage}
								authenticated={authenticated}
								logout={logout}
							/>
						</Switch>
					</BrowserRouter>
				</UserContextProvider>
			</TokenContextProvider>
		</div>
	);
};

export default App;
