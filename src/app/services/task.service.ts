import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiurl='http://localhost:8080/allusers';
  private apisignup='http://localhost:8080/register';
  private apidelete='http://localhost:8080/delete';
  private apiallusers='http://localhost:5500/allusers'
  constructor(private http:HttpClient) { }

  getTasks():Observable<Task[]>
  {
    console.log(this.apiurl)
    return this.http.get<Task[]>(this.apiurl);
  }

  getAllusers():Observable<any>{
      console.log("get all users ")
      return this.http.get<any>(this.apiallusers);
  }

  deleteTask(task:Task) : Observable<Task>
  {
   // console.log(`${this.apiurl}/${task.id}`);
    const url=`${this.apidelete}/${task.id}`;
    console.log("Entereed in delete task Observable...");
   return this.http.delete<Task>(url);
  }
  
  add(task:Task) : Observable<Task>
  {
    console.log("Entereed in add task Observable...");
    return this.http.post<Task>(this.apisignup,task,httpOptions);
  }
}

