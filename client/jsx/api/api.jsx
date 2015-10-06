var SideBar = require("../sidebar/side_bar.jsx");
var Page = require("../page/page.jsx");
var Cookie = require("../page/cookie.js");

var format_api = function format_api(name) {
  var api_name = name.toLowerCase().replace(/\s+/g, "");
  if (api_name === "facialemotionrecognition") {
    api_name = "fer";
  }
  return api_name;
};

var get_api = function get_api(name, type) {
  var api_name = format_api(name);
  return {
    title: name,
    name: api_name,
    type: type,
    keyargs: {}
  };
};

var Api = React.createClass({
  getInitialState: function() {
    return {
      title: "Predict",
      name: "custom/predict",
      type: "custom",
      keyargs: { collection: Cookie.getCookie("collection") }
    };
  },
  handle: function(name, type) {
    var _this = this;
    return function(e) {
      e.preventDefault();
      if (type === "custom") {
        _this.setState({
          title: name,
          name: "custom/" + name.toLowerCase(),
          type: type,
          keyargs: { collection: Cookie.getCookie("collection") }
        });
      } else {
        _this.setState(get_api(name, type));
      }
    };
  },
  render: function() {
    return (
      <div className="main page-with-sidebar page-sidebar-expanded">
        <SideBar format_api={format_api} handle={this.handle} />
        <Page api={this.state} />
      </div>
    );
  }
});

module.exports = Api;
