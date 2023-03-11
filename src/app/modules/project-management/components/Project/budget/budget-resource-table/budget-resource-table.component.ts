import { Component, Input, OnInit } from "@angular/core";
import { Product } from "../../../../models/Product";
import { Project } from "../../../../models/Project";
import { ResourceService } from "../../../../services/resource/resource.service";

@Component({
  selector: "ngx-budget-resource-table",
  templateUrl: "./budget-resource-table.component.html",
  styleUrls: ["./budget-resource-table.component.scss"],
})
export class BudgetResourceTableComponent implements OnInit {
  resourceList: Product[];
  @Input() project: Project;
  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    
    this.resourceService.findAllResourceByProject(this.project.id).subscribe({
      next: (resource) => {

        this.resourceList = resource;
      },
    });
  }

  settings = {
    mode: "external",
    actions: { edit: false, add: false, delete: false },
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

        valuePrepareFunction: (materialPrice) => {
          return materialPrice + "Dt";
        },
      },
      quantity: {
        title: "Quantity",
        type: "string",
      },
    },
  };
}
