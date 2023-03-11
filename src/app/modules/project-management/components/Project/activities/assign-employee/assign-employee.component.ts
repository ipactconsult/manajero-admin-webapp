import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { TeamService } from "../../../../services/team/team.service";
import { Employee } from "../../../../models/Employee";
import { Activity } from "../../../../models/Activity";
@Component({
  selector: "ngx-assign-employee",
  templateUrl: "./assign-employee.component.html",
  styleUrls: ["./assign-employee.component.scss"],
})
export class AssignEmployeeComponent implements OnInit {
  constructor(private teamService: TeamService) {}
  employeeList: Employee[] = [];
  employeeListAssigned: Employee[] = [];
  profileList:string[];
  @Output() dataChanged = new EventEmitter<Employee[]>();
  @Input() selectedItem:Activity = null;
  listStatus = ["todo", "doing", "done"];
  todo = [{ status: "todo", content: "sleep" }];
  doing = [{ status: "doing", content: "Go home" }];
  done = [{ status: "done", content: "Get to work" }];
  ngOnInit(): void {





    this.teamService.findAllProfile().subscribe({
      next: (result: string[]) => {
        this.profileList = result;
        console.log(result);
        
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    (this.selectedItem!==null)&&(
    this.teamService.findAllResponsible(this.selectedItem.team).subscribe({
      next: (result: Employee[]) => {
        this.employeeListAssigned = result;        
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    
    this.dataChanged.emit(this.employeeListAssigned);
    
  }
 
  search(event) {
    const name = event.target.value;
    const list = this.employeeList;

    name !== "" &&
      (this.employeeList = list.filter((employee) => employee.employeeName === name));
  }
  selectEmployee(event) {
    
    this.teamService.findAllByProfile(event).subscribe({
      next: (result: Employee[]) => {
        this.employeeList = result;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
