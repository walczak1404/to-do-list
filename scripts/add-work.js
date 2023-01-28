export class TaskObject {
   constructor(name, deadline, time, priority) {
      this.name = name;
      this.deadline = deadline;
      this.time = time;
      this.priority = priority;
   }
}

export class TaskList {
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