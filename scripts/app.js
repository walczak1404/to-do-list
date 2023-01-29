import { NewTaskPopUp } from "./new-work-popup.js";
import * as Tasks from "./works.js";
import * as TaskForm from "./work-form.js";

class App {
   static init() {
      NewTaskPopUp.addPopUpHandler();
   }

   static submitTaskHandler() {
      const newTaskForm = document.querySelector("#new-work-form");

      newTaskForm.addEventListener("submit", )
   }
}

App.init();