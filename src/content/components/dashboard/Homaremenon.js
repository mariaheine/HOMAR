import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import EditablePostList from "./EditablePostList";

import "./../../../styles/components/dashboard/homaremenon.css";

class Homaremenon extends Component {
  render() {
    return (
      <div className="container">
        <div className="item createNewPost">
          <Link
            to={{
              pathname: "/create",
              state: { hello: true }
            }}
          >
            <button>Create new post!</button>
          </Link>
        </div>
        <EditablePostList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
};

export default connect(mapStateToProps)(Homaremenon);
