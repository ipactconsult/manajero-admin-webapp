import { Component, OnInit } from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'ngx-select-type',
  template :`
    <form [formGroup]="formGroup">
    <nb-select  [ngClass]="inputClass"
                        type ="string"
                        name="type"
                        formControlName="one"

                        [disabled]="!cell.isEditable()"
                        placeholder="Please enter the type"
                        (keydown.enter)="onEdited.emit($event)"
                        (keydown.esc)="onStopEditing.emit()"
                        [(ngModel)]="selected"   (selectedChange)="onChange($event)">
    <nb-option *ngFor="let type of types" [value]="type"> {{ type }}</nb-option>
  </nb-select>
    </form>`
})
export class SelectTypeComponent extends  DefaultEditor{

  formGroup : FormGroup= new FormGroup({});

  constructor() {

    super();
    this.formGroup= new FormGroup(
      {
        one : new FormControl()})

  }

  types = ["Operating", "Non Operating"]

  selected;
  onChange(event) {


    if(this.selected) {
      this.cell.newValue = this.selected;
    }
  }

}
