import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable, of } from "rxjs";
import { ResourceService } from "../../../../services/resource/resource.service";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Product } from "../../../../models/Product";

@Component({
  selector: "ngx-resource-form",
  templateUrl: "./resource-form.component.html",
  styleUrls: ["./resource-form.component.scss"],
})
export class ResourceFormComponent implements OnInit {
  options: Product[];
  resourceList: Product[] = [];
  filteredControlOptions$: Observable<Product[]>;
  filteredNgModelOptions$: Observable<Product[]>;
  resourceForm: FormGroup;
  @Output() refreshData = new EventEmitter<Product[]>();
  @Input() resourceListSelected: Product[] = [];

  value: string;
  QuantityMaxValue: number = 3;
  enableErrorMessageSelect = false;
  enableErrorMessageQuantity = false;
  constructor(
    private resourceService: ResourceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resourceListSelected !== undefined &&
      (this.resourceList = this.resourceListSelected);
    this.options = [];
    const formcontrols = {
      materialName: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [Validators.required]),
    };
    this.resourceForm = this.fb.group(formcontrols);

    this.resourceService.findAllProduct().subscribe({
      next: (result: Product[]) => {
        this.options = result;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.filteredControlOptions$ = of(this.options);
      },
    });
  }
  get materialName() {
    return this.resourceForm.get("materialName");
  }
  get quantity() {
    return this.resourceForm.get("quantity");
  }
  filter(value: string): Product[] {
    let filterValue: string;
    filterValue = value.toLowerCase();
    const dataFiltred = this.options.filter((optionValue) =>
      optionValue.materialName.toLowerCase().includes(filterValue)
    );
    this.QuantityMaxValue = dataFiltred[0].quantityStock;

    return dataFiltred;
  }
  existResource(resource: Product) {
    (this.resourceList===null) && (this.resourceList=[])
    return this.resourceList.filter(
      (res) => res.materialId === resource.materialId
    ).length;
  }
  addToTeam() {
    const data = this.resourceForm.value;

    if (data.quantity > this.QuantityMaxValue) {
      this.enableErrorMessageQuantity = true;
    } else {
      let filtredData = this.filter(data.materialName);


      if (this.existResource(filtredData[0]) === 0) {
        filtredData[0].quantity = data.quantity;
        filtredData[0] != undefined &&
          (this.resourceList = [...this.resourceList, filtredData[0]]);
      }
      else{

      }
    }
  }
  refresh(resource: Product[]) {
    this.resourceList=[];
    this.resourceList = [...resource];
    this.refreshData.emit(resource);
  }
}
