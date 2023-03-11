import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Litige } from '../../../models/Litige';
import { LitigeService } from '../../../services/litige/litige.service';

@Component({
  selector: 'ngx-edit-litige',
  templateUrl: './edit-litige.component.html',
  styleUrls: ['./edit-litige.component.scss']
})
export class EditLitigeComponent implements OnInit {
  createLitigeProject: FormGroup;

  config: NbToastrConfig;
  duration = 2000;
  status: NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  litige: Litige;
  id: string;
  updatelitige;


  selectedItem: string = "";

  constructor(private ds: LitigeService, private toastrService: NbToastrService, private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router,private activatedRoute: ActivatedRoute

  ) {

  }

  ngOnInit(): void {

    const formcontrols = {
      typelitige: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
      date: new FormControl("", [Validators.required]),
      statut: new FormControl("", [Validators.required]),
      nouvelledatechance: new FormControl("", [Validators.required]),

    };

    this.createLitigeProject = this.fb.group(formcontrols);
    this.litige = new Litige();
    this.id = this.route.snapshot.params["id"];

    this.ds.getLitigeByid(this.id).subscribe(data => {
      console.log(data)
      this.litige = data;
    }, error => console.log(error)
    )
  }
  options: string[] = [
    'Résolu',
    'Encours',
    'NonRésolu',
  ];
  optionsdis: string[] = [
    'Quality dispute',
    'Price dispute',
    'Litige administratif',
    'Event date dispute',
    'Missing equipment dispute',
    'Double billing dispute'
  ];

  onChange(event) {
    console.log(event)
    let option = event;
    if (option === 'Encours') {
let id =this.activatedRoute.snapshot.params.id
console.log(id);


this.ds.MailSendingEnCours(id).subscribe(data=>{

  console.log(data);


})
    }
    else if (option === 'Résolu') {
      let id =this.activatedRoute.snapshot.params.id

      
      this.ds.MailSendingResolu(id).subscribe(data=>{

        console.log(data);

    })
  }
}

  updateLitige(loid: string): void {

    this.updatelitige = {
      typelitige: this.createLitigeProject.value.typelitige,
      description: this.createLitigeProject.value.description,
      date: this.createLitigeProject.value.date,
      statut: this.createLitigeProject.value.statut,
      nouvelledatechance: this.createLitigeProject.value.nouvelledatechance


    };


    this.ds.updateLitige(loid, this.updatelitige).subscribe(
      (res) => {
        console.log(res);
        this.showToast('success', 'SUCESS', 'Data Updated Successfuly and  Email has been sent');
        this.litige = new Litige();
        this.router.navigate(['/litige/listlitige']);
      }, (err) => {
        console.log(err);
        this.showToast('danger', 'FAILURE', 'Could not Update Law');
      }
    );
  }


  onSubmit() {
    this.updateLitige(this.litige.id);
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Toast ${titleContent}`,
      config);
  }




}




