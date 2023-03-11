import { Component, OnInit } from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";

@Component({
  selector: 'ngx-files-type',
  template: ` <input nbInput type="file" multiple />`
  
})
export class FilesTypeComponent extends DefaultEditor implements OnInit {

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

}
