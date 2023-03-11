import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { Product } from "../../../../models/Product";
import {
  removeElementFromArray,
  truncate_with_ellipsis,
} from "../../../../utils/reutilizable-function";

@Component({
  selector: "ngx-resource-table",
  templateUrl: "./resource-table.component.html",
  styleUrls: ["./resource-table.component.scss"],
})
export class ResourceTableComponent implements OnInit,OnChanges {
  selectedItem: any;
  refDialog: any;
  budget: number=0;
  @Input() resourceList: Product[] = [];
  @Output() refreshData = new EventEmitter<Product[]>();

  constructor(private dialogService: NbDialogService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.calculeBudget();
  }

  ngOnInit(): void {}

  settings = {
    mode: "external",
    actions: { edit: false },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-archive fa-sm"></i>',
      confirmDelete: true,
    },
    columns: {
      materialName: {
        title: "Material Name",
        type: "string",
      },
      materialPrice: {
        title: "Unit Price",
        type: "html",

        valuePrepareFunction: (statementWork) => {
          return statementWork != null && truncate_with_ellipsis(statementWork);
        },
      },
      quantity: {
        title: "Quantity",
        type: "string",
      },
    },
  };
  calculeBudget(){
    this.resourceList.forEach((element)=>{
      this.budget+=element.quantity*element.materialPrice;
    })
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onArchive(event): void {
    const result = removeElementFromArray(this.resourceList, event.data.id);
    this.resourceList = [];
    this.resourceList = [...result];
    this.refreshData.emit(this.resourceList);

  }
  save(){
    this.refreshData.emit(this.resourceList);
  }
}
