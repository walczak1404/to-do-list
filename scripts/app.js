const newTaskBtn = document.querySelector("#add-new-work-btn");
const newTaskContainer = document.querySelector("#new-work-container");
const closeNewTask = document.querySelector("#close-new-work");

newTaskBtn.addEventListener("click", () => {
   newTaskContainer.classList.add("visible");
   document.body.classList.add("non-scroll");
});

newTaskContainer.addEventListener("click", closePopUp);

closeNewTask.addEventListener("click", closePopUp);

//functions

function closePopUp(event) {
   if(event.target === event.currentTarget) {
      newTaskContainer.classList.remove("visible");
      document.body.classList.remove("non-scroll");
   }
}