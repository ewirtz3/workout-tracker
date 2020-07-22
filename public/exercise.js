//document query selectors for HTML tags, including the workout type selection form, cardio form fields, resistance form fields, the success toast, and buttons for completing a workout, adding a workout to the current one, and creating a new workout
const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout");

//workoutType starts as null and shouldNavigateAway starts as false
let workoutType = null;
let shouldNavigateAway = false;

//async function, called immediately below
async function initExercise() {
  let workout;

  //navigating back to the search property of the url, splitting it at the =, and looking at the object at index 1, if that is undefined then
  if (location.search.split("=")[1] === undefined) {
    //workout will be assigned to the value of calling the createWorkout() method that is found on the API object in ./api.js. how it's accessing it I'm not sure
    workout = await API.createWorkout();
  }
  //if workout comes back as a truthy value, set the search property of the url path to equal "?id=" + the _id property of the workout object
  if (workout) {
    location.search = "?id=" + workout._id;
  }
}

//calling function assigned above
initExercise();

//function to handle the user changing the workout type, takes in the event as a parameter
function handleWorkoutTypeChange(event) {
  //grabbing the value of the event target and assigning it to workoutType
  workoutType = event.target.value;

  //if statements dependant on the value of workoutType
  if (workoutType === "cardio") {
    //shows the cardio form and hides the resistance form
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    //shows the resistance form and hides the cardio form
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    //if nothing is selected, both forms are hidden
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }
  //calls validateInputs() method, defined below
  validateInputs();
}

//function to validate user inputs
function validateInputs() {
  let isValid = true;

  //isValid is set to true to start, followed by if statements dependant on the workoutType
  //if workoutType === "resistance", all fields must not equal an empty string, otherwise isValid is assigned to false
  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
    //if workoutType === "cardio", all input fields must not equal an empty string, otherwise isValid is assigned to false
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }
  //after going through the above if statements, if isValid is still true then the buttons to complete a workout and add a workout are enabled
  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
    //if isValid is false, both buttons are disabled
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

//async function to handle the user submitting the form, takes in the event as a parameter
async function handleFormSubmit(event) {
  //preventing default page refresh
  event.preventDefault();

  //setting workoutData equal to an empty string
  let workoutData = {};

  //if statements assigning properties of the workoutData object equal to the values of the input fields
  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  //awaits calling the addExercise() method on the API object from api.js, passing in the workoutData object as a parameter
  await API.addExercise(workoutData);
  clearInputs();
  toast.classList.add("success");
}

function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);

document
  .querySelectorAll("input")
  .forEach((element) => element.addEventListener("input", validateInputs));
