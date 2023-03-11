import {Component, ComponentFactoryResolver, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DefaultEditor, DefaultFilter} from "ng2-smart-table";
import {TransactionService} from "../../../../../../../service/Transaction/transaction.service";
import {Transaction} from "../../../../../../../models/Transaction";

@Component({
  selector: 'ngx-date-filter',
  template :`<input type="text" class="form-control"  name="date"
                    onfocus="(this.type='date')" placeholder="Search By date"
                    onblur="(this.type='text')" size="px" 
                    >`,
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent extends DefaultFilter implements OnDestroy {
  $date: Date;

  constructor( private ts :TransactionService) { 
    super();
    
  }
  onSearch(query: string = '') {
    /*this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },*/}
  ngOnDestroy() : void {
  }
 source : Transaction[]
 
}
