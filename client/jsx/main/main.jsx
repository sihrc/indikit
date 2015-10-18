var APIS = require("./api.jsx");
var Sidebar = require("../sidebar/sidebar.jsx");

var Main = React.createClass({
  getInitialState: function() {
    return {
      "api": APIS[0]["sentiment"]
    };
  },
  // sidebar onclick
  clickedApi: function(api) {
    return _.bind(function(e) {
      e.preventDefault();
      this.setState({
        "api": api
      });
    }, this);
  },
  render: function() {
    return (
      <div className="main page-with-sidebar page-sidebar-expanded">
        <Sidebar apis={APIS} itemClickHandler={this.clickedApi}/>
      </div>
    )
  }
});

module.exports = Main;
