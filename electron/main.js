const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");
const db = require("./db");
const AutoLaunch = require('auto-launch');

function createWindow() {
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: 250,
    height: 400,
    x: width - 300,
    y: 0,
    frame: false,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },
  });

  win.loadURL("http://localhost:4200");
}

const appLauncher = new AutoLaunch({
  name: 'Days1',
  path: process.execPath,
});

// Açılışta otomatik başlat
appLauncher.isEnabled().then((isEnabled) => {
  if (!isEnabled) {
    appLauncher.enable();
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/* ─────────────  IPC CRUD — ÇALIŞAN KISIM  ───────────── */
const makeId = () => Math.floor(Math.random() * 999999999);

// EKLE
ipcMain.handle("task:add", (event, task) => {
  const tasks = db.get("task_list") || [];

  const newTask = {
    id: makeId(),
    title: task.title,
    description: task.description,
    icon: task.icon,
    startdate: task.startdate,
    finishdate: task.finishdate,
    created_at: new Date().toISOString()
  };

  tasks.push(newTask);
  db.set("task_list", tasks);

  return newTask;
});

// LİSTE
ipcMain.handle("task:list", () => {
  return db.get("task_list") || [];
});

// SİL
ipcMain.handle("task:delete", (event, id) => {
  const tasks = db.get("task_list").filter(t => t.id !== id);
  db.set("task_list", tasks);
  return { ok: true };
});

// GÜNCELLE
ipcMain.handle("task:update", (event, updatedTask) => {
  const tasks = db.get("task_list").map(t =>
    t.id === updatedTask.id ? updatedTask : t
  );
  db.set("task_list", tasks);
  return { ok: true };
});
