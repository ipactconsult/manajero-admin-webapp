import { Component, OnInit } from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";
import {Transaction} from "../../../../../../../models/Transaction";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-number-type',
  template: `
    <form [formGroup]="formGroup">
    <input nbInput type="number" id="input"
                    formControlName="one"
                    placeholder="Please Enter Amount"
                    [disabled]="!cell.isEditable()"
                    (click)="onClick.emit($event)"
                    (keydown.enter)="onEdited.emit($event)"
                    (keydown.esc)="onStopEditing.emit()"
                    (change) ="onChange()"
                    [(ngModel)]="inputModel"
                    >
      <div class="feedback" *ngIf="formGroup['controls']['one'].errors?.min">This value should be positive.</div>

    </form>
  `,
  
  styleUrls: ['./number-type.component.scss']
})
export class NumberTypeComponent extends DefaultEditor implements OnInit {
   transaction :Transaction;
  inputModel;
  formGroup : FormGroup= new FormGroup({});

  constructor() {

    super();
    this.formGroup= new FormGroup(
      {
        one : new FormControl('',Validators.min(0))})

  }
  onChange() {


    if(this.inputModel) {
      this.cell.newValue = this.inputModel;
    }
  }
  ngOnInit() {
    
  }
}
