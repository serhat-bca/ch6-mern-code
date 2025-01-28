const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  if (!password || password.length < 4) {
    return res
      .status(400)
      .json({ error: "Password required. Minimum 4 characters" });
  }
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

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("todos", { task: 1, done: 1 });
  res.json(users);
});

module.exports = usersRouter;
