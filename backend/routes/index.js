const authRouter = require("./authRoutes");
const jobRouter = require("./jobRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/jobs", jobRouter);
};

module.exports = mountRoutes;
