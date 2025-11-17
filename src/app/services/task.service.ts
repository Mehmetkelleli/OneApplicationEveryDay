import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  add(task: any) {
    return (window as any).api.addTask(task);
  }

  list() {
    return (window as any).api.listTasks();
  }

  delete(id: number) {
    return (window as any).api.deleteTask(id);
  }

  update(task: any) {
    return (window as any).api.updateTask(task);
  }
}
