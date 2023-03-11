import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";
import {DailyCashflowComponent} from "../../../../daily-cashflow.component";
import {Transaction} from "../../../../../../../models/Transaction";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'ngx-date-type',
  template : `
    <form [formGroup]="formGroup">
    <input  formControlName="one"
           id ="date" nbInput placeholder="Pick Date " name="date" [disabled]="!cell.isEditable()"
                     (keydown.enter)="onEdited.emit($event)"
                     (keydown.esc)="onStopEditing.emit()"

                     [nbDatepicker]="datepicker"
                     
  >
  <nb-datepicker                      (dateChange)="onChange($event)"
                                      #datepicker></nb-datepicker>
    </form>`
})
export class DateTypeComponent extends DefaultEditor implements OnInit {
   transaction :Transaction;
  formGroup : FormGroup= new FormGroup({});

  constructor() { 
    super ();
    this.formGroup= new FormGroup(
      {
        one : new FormControl()})
  }

  ngOnInit(): void { 
  }
  onChange(event) {


    if(event) {
      this.cell.newValue = event.toISOString();
    }
  }

}
