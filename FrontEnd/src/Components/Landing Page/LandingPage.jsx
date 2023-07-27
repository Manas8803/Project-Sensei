import ResponsiveAppBar from "./Navbar";
import Main from "./Main/Main";
import classes from "./LandingPage.module.css";
import ProjectBar from "./SideBar/ProjectBar";
import ContextProvider from "../../ContextProvider";

const LandingPage = () => {
	return (
		<ContextProvider>
			<ResponsiveAppBar onClickcreate />
			<div className={classes.gen}>
				<ProjectBar />
				<Main />
			</div>
		</ContextProvider>
	);
};
export default LandingPage;
