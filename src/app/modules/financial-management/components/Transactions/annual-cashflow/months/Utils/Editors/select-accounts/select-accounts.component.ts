import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DefaultEditor} from "ng2-smart-table";
import {AccountsService} from "../../../../../../../service/Accounts/accounts.service";

@Component({
  selector: 'ngx-select-accounts',
  template: `
    <form [formGroup]="formGroup">
      <nb-select  [ngClass]="inputClass"
                  type ="string"
                  name="type"
                  formControlName="one"

                  [disabled]="!cell.isEditable()"
                  placeholder="Please select account"
                  (keydown.enter)="onEdited.emit($event)"
                  (keydown.esc)="onStopEditing.emit()"
                  [(ngModel)]="selected"   (selectedChange)="onChange($event)">
        <nb-option *ngFor="let type of types" [value]="type"> {{ type.name }}</nb-option>
      </nb-select>
    </form>`
})
export class SelectAccountsComponent extends  DefaultEditor implements OnInit{

  formGroup : FormGroup= new FormGroup({});

  constructor( private as : AccountsService) {

    super();
    this.formGroup= new FormGroup(
      {
        one : new FormControl()})

  }
  types = []
  ngOnInit(): void {
    this.as.getAllExternalAccounts().subscribe(result=>{
      this.types =result;
    })
    
        
    }

  

  selected;
  onChange(event) {


    if(this.selected) {
      this.cell.newValue = this.selected;
    }
  }

}

