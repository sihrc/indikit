var SideBar = require('../sidebar/side_bar.jsx');

var Api = React.createClass({
  render: function() {
    return (
      <div className="page-with-sidebar page-sidebar-expanded">
          <SideBar />
      </div>
    );
  }
});

module.exports = Api;
