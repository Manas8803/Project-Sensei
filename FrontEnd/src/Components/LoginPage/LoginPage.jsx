import "./LoginPage.css";
import { useContext } from "react";
import userIcon from "../../assets/user.png";
import { UserContext } from "../../App";

const LoginPage = () => {
	const {
		user,
		handleChange,
		handleSubmit,
		pageSwitcher,
		setPageSwitcher,
		loginLoader,
	} = useContext(UserContext);

	//* pageSwitcher = true -> Register
	//* pageSwitcher = false -> Login

	function pageSwitcherHandler() {
		setPageSwitcher((pageSwitcher) => !pageSwitcher);
	}

	return (
		<div className="form-main-container">
			<form className="form_main" onSubmit={handleSubmit}>
				<p className="heading">{pageSwitcher ? `Sign Up` : `Login`}</p>
				{pageSwitcher && (
					<UserNameInput user={user} handleChange={handleChange} />
				)}
				<div className="inputContainer">
					<svg
						viewBox="0 0 16 16"
						fill="#2e2e2e"
						height="16"
						width="16"
						xmlns="http://www.w3.org/2000/svg"
						className="inputIcon"
					>
						<path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
					</svg>
					<input
						placeholder="Email"
						id="email"
						className="inputField"
						type="text"
						name="email"
						value={user.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="inputContainer">
					<svg
						viewBox="0 0 16 16"
						fill="#2e2e2e"
						height="16"
						width="16"
						xmlns="http://www.w3.org/2000/svg"
						className="inputIcon"
						required
					>
						<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
					</svg>
					<input
						placeholder="Password"
						id="password"
						className="inputField"
						type="password"
						name="password"
						value={user.password}
						onChange={handleChange}
						required
					/>
				</div>
				<button id="button" type="submit">
					{loginLoader ? (
						<div className="spinner_container">
							<div className="spinner"></div>
						</div>
					) : pageSwitcher ? (
						`Sign Up`
					) : (
						"Login"
					)}
				</button>
				<div className="signupContainer">
					<a onClick={pageSwitcherHandler}>
						{pageSwitcher
							? "Already have an account?"
							: `Don't have an account?`}
					</a>
				</div>
			</form>
		</div>
	);
};

function UserNameInput({ user, handleChange }) {
	return (
		<div className="inputContainer">
			<img src={userIcon} alt="" className="inputIcon" id="user" />
			<input
				placeholder="Name"
				id="name"
				className="inputField"
				type="text"
				name="name"
				value={user.name}
				onChange={handleChange}
			/>
		</div>
	);
}
export default LoginPage;
