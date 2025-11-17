Daily To-Do App

A modern cross-platform desktop To-Do List application built with ElectronJS and Angular.
This project is part of a personal challenge: building one application every day to improve full-stack development skills.

🚀 Features

Clean and responsive UI built with Angular

Desktop application powered by ElectronJS

Create, update, and delete tasks

Select icons for each task

Color-animated action buttons

Local data storage using electron-store

Always-on-top widget-style window

Runs without Node.js on end-user machines

Auto-launch on system startup (optional)

📦 Technologies Used

Angular 17

ElectronJS

Electron Store (JSON-based local DB)

IPC Communication (secure message passing)

Font Awesome for icons

HTML / CSS / TypeScript

🛠 How to Run the Project (Development Mode)
1️⃣ Install dependencies
npm install

2️⃣ Start Angular + Electron together
npm run electron:dev


This command launches:

Angular dev server

Electron window loading http://localhost:4200

🏗 Building the Desktop Application

You can generate a standalone .exe installer (no Node.js required):

npx electron-builder


The packaged app will be created inside:

/dist-electron


You can ship this folder or installer directly to users.

📁 Project Structure
/src               -> Angular frontend
/electron          -> Electron main + preload + db
/electron/main.js  -> Desktop app window logic
/electron/preload.js -> Secure IPC bridge
/electron/db.js    -> Local storage

🔧 Database (Local Storage)

The app uses electron-store, saving all tasks in:

%APPDATA%/YourAppName/config.json


This ensures tasks persist between launches.

🧪 Scripts
"electron:dev": "concurrently \"ng serve\" \"wait-on http://localhost:4200 && electron ./electron/main.js\"",
"electron": "ng build --base-href ./ && electron ./electron/main.js"

🤝 Contributing

Feel free to submit improvements, issues, or new feature ideas.
This project evolves daily as part of the “One App per Day” challenge.

📜 License

MIT License
