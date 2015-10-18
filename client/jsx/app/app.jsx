Router = window.ReactRouter;
Route = window.ReactRouter.Route;
RouteHandler = window.ReactRouter.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    );
  }
});

var routes = (
  <Route handler={App}>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById("container"));
});

module.exports = App;
