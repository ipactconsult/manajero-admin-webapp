import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { ProjectCharter } from "../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../services/project-charter/project-charter.service";

@Component({
  selector: "ngx-project-charter-general-info",
  templateUrl: "./project-charter-general-info.component.html",
  styleUrls: ["./project-charter-general-info.component.scss"],
})
export class ProjectCharterGeneralInfoComponent implements OnInit {
  @Input() data: ProjectCharter;
  flippedState: boolean = false;
  statusColor:string=""
  refDialog=null;
  selectedItem=null;
  items = [
    { title: 'Edit' },
    { title: 'Delete' },
  ];
  constructor(
    private projectCharterService: ProjectCharterService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    
    this.updateStatusColor();
    console.log(this.data);
    
  }

  flip(): void {
    this.flippedState = !this.flippedState;
  }

  confirmation(dialog: TemplateRef<any>) {
    this.refDialog= this.dialogService.open(
      dialog,
      { context: 'Are you sure to delete this item ?' });
  }

  delete(): void {
  
      this.data.statementWork = null;
      this.projectCharterService
        .updateProjectCharter(this.data)
        .subscribe((ch) => {
          this.refDialog.close()
        });
    
  }
  refresh(event: ProjectCharter) {
    this.flippedState = !this.flippedState;
    this.data = event;
  }
  
updateStatusColor(){
  
  ( ""+this.data.status === "APPROVED") ? this.statusColor="success" 
  :(""+this.data.status === "IN_PROGRESS" ) 
  ?this.statusColor="warning" 
  :this.statusColor="danger"
}

  
  updateStatus(event){

    this.data.status = event
    this.projectCharterService
    .updateProjectCharter(this.data)
    .subscribe((ch) => {
      this.updateStatusColor();
    });

  }

 updateStatementOfWrok(){
   this.selectedItem=this.data.statementWork;
   this.flip();
 }
  
}
