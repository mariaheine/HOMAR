import React, { Component } from "react";
import { connect } from "react-redux";
// import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";

const notificationsContainerStyle = {
  padding: "0.2rem 0.5rem",
}

class Notifications extends Component {
  render() {
    const { notifications } = this.props;

    // console.log(notifications);

    return (
      <div style={notificationsContainerStyle}>
        <h2>Just some 📬</h2>
        <ul className="notifications">
          {notifications &&
            notifications.map(item => {
              return (
                <li key={item.id}>
                  <span>{item.content} </span>
                  {/* <span>{`${moment(item.time.toDate())}`}</span> */}
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
  return {
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  // firestoreConnect([{ collection: "notifications", orderBy: ['time', 'desc'], limit: 27 }])
)(Notifications);
