import { NewTaskPopUp } from "./new-work-popup.js";
import * as Tasks from "./works.js";
import { WorkForm } from "./work-form.js";

class App {
   static init() {
      NewTaskPopUp.addPopUpHandler();

      this.tasksList = new Tasks.TasksList();

      WorkForm.addListener();
   }
}

App.init();