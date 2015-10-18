var SideBar = React.createClass({
  render: function() {
    var APIS = this.props.apis;
    var clickHandler = this.props.itemClickHandler;
    var text_apis = [],
        image_apis = [];

    _.each(APIS, function(api) {
      var name = Object.keys(api)[0];
      var meta = api[name];
      var html = (<li>
        <a id={name} className="tier-2" onClick={clickHandler(meta)}>
          {meta.title}
        </a>
      </li>);

      (meta.type === "image" ? image_apis : text_apis).push(html);
    });

    return (
      <nav>
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
      </nav>
    );
  }
});

module.exports = SideBar;
