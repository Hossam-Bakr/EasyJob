const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/ApiError");
const globalErrorHandler = require("./controllers/errorController");
const sequelize = require("./config/database");
const mountRoutes = require("./routes");
const defineDBRelationships = require("./models/modelsRelationships");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

mountRoutes(app);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

defineDBRelationships();

sequelize
  //.sync()
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:\n", error);
  });
