export const NewTaskPopUp = {
   newTaskContainer: document.querySelector("#new-work-container"),
   currentPriority: null,

   addPopUpHandler() {
      const newTaskBtn = document.querySelector("#add-new-work-btn");
      const closeNewTaskBtn = document.querySelector("#close-new-work");
      const taskForm = document.querySelector("#new-work-form");

      newTaskBtn.addEventListener("click", () => {
         this.newTaskContainer.classList.add("visible");
         document.body.classList.add("non-scroll");
      });

      this.PriorityHandler();

      this.newTaskContainer.addEventListener("mousedown", this.closePopUpHandler.bind(this));
      closeNewTaskBtn.addEventListener("click", this.closePopUpHandler.bind(this));
      taskForm.addEventListener("submit", this.closePopUpHandler.bind(this));
   },

   PriorityHandler() {
      const prioContainer =  document.querySelector("#prio-container");

      prioContainer.addEventListener("click", event => {
         if(event.target.classList.contains("prio-number") && event.target !== this.currentPriority) {
            event.target.classList.add("selected");
            if(this.currentPriority) this.currentPriority.classList.remove("selected");
            this.currentPriority = event.target;
            document.getElementById("priority-value-storage").setAttribute("value", this.currentPriority.textContent);
         }
      });
   },

   closePopUpHandler(event) {
      if(event.target === event.currentTarget) {
         this.newTaskContainer.classList.remove("visible");
         document.body.classList.remove("non-scroll");
         if(this.currentPriority) {
            document.querySelector(".selected").classList.remove("selected");
            this.currentPriority = null;
         }
         document.querySelector("#new-work-form").reset();
         document.querySelector("#new-work-form").priority.setAttribute("value", "");
      }
   }
};