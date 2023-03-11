import {  Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";

import {
  FormControl,
} from "@angular/forms";

@Component({
  selector: "ngx-team-form",
  templateUrl: "./team-form.component.html",
  styleUrls: ["./team-form.component.scss"],
})
export class TeamFormComponent implements OnInit {
  options: string[];
  team: string[] = [];
  filteredControlOptions$: Observable<string[]>;
  filteredNgModelOptions$: Observable<string[]>;
  inputFormControl: FormControl;
  value: string;
  constructor() {}

  ngOnInit(): void {
    this.options = ["omar.jmai@esprit.tn", "jmaiomar184@gmail.com", "jmaiomarr6@gmail.com"];
    this.filteredControlOptions$ = of(this.options);

    this.inputFormControl = new FormControl();
   
  }
  filter(value: string): string[] {
    let filterValue: string;
    filterValue = value.toLowerCase();
    const dataFiltred=this.options.filter((optionValue) =>
    optionValue.toLowerCase().includes(filterValue)
  );

  
    return dataFiltred ;
  }

  addToTeam() {
    const filtredData= this.filter(this.inputFormControl.value);
    (filtredData[0]!=undefined )&&(this.team=[...this.team,filtredData[0]]);     
   }
}
