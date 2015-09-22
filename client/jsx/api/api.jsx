var SideBar = require("../sidebar/side_bar.jsx");
var Page = require("../page/page.jsx");

var format_api = function format_api (name) {
  var api_name = name.toLowerCase().replace(/\s+/g, '');
  if (api_name === "facialemotionrecognition") {
    api_name = "fer";
  }
  return api_name;
}

var get_api = function get_api(name, type) {
  var api_name = format_api(name);
  return {
    "title": name,
    "api": api_name,
    "type": type
  };
};

var Api = React.createClass({
  getInitialState: function () {
    return {
      title: "Sentiment",
      api: "sentiment",
      type: "text"
    };
  },
  handle: function(name, type) {
    var _this = this;
    return function(e) {
      e.preventDefault();
      _this.setState(get_api(name, type));
    }
  },
  render: function() {
    return (
      <div className="main page-with-sidebar page-sidebar-expanded">
          <SideBar format_api={format_api} handle={this.handle}/>
          <Page api={this.state}/>
      </div>
    );
  }
});

module.exports = Api;
