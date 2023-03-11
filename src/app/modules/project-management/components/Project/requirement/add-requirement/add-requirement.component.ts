import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Stakeholder } from "../../../../models/document/project/Stakeholder";
import { Project } from "../../../../models/Project";
import { Requirement } from "../../../../models/Requirement";
import { RequirementService } from "../../../../services/requirement/requirement.service";
@Component({
  selector: "ngx-add-requirement",
  templateUrl: "./add-requirement.component.html",
  styleUrls: ["./add-requirement.component.scss"],
})
export class AddRequirementComponent implements OnInit {
  addRequirementForm: FormGroup;
  @Output() dataChanged = new EventEmitter<Requirement>();
  @Input() selectedItem: Requirement = null;
  projectId: string;
  @Input() 
  stakeholderList:Stakeholder[];

  requirement: Requirement;
  constructor(
    private fb: FormBuilder,
    private requirementsService: RequirementService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
  


    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");
    });
    const formcontrols = {
      requestedBy: new FormControl(this?.selectedItem?.requestedBy,Validators.required,),
      priority: new FormControl(this?.selectedItem?.priority, [
        Validators.required,
      ]),
      description: new FormControl(this?.selectedItem?.description, [
        Validators.required,
      ]),
      category: new FormControl(
        this?.selectedItem?.category,
        [Validators.required]
      ),
      acceptedCriteria: new FormControl(this?.selectedItem?.acceptedCriteria, [
        Validators.required,
      ]),
    };
    this.addRequirementForm = this.fb.group(formcontrols);
  }
  get title() {
    return this.addRequirementForm.get("title");
  }
  get priority() {
    return this.addRequirementForm.get("priority");
  }
  get description() {
    return this.addRequirementForm.get("description");
  }
  get category() {
    return this.addRequirementForm.get("category");
  }
  get acceptedCriteria() {
    return this.addRequirementForm.get("acceptedCriteria");
  }
  get requestedBy() {
    return this.addRequirementForm.get("requestedBy");
  }
  save() {
    const data = this.addRequirementForm.value;

    data.project = { id: this.projectId };
    data.requestedBy = this.stakeholderList.filter(stakeholder => stakeholder.id === data.requestedBy)[0];

    this.requirementsService.addRequiremen(data).subscribe({
      next: (req: Requirement) => {
        this.requirement = req;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataChanged.emit(this.requirement);
      },
    });
  }

  update() {
    const data = this.addRequirementForm.value;
    data.project = this.selectedItem.project;
    data.id = this.selectedItem.id;
    data.requestedBy = this.stakeholderList.filter(stakeholder => stakeholder.id === data.requestedBy)[0];

    console.log(data);

    data.archived= this.selectedItem.archived;    
    this.requirementsService.updateRequiremen(data).subscribe({
      next: (requirement: Requirement) => {
        this.requirement = requirement;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataChanged.emit(this.requirement);
      },
    });
  }
}
