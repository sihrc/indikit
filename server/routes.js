
module.exports = function (app) {
  app.post("/api/:name", function(req, res) {
    console.log(req);
  });
}
