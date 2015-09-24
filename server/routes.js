var indico = require("indico.io");

var get = function get(json, key) {
  if (key in json) {
    var value = json[key];
    delete json[key];
    return value;
  }
  return null;
}

module.exports = function (app) {
  app.post("/api/:name", function(req, res) {
    var api = req.params.name;
    var post = req.body;
    var key = get(post, "key");
    var data = get(post, "data");
    console.log("Request made", "API:", api, "Post", req.body, "Key", key, "data", data);
    indico.apiKey = key;
    if (api in indico) {
      indico[api](data, post).then(function(result) {
        res.status(200).json({
          "results": JSON.stringify(result,null, 4)
        });
      }).catch(function(err) {
        res.status(501).json({
          "results": err
        });
      });
    } else {
      res.status(400).json({
        "results": api + " is not a valid api"
      });
    }
  });
}
