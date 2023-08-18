import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import ProjectModal from "./Modals/ProjectModal";
import { UserContext } from "../../App";
import { useContext } from "react";

export default function ResponsiveAppBar() {
	const { setIsAuthenticated } = useContext(UserContext);
	const logout = () => {
		localStorage.setItem("token", null);
		setIsAuthenticated(false);
	};

	return (
		<AppBar sx={{ display: "block", backgroundColor: "#3B9D97" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "",
							fontWeight: 700,
							letterSpacing: ".35rem",
							color: "Beige",
							textDecoration: "none",
						}}
					>
						Project Sensei
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "right",
						}}
					>
						<ProjectModal />
						<Button
							key="Logout"
							onClick={logout}
							sx={{
								my: 2,
								color: "white",
								display: "block",
								marginRight: "20px",
							}}
						>
							Logout
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
