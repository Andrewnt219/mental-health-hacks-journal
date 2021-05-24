const cors = require("cors");

const functions = require("firebase-functions");
const routes = require("./routes/index");

const { createAWeeklyTrackerForUser } = require("./handlers/weeklyTrackers");
const { getAllUsers } = require("./handlers/users");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.api = functions.https.onRequest(routes);

exports.scheduleWeeklyTracker = functions.pubsub
  .schedule("59 23 * * 0")
  .onRun((context) => {
    getAllUsers()
      .then((users) => {
        users.forEach((user) => {
          createAWeeklyTrackerForUser(user.userId).then(() => {
            console.log("created a weekly tracker successfully");
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
