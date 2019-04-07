import React, { Component } from "react";
import { Button, Badge, Popover, PopoverHeader, PopoverBody } from "reactstrap";

const styles = {
  container: {
    margin: "0 0.2rem"
  },
  videoAddBadge: {
    fontSize: "1rem",
    fontFamily: "Anonymous Pro, monospace"
  },
  popoverHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  popoverButton: {
    margin: "0 0.5em"
  }
};

class VideoAdd extends Component {
  state = {
    url: "The youtube video url...",
    open: false,
    popoverOpen: false
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false
      });
    }

    this.preventNextClose = false;
  };

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  addVideo = () => {
    const { editorState, onChange } = this.props;
    onChange(this.props.modifier(editorState, { src: this.state.url }));
  };

  changeUrl = evt => {
    this.setState({ url: evt.target.value });
  };

  pasteUrl = () => {
    navigator.clipboard.readText().then(e => {
      this.setState({ url: e });
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <Badge
          style={styles.videoAddBadge}
          color="dark"
          id="videoAdd"
          type="button"
          onClick={this.togglePopover}
        >
          Add Video
        </Badge>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="videoAdd"
        >
          <PopoverHeader style={styles.popoverHeader}>
            <Button
              color="primary"
              style={styles.popoverButton}
              onClick={this.pasteUrl}
            >
              Paste
            </Button>
            <Button
              color="warning"
              style={styles.popoverButton}
              onClick={this.addVideo}
            >
              Add
            </Button>
          </PopoverHeader>
          <PopoverBody>
            {this.state.url}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default VideoAdd;
