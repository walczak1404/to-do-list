export class Task {
   constructor(name, deadline, time, priority) {
      this.name = name;
      this.addedDate = new Date();
      this.deadline = deadline;
      this.time = time;
      this.priority = priority;
      this.taskEl = new TaskElement(name, deadline, time, priority, this.addedDate);
   }
}

export class TaskElement {
   constructor(name, deadline, time, priority, addedDate) {
      const taskTemplate = document.importNode(document.querySelector("#new-work-template").content, true);

      taskTemplate.querySelector(".work-name").textContent = name;
      taskTemplate.querySelector(".added-info").textContent = `${addedDate.getDate()}-${this.addedDate.getMonth()}-${this.addedDate.getFullYear()}`;
      taskTemplate.querySelector(".deadline-info").textContent = deadline;
      taskTemplate.querySelector(".time-info").textContent = time;
      taskTemplate.querySelector(".priority-info").textContent = priority;
   }

   loadObj(sortType) {
      if(sortType === "ADDED-DATE") {
         const tasksListEl = document.querySelector(".works-list");
         tasksListEl.append(taskTemplate);
      }
   }
}

export class TasksList {
   constructor() {
      this.list = [];
      this.sortType = "ADDED-DATE";
   }

   addTask(name, deadline, time, priority) {
      const newTask = new Task(name, deadline, time, priority);
      if (this.sortType === "ADDED-DATE") {
         this.list.push(newTask);
      }
      newTask.taskEl.loadObj(this.sortType);
   }
}