import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/angular";
import { superAccess } from "../../../../../auth/accessControle/accessControle";
import { TokenStorageService } from "../../../../../auth/service/token/token.service";
import { Activity } from "../../../../models/Activity";
import { ActivityStatus } from "../../../../models/ActivityStatus";
import { Employee } from "../../../../models/Employee";
import { ActivitiesStatusService } from "../../../../services/activities-status/activities-status.service";
import { TeamService } from "../../../../services/team/team.service";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { DatePipe } from "@angular/common";
import { NbDialogService } from "@nebular/theme";
import { TaskDetailsComponent } from "../task-details/task-details.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"],
})
export class ScheduleComponent implements OnInit {
  tasks: ActivityStatus[] = [];
  currenntUserTask: Activity[] = [];
  accessControle: boolean = false;
  currentEmployee: Employee;
  ListTaskFormated;
  constructor(
    private activitiesStatusService: ActivitiesStatusService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private teamService: TeamService,
    private datepipe: DatePipe,
    private dialogService: NbDialogService,private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    const currentUser = this.getCurrentEmployee();
  }

  getCurrentEmployee(): Employee {
    const currentUser = this.tokenStorageService.getUser();
    console.log(currentUser);

    this.accessControle = superAccess(currentUser);
    this.teamService.findEmployeeByEmail(currentUser.email).subscribe({
      next: (result: Employee) => {
        this.currentEmployee = result;
        
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.getAllTask(this.currentEmployee);
      },
    });

    return this.currentEmployee;
  }

  getAllTask(currentEmployee: Employee) {
    console.log("test: "+currentEmployee);
    
    this.activitiesStatusService
      .findAllByProject("62d1092b8d07262aa0962486")
      .subscribe({
        next: (result: ActivityStatus[]) => {
          this.tasks = result;

          result.forEach(
            (task) =>
             task.activityList.filter((activity) =>
              
               ( activity.team.includes(currentEmployee.id))&&this.currenntUserTask.push(activity))
                
              
          );
          console.log( this.currenntUserTask);
          
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.formatTaskList(this.currenntUserTask);
        },
      });
  }
  formatTaskList(list: Activity[]) {
    let taskList = [];
    
    list.forEach((task) => {

      let taskFormated =  {
        id: task.id,
        title: task.title,
        date:""+task.startDate,
        end: ""+task.dueDate,
        content: "",
      };
      taskList.push(taskFormated);
    });

    this.calendarOptions.events=[...taskList,];
  }
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "dayGridMonth",
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
  eventAdd:
  eventChange:
  eventRemove:
  */
  };
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    //alert("hello")
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    const modalRef = this.modalService.open(TaskDetailsComponent);
    modalRef.componentInstance.task = clickInfo.event;

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
