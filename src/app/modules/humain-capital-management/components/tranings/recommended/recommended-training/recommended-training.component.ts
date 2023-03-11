import { Component, OnInit } from "@angular/core";
import { RecommendedTrainingService } from "../../../../services/recommendedTraining/recommended-training.service";

@Component({
  selector: "ngx-recommended-training",
  templateUrl: "./recommended-training.component.html",
  styleUrls: ["./recommended-training.component.scss"],
})
export class RecommendedTrainingComponent implements OnInit {
  list: any[] = [];
  selectedItem = null;
  dataLoaded: boolean = false;
  constructor(private rs: RecommendedTrainingService) {}

  ngOnInit(): void {
    this.selectedItem = null;
    this.getList();
  }

  getList() {
    this.rs.findAll().subscribe({
      next: (data) => {
        this.list = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.dataLoaded = true;
      },
    });
  }
  selectItem(item: any) {
    this.selectedItem = item;
  }
}
