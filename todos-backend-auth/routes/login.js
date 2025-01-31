const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
require("dotenv").config();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  const passCheck = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!passCheck) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const payload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  res
    .status(200)
    .json({ token: token, username: user.username, name: user.name });
});

module.exports = loginRouter;
