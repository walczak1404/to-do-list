export class Task {
   constructor(name, deadline, time, priority, addDate = new Date()) {
      this.name = name;
      this.addedDate = addDate;
      this.deadline = deadline;
      this.time = time;
      this.priority = priority;
      this.taskEl = new TaskElement(name, deadline, time, priority, this.addedDate);
   }

   static convertToTask(taskLookingObj) {
      const t = new Task(taskLookingObj.name, taskLookingObj.deadline, taskLookingObj.time, taskLookingObj.priority, new Date(taskLookingObj.addedDate));
      return t;
   }4
}

export class TaskElement {
   constructor(name, deadline, time, priority, addedDate) {
      this.taskTemplate = document.importNode(document.querySelector("#new-work-template").content, true);

      const day = addedDate.getDate() < 10 ? `0${addedDate.getDate()}` : `${addedDate.getDate()}`;
      const month = addedDate.getMonth()+1 < 10 ? `0${addedDate.getMonth()+1}` : `${addedDate.getMonth()+1}`;

      this.taskTemplate.querySelector(".work-name").innerHTML += name;
      this.taskTemplate.querySelector(".added-info").innerHTML += `${addedDate.getFullYear()}-${month}-${day}`;
      this.taskTemplate.querySelector(".deadline-info").innerHTML += deadline;
      this.taskTemplate.querySelector(".time-info").innerHTML += time;
      this.taskTemplate.querySelector(".priority-info").innerHTML += priority;
   }

   addObj(sortType) {
      if(sortType === "ADDED-DATE") {
         const tasksListEl = document.querySelector(".works-list > ul");
         tasksListEl.append(this.taskTemplate);
      }
   }
}

export class TasksList {
   static list = [];
   static sortType = "ADDED-DATE";

   static addTask(name, deadline, time, priority) {
      const newTask = new Task(name, deadline, time, priority);
      if (this.sortType === "ADDED-DATE") {
         this.list.push(newTask);
         localStorage.setItem(`task${this.list.length}`, JSON.stringify(newTask));
      }
      newTask.taskEl.addObj(this.sortType);
      console.log(this.list);
   }

   static importFromStorage(task) {
      const convertedTask = Task.convertToTask(task);
      this.list.unshift(convertedTask);
      
      
      const tasksListEl = document.querySelector(".works-list > ul");
      tasksListEl.append(convertedTask.taskEl.taskTemplate);
   }
}