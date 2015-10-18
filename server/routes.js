module.exports = function (app) {
  app.post("/", function(req, res) {
    res.status(200).json({
      "data": "Hello World"
    });
  });
};
