import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Loi } from '../../../models/Loi';

@Component({
  selector: 'ngx-email-send',
  templateUrl: './email-send.component.html',
  styleUrls: ['./email-send.component.scss']
})
export class EmailSendComponent implements OnInit {
  @Input() rowData!: Loi;
  @Output() save: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
