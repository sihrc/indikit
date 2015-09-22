var text_api_names = [
  "Sentiment",
  "Sentiment HQ",
  "Text Tags",
  "Language",
  "Political",
  "Keywords",
  "Named Entities",
  "Twitter Engagement",
  "Intersections",
  "Analyze Text"
];

var image_api_names = [
  "Facial Emotion Recognition",
  "Image Features",
  "Facial Features",
  "Facial Localization",
  "Content Filtering",
  "Image Recognition",
  "Analyze Image",
];

var SideBar = React.createClass({
  getInitialState: function() {
    return {
      sidebarOpen: true,
      docked: true
    };
  },

  render: function() {
    var text_apis = [];
    text_api_names.forEach(function (each) {
      text_apis.push((<li className="tier-2">
        <a id="api">
          {each}
        </a>
      </li>))
    });

    var image_apis = [];
    image_api_names.forEach(function (each) {
      image_apis.push((<li className="tier-2">
        <a id="api">
          {each}
        </a>
      </li>))
    });

    return (
      <div className="sidebar-wrapper">
        <ul className="nav nav-sidebar">
          <li className="tier-1">
            <a> Text </a>
          </li>
            <ul className="nav nav-sidebar">
              {text_apis}
            </ul>
        </ul>
        <ul className="nav nav-sidebar">
          <li className="tier-1">
            <a> Image </a>
          </li>
            <ul className="nav nav-sidebar">
              {image_apis}
            </ul>
        </ul>
      </div>
    );
  }
});

module.exports = SideBar;
