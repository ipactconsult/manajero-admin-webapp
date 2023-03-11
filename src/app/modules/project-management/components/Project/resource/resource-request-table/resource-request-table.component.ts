import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import {
  removeElementFromArray,
  truncate_with_ellipsis,
} from "../../../../utils/reutilizable-function";
import { ResourceRequest } from "../../../../models/ResourceRequest";
import { ResourceService } from "../../../../services/resource/resource.service";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: "ngx-resource-request-table",
  templateUrl: "./resource-request-table.component.html",
  styleUrls: ["./resource-request-table.component.scss"],
})
export class ResourceRequestTableComponent implements OnInit {
  selectedItem: any;
  refDialog: any;
  budget: number = 0;
  flippedState: boolean = false;
  projectId: string;
  @Input() resourceRquestList: ResourceRequest[] = [];
  @Output() refreshData = new EventEmitter<ResourceRequest[]>();
  constructor(
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private resourceService: ResourceService, private datePipe:DatePipe
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");
      this.resourceService.findAllRequest(this.projectId).subscribe({
        next: (result: ResourceRequest[]) => {
          this.resourceRquestList = result;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    });
  }

  settings = {
    mode: "external",
    actions: { edit: false,delete: false},
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-archive fa-sm"></i>',
      confirmDelete: true,
    },
    columns: {
      resourceName: {
        title: "Resource Name",
        type: "string",
      },
      description: {
        title: "Description",
        type: "html",

        valuePrepareFunction: (description) => {
          return description != null && truncate_with_ellipsis(description);
        },
      },
      importance: {
        title: "Importance",
        type: "html",
        valuePrepareFunction: (priority) => {
          switch (priority) {
            case "MEDIUM": {
              return `<h5><span class="badge badge-warning">${priority} </span></h5>`;
            }
            case "LOW": {
              return `<h5><span class="badge badge-success">${priority} </span></h5>`;
            }
            case "HIGH": {
              return `<h5><span class="badge badge-danger">${priority} </span></h5>`;
            }

            default: {
              return `<h5><span class="badge badge-basic">${priority} </span></h5>`;
            }
          }
        }, 
      },
      preferredDate: {
        title: "preferred Date",
        type: "html",
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return `<i class="fas fa-calendar-alt text-success"></i>${this.datePipe.transform(raw, "dd MMM yyyy")}`;
        },
      },
      status: {
        title: "Status",
        type: "html",
    
        valuePrepareFunction: (type) => {
          switch (type) {
            case "UNDER_VALIDATION": {
              return `<h5><span class="badge badge-warning">${type} </span></h5>`;
            }
            case "AVAILABLE": {
              return `<h5><span class="badge badge-success">${type} </span></h5>`;
            }
            case "REJECTED": {
              return `<h5><span class="badge badge-danger">${type} </span></h5>`;
            }
            case "PENDING": {
              return `<h5><span class="badge badge-basic">${type} </span></h5>`;
            }

            default: {
              return `<h5><span class="badge badge-basic">${type} </span></h5>`;
            }
          }
        }, 
      },
      submittedDate: {
        title: "submitted Date",
        type: "html",
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return `<i class="fas fa-calendar-alt text-success"></i>${this.datePipe.transform(raw, "dd MMM yyyy")}`;
        },      },
    },
  };
  flippe(): void {
    this.flippedState = !this.flippedState;
  }
  flipBack() {
    this.flippe();
    this.selectedItem = null;
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onArchive(event): void {
    
    this.resourceService.deleteRequest(event.data.id).subscribe({
      next: () => {
        
        const result = removeElementFromArray(this.resourceRquestList, event.data.id);
        this.resourceRquestList = [];
        this.resourceRquestList = [...result];
      },

      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.refDialog.close();
      },
    });
  }
  onCreate(): void {
    this.flippe();
  }
  onUserRowSelect(event): void {
    this.selectedItem = event.data;
    this.flippe();
  }
  refresh(newData: ResourceRequest): void {
    if(this?.resourceRquestList?.length>0 && this.resourceRquestList!==null)
    {
    const result = removeElementFromArray(this.resourceRquestList, newData.id);
    this.resourceRquestList = [];
    this.resourceRquestList = [...result, newData];
  }
  else{
    this.resourceRquestList = [];
    this.resourceRquestList = [...this.resourceRquestList, newData];
  
  }
   
  }
}
