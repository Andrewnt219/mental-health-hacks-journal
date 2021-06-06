const router = require("express").Router();
const cors = require("cors")({ origin: true });

const Feedback = require("./feedback/index");
const Journal = require("./journal/index");
const Prompt = require("./prompt/index");
const User = require("./user/index");
const WeeklyTracker = require('./weeklyTracker/index');

router.use(cors());

router.use("/", Feedback);
router.use("/", Journal);
router.use("/", Prompt);
router.use("/", User);
router.use('/', WeeklyTracker);

module.exports = router;
