import { Component, OnInit } from '@angular/core';
import './ckeditor.loader';
import 'ckeditor';
@Component({
  selector: 'ngx-contract-model',
  templateUrl: './contract-model.component.html',
  styleUrls: ['./contract-model.component.scss']
})
export class ContractModelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   onChange(event){
    console.log(event);
  }
  onEditorChange(event){
    console.log(event);
  }

  onReady(event){
    console.log(event)
  }
  onFocus(event){
    console.log(event)
  }


}
