export class Task {
   constructor(name, deadline, time, priority, id, addDate = new Date()) {
      this.name = name;
      this.addedDate = addDate;
      this.deadline = deadline;
      this.time = time;
      this.priority = priority;
      this.taskEl = new TaskElement(name, deadline, time, priority, this.addedDate);
      this.id = id;
   }

   static convertToTask(taskLookingObj) {
      return new Task(taskLookingObj.name, taskLookingObj.deadline, taskLookingObj.time, taskLookingObj.priority, taskLookingObj.id, new Date(taskLookingObj.addedDate));
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

   addObj(idx) {
      const tasksListEl = document.querySelector(".works-list > ul");
      if(idx) {
         tasksListEl.querySelector(`li:nth-of-type(${idx})`).after(this.taskTemplate);
      } else {
         tasksListEl.prepend(this.taskTemplate);
      }
   }
}

export class TasksList {
   static list = [];
   static tasksListEl = document.querySelector(".works-list > ul");
   static sortType = "ADDED-DATE";
   static sortOrder = "DOWN";

   static taskId = 1;

   static addTask(name, deadline, time, priority) {
      const newTask = new Task(name, deadline, time, priority, this.taskId);
      let cb;
      let idx;

      if(this.sortOrder === "DOWN") {
         idx = this.list.length;

         if(this.sortType === "DEADLINE") {
            cb = t => Date.parse(t.deadline) >= new Date(newTask.deadline);
         } else if(this.sortType === "TIME") {
            cb = t => new Date("01.01.2022 " + t.time) >= new Date("01.01.2022 " + newTask.time);
         } else if(this.sortType === "PRIORITY") {
            cb = t => t.priority >= newTask.priority;
         }
      } else {
         if(this.sortType === "DEADLINE") {
            cb = t => Date.parse(t.deadline) <= new Date(newTask.deadline);
         } else if(this.sortType === "TIME") {
            cb = t => new Date("01.01.2022 " + t.time) <= new Date("01.01.2022 " + newTask.time);
         } else if(this.sortType === "PRIORITY") {
            cb = t => t.priority <= newTask.priority;
         }
      }

      if(cb) {
         idx = this.list.findIndex(cb);
      }
      this.list.splice(idx, 0, newTask);
      localStorage.setItem(`task${this.taskId}`, JSON.stringify(newTask));
      this.taskId++;
      newTask.taskEl.addObj(idx);
      console.log(this.list);
   }

   static importFromStorage() {
      Object.keys(localStorage).forEach(key => {
         const task = Task.convertToTask(JSON.parse(localStorage.getItem(key)));
         this.list.push(task);
         this.taskId++;
      });
      
      this.sort(this.sortType);
   }

   static loadList() {
      this.tasksListEl.innerHTML = "";
      for(const task of this.list) {
         this.tasksListEl.append(task.taskEl.taskTemplate);
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

   static contextMenuHandler() {
      const taskContextMenu = this.tasksListEl.parentElement.lastElementChild;
      let item;

      this.tasksListEl.addEventListener("touchstart", event => {
         try {
            event.target.closest("li").classList.add("phone-touch");
         } catch {
            console.log("not li");
         }
      });

      this.tasksListEl.addEventListener("touchend", event => {
         try {
            event.target.closest("li").classList.remove("phone-touch");
         } catch {
            console.log("not li");
         }
      });

      this.tasksListEl.addEventListener("contextmenu", event => {
         event.preventDefault();
         if(event.target.closest("li")) {
            document.body.addEventListener("click", closeContextMenu);

            taskContextMenu.classList.add("visible");
            taskContextMenu.style.top = event.pageY + "px";
            taskContextMenu.style.left = event.pageX + "px";
            item = event.target.closest("li");
         }
      });

      function closeContextMenu(event) {
         if(!event.target.closest("#work-context-menu")) {
            taskContextMenu.classList.remove("visible");
            document.body.removeEventListener("click", closeContextMenu);
         }
      }

      //context btns
      taskContextMenu.querySelector("#remove-work-btn-container").addEventListener("click", () => {
         console.log(item);
         this.tasksListEl.removeChild(item);
         const idx = this.list.findIndex(i => i.taskEl.taskTemplate === item);
         localStorage.removeItem(`task${this.list[idx].id}`);
         this.list.splice(idx, 1);
         console.log(this.list);
      })
   }
}