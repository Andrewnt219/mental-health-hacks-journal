const router = require("express").Router();
const WeeklyTracker = require("./weeklyTracker");

router.use("/trackers", WeeklyTracker);

module.exports = router;
