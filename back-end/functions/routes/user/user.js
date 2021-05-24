const router = require("express").Router();

const { signup, login } = require("../../handlers/users.js");
const { setMood } = require("../../handlers/moods");
const Auth = require("../../utils/auth");

router.get("/", (req, res) => {
  res.status(201).json({ message: "User" });
});

router.post("/signup", signup);
router.post("/login", login);

router.post("/set-mood", Auth, setMood);

module.exports = router;
