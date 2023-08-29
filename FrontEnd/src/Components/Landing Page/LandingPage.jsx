import ResponsiveAppBar from "./Navbar";
import Main from "./Main/Main";
import classes from "./LandingPage.module.css";
import ProjectBar from "./SideBar/ProjectBar";

const LandingPage = () => {
	return (
		<>
			<ResponsiveAppBar onClickcreate />
			<div className={classes.gen}>
				<ProjectBar />
				<Main />
			</div>
		</>
	);
};
export default LandingPage;
