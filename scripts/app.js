import { NewTaskPopUp } from "./new-work-popup.js";
import * as AddWork from "./add-work.js";

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