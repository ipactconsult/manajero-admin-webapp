import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ElementRef,
} from "@angular/core";

import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
  NbWindowService,
} from "@nebular/theme";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { LocalDataSource } from "ng2-smart-table";

import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";

import { BrowserModule } from "@angular/platform-browser";
import { enableProdMode } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GedService } from "../../../services/ged.service";
import { AngularFireStorage } from "@angular/fire/storage";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import { Ged } from "../../../models/ged";
import { Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

/*
describe('GedComponent', () => {
  let component: GedComponent;
  let fixture: ComponentFixture<GedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
export class GedComponent 

{
   Geds: Ged[];
  GedLength: number;
  source: LocalDataSource = new LocalDataSource();
  //config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = "primary";
  //  position: number = 0;
  @Output() addGedOutputEvent = new EventEmitter<Ged>();

  settings = {
    custom: [
      {
        name: "viewAction",
        title: '<i class="nb-search" title="More Details"></i>',
      },
      {
        name: "editAction",
        title:
          '<i class="nb-edit" title="Edit" style="background-color: #2d8ac7"></i>',
      },
      {
        name: "deleteAction",
        title: '<i class="nb-trash" title="Delete"></i>',
      },
    ],
    width: "auto",
    actions: {
      add: false,
    },
    pager: {
      display: true,
      perPage: 5,
    },

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      name: "deleteAction",
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
      // name: 'deleteAction',
      //title: '<i class="nb-trash" title="Delete"></i>',
    },
    add: {
      addButtonContent: '<i class="nb-plus" ></i>',
      createButtonContent: '<i class="nb-checkmark" ></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },

    columns: {
      title: {
        title: "title",
        type: "string",
        filter: true,
        completer: true,
      },

      fileName: {
        title: "file  name",
        type: "string",
        filter: true,
      },

      description: {
        title: "description",
        filter: true,
      },
  

      contentType: {
        title: "Content type",
        type: "html",
        valuePrepareFunction: (contentType,content) => {
          return this._domSanitizer.bypassSecurityTrustHtml(
            `
            <button class="btn mx-2" style="background-color:  #EA8903" (click)="openDoc()">
            <i class="fas fa-file${
              contentType == "application/pdf"
                ? "-pdf"
                : contentType ==
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ? "-excel"
                : contentType ==
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ? "-word"
                : contentType ==
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                ? "-powerpoint"
                : "-"
            } text-white"></i>
        </button>
            
            
            
           `
          );
        },
        addable: false,
        editable: false,
        filter: false,
      },

      createdAt: {
        title: "Created at",
        // type: Date,
        filter: true,
      },


  
    },
  };

  @ViewChild("GedData")
  GedData!: ElementRef;
  DATA_CATEGORIES: any;
  fileWidth: number;
  fileHeight: any;
  FILE_URI: any;
  PDF: any;

  categoriesExcel: any;
  fileNameXlsx = "ManaZello_All_Geds.xlsx";
  ws: any;
  wb: any;

  constructor(
    private GedService: GedService,
    private dialogService: NbDialogService,
    private router: Router,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private _domSanitizer: DomSanitizer
  ) {
    this.GedService.getGEDs().subscribe(
      (result: []) => {
        this.Geds = result;
        this.GedLength = this.Geds.length;
        this.source.load(this.Geds);
      },
      (error) => {
        this.GedLength = 0;
        // tslint:disable-next-line:no-console
        console.log(error);
      }
    );
  }

  onDeleteGed(event): void {
    Swal.fire({
      title: "<h1 style='color:black'> Delete Document  </h1>",
      text: "Are you sure you would like to delete this Document ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((category) => {
      if (category.isConfirmed) {
        this.GedService.deleteGED(event.data.idGED).subscribe(
          (GedDeleted) => {
            // tslint:disable-next-line:no-console
            console.log(GedDeleted);
            Swal.fire(
              "<h1 style='color:black'> Deleted! </h1>",
              "Document  has been deleted!",
              "success"
            ).then(() => {
              window.location.reload();
            });
          },
          (errorDeleting) => {
            // tslint:disable-next-line:no-console
            console.log(errorDeleting);
          }
        );
      }
    });
  }

  exportGedPDF(): void {
    this.DATA_CATEGORIES = document.getElementById("GedData");
    html2canvas(this.DATA_CATEGORIES).then((canvaToUse) => {
      this.fileWidth = 208;
      this.fileHeight = (canvaToUse.height * this.fileWidth) / canvaToUse.width;
      this.FILE_URI = canvaToUse.toDataURL("image/png");
      this.PDF = new jsPDF("p", "mm", "a4");
      this.PDF.addImage(
        this.FILE_URI,
        "PNG",
        0,
        this.position,
        this.fileWidth,
        this.fileHeight
      );
      this.PDF.save("ManaZello_All_Geds.pdf");
    });
  }

  
    openDoc( ) {
      console.log('test');
    }

  

  exportParternershipsExcel(): void {
    this.categoriesExcel = document.getElementById("GedData");
    this.ws = XLSX.utils.table_to_sheet(this.categoriesExcel);
    this.wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(this.wb, this.ws, "Sheet1");
    XLSX.writeFile(this.wb, this.fileNameXlsx);
  }

  onCustom(event) {
    if (event.action === "editAction") {
      this.router.navigateByUrl("/GED/update-GED/" + event.data.idGED);
    } else if (event.action === "deleteAction") {
      this.onDeleteGed(event);
    }
  }

  ngOnInit(): void {
    this.GedService.getGEDs().subscribe((data: Ged[]) => {
      this.Geds = data;
    });
  }

  openWindow(contentTemplate) {
    this.windowService.open(contentTemplate, {
      title: "New Ged added successfully",
    });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: "Are you sure to delete this Ged ?",
    });
  }

  add_Ged(c: Ged) {
    this.addGedOutputEvent.emit(c);
  }

  addGed(event) {
    this.GedService.addGED(event.newData).subscribe(
      (result) => {
        this.showToast("success", "Add !!", "Ged Added successffully  !!");
        event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showToast("danger", "Add !!", err.error.message);
        } else {
          this.showToast("danger", "Add !!", err.error.message);
        }
      }
    );
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `${titleContent}`, config);
  }

  updateRecord(event) {
    this.GedService.updateGED(event.newData).subscribe(
      (res) => {
        this.showToast("success", "Update ! ", "Ged  Updated !!");
        event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showToast("danger", "Update !!", err.error.message);
        } else {
          this.showToast("danger", "Update !!", err.error.message);
        }
      }
    );
  }

  




}