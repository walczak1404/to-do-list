import { NewTaskPopUp } from "./new-work-popup.js";
import * as AddWork from "./add-work.js";

class App {
   // static init() {
   //    NewWorkPopUp.addListeners();
   //    const newTaskForm = document.getElementById("new-work-form");
   //    const newTaskTemplate = document.importNode(document.querySelector("#new-work").content, true);
      
   //    newTaskForm.addEventListener("submit", function(event) {
   //       event.preventDefault();
      
   //       console.log(this.deadline.value);
      
   //       NewWorkPopUp.closePopUp(event);
   //    });
   // }

   static init() {
      NewTaskPopUp.addPopUpHandler();
   }
}

App.init();