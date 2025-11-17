// ESM olduğu için default'u alıyoruz
const Store = require('electron-store').default;

// Burada INSTANCE oluşturuyoruz, class'ı değil
const db = new Store({
  name: 'tasks',
  defaults: {
    task_list: []
  }
});

// Dışarıya instance'ı veriyoruz, object veya class değil
module.exports = db;
