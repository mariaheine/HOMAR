const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

/* NOTIFICATIONS */

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => console.log("notification added", doc));
};

exports.postCreatedNotification = functions.firestore
  .document("blogPosts/{postId}")
  .onCreate(blogPost => {
    const post = blogPost.data();

    return admin
      .firestore()
      .collection("users")
      .doc(post.authorId)
      .get()
      .then(user => {
        const userData = user.data();
        const notification = {
          content: `${userData.nick} added new post`,
          time: post.createdAt
        };
        createNotification(notification);
      });
  });

exports.userJoinedNotification = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();
      const notification = {
        content: `${newUser.nick} registered`,
        time: newUser.registeredAt
      };

      return createNotification(notification);
    });
});

/* END */

/* GRANTING USER PRIVLIDGES */

exports.grantModClaims = functions.https.onCall((data, context) => {
  // We are returning this because it's gonna return a promise
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        isMod: true
      });
    })
    .then(() => {
      return {
        message: `Badum tss! ${data.email} has become a Moderator!`
      };
    })
    .catch(err => {
      return err;
    });
});

// Disabled because there is only need for one sudo
// ALL THE POWER TO ME
// xd

// exports.grantSudoClaims = functions.https.onCall((data) => {
//     // We are returning this because it's gonna return a promise
//     return admin
//       .auth()
//       .getUserByEmail(data.email)
//       .then(user => {
//         return admin.auth().setCustomUserClaims(user.uid, {
//           isMod: true,
//           isSudo: true
//         });
//       })
//       .then(() => {
//         return {
//           message: `Badum tss! ${data.email} has become a sudo!`
//         };
//       })
//       .catch(err => {
//         return err;
//       });
//   });
