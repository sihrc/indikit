var Api = require("../api/api.jsx");
var App = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route path="/" handler={Api}></Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById("content"));
});

module.exports = App;
