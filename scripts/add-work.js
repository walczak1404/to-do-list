class TaskObject {
   constructor(name, time, deadline, priority) {
      this.name = name;
      this.time = time;
      this.deadline = deadline;
      this.priority = priority;
   }
}

class TaskList {
   constructor() {
      this.list = [];
   }

   add(task) {
      this.list.push(task);
   }

   remove(task) {
      const idx = this.list.findIndex(el => el.name === task.name);
      this.list.splice(idx,1);
   }
}

class App {
   static init() {
      const newTaskForm = document.getElementById("new-work-form");
      const newTaskTemplate = document.importNode(document.querySelector("#new-work").content, true);
      
      newTaskForm.addEventListener("submit", function(event) {
         event.preventDefault();
      
         console.log(this.deadline.value);
      
         closePopUp(event);
      });
   }
}

App.init();