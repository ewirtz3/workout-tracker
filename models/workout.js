const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "Enter a workout type (e.g. cardio or resistance)",
  },
  name: {
    type: String,
    trim: true,
    required: "Enter a workout name (e.g. running, bench press)",
  },
  duration: {
    type: Number,
    required: "Enter a workout duration",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
