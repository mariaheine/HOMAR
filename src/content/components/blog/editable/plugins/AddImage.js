import React, { Component } from "react";
import { connect } from "react-redux";

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

class AddImage extends Component {
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

  addImage = () => {
    const { editorState, onChange, linkedUrl } = this.props;
    console.log(linkedUrl);
    onChange(this.props.modifier(editorState, linkedUrl ));
  };

  render() {
    const { linkedUrl } = this.props;


    return (
      <div style={styles.container}>
        <Badge
          style={styles.videoAddBadge}
          color="primary"
          id="imageAdd"
          type="button"
          onClick={this.togglePopover}
        >
          Image
        </Badge>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="imageAdd"
        >
          <PopoverHeader style={styles.popoverHeader}>
            <Button
              color="warning"
              style={styles.popoverButton}
              onClick={this.addImage}
            >
              {`Click to add image ⛺️`}
            </Button>
          </PopoverHeader>
          <PopoverBody>
            {`Make sure the link has .jpg or other file format ending`}
            <br />
            <br />
            {linkedUrl}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    linkedUrl: state.postEdit.linkedUrl
  };
};

export default connect(mapStateToProps)(AddImage);