// require dotenv
require("dotenv").config();
// require mongoose
const mongoose = require("mongoose");
// require config
const config = require("../utils/config");

// create todo schema
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true, minLength: 2 },
  done: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// configure toJSON method
todoSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

// create mongoose model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
