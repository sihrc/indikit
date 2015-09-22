var Page = React.createClass({
  displayName: "Page",
  render: function() {
    return (
      <div className="page">
        <h1>{this.props.api.title}</h1>
      </div>
    );
  }
});

module.exports = Page;
