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
      return new Task(taskLookingObj.name, taskLookingObj.deadline, taskLookingObj.time, taskLookingObj.priority, new Date(taskLookingObj.addedDate));
   }
}

export class TaskElement {
   constructor(name, deadline, time, priority, addedDate) {
      this.taskTemplate = document.querySelector("#new-work-template").content.firstElementChild.cloneNode(true);

      const addedDay = addedDate.getDate() < 10 ? `0${addedDate.getDate()}` : `${addedDate.getDate()}`;
      const addedMonth = addedDate.getMonth()+1 < 10 ? `0${addedDate.getMonth()+1}` : `${addedDate.getMonth()+1}`;

      this.taskTemplate.querySelector(".work-name").innerHTML += name;
      this.taskTemplate.querySelector(".added-info").innerHTML += `${addedDate.getFullYear()}-${addedMonth}-${addedDay}`;
      this.taskTemplate.querySelector(".deadline-info").innerHTML += deadline;
      this.taskTemplate.querySelector(".time-info").innerHTML += time;
      this.taskTemplate.querySelector(".priority-info").innerHTML += priority;
   }

   addObj(sortType, idx = 0) {
      const tasksListEl = document.querySelector(".works-list > ul");
      if(sortType === "ADDED-DATE") {
         tasksListEl.append(this.taskTemplate);
      }
   }
}

export class TasksList {
   static list = [];
   static sortType = "ADDED-DATE";
   static sortOrder = "DOWN";

   static addTask(name, deadline, time, priority) {
      const newTask = new Task(name, deadline, time, priority);
      if (this.sortType === "ADDED-DATE") {
         this.list.push(newTask);
      } else if(this.sortType === "DEADLINE") {
         const idx = this.list.findIndex(t => Date.parse(t.deadline) >= new Date(newTask.deadline));
         this.list.splice(idx, 0, newTask);
      }
      localStorage.setItem(`task${this.list.length}`, JSON.stringify(newTask));
      newTask.taskEl.addObj(this.sortType);
      console.log(this.list);
   }

   static importFromStorage() {
      Object.keys(localStorage).forEach(key => {
         const task = Task.convertToTask(JSON.parse(localStorage.getItem(key)));
         this.list.push(task);
      });
      
      this.sort(this.sortType);
   }

   static loadList() {
      const tasksListEl = document.querySelector(".works-list > ul");
      tasksListEl.innerHTML = "";
      for(const task of this.list) {
         tasksListEl.append(task.taskEl.taskTemplate);
      }
   }

   static sort(sortType) {
      let cb;
      if(sortType==="ADDED-DATE") {
         cb = (t1,t2) => t1.addedDate - t2.addedDate;
      } else if(sortType==="DEADLINE") {
         cb = (t1,t2) => new Date(t1.deadline) - new Date(t2.deadline);
      } else if(sortType==="TIME") {
         cb = (t1,t2) => new Date("01.01.2022 " + t1.time) - new Date("01.01.2022 " + t2.time);
      } else if(sortType==="PRIORITY") {
         cb = (t1,t2) => t1.priority - t2.priority;
      } else {
         console.log("Wrong sortType");
         return;
      }
      this.list.sort(cb);
      this.sortType = sortType;

      if(this.sortOrder==="UP") {
         this.list.reverse();
      }

      this.loadList();
   }
}