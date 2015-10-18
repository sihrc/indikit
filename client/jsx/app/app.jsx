Router = window.ReactRouter;
Route = window.ReactRouter.Route;
RouteHandler = window.ReactRouter.RouteHandler;
_ = require("lodash");

var Main = require("../main/main.jsx");

var App = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route path="/" handler={Main}></Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById("container"));
});

module.exports = App;
