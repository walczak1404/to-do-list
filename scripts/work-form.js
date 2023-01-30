import * as Tasks from "./works.js";

export class WorkForm {
   static formEl = document.querySelector("#new-work-form");
   static submitTask(event) {
      event.preventDefault();

      if(Date.parse(this.formEl.deadline.value) < new Date().getTime()) {
         alert("Deadline has passed!!!");
         return;
      }

      if(!this.formEl.priority.value) {
         alert("Choose priority!!!");
         return;
      }

      Tasks.TasksList.addTask(
         this.formEl.name.value,
         this.formEl.deadline.value,
         this.formEl.time.value,
         this.formEl.priority.value
      );

      this.formEl.reset();
      this.formEl.priority.setAttribute("value", "");
   }

   static addListener() {
      this.formEl.addEventListener("submit", this.submitTask.bind(this));
   }
}