import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import { setLinkedUrl } from "../../../../../reduxStore/actions/postEditActions";


const styles = {
  urlInput: {
    position: "fixed",
    width: "50vw",
    bottom: "1vh",
    left: "25%"
  }
};

class UrlInputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "asd"
    };
  }

  handleLinkUrlChange = e => {
    this.setState({ url: e.target.value });
  };

  onClick = e => {
    console.log(this.state.url)
    this.props.setLinkedUrl(this.state.url);
  }

  render() {
    var { url, onUrlChange, isEnabled } = this.props;

    // Untill changed in the parent
    isEnabled = true;

    var UrlInput = isEnabled ? (
      <div style={styles.urlInput}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button onClick={this.onClick} >Input link/image/video urls here:</Button>
          </InputGroupAddon>
          <Input
            placeholder="https://www.youtube.com/watch?v=YjUhBVkJoMk"
            value={this.state.url}
            onChange={this.handleLinkUrlChange}
            // onClick={this.focus}
          />
        </InputGroup>
      </div>
    ) : null;

    return <div>{ UrlInput }</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {state}
}

const mapDispatchToProps = dispatch => {
    return {
        setLinkedUrl: linkedUrl => dispatch(setLinkedUrl(linkedUrl))
    }
}

// moze jeszcze wyrzuc componse
export default connect(mapStateToProps, mapDispatchToProps)(UrlInputField);
