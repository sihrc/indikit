var React = require('react'),
    ReactDOM = require('react-dom');

var SideBar = require("../sidebar/sidebar.jsx"),
    Input = require("../input/input.jsx"),
    Output = require("../output/output.jsx");

var App = React.createClass({
  render: function() {
    <div className="indikit-main">
      <SideBar />
      <Input />
      <Output />
    </div>
  }
})


ReactDOM.render(
  <App />,
  document.getElementById('container')
);
