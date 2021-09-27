import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';


const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  JwtAuthToken:any
  user:any

  // private apiurl='http://localhost:8080/allusers';
  // private apisignup='http://localhost:8080/register';
  // private apidelete='http://localhost:8080/delete';
  private apisignup="http://localhost:5500/signup"
  private apiallusers='http://localhost:5500/allusers'
  private apidelete='http://localhost:5500/deleteuser'
  constructor(private http:HttpClient) { }

  // getTasks():Observable<Task[]>
  // {
  //   console.log(this.apiurl)
  //   return this.http.get<Task[]>(this.apiurl);
  // }

  getAllusers():Observable<any>{
      console.log("get all users ")
      return this.http.get<any>(this.apiallusers);
  }


  signUp(user:any):Observable<any>{
    console.log("siging up Observable...")
    return this.http.post<any>(this.apisignup,user,httpOptions);
  }

  // private handleError(errorResonse:HttpErrorResponse){
  //   const error=errorResonse.error;
  //   return error;
  // }
  deleteUser(user:any):Observable<any>{
    console.log("deleting user Observable...")
    console.log(user)
    const url=`${this.apidelete}/${user._id}`;
    return this.http.delete<any>(url);
  }


  storeUser(Token: any,user: any):any{
    localStorage.setItem('token',Token)
    localStorage.setItem('user',JSON.stringify(user))
    this.JwtAuthToken = Token;
    this.user = user;
  }
  logout(){
    this.JwtAuthToken = null;
    this.user = null;
    localStorage.clear();
  }
  loadToken(){
    const token = localStorage.getItem('id_token')
    this.JwtAuthToken = token
  }

  isTokenExpired(){
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.JwtAuthToken);
  }
  // adduser(user:any):Observable<any>{
  //   return this.http.post<any>(this.apisignup,user,httpOptions);
  // }

  // deleteTask(task:Task) : Observable<Task>
  // {
  //  // console.log(`${this.apiurl}/${task.id}`);
  //   const url=`${this.apidelete}/${task.id}`;
  //   console.log("Entereed in delete task Observable...");
  //  return this.http.delete<Task>(url);
  // }
  
  // add(task:Task) : Observable<Task>
  // {
  //   console.log("Entereed in add task Observable...");
  //   return this.http.post<Task>(this.apisignup,task,httpOptions);
  // }
}

