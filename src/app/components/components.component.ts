import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { Task } from '../Task';
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  //styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

 
  @Output() onadd: EventEmitter<Task> =new EventEmitter();
  status=false
  name=""
  email=""
  password=""
  subt()
  {
    if(!this.email){
      alert("please enter email");
    }
    const newTask={
      name:this.name,
      email:this.email,
      password:this.password
    }
    
    this.onadd.emit(newTask);


    this.name=''
    this.password=''
    this.email=''
  }
  
  constructor() {
  }
  
  ngOnInit(): void {
  }

}
