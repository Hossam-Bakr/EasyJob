const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");

const globalErrorHandler = require("./controllers/errorController");

// Routes
const mountRoutes = require("./routes");

// Connect with db
dbConnection();

// express app
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Cookie parser
app.use(cookieParser());

app.use(express.json());

// Mount Routes
mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
