import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string ="hello"
  @Input() color: string= "red"
  @Output() btnClic =new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  btnClick(){
    this.btnClic.emit();
  }
}
