import { Component, OnInit } from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";
import {Transaction} from "../../../../../../../models/Transaction";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'ngx-details-type',
  template :  `
    <form [formGroup]="formGroup">

    <textarea nbInput type="text" [disabled]="!cell.isEditable()"
              formControlName="one"

              (click)="onClick.emit($event)"
                         (keydown.enter)="onEdited.emit($event)"
                         (keydown.esc)="onStopEditing.emit()"
                         placeholder="Insert details here "
                         [(ngModel)]="inputModel"
  
              (change) ="onChange()"></textarea>
    </form>` ,
  styleUrls: ['./details-type.component.scss']
})
export class DetailsTypeComponent extends DefaultEditor implements OnInit {
  transaction: Transaction;
  inputModel;
  formGroup : FormGroup= new FormGroup({});

  constructor() {
    super ();
    this.formGroup= new FormGroup(
      {
        one : new FormControl()})
  }
  onChange() {


    if(this.inputModel) {
      this.cell.newValue = this.inputModel;
    }
  }
  ngOnInit(): void {
  }

}
