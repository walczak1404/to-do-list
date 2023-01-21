const newTaskBtn = document.querySelector("#add-new-work-btn");
const prioContainer = document.querySelector("#prio-container");
const newTaskContainer = document.querySelector("#new-work-container");
const closeNewTask = document.querySelector("#close-new-work");

let currentPriority = null;

newTaskBtn.addEventListener("click", () => {
   newTaskContainer.classList.add("visible");
   document.body.classList.add("non-scroll");
});

prioContainer.addEventListener("click", event => {
   if(event.target.classList.contains("prio-number") && event.target !== currentPriority) {
      event.target.classList.add("selected");
      if(currentPriority) currentPriority.classList.remove("selected");
      currentPriority = event.target;
   }
});

newTaskContainer.addEventListener("click", closePopUp);

closeNewTask.addEventListener("click", closePopUp);

function closePopUp(event) {
   if(event.target === event.currentTarget) {
      newTaskContainer.classList.remove("visible");
      document.body.classList.remove("non-scroll");
      if(currentPriority) {
         document.querySelector(".selected").classList.remove("selected");
         currentPriority = null;
      }
   }
}