const authRouter = require("./authRoutes");
const jobRouter = require("./jobRoutes");
const categoryRouter = require("./categoryRoutes");
const skillRouter = require("./skillRoutes");
const companyRouter = require("./companyRoutes");
const userRouter = require("./userRoutes");
const specificTasksRouter = require("./specificTasksRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/jobs", jobRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/skills", skillRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/companies", companyRouter);
  app.use("/api/v1/specificTasks", specificTasksRouter);
};

module.exports = mountRoutes;
