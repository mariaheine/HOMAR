import React, { Component } from "react";
import { connect } from "react-redux";

import { createPost } from "./../../../reduxStore/actions/postActions";

class CreatePost extends Component {
  state = {
    content: ""
  };

  handleChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    //   console.log(this.state);
    this.props.createPost(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>POST CONTENT</h5>
          <div>
            <label htmlFor="content">Content</label>
            <input type="text" onChange={this.handleChange} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePost);
