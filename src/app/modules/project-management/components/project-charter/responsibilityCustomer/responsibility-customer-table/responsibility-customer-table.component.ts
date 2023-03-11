import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Contact } from "../../../../models/document/Contact";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ResponsibilityCustomer } from "../../../../models/ResponsibilityCustomer";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import { ResponsibiltyCustomerService } from "../../../../services/responsibiltyCustomer/responsibilty-customer.service";
import { removeElementFromArray } from "../../../../utils/reutilizable-function";

@Component({
  selector: "ngx-responsibility-customer-table",
  templateUrl: "./responsibility-customer-table.component.html",
  styleUrls: ["./responsibility-customer-table.component.scss"],
})
export class ResponsibilityCustomerTableComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<ProjectCharter>();
  @Input() data: ProjectCharter;
  flippedState: boolean = false;
  dataTabel :ResponsibilityCustomer []=[];
  id: string;
  selectedItem=null;
  refDialog=null;
  public contact: Contact;

  settings = {
    mode: "external",
    actions: { edit: false },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      responsibilityCategory: {
        title: "Category",
        type: "string",
      },
      item: {
        title: "Item",
        type: "string",
      },
      comment: {
        title: "comment",
        type: "string",
      },

      contact: {
        title: "Contact",
        type: "html",
        valuePrepareFunction: (contact) => {
          return `<ul>
          <li>${
            contact.email != '' ? '<i class="fas fa-envelope"></i>: ' + contact.email : "No Email"
          }</li>
          <li>${
            contact.phone != '' ? '<i class="fas fa-phone"></i>: ' + contact.phone : "No Phone"
          }</li>
          <li>${
            contact.address != ''
              ? '<i class="fas fa-location-arrow"></i>: '+ contact.address
              : "No Address"
          }</li>

          </ul>`;
        },
      },
    },
  };
  constructor(
    private projectCharterService: ProjectCharterService,
    private dialogService: NbDialogService

  ) {}

  ngOnInit(): void {  
    
    this.dataTabel= this.data?.responsibilityCustomer;
  
  }
  confirmation(event,dialog: TemplateRef<any>) {
    this.selectedItem=event;
    this.refDialog= this.dialogService.open(
      dialog,
      { context: 'Are you sure to delete this item ?' });
  }
  onDeleteConfirm(event): void {
    this.data.responsibilityCustomer = removeElementFromArray(this.dataTabel, event.data.id);
    this.projectCharterService.updateProjectCharter(this.data).subscribe({
      next: (result: any) => {
        this.data = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataTabel = [];
        this.dataTabel = this.data.responsibilityCustomer;
        this.refDialog.close();
      },
    });
    
  }
  onCreate(): void {
    this.selectedItem=null;
    this.flip();
  }

  onUserRowSelect(event): void {
    this.selectedItem=event.data;
    this.flip();
  }

  refresh(event: ResponsibilityCustomer[]): void {  
    this.dataTabel = [ ...event];
    this.data.responsibilityCustomer=[ ...event];
    this.dataChanged.emit(this.data)
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }
}
