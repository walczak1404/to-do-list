import {TasksList} from "./works.js";

export class WorkForm {
   static formEl = document.querySelector("#new-work-form");

   static submitTask(event) {
      event.preventDefault();

      const errorList = [];

      if(!this.formEl.name.value) {
         errorList.push("Name isn't provided.");
      }

      if(!this.formEl.time.value) {
         errorList.push("Task duration isn't provided.");
      }

      if(!this.formEl.deadline.value) {
         errorList.push("Deadline isn't provided");
      }
      
      if(Date.parse(this.formEl.deadline.value) < new Date().getTime()) {
         errorList.push("Deadline has passed.");
      }

      if(!this.formEl.priority.value) {
         errorList.push("Priority isn't chosen.");
      }

      if(errorList.length) {
         this.showErrors(errorList);
         event.stopPropagation();
         return;
      }

      TasksList.addTask(
         this.formEl.name.value,
         this.formEl.deadline.value,
         this.formEl.time.value,
         this.formEl.priority.value
      );
   }

   static addListener() {
      this.formEl.addEventListener("submit", this.submitTask.bind(this), true);
   }

   static showErrors(errorsList) {
      const errorsContainer = document.querySelector("#new-work-errors-container");
      const errorsListEl = errorsContainer.querySelector("#errors-list");
      errorsContainer.classList.add("visible");
      errorsList.forEach(error => {
         const p = document.createElement('p');
         p.textContent = error;
         errorsListEl.appendChild(p);
      })
      document.querySelector("#accept-errors-btn").addEventListener("click", this.acceptErrors);
   }

   static acceptErrors() {
      document.querySelector("#new-work-errors-container").classList.remove("visible");
      document.querySelector("#errors-list").innerHTML = "";
   }
}