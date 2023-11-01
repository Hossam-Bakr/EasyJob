const authRouter = require("./authRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
};

module.exports = mountRoutes;
