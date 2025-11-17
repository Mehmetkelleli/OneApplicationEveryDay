const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  addTask: (task) => ipcRenderer.invoke("task:add", task),
  listTasks: () => ipcRenderer.invoke("task:list"),
  deleteTask: (id) => ipcRenderer.invoke("task:delete", id),
  updateTask: (task) => ipcRenderer.invoke("task:update", task)
});
