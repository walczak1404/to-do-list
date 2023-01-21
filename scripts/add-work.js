const prioContainer = document.querySelector("#prio-container");
const submitNewTask = document.getElementById("submit-new-work");

let currentPriority = null;

prioContainer.addEventListener("click", event => {
   if(event.target.classList.contains("prio-number") && event.target !== currentPriority) {
      event.target.classList.add("selected");
      if(currentPriority) currentPriority.classList.remove("selected");
      currentPriority = event.target;
   }
});

submitNewTask.addEventListener("click", event => {
   event.preventDefault();
   closePopUp(event);
});