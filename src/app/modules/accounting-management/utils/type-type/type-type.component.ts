import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";
import {taxrate} from "../../models/taxrate";

@Component({
  selector: 'ngx-type-type',
  template: `<nb-select  [ngClass]="inputClass"
                         name="status"
                         fullWidth

                         [disabled]="!cell.isEditable()"
                         [placeholder]="cell.getTitle()"
                         (keydown.enter)="onEdited.emit($event)"
                         (keydown.esc)="onStopEditing.emit()"
                         [(ngModel)]="selected"   (ngModelChange)="onChange($event)"

  >
    <nb-option *ngFor="let label of types" [value]="label"  >{{label}}</nb-option>
    </nb-select>`
})
export class TypeTypeComponent extends DefaultEditor  {
  TaxRate: taxrate;

  constructor() {
    super();
  }

  types = ["ACTIVE","ARCHIEVED"]

  selected;
  onChange(event) {
    console.log(event);


    if(event) {
      this.cell.newValue = event;
    }
  }  
}
