const router = require("express").Router();
const Workout = require("../models/workout.js");

//post workout route
router.post("/workouts", ({ body }, res) => {
  console.log("post route hit");
  console.log("post route body:", body);
  // Workout.create(body)
  //   .then((newWorkout) => {
  //     res.json(newWorkout);
  //   })
  //   .catch((err) => {
  //     res.status(400).json(err);
  //   });
});

//general get workouts route
router.get("/workouts", (req, res) => {
  console.log("get route hit general");
  // console.log(`general get res:>>`, res.body);
  Workout.find({})
    .then((recentWorkout) => {
      console.log(recentWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//update workout by id
router.put("/workouts/:id", ({ body, params }, res) => {
  console.log(`workout id route hit:>>`);
  console.log("update body", body);
  Workout.create(body).then(({ id }) =>
    Workout.findOneAndUpdate(
      id,
      {
        $push: {
          exercises: body,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((updatedWorkout) => {
        res.json(updatedWorkout);
      })
      .catch((err) => {
        res.json(err);
      })
  );
});

//get workouts in the last 7 days
router.get("/workouts/range", (req, res) => {
  console.log(`range get request hit`);
  Workout.find({})
    .limit(7)
    .then((recentWorkouts) => {
      res.json(recentWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

//delete workout route
router.delete("/workouts", ({ body }, res) => {
  Workout.findOneAndDelete(body.id)
    .then((deletedWorkout) => {
      res.json(deletedWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
