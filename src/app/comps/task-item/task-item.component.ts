import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: any;
  @Output() onDeleteTask= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  onDelete(){
    //console.log(this.task)
    this.onDeleteTask.emit(this.task);
  }
}
