import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Relance } from '../../../models/Relance';

@Component({
  selector: 'ngx-create-relance',
  templateUrl: './create-relance.component.html',
  styleUrls: ['./create-relance.component.scss']
})
export class CreateRelanceComponent implements OnInit {
  createProjectCharterform: FormGroup;
  @Input() c: Relance;

  constructor(      private fb: FormBuilder
    ) { 
    
  }

  ngOnInit(): void {
    const formcontrols = {
      
    };
    this.createProjectCharterform = this.fb.group(formcontrols);
    
  }
  add_categorie($event){


  }
  create(){

  }

}
