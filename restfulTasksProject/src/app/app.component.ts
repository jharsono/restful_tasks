import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mean';
  tasks={}; //placeholder to store the tasks
  newTask: any;
  editTask: any; //placeholder for two-way bind to edit task
  toggleEdit = false;
  constructor(private _httpService: HttpService){ }

  ngOnInit(){
    // this.getTasksFromService(); //run this function when component is initialized
    this.newTask = {title: "", description: ""}
    this.editTask = {id:"", title:"", description: ""} //ASK ANDY ABOUT WHY ID
  }

  getTasksFromService(){ // define the function to get an observable and subscribe
    let observable = this._httpService.getTasks(); //getTasks is invoked from http.service
    observable.subscribe(data => {
        console.log("Got our tasks!", data);
        this.tasks = data; //put data into tasks variable
      }); // subscribe
    }

  getOne(){
    let observable = this._httpService.getOne();
    observable.subscribe(task => {
      console.log("retrieved one task", task);
      this.editTask=task;
    })
  }

  populateEditField(task) {
    console.log(task);
    this.editTask.id = task._id;
    this.editTask.title = task.title;
    this.editTask.description = task.description;
    this.toggleEdit = true;
  }
  addTask(){
    let observable = this._httpService.addTask(this.newTask); //pass the newTask into service
    observable.subscribe(task => {
      console.log("adding a task", task);
      this.newTask = {title: "", description: ""};
      this.getTasksFromService(); //empty it and make a new object
    })
  }

  update(editTask){
    let observable = this._httpService.update(this.editTask);
    observable.subscribe(task => {
      console.log("editing task", task);
      this.getTasksFromService();
      this.toggleEdit = false
    })
  }
  delete(id){
    let observable = this._httpService.delete(id); // pass this task id.
    observable.subscribe(task => {
      console.log("deleting task", task);
      this.getTasksFromService();
    })
  }
  toggleEditForm(){
      this.toggleEdit=false;
    }
  }

}

//Edit:
// get a task: pass "id" when you click edit
// two way bind task and show in template with ngif
// pass edit info into object
// save
