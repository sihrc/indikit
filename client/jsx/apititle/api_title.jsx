var ApiTitle = React.createClass({
  "displayName": "ApiTitle",
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <a target="_blank" href={this.props.link}> More Info </a>
      </div>
    );
  }
});

module.exports = ApiTitle;
