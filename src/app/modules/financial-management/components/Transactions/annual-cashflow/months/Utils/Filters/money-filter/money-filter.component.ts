import {
  Component, ComponentFactory,
  ComponentFactoryResolver, EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit, Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DefaultEditor, DefaultFilter} from "ng2-smart-table";
import {FilterDefault} from "ng2-smart-table/lib/components/filter/filter-default";
import {DataSource} from "ng2-smart-table/lib/lib/data-source/data-source";
import {Column} from "ng2-smart-table/lib/lib/data-set/column";

@Component({
  selector: 'ngx-money-filter',
  template: `<input type ="number"  class="form-control" placeholder="Search by amounts">`
})
export class MoneyFilterComponent extends DefaultFilter implements OnDestroy, OnChanges {
  customComponent: any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef

  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }


  @Input() column: Column;
  @Input() source: DataSource;
  @Input() inputClass: string = '';
  @Output() filter: EventEmitter<string> = new EventEmitter();

  query: string = '';
  private componentFactory: ComponentFactory<any>;

  onFilter(query: string) {
    this.source.addFilter({
      field: this.column.id,
      search: query,
      filter: this.column.getFilterFunction(),
    });
  }
  selectedDate : Date;
  onInput(event) {
    this.selectedDate = event.value;
    this.setFilter();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.column && !this.customComponent) {
      //const componentFactory = this.resolver.resolveComponentFactory(MoneyFilterComponent);
      /*this.customComponent = this.container.createComponent(this.componentFactory);

      // set @Inputs and @Outputs of custom component
      this.customComponent.instance.query = this.query;
      this.customComponent.instance.column = this.column;
      this.customComponent.instance.source = this.source;
      this.customComponent.instance.inputClass = this.inputClass;*/
      this.customComponent.filter.subscribe((event: any) => this.onInput(event));
    }

  }
  ngOnDestroy() {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
  }
}
