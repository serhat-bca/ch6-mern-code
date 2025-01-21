const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  // hash the password using bcrypt and salt factor 10
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
