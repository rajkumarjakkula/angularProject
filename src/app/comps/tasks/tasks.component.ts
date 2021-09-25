import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  closeResult:any;
  data:any;
  constructor(private taskserice:TaskService,private modalService: NgbModal,private toastr: ToastrService) { }

  ngOnInit(): void {(
    // this.taskserice.getTasks().subscribe((Users)=>(this.
    //   tasks = Users)));
    this.taskserice.getAllusers().subscribe((Users)=>(this.
      tasks = Users)));
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  deleteRow(id:any){
    for(let i = 0; i < this.tasks.length; ++i){
  
      console.log(this.tasks[i].id+"  adgfg  "+id)
        if (this.tasks[i].id===id) {
          this.tasks.splice(i,1);
        }
      }
    }
  
  add(user:any){
    this.taskserice.signUp(user).subscribe(data=>{
        console.log(data,"dfdgfdsg")
        this.data=data
        this.toastr.success(data.message)
        
    });
  }

  deleteTask(user:any){
    console.log(user._id)
    this.deleteRow(user._id);
    this.taskserice.deleteUser(user).subscribe();
  }
  // deleteTask(task: Task){
  //   console.log("enterd in the delete task subscribe")
  //   this.taskserice.deleteTask(task).subscribe()
  // }

  // add(task:Task){
  //   this.taskserice.add(task).subscribe()
  // }
}

