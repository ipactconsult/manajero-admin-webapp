import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "ngx-list-item-added-step",
  templateUrl: "./list-item-added-step.component.html",
  styleUrls: ["./list-item-added-step.component.scss"],
})
export class ListItemAddedStepComponent implements OnInit, OnChanges {
  @Input() newItem: string[] = [];
  list: string[] = [];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    changes?.newItem?.currentValue != undefined &&
      (this.list = [...this.list, changes?.newItem?.currentValue]);
  }
  ngOnInit(): void {}
}
