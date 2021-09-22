import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

import { Task } from 'src/app/Task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  condition=false

  tasks: Task[]=[];
  loading=true
  errorMessage="";
  constructor(private taskserice:TaskService) { }

  ngOnInit(): void {(
    this.taskserice.getAllusers().subscribe((Users)=>(this.
      tasks = Users)));
  }
  
  deleteTask(task: Task){
    console.log("enterd in the delete task subscribe")
    this.taskserice.deleteTask(task).subscribe()
  }

  add(task:Task){
    this.taskserice.add(task).subscribe()
  }
}

