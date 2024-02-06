const authRouter = require("./authRoutes");
const jobRouter = require("./jobRoutes");
const categoryRouter = require("./categoryRoutes");
const companyRouter = require("./companyRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/jobs", jobRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/companies", companyRouter);
};

module.exports = mountRoutes;
