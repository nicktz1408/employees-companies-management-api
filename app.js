const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");

const userCompanyRouter = require("./routers/user-company");
const userRouter = require("./routers/user");
const employeeRouter = require("./routers/employee");
const companyRouter = require("./routers/company");
const productRouter = require("./routers/product");
const contactsRouter = require("./routers/contacts");
const viewsRouter = require("./routers/views");
const requestsRouter = require("./routers/requests");
const notificationsRouter = require("./routers/notifications");
const conversationsRouter = require("./routers/conversations");
const chatRouter = require("./routers/chat");

require("./controllers/cron-controller");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --- CONFIG ---


// --- ROUTERS ---
app.use("/images", express.static("./images"));

if(process.env.NODE_ENVIRONMENT === "development")
{
	app.get("/settings", (req, res) => {
		console.log(process.env);
		res.json(process.env);
	});
}

app.get("/", (req, res) => {
	res.status(200).send("Welcome to the DBC API!");
});

app.use("/user/company", userCompanyRouter);
app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.use("/company", companyRouter);
app.use("/product", productRouter);
app.use("/contacts", contactsRouter);
app.use("/views", viewsRouter);
app.use("/requests", requestsRouter);
app.use("/notifications", notificationsRouter);
app.use("/conversations", conversationsRouter);
app.use("/chat", chatRouter);

app.get("*", (req, res) => {
	res.status(404).send("Not Found!");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log("The server is running on PORT " + port);
});