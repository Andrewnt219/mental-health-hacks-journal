const { db } = require("../utils/init");

const getAllWeeklyTrackersOfUser = (userId) => {
  return db
    .collection("weeklyTrackers")
    .where("userId", "==", `${userId}`)
    .orderBy("dateCreated", "desc")
    .get()
    .then((data) => {
      let trackers = [];
      data.forEach((doc) => {
        trackers.push({
          trackerId: doc.id,
          userId: doc.data().userId,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate, // after 7 days
          moodSelected: doc.data().moodSelected,
          journalWritten: doc.data().journalWritten,
        });
      });

      return trackers;
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Problem in getting all weekly trackers of a user");
    });
};

exports.thisWeekTracker = (userId) => {
  const current = new Date().getTime();
  return getAllWeeklyTrackersOfUser(userId)
    .then((weeklyTrackers) => {
      const tracker = weeklyTrackers.filter(
        (tracker) => current >= tracker.startDate && current <= tracker.endDate
      );

      return tracker;
    })
    .catch((err) => {
      console.error(err);
      throw new Error("Something went wrong, please try again");
    });
};

exports.getThisWeekTracker = (req, res) => {
  this.thisWeekTracker(req.user.userId)
    .then((tracker) => {
      res.status(200).json(tracker);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Something went wrong, please try again" });
    });
};

exports.createAWeeklyTrackerForUser = (userId) => {
  const newWeeklyTracker = {
    userId: userId,
    startDate: new Date().getTime(),
    endDate: new Date().getTime() + 604800000, // after 7 days
    moodSelected: [0, 0, 0, 0, 0, 0, 0],
    journalWritten: [false, false, false, false, false, false, false],
  };

  return db.collection("weeklyTrackers").add(newWeeklyTracker);
};

exports.createAWeekTrackerForNewUser = (userId) => {
  const current = new Date();
  const first = current.getDate() - current.getDay() + 1;
  const last = first + 7;

  const newWeeklyTracker = {
    userId: userId,
    startDate: current.setDate(first),
    endDate: current.setDate(last),
    moodSelected: [0, 0, 0, 0, 0, 0, 0],
    journalWritten: [false, false, false, false, false, false, false],
  };

  return db.collection("weeklyTrackers").add(newWeeklyTracker);
};
