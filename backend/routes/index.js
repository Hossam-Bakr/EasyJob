const authController = require('../controllers/authController');

const mountRoutes = (app) => {
  app.use("/api/v1/main", (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Hello from the server side!",
    });
  });

  app.use('/api/v1/auth/user/signup' , authController.userSignup);

  app.use('/api/v1/auth/company/signup' , authController.companySignup);

  app.use('/api/v1/auth/login' , authController.Login);


};

module.exports = mountRoutes;
