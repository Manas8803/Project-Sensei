import CardP from "../Card/CardP";
import classes from "./ProjectBar.module.css";
import { useContext } from "react";
import { DataContext } from "../LandingPage";
import axios from "axios";

const ProjectBar = () => {
	const { allp_Data, setAllt_Data } = useContext(DataContext);
	const cardsP = allp_Data.map((p_data) => {
		return (
			<CardP name={p_data.name} handleClick={handleClick} id={p_data._id} />
		);
	});

	async function handleClick(e) {
    const { id } = e.target;
    console.log(id);

    const token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWVhZDEwMDhhOTFjMjFmZjZmYmUzZSIsIm5hbWUiOiJNYW5hcyBTYWhhIiwiaWF0IjoxNjg5MjcwMjg2LCJleHAiOjE2OTE4NjIyODZ9.6L1L7--vcUdcrRz6GTVcGNdYUba3DQTBqNU9-Dn59Fw";
		const header = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const { data } = await axios.get(
				`http://localhost:3000/user/login/projects/tasks/${id}`,
				{ headers: header }
			);
      console.log(data.tasks);
      setAllt_Data(data.tasks);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className={classes.container}>
			<div className={classes.bg}>
				<h1 className={classes.colName}>Project List</h1>
			</div>
			{cardsP}
		</div>
	);
};
export default ProjectBar;
