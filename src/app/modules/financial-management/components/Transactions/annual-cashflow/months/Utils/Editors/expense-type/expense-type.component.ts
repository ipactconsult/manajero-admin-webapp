import { Component, OnInit } from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";
import {Transaction} from "../../../../../../../models/Transaction";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-expense-type',
  template : `
    <form [formGroup]="formGroup">

    <input nbInput type="number"
           formControlName="one"
                     
                       placeholder="Type expense here"
                       [disabled]="!cell.isEditable()"
                       (click)="onClick.emit($event)"
                       (keydown.enter)="onEdited.emit($event)"
                       (keydown.esc)="onStopEditing.emit()"
                     (change) ="onChange()"
                     [(ngModel)]="inputModel"
  >
      <div class="feedback" *ngIf="formGroup['controls']['one'].errors?.min">This value should be positive.</div>

    </form>
  `
})
export class ExpenseTypeComponent extends DefaultEditor implements OnInit {
 transaction : Transaction;
  inputModel;
  formGroup : FormGroup= new FormGroup({});

  onChange() {


    if(this.inputModel) {
      this.cell.newValue = this.inputModel;
    }
  }
  constructor() {
    super ();
    this.formGroup= new FormGroup(
      {
        one : new FormControl("",Validators.min(0))})
  }

  ngOnInit(): void {
  }

}
