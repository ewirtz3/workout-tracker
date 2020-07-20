//requiring Mongoose.js - provides a schema-based solution to model app data
const mongoose = require("mongoose");

//sets up the function call on the const Schema
const Schema = mongoose.Schema;

//calls the function set up above to create a new instance of the Schema class
const workoutSchema = new Schema({
  //the new Schema is an object that contains 2 objects, first is the day
  day: {
    type: Date,
    default: Date.now,
  },
  //the second object is an array containing one object made of several objects. these objects define the data to be given by the user, including type of data and if it's required
  exercises: [
    {
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
      weight: {
        type: Number,
      },
      distance: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
    },
  ],
});

//setting up mongoose.model to be called when const Workout is used. function receives 2 parameters, "Workout" is the name of the table in the database (will be pluralized by MongoDB), and workoutSchema is the Schema to be applied to the table
const Workout = mongoose.model("Workout", workoutSchema);

//exporting the Workout object for use elsewhere -- is imported into and subsequently passed through index.js when index.js is required in /routes/apiRoutes.js
module.exports = Workout;
