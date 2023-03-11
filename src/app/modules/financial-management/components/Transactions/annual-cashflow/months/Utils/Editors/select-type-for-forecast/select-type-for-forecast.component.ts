import { Component, OnInit } from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";

@Component({
  selector: 'ngx-select-type-for-forecast',
  template :`<nb-select  [ngClass]="inputClass"
                        type ="string"
                        name="type"


                        [disabled]="!cell.isEditable()"
                        placeholder="Please enter the type"
                        (keydown.enter)="onEdited.emit($event)"
                        (keydown.esc)="onStopEditing.emit()"
                        [(ngModel)]="selected"   (selectedChange)="onChange($event)">
    <nb-option *ngFor="let type of types" [value]="type"> {{ type }}</nb-option>
  </nb-select>`
})
export class SelectTypeForForecastComponent extends DefaultEditor {

  constructor() {
    super ();
  }

  types = ["Operating Income", "Non Operating Income","Operating Expense","Non Operating Expense","Tax"]

  selected;
  onChange(event) {


    if(this.selected) {
      this.cell.newValue = this.selected;
    }
  }

 

}
