import {Component} from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";
import {Transaction} from "../../../../../../../models/Transaction";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'ngx-type-type',
  template: `
    <form [formGroup]="formGroup">
    <input nbInput="" [ngClass]="inputClass"
                    type ="string"
                         name="type"
                    formControlName="one"


                    [disabled]="!cell.isEditable()"
                         placeholder="Please enter unique information"
                         (keydown.enter)="onEdited.emit($event)"
                         (keydown.esc)="onStopEditing.emit()"
                         [(ngModel)]="selected"   (change)="onChange($event)"

  >
    </form>
    `
})
export class TypeTypeComponent extends DefaultEditor  {
  transaction: Transaction;

  formGroup : FormGroup= new FormGroup({});

  constructor() {

    super();
    this.formGroup= new FormGroup(
      {
        one : new FormControl()})

  }


  selected;
  onChange(event) {


    if(this.selected) {
      this.cell.newValue = this.selected;
    }
  }  

  
  

 
 
}
