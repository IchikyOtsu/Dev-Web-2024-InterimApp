require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const indexRouter = require("./routes/index");
const testDB = require("./routes/testDB");

const userRouter = require("./routes/user");
const usersRouter = require("./routes/users");
const enterprisesRouter = require("./routes/enterprises");
const advertsRouter = require("./routes/advertsNH");
const applicationsRouter = require("./routes/applications");
const chatMessagesRouter = require("./routes/chatMessages");
const schedulesRouter = require("./routes/schedules");
const login = require("./routes/login");
const notificationsRouter = require("./routes/notifications");
const profilRoute = require("./routes/profil");
const authenticateToken = require("./middleware");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.all("*", authenticateToken);
app.use(express.static(path.join(__dirname, "public")));
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use("/", indexRouter);
app.use("/testDB", testDB);
app.use("/api/login", login);
app.use("/api/user", userRouter);
app.use("/api/users", usersRouter);
app.use("/api/enterprises", enterprisesRouter);
app.use("/api/adverts", advertsRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/chat-messages", chatMessagesRouter);
app.use("/api/schedules", schedulesRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/profil", profilRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	console.error(err);
	// render the error page
	res.status(err.status || 500);
	res.send(`error ${err.status || 500}`);
});

module.exports = app;
