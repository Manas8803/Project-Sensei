const express = require("express");
const app = express();
const { notFound } = require("./Middleware/Not Found");
const cors = require("cors");

//^ DB
require("./DB/connect");
require("express-async-errors");
const { connectDB } = require("./DB/connect");

//^ Routers
const UserRouter = require("./Routes/user");
const ProjectRouter = require("./Routes/project");
const TaskRouter = require("./Routes/task");

//^ middleware
app.use(express.json());
app.use(cors());
app.use("/user", UserRouter); //& Always use this middleware function first before notFound route
app.use("/user/login/projects", ProjectRouter, TaskRouter);
app.use(notFound);

require("dotenv").config();
const port = process.env.PORT || 3000;

const startApp = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(port, () => {
			console.log(`Server started successfully at port ${port}`);
		});
	} catch (error) {
		console.log("Couldn't connect to the DB");
	}
};
startApp();
