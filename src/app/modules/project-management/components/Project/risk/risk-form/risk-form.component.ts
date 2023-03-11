import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Risk } from "../../../../models/Risk";
import { RiskService } from "../../../../services/risk/risk.service";
@Component({
  selector: "ngx-risk-form",
  templateUrl: "./risk-form.component.html",
  styleUrls: ["./risk-form.component.scss"],
})
export class RiskFormComponent implements OnInit {
  risktForm: FormGroup;
  projectId: string;
  risk: Risk = null;
  @Output() dataChanged = new EventEmitter<Risk>();
  @Input() selectedItem: Risk = null;
  constructor(
    private fb: FormBuilder,
    private riskService: RiskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");
    });

    const formcontrols = {
      title: new FormControl(this?.selectedItem?.title),
      description: new FormControl(this?.selectedItem?.description, [
        Validators.required,
      ]),
      category: new FormControl(this?.selectedItem?.category, [
        Validators.required,
      ]),
      probability: new FormControl(this?.selectedItem?.probability, [Validators.required]),
      impact: new FormControl(this?.selectedItem?.impact, [Validators.required]),
      responseStrategy: new FormControl(this?.selectedItem?.responseStrategy, [
        Validators.required,
      ]),
    };
    this.risktForm = this.fb.group(formcontrols);
  }
  get title() {
    return this.risktForm.get("title");
  }
  get description() {
    return this.risktForm.get("description");
  }
  get category() {
    return this.risktForm.get("category");
  }
  get probability() {
    return this.risktForm.get("probability");
  }
  get impact() {
    return this.risktForm.get("impact");
  }
  get responseStrategy() {
    return this.risktForm.get("responseStrategy");
  }
  save() {
    const data = this.risktForm.value;
    data.project = this.projectId;
    this.riskService.addRisk(data).subscribe({
      next: (risk: Risk) => {
        this.risk = risk;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataChanged.emit(this.risk);
      },
    });
  }
  update() {
    const data = this.risktForm.value;
    data.id = this.selectedItem.id;
    data.project = this.projectId;

    this.riskService.updateRisk(data).subscribe({
      next: (risk: Risk) => {
        this.risk = risk;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataChanged.emit(this.risk);
      },
    });
  }
}
