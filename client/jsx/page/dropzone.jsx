var accept = require('attr-accept');
var Dropzone = React.createClass({

  getDefaultProps: function() {
    return {
      disableClick: false,
      multiple: true
    };
  },

  getInitialState: function() {
    return {
      isDragActive: false
    };
  },

  propTypes: {
    onDrop: React.PropTypes.func,
    onDropAccepted: React.PropTypes.func,
    onDropRejected: React.PropTypes.func,
    onDragEnter: React.PropTypes.func,
    onDragLeave: React.PropTypes.func,

    style: React.PropTypes.object,
    activeStyle: React.PropTypes.object,
    className: React.PropTypes.string,
    activeClassName: React.PropTypes.string,
    rejectClassName: React.PropTypes.string,

    disableClick: React.PropTypes.bool,
    multiple: React.PropTypes.bool,
    accept: React.PropTypes.string
  },

  allFilesAccepted: function(files) {
    var _this = this;
    return files.map(function(file) {
      return accept(file, _this.props.accept);
    });
  },

  onDragEnter: function(e) {
    e.preventDefault();

// This is tricky. During the drag even the dataTransfer.files is null
// But Chrome implements some drag store, which is accesible via dataTransfer.items
    var dataTransferItems = e.dataTransfer && e.dataTransfer.items
      ? e.dataTransfer.items
      : [];

// Now we need to convert the DataTransferList to Array
    var itemsArray = Array.prototype.slice.call(dataTransferItems);
    var allFilesAccepted = this.allFilesAccepted(itemsArray);

    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    });

    if (this.props.onDragEnter) {
      this.props.onDragEnter(e);
    }
  },

  onDragOver: function(e) {
    e.preventDefault();
  },

  onDragLeave: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  },

  onDrop: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false,
      isDragReject: false
    });
    console.log(e.target.files);
    console.log(e.dataTransfer);
    var droppedFiles = e.dataTransfer
      ? e.dataTransfer.files
      : e.target.files;
    var max = this.props.multiple
      ? droppedFiles.length
      : 1;
    var files = [];
    console.log("DROPPED", droppedFiles[0]);
    for (var i = 0; i < max; i++) {
      var file = droppedFiles[i];
      file.preview = URL.createObjectURL(file);
      files.push(file);
    }

    if (this.props.onDrop) {
      this.props.onDrop(files, e);
    }

    if (this.allFilesAccepted(files)) {
      if (this.props.onDropAccepted) {
        this.props.onDropAccepted(files, e);
      }
    } else {
      if (this.props.onDropRejected) {
        this.props.onDropRejected(files, e);
      }
    }
  },

  onClick: function() {
    if (!this.props.disableClick) {
      this.open();
    }
  },

  open: function() {
    var fileInput = React.findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  },

  render: function() {

    var className;
    if (this.props.className) {
      className = this.props.className;
      if (this.state.isDragActive) {
        className += ' ' + this.props.activeClassName;
      };
      if (this.state.isDragReject) {
        className += ' ' + this.props.rejectClassName;
      };
    };

    var style,
      activeStyle;
    if (this.props.style || this.props.activeStyle) {
      if (this.props.style) {
        style = this.props.style;
      }
      if (this.props.activeStyle) {
        activeStyle = this.props.activeStyle;
      }
    } else if (!className) {
      style = {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5
      };
      activeStyle = {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      };
    }

    var appliedStyle = {};
    if (activeStyle && this.state.isDragActive) {
      $.extend(appliedStyle, style, activeStyle);
    } else {
      appliedStyle = style;
    };

    return (
      <div className={className} onClick={this.onClick} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop} style={appliedStyle}>
        {this.props.children}
        <input accept={this.props.accept} multiple={this.props.multiple} onChange={this.onDrop} ref='fileInput' style={{
          display: 'none'
        }} type='file'></input>
      </div>
    );
  }

});

module.exports = Dropzone;