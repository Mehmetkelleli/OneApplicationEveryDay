import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { task } from './models/task';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  createColor = "";
  updateColor = "";
  deleteColor = "";
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getall();
    setInterval(() => {
    this.createColor = this.randomColor();
    this.updateColor = this.randomColor();
      this.deleteColor = this.randomColor();
      this.buttonColor = this.randomColor();

  }, 1000);
  }
  buttonColor : string = ""
  constructor(private TaskService: TaskService) {}

  title = 'days1';
  page_active: boolean = true;
  task_list: Array<task> = []
  selected_task : task = {
    title: '',
    description: '',
    icon: '',
    startdate: 'asdasd',
    finishdate: 'sdaasd'
  }

  create() {
  this.TaskService.add(this.selected_task).then(() => {
    this.getall();          // 👈 Listeyi yenile
    this.page_active = true; // 👈 Tekrar ana ekrana dön
    this.selected_task = {  // 👈 Formu temizle
      title: '',
      description: '',
      icon: '',
      startdate: '',
      finishdate: ''
    };
  });
  }
  update() {
    this.TaskService.update(this.selected_task)
    this.page_active = true; // 👈 Tekrar ana ekrana dön
    this.selected_task = {  // 👈 Formu temizle
      title: '',
      description: '',
      icon: '',
      startdate: '',
      finishdate: ''
    };
    this.getall()

  }
  deletee() {
    this.TaskService.delete(this.selected_task.id!)
    this.page_active = true; // 👈 Tekrar ana ekrana dön
    this.selected_task = {  // 👈 Formu temizle
      title: '',
      description: '',
      icon: '',
      startdate: '',
      finishdate: ''
    };
    this.getall()
  }
  getall() {
    this.task_list = [];
    this.TaskService.list().then((res: Array<task>) => this.task_list = res);
  }
  colorCache: any = {};

getColor(id: number) {
  // Daha önce renk üretildiyse tekrar üretme
  if (this.colorCache[id]) return this.colorCache[id];

  // Rastgele renk
  return this.uiColors[id % this.uiColors.length];


  }
  changeButtonColor() {
  this.buttonColor = this.getColor(Math.floor(Math.random() * 101));
  }
uiColors = [
  "#0d6efd", // primary (mavi)
  "#198754", // success (yeşil)
  "#dc3545", // danger (kırmızı)
  "#ffc107", // warning (sarı)
  "#0dcaf0", // info (turkuaz)
  "#6c757d", // secondary (gri)
  "#6610f2", // purple
  "#d63384", // pink
  "#20c997", // teal
  "#fd7e14"  // orange
];
  randomColor() {
    console.log(this.uiColors.length)
    return this.uiColors[Math.floor(Math.random() * this.uiColors.length)];

}


}


