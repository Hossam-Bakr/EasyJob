const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/ApiError");
const globalErrorHandler = require("./controllers/errorController");
const sequelize = require("./config/database");
const mountRoutes = require("./routes");
const defineDBRelationships = require("./models/modelsRelationships");
const session = require("express-session");
const passport = require("passport");
require("./utils/Passport");

const app = express();

app.use(helmet());

app.use(
  session({
    secret: "easyJob",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.options("*", cors());

// limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour!",
});
app.use("/api", limiter);

// app.use(express.json());
app.use((req, res, next) => {
  if (req.originalUrl === "/api/v1/subscriptions/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution:
app.use(
  hpp({
    whitelist: ["keywords"],
  })
);

app.use(compression());

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

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:\n", error);
  });
