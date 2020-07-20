//calls init() method, defined below
init();

//async function taking no parameters
async function init() {
  //if character at first index of the url after the = is undefined, const workout equals the result of calling API.getLastWorkout();
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    //if workout receives a truthy response, then the url's search property's value is reassigned to equal "?id=" + workout._id
    if (workout) {
      location.search = "?id=" + workout._id;
      //if the response is falsy, the continue button appears
    } else {
      document.querySelector("#continue-btn").classList.add("d-none");
    }
  }
}
