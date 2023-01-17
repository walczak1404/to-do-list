const newTaskBtn = document.querySelector("#add-new-work-btn");
const newTaskContainer = document.querySelector("#new-work-container");

newTaskBtn.addEventListener("click", () => {
   newTaskContainer.classList.add("visible");
   document.body.classList.add("non-scroll");
});

// newTaskBtn.click();