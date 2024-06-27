const authRouter = require('./authRoutes');
const jobRouter = require('./jobRoutes');
const interviewRouter = require('./interviewRoutes');
const industryRouter = require('./industryRoutes');
const categoryRouter = require('./categoryRoutes');
const skillRouter = require('./skillRoutes');
const companyRouter = require('./companyRoutes');
const userRouter = require('./userRoutes');
const specificTasksRouter = require('./specificTasksRoutes');
const pricingPlanRouter = require('./pricingPlanRoutes');
const subscriptionRouter = require('./subscriptionRoutes');
const contactRouter = require('./contactRoutes');
const contactMessageRouter = require('./contactMessageRoutes');
const userManagementRouter = require('./userManagementRoutes');
const companyManagementRouter = require('./companyManagementRoutes');

const mountRoutes = (app) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/jobs', jobRouter);
  app.use('/api/v1/interviews', interviewRouter);
  app.use('/api/v1/industries', industryRouter);
  app.use('/api/v1/categories', categoryRouter);
  app.use('/api/v1/skills', skillRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/companies', companyRouter);
  app.use('/api/v1/specificTasks', specificTasksRouter);
  app.use('/api/v1/plans', pricingPlanRouter);
  app.use('/api/v1/subscriptions', subscriptionRouter);
  app.use('/api/v1/contact', contactRouter);
  app.use('/api/v1/contactMessages', contactMessageRouter);
  app.use('/api/v1/userManagement', userManagementRouter);
  app.use('/api/v1/companyManagement', companyManagementRouter);

};

module.exports = mountRoutes;
