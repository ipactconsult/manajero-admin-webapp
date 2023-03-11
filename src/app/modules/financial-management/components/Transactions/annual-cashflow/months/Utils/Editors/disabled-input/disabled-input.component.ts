import { Component, OnInit } from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'ngx-disabled-input',
  template: ` <form [formGroup]="formGroup">
    <input nbInput type="number"
           formControlName="disabledInput"
           placeholder="This is Automatic"

    >
    
  </form>
   
  `,
})
export class DisabledInputComponent extends DefaultEditor implements  OnInit  {
  formGroup : FormGroup= new FormGroup({});

  constructor() {
    
    super();
    this.formGroup= new FormGroup(
      {
        disabledInput : new FormControl()})

  }
  ngOnInit() {
    this.formGroup.controls['disabledInput'].disable();

  }




}
