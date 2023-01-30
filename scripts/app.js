import { NewTaskPopUp } from "./new-work-popup.js";
import * as Tasks from "./works.js";
import { WorkForm } from "./work-form.js";

class App {
   static init() {
      NewTaskPopUp.addPopUpHandler();

      WorkForm.addListener();
   }

   static loadStorage() {
      Object.keys(localStorage).forEach(key => {
         Tasks.TasksList.importFromStorage(JSON.parse(localStorage.getItem(key)));
      })
   }
}

App.init();
App.loadStorage();