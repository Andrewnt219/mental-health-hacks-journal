const { db } = require("../utils/init");
const { thisWeekTracker } = require("./weeklyTrackers");

exports.setMood = (req, res) => {
  const moodNumber = req.body.mood;
  const dateOfWeek = new Date().getDay();
  thisWeekTracker(req.user.userId)
    .then((tracker) => {
      tracker.moodSelected[dateOfWeek - 1] = moodNumber;
      return db.doc(`/weeklyTrackers/${tracker.trackerId}`).set(tracker);
    })
    .then(() => {
      res.status(200).json({ message: "Set mood successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong, please try again" });
    });
};
