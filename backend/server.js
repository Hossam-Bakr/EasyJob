const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./config/database");

// Initialize dotenv
dotenv.config({ path: "config.env" });
const ApiError = require("./utils/ApiError");
const globalErrorHandler = require("./controllers/errorController");

// Routes
const mountRoutes = require("./routes");


// Import models
const defineDBRelationships = require("./models/modelsRelationships");

// defineDBRelationships();


const app = express();
app.use(cors());
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(globalErrorHandler);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routes
mountRoutes(app);

// Error handlers
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});


app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// process.on("unhandledRejection", (err) => {
//   console.log("UNHANDLED REJECTION! 💥 Shutting down...");
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

function testDB() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      return sequelize.sync(); // { force: true }
    })
    .then(() => {
        console.log("Models synchronized successfully.");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
}
testDB();





// const express = require("express");
// const dotenv = require("dotenv");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const ApiError = require("./utils/ApiError");

// process.on("uncaughtException", (err) => {
//   console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// dotenv.config({ path: "config.env" });
// const { defineDBRelationships } = require("./models/modelsRelationships");

// const globalErrorHandler = require("./controllers/errorController");

// // Routes
// const mountRoutes = require("./routes");

// defineDBRelationships();

// // express app
// const app = express();

// app.use(cors());
// app.options("*", cors());

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// // Cookie parser
// app.use(cookieParser());

// app.use(express.json());

// // Mount Routes
// mountRoutes(app);

// app.all("*", (req, res, next) => {
//   next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

// const PORT = process.env.PORT || 3000;
// const server = app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}`);
// });

// process.on("unhandledRejection", (err) => {
//   console.log("UNHANDLED REJECTION! 💥 Shutting down...");
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
