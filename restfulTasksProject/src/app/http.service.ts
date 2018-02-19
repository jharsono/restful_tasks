import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    // this.getTasks();
    // this.getOne();
    // this.delete();

   }

   getTasks(){
    // our http response is an Observable, store it in a variable
    // let tempObservable = this._http.get('/tasks');
    // // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
    return this._http.get('/tasks'); //whenever getTasks is invoked, it returns an observable
 }
  delete(id){
    return this._http.delete(`/delete/${id}`);
  }
 getOne(id){
  return this._http.get(`/tasks/${id}`);
 }

 update(updatedTask){
   return this._http.put(`/update/${updatedTask.id}`, updatedTask);

 }

 addTask(newTask){
   return this._http.post('/new', newTask);
 }
}
