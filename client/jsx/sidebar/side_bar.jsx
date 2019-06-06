var text_api_names = [
  "Sentiment",
  "Sentiment HQ",
  "Text Tags",
  "Language",
  "Political",
  "Keywords",
  "Named Entities",
  "Twitter Engagement",
  "Intersections"
];

var image_api_names = [
  "Facial Emotion Recognition",
  "Image Features",
  "Facial Features",
  "Facial Localization",
  "Content Filtering",
  "Image Recognition"
];

var custom_api_names = ["Predict", "Info", "Explain"];

var SideBar = React.createClass({
  // handle: function(e) {},
  render: function() {
    var _this = this;

    var custom_apis = [];
    custom_api_names.forEach(function(each) {
      custom_apis.push(
        <li className="tier-2">
          <a
            id={_this.props.format_api(each)}
            onClick={_this.props.handle(each, "custom")}
          >
            {each}
          </a>
        </li>
      );
    });

    var text_apis = [];
    text_api_names.forEach(function(each) {
      text_apis.push(
        <li className="tier-2">
          <a
            id={_this.props.format_api(each)}
            onClick={_this.props.handle(each, "text")}
          >
            {each}
          </a>
        </li>
      );
    });

    var image_apis = [];
    image_api_names.forEach(function(each) {
      image_apis.push(
        <li className="tier-2">
          <a
            id={_this.props.format_api(each)}
            onClick={_this.props.handle(each, "image")}
          >
            {each}
          </a>
        </li>
      );
    });

    return (
      <nav className="sidebar-wrapper">
        <ul className="nav nav-sidebar">
          <li className="tier-1">
            <a> Custom </a>
          </li>
          <ul className="nav nav-sidebar">{custom_apis}</ul>
        </ul>
        <ul className="nav nav-sidebar">
          <li className="tier-1">
            <a> Text </a>
          </li>
          <ul className="nav nav-sidebar">{text_apis}</ul>
        </ul>
        <ul className="nav nav-sidebar">
          <li className="tier-1">
            <a> Image </a>
          </li>
          <ul className="nav nav-sidebar">{image_apis}</ul>
        </ul>
      </nav>
    );
  }
});

module.exports = SideBar;
