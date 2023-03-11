import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Project } from "../../../../models/Project";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ProjectService } from "../../../../services/project/project.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "ngx-generale-info-form",
  templateUrl: "./generale-info-form.component.html",
  styleUrls: ["./generale-info-form.component.scss"],
})

export class GeneraleInfoFormComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<Project>();
  @Input() project: Project = null;
  generalInfoForm: FormGroup;

  constructor(
    private datepipe: DatePipe,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const formcontrols = {
      title: new FormControl(this.project?.title, [Validators.required]),
      status: new FormControl(this?.project?.status, [Validators.required]),
      startDate: new FormControl(new Date(this?.project?.startDate), [
        Validators.required,
      ]),
      endDate: new FormControl(new Date(this?.project?.endDate), [Validators.required]),
      type: new FormControl(this?.project?.type, [Validators.required]),
      organization: new FormControl(this?.project?.organization, [
        Validators.required,
      ]),
    };
    this.generalInfoForm = this.fb.group(formcontrols);
  }
  get title() {
    return this.generalInfoForm.get("title");
  }
  get status() {
    return this.generalInfoForm.get("status");
  }
  get startDate() {
    return this.generalInfoForm.get("startDate");
  }
  get endDate() {
    return this.generalInfoForm.get("endDate");
  }
  get type() {
    return this.generalInfoForm.get("type");
  }
  get organization() {
    return this.generalInfoForm.get("organization");
  }
  save() {
    
    const data = this.generalInfoForm.value;
    
    
    this.project.title= data.title;
    this.project.status=data.status;
    this.project.startDate=this.datepipe.transform(data.startDate, 'yyyy-MM-dd HH:mm:ss');
    this.project.endDate=this.datepipe.transform(data.startDate, 'yyyy-MM-dd HH:mm:ss');
    this.project.type=data.type;
    this.project.organization=data.organization;

    this.projectService.updateProject(this.project).subscribe({
      next: (result: Project) => {
        console.log(result);
        this.dataChanged.emit(result)
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.generalInfoForm.reset();
      },
    });
  }
}
