import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";

class Notifications extends Component {
  render() {
    const { notifications } = this.props;

    // console.log(notifications);

    return (
      <div>
        <h3>Blog Activity</h3>
        <ul className="notifications">
          {notifications &&
            notifications.map(item => {
              return (
                <li key={item.id}>
                  <span>{item.content} </span>
                  <span>{moment(item.time.toDate()).fromNow()}</span>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "notifications", limit: 5, orderBy: ['time', 'desc'] }])
)(Notifications);
