module.exports = function (app) {
  app.post("/", function (req, res) {
    res.status(200).json({
      "results": "hello world"
    });
  });
}
