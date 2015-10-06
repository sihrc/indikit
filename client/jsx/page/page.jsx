var Dropzone = require("./dropzone.jsx");
var Cookie = require("./cookie");

var FR = new FileReader();
FR.onload = function(e) {
  var result = e.target.result;
  $("#base64").val(result.substr(result.indexOf(",") + 1));
  $("#base64").trigger("input");
};

var loadUrl = function(e) {
  if (e.keyCode == 13) {
    convertImgToBase64URL($(e.target).val(), function(base64) {
      $("#base64").val(base64.substr(base64.indexOf(",") + 1));
    });
  }
};

var Page = React.createClass({
  displayName: "Page",
  getInitialState: function() {
    return {
      keyargs: this.props.api.keyargs || {}
    };
  },
  callAPI: function(e) {
    var $target = $(e.target);
    var state = this.state;
    if ($("#apikey").val() === "") {
      $("#apikey").focus();
      return;
    }
    $target.prop("disabled", true);
    $target.toggleClass("disabled");

    for (var key in state["keyargs"]) {
      if (!state["keyargs"].hasOwnProperty(key)) continue;
      state["keyargs"][key] = $("#value_" + key).val();
    }

    var postPackage = jQuery.extend({}, state["keyargs"]);
    postPackage["host"] = $("#host").val();
    if (!postPackage["host"]) {
      postPackage["host"] = "indicoapi-server:5000";
    }
    postPackage["key"] = $("#apikey").val();

    if (this.props.api.type === "image") {
      postPackage["data"] = $("#base64").val();
    } else if (this.props.api.type === "text") {
      postPackage["data"] = $("#textdata").val();
    } else {
      postPackage["data"] = $("#textdata").val();
    }

    $.post("/kit/api/" + this.props.api.name, postPackage, function(
      data,
      status
    ) {
      Cookie.setCookie("apikey", $("#apikey").val());
      Cookie.setCookie("host", $("#host").val());
      if (postPackage["collection"]) {
        Cookie.setCookie("collection", postPackage["collection"]);
      }
      $("#status").text(status.toUpperCase());
      $("#results").val(JSON.stringify(JSON.parse(data.results), null, 2));
      $("#apikey").defaultValue = $("#apikey").val();
      $target.prop("disabled", false);
      $target.toggleClass("disabled");
    }).error(function(err) {
      $target.prop("disabled", false);
      $target.toggleClass("disabled");
      alert("An error occurred! Sorry about that. Let us know!");
    });
  },
  addKeywordArg: function(e) {
    var _state = this.state;
    var key = $("#key")
      .val()
      .trim();
    var value = $("#value")
      .val()
      .trim();
    if (key && value) {
      var val = parseFloat(value);
      value = isNaN(val) ? value : val;
      _state["keyargs"][key] = value;
      $("#key").val("");
      $("#value").val("");
      $("#key").focus();
    }
    this.setState(_state);
  },
  removeKey: function(e) {
    var _state = this.state;
    var $target = $(e.target);
    delete _state["keyargs"][$target.attr("id").substring(4)];
    this.setState(_state);
  },
  onDrop: function(files) {
    FR.readAsDataURL(files[0]);
  },
  componentDidUpdate: function() {
    $("#imageurl").keyup(loadUrl);
    $("#status").text(" ?");
    $("#results").val("");
  },
  render: function() {
    var _this = this;
    var renderKeyword = function(key) {
      return (
        <div>
          <input
            id={"key_" + key}
            type="text"
            placeholder="Key"
            defaultValue={key}
          />
          <input
            id={"value_" + key}
            defaultValue={_this.state.keyargs[key]}
            placeholder="Value"
            type="text"
          />
          <a id={"key_" + key} onClick={_this.removeKey}>
            Remove
          </a>
        </div>
      );
    };

    var textData = function() {
      return (
        <div className="data">
          <h5>Text Data</h5>
          <input
            id="textdata"
            className="textareainput"
            rows="1"
            wrap="soft"
            style={{
              padding: "5px",
              height: "40px",
              minHeight: "1em",
              maxHeight: "40px"
            }}
          />
        </div>
      );
    };

    var imageData = function() {
      return (
        <div className="data">
          <Dropzone
            activeClassName="dropzoneactive"
            className="dropzone"
            onDrop={_this.onDrop}
          >
            <div>
              Try dropping some files here, or click to select files to upload.
            </div>
          </Dropzone>
          <h5>Image URL</h5>
          <input id="imageurl" placeholder="URL" type="text" />
          <h5>Base64 Data</h5>
          <textarea id="base64" rows="1" wrap="soft" />
        </div>
      );
    };

    return (
      <div className="page">
        <h1>{this.props.api.title}</h1>
        <a
          target="_blank"
          href={"https://indico.io/blog/docs/indico-api/custom-collections/"}
        >
          More Info
        </a>
        <p>
          <span>REQUEST</span>
        </p>
        {this.props.api.type === "image" ? imageData() : textData()}
        <h5>Keywords Arguments</h5>
        <div className="keyarg-input">
          {Object.keys(this.props.api.keyargs).map(renderKeyword)}
        </div>
        <div className="keyarg-input">
          <input id="key" placeholder="Key" type="text" />
          <input id="value" placeholder="Value" type="text" />
          <a id="addkey" onClick={this.addKeywordArg}>
            Add
          </a>
        </div>
        <hr />
        <p>
          <span>RESULTS</span>
        </p>
        <h5>
          Status Code:
          <span id="status" style={{ marginLeft: "5px" }}>
            {" "}
            ?
          </span>
        </h5>
        <textarea
          id="results"
          readOnly
          rows="5"
          style={{ height: "4020px" }}
          wrap="soft"
        />
        <div className="footer">
          <div>
            <a target="_blank" href="https://indico.io/register">
              Need an API key?
            </a>
          </div>
          <input
            id="apikey"
            placeholder="Enter Your API Key"
            type="text"
            defaultValue={Cookie.getCookie("apikey")}
          />
          <input
            id="host"
            placeholder="Host (Optional)"
            type="text"
            defaultValue={Cookie.getCookie("host")}
          />
          <button className="submit" id="submit" onClick={this.callAPI}>
            Run
          </button>
        </div>
      </div>
    );
  }
});

module.exports = Page;
