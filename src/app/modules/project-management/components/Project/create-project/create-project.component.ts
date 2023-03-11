import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NbWindowService } from "@nebular/theme";
import { ProjectCharter } from "../../../models/ProjectCharter";
import { ProjectService } from "../../../services/project/project.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common'
import { TokenStorageService } from "../../../../auth/service/token/token.service";

@Component({
  selector: "ngx-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: ["./create-project.component.scss"],
})
export class CreateProjectComponent implements OnInit {
  createProjectForm: FormGroup;
  windowRef=null;
  currentUser= null;
  @Input() projectCharter: ProjectCharter;
  @ViewChild("disabledEsc", { read: TemplateRef })
  disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(private router: Router,
    private windowService: NbWindowService,
    private projectService: ProjectService,
    private fb: FormBuilder,
   private  datepipe: DatePipe, private tokenStorageService : TokenStorageService
  ) {
    location
  }

  ngOnInit(): void {
    this.currentUser= this.tokenStorageService.getUser();
    const formcontrols = {
      title: new FormControl(this.projectCharter?.title,[Validators.required]),
      description: new FormControl("", [Validators.required]),
      startDate: new FormControl("", [Validators.required]),
      endDate: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      organization: new FormControl("", [Validators.required]),

    };
    this.createProjectForm = this.fb.group(formcontrols);
  }
  get title() {
    return this.createProjectForm.get("title");
  }
  get description() {
    return this.createProjectForm.get("description");
  }
  get startDate() {
    return this.createProjectForm.get("startDate");
  }
  get endDate() {
    return this.createProjectForm.get("endDate");
  }
  get type() {
    return this.createProjectForm.get("type");
  }
  get organization() {
    return this.createProjectForm.get("organization");
  }
  openWindow() {
    this.windowRef=this.windowService.open(this.disabledEscTemplate, {
      title: "Create Project",
      hasBackdrop: false,
      closeOnEsc: false,
    });
  }
  CreateProject() {
    const data = this.createProjectForm.value;
    data.title=this.title.value;    
    data.startDate =this.datepipe.transform(data.startDate, 'yyyy-MM-dd HH:mm:ss');
    data.endDate =this.datepipe.transform(data.endDate, 'yyyy-MM-dd HH:mm:ss');
    data.charter=this.projectCharter.id;
    data.projectManager= this.currentUser.email;
    this.projectService.addProject(data).subscribe({
      error: (err: any) => {
      console.log(err);
      },
      complete: () => {
        this.windowRef.close();
        this.router.navigate(['/projectManagement/projects'])  
          }
      }) 
  }
}
