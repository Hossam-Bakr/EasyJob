const mountRoutes = (app) => {
  app.use("/api/v1/main", (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Hello from the server side!",
    });
  });
};

module.exports = mountRoutes;
