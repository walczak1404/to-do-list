import { NewTaskPopUp } from "./new-work-popup.js";
import * as Tasks from "./works.js";
import { WorkForm } from "./work-form.js";

class App {
   static init() {

      NewTaskPopUp.addPopUpHandler();

      WorkForm.addListener();

      Tasks.TasksList.importFromStorage();

      this.addSortListeners();

      
   }

   static addSortListeners() {
      const sortBtn = document.querySelector(".fa-sort");
      const sortContainer = document.querySelector("#sort-container");
      sortBtn.addEventListener("click", () => {
         sortContainer.classList.toggle("visible");
      });

      sortContainer.addEventListener("click", event => {
         if(event.target.type === "radio") {
            Tasks.TasksList.sort(event.target.value);
         }
      });
   }   
}

App.init();