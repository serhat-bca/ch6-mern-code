const express = require("express");
const todosRouter = express.Router();
const Todo = require("../models/todo");
const User = require("../models/user");

todosRouter.post("/", async (req, res) => {
  const { task, done, userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  } else {
    const todo = new Todo({ task, done: done || false, user: user._id });
    const savedTodo = await todo.save();
    user.todos = [...user.todos, savedTodo._id];
    await user.save();
    res.json(savedTodo);
  }
});

todosRouter.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

todosRouter.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404).json({ error: "Task not found" });
  } else {
    res.json(todo);
  }
});

todosRouter.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    res.status(404).json({ error: "Task not found!" });
  } else {
    res
      .status(200)
      .json({ message: `The task [${todo.task}] deleted successfully.` });
  }
});

todosRouter.put("/:id", async (req, res) => {
  const { task, done } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { task, done },
    { new: true, runValidators: true }
  );
  if (updatedTodo) {
    res.status(200).json(updatedTodo);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

module.exports = todosRouter;
