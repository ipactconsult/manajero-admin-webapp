import { Component, OnInit } from "@angular/core";
import {
  NbWindowRef,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from "@nebular/theme";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ProjectCharterService } from "../../../services/project-charter/project-charter.service";
import { Router } from "@angular/router";
import { TokenStorageService } from "../../../../auth/service/token/token.service";

@Component({
  selector: "ngx-add-project-charter",
  templateUrl: "./add-project-charter.component.html",
  styleUrls: ["./add-project-charter.component.scss"],
})
export class AddProjectCharterComponent implements OnInit {
  createProjectCharterform: FormGroup;
  currentUser=null;
  constructor(
    public windowRef: NbWindowRef,
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService,
    private router: Router,
    private tokenStorageService : TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser= this.tokenStorageService.getUser();
    const formcontrols = {
      title: new FormControl("", [Validators.required]),
      statementWork: new FormControl("", [Validators.required]),
    };
    this.createProjectCharterform = this.fb.group(formcontrols);
  }
  get title() {
    return this.createProjectCharterform.get("title");
  }
  get statementWork() {
    return this.createProjectCharterform.get("statementWork");
  }

  create() {
    const data = this.createProjectCharterform.value;
    this.projectCharterService.addProjectCharter(data,this.currentUser.email).subscribe(
      (res) => {
        this.windowRef.close();
        this.router.navigate([
          "/projectManagement/project-charter-details/" + res.id,
        ]);
      },
      (err) => {
        console.log(err);
        
      }
    );
  }
  close() {
    this.windowRef.close();
  }
}
