var Dropzone = require("./dropzone.jsx");

var FR = new FileReader();
FR.onload = function(e) {
  var result = e.target.result;
  $("#base64").val(result.substr(result.indexOf(',') + 1));
  $('#base64').trigger('input');
};

var loadUrl = function(e) {
  if (e.keyCode == 13) {
    convertImgToBase64URL($(e.target).val(), function(base64) {
      $("#base64").val(base64.substr(base64.indexOf(',') + 1));
    });
  }
}

var Page = React.createClass({
  displayName: "Page",
  getInitialState: function() {
    return {
      keyargs: {}
    };
  },
  callAPI: function(e) {
    var $target = $(e.target);
    $target.prop('disabled', true);
    $target.toggleClass("disabled");

    var postPackage = this.state["keyargs"];
    postPackage["data"] = this.props.api.type === "image"
      ? $("#base64").val()
      : $("#textdata").val();
    postPackage["cloud"] = $("#cloud").val();
    postPackage["key"] = $("#apikey").val();

    $.post("/api/" + this.props.api.name, postPackage, function(data, status) {
      $("#status").text(status.toUpperCase());
      $("#results").val(data.results);
      $target.prop("disabled", false);
      $target.toggleClass("disabled");
    });
  },
  addKeywordArg: function(e) {
    var _state = this.state;
    var key = $("#key").val();
    var value = $("#value").val();
    if (key && value) {
      _state["keyargs"][key.trim()] = value.trim();
      $("#key").val("");
      $("#value").val("");
      $("#key").focus();
    }
    this.setState(_state);
  },
  removeKey: function(e) {
    var _state = this.state;
    var $target = $(e.target);

    delete _state["keyargs"][$target.attr("id")];
    this.setState(_state);
  },
  onDrop: function(files) {
    FR.readAsDataURL(files[0]);
  },
  componentDidUpdate: function() {
    $("#imageurl").keyup(loadUrl);
  },
  render: function() {
    var _this = this;
    var renderKeyword = function(key) {
      return (
        <button id={key} onClick={_this.removeKey}>{key}
          :
          {_this.state[key]}</button>
      )
    };

    var textData = function() {
      return (
        <div className="data">
          <h5>Text Data</h5>
          <textarea id="textdata" rows="1" wrap="soft"></textarea>
        </div>
      )
    };

    var imageData = function() {
      return (
        <div className="data">
          <Dropzone activeClassName="dropzoneactive" className="dropzone" onDrop={_this.onDrop}>
            <div>
              Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          <h5>
            Image URL</h5>
          <input id="imageurl" placeholder="URL" type="text"></input>
          <h5>
            Base64 Data</h5>
          <textarea id="base64" rows="1" wrap="soft"></textarea>
        </div>
      )
    }

    return (
      <div className="page">
        <h1>{this.props.api.title}</h1>
        <p>
          <span>
            REQUEST
          </span>
        </p>
        {this.props.api.type === "text"
          ? textData()
          : imageData()}
        <h5>Keywords Arguments</h5>
        <div className="keyarg-input">
          <input id="key" placeholder="Key" type="text"></input>
          <input id="value" placeholder="Value" type="text"></input>
          <a id="addkey" onClick={this.addKeywordArg}>Add</a>
        </div>
        <div className="keyargs">{Object.keys(this.state["keyargs"]).map(renderKeyword)}</div>
        <hr></hr>
        <p>
          <span>
            RESULTS
          </span>
        </p>
        <h5>Status Code:
          <span id="status">  ?</span>
        </h5>
        <textarea id="results" readOnly rows="1" wrap="soft"></textarea>
        <div className="footer">
          <input id="apikey" placeholder="API Key" type="text"></input>
          <input id="cloud" placeholder="Cloud" type="text"></input>
          <button className="submit" id="submit" onClick={this.callAPI}>Run</button>
        </div>
      </div>
    );
  }
});

module.exports = Page;
