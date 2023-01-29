export class Task {
   constructor(name, deadline, time, priority) {
      this.name = name;
      this.deadline = deadline;
      this.time = time;
      this.priority = priority;
      this.taskObj = new TaskObject(name, deadline, time, priority);
   }
}

export class TaskObject {
   constructor(name, deadline, time, priority) {
      const taskTemplate = document.importNode(document.querySelector("#new-work-template").content, true);

      const todayDate = new Date();

      taskTemplate.querySelector(".work-name").textContent = name;
      taskTemplate.querySelector(".added-info").textContent = `${todayDate.getDate()}-${todayDate.getMonth()}-${todayDate.getFullYear()}`;
      taskTemplate.querySelector(".work-name").textContent = name;
      taskTemplate.querySelector(".work-name").textContent = name;
      taskTemplate.querySelector(".work-name").textContent = name;
   }
}

export class TasksList {
   constructor() {
      this.list = [];
   }

   addTask(name, deadline, time, priority, sortType = "name") {
      
   }
}