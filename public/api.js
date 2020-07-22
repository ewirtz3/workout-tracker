//defining const API as an object containing 4 asynchronous functions
const API = {
  //async function, is called in ./index.js and ./workout.js
  async getLastWorkout() {
    //defining res w/o assigning it
    let res;
    try {
      //first, try fetching from this url path, which would typically return a promise
      res = await fetch("/api/workouts");
      //if that doesn't work, console log the error
    } catch (err) {
      console.error(err);
    }
    //if the try statement works, the response is an HTTP one. const json calls the json() method on the response and assigns the value to the variable
    const json = await res.json();

    //returns the last recorded workout by returning the json object at the last index of the response array
    return json[json.length - 1];
  },
  //async function, receives one data parameter, is called in ./exercise.js
  async addExercise(data) {
    //const id is assigned to the result of going to the current url, into the search property, separating the search property at the = sign, and getting the object at index 1 (second object) of the second part of the split url
    const id = location.search.split("=")[1];

    //const res awaits the fetch() method from { /api/workouts/ + id } path (first parameter in fetch method). second parameter is an object containing the method (put/update), headers (content will be json), and body (body will receive data which is then stringified)
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    //const json awaits the json() method to be called on the res defined above
    const json = await res.json();

    //returns the json object
    return json;
  },
  //async function, receives one data parameter that defaults to an empty object when no data is present, is called in ./exercise/js
  async createWorkout(data = {}) {
    //const res is assigned to the result of awaiting the fetch() method. url path is given as the first parameter, second parameter is an object containing method (post/create), headers (content will be json), and body (receives data that is stringified)
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    //const json awaits the json() method to be called on the res defined above
    const json = await res.json();

    //returns the json object
    return json;
  },

  //async function, no parameters. is called in ./stats.js
  async getWorkoutsInRange() {
    //const res awaits the fetch method() on the given url path
    const res = await fetch(`/api/workouts/range`);
    //once res is assigned a value, const json calls the json() method on that res, and assigns it to the const
    const json = await res.json();

    //returns the json object
    return json;
  },
};
