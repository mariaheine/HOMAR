import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import { setLinkedUrl } from "../../../../../reduxStore/actions/postEditActions";

const styles = {
  urlInput: {
    position: "fixed",
    width: "40vw",
    top: "1vh",
    left: "30vw"
  }
};

class UrlInputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ""
    };
  }

  handleLinkUrlChange = e => {
    this.setState({ url: e.target.value }, () => {
      this.props.setLinkedUrl(this.state.url);
    });
  };

  onClick = e => {
    console.log(this.state.url);
    this.props.setLinkedUrl(this.state.url);
  };

  render() {
    var { isEnabled } = this.props;

    // Untill changed in the parent
    isEnabled = true;

    var UrlInput = isEnabled ? (
      <div style={styles.urlInput}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button color="warning" onClick={this.onClick}>
              {`🐝`}
            </Button>
          </InputGroupAddon>
          <Input
            placeholder="input image/link/video urls here 🌱"
            value={this.state.url}
            onChange={this.handleLinkUrlChange}
          />
        </InputGroup>
      </div>
    ) : null;

    return <div>{UrlInput}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    setLinkedUrl: linkedUrl => dispatch(setLinkedUrl(linkedUrl))
  };
};

// moze jeszcze wyrzuc componse
export default connect(mapStateToProps, mapDispatchToProps)(UrlInputField);
