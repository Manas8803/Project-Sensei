import React from "react";
import { useState } from "react";
import axios from "axios";
import LandingPage from "./Components/Landing Page/LandingPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import {
	BrowserRouter,
	Route,
	Router,
	Routes,
	useNavigate,
} from "react-router-dom";

export const UserContext = React.createContext();

function App() {
	const [user, setUser] = useState({
		name: "",
		password: "",
		email: "",
	});

	const [pageSwitcher, setPageSwitcher] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!pageSwitcher) {
			try {
				const { data } = await axios.post(
					"http://localhost:3000/user/login",
					user
				);
				localStorage.setItem("token", data.token);
				setIsAuthenticated(true);
			} catch (err) {
				const { status } = err.response;
				if (status == 400)
					alert("The provided email is not registered.\nPlease Register");
				else if (status == 403)
					alert("Password is incorrect.\nPlease type the correct password");
			}
		} else {
			try {
				const { data } = await axios.post(
					"http://localhost:3000/user/register",
					user
				);
				localStorage.setItem("token", data.token);
				setIsAuthenticated(true);
			} catch (err) {
				const { status } = err.response;
				if (status == 409) alert("Email is already registered.\nPlease Login");
			}
		}
	};

	return (
		<UserContext.Provider
			value={{
				user,
				handleChange,
				handleSubmit,
				pageSwitcher,
				setPageSwitcher,
				setIsAuthenticated,
			}}
		>
			{isAuthenticated ? <LandingPage /> : <LoginPage />}
			{/* <BrowserRouter>
				<Routes>
					{isAuthenticated ? navigate("/P-S") : navigate("/")}
					<Route path="/" element={<LoginPage />} />
					<Route path="/P-S" element={<LandingPage />} />
				</Routes>
			</BrowserRouter> */}
		</UserContext.Provider>
	);
}

export default App;
