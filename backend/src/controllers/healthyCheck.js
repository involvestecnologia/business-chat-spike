const HealthyCheckController = {
  index: (req, res) => {
    res.status(200).send('Application is running');
  },
};

module.exports = HealthyCheckController;
