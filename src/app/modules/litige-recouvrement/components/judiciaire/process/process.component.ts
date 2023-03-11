import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbWindowService } from '@nebular/theme';
import { Avocat } from '../../../models/Avocat';
import { Relance } from '../../../models/Relance';
import { AvocatService } from '../../../services/avocat/avocat.service';
import { RelanceService } from '../../../services/relance.service';
import moment from 'moment';
import { Dossier } from '../../../models/Dossier';
import { DossierjuridiqueService } from '../../../services/dossierjuridique.service';
import { Penalty } from '../../../models/Penalty';

@Component({
  selector: 'ngx-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
rest : number=0;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  relance: Relance = new Relance();
  inputHidden = false;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  avocat: Avocat = new Avocat();
  dataAvocats: Avocat [] = [];
  days : number = 0;
  taux : number = null;
  preventDuplicates = false;
  penalty : number = null;
  totalToPay : number = null;
  showPenalty : boolean = false;
  dossier:Dossier=new Dossier() ;
disabled=false;
disabledtoggle=false;
idRelace="";
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  idUri: string = '';


  constructor(private fb: FormBuilder,  private router: Router, private ds : DossierjuridiqueService, private ts: AvocatService,private windowService: NbWindowService,private cs: RelanceService, 
    private activatedroute: ActivatedRoute) {
      
  }

  ngOnInit() {
   

    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.getAllAvocats();
   




    


    this.ds.getDossierById(this.idUri).subscribe(data => {
        this.dossier = data;
        console.log(this.dossier);
this.idRelace=this.dossier.relance.id;
        
        var a = moment(data.relance.invoice.createdAt);
        var b = moment(data.relance.invoice.dueDate);
        this.days = a.diff(b,'days');
        error => console.log(error);
      });


    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });

    
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Calculator',
      },
    );
  }
  

  getAllAvocats() {
    this.ts.findNonArchivedAvocats().subscribe(
      (data: Avocat[]) => {
        this.dataAvocats = data
      }, (err) => {
        return err;
      }
    );
  }

  disableNaf(){
    this.disabled=true
this.disabledtoggle=true





  
  }
  calculatePenalty() {
    let total = this.dossier.relance.invoice.total;
    if(this.taux!=0 && this.taux!=null){
      this.penalty = (total * (this.taux/100) * this.days)/365; 
      this.penalty = Number(this.penalty.toFixed(2));
      this.totalToPay = total + this.penalty;
      this.showPenalty = true;
    }     
  }
  
 
  addPenalty(){

    this.dossier.penalty.montant=this.penalty;
    this.dossier.penalty.totale=this.totalToPay;
    this.dossier.penalty.taux=this.taux;
    this.dossier.penalty.nbrdejours=this.days;
    this.updateDossier();



  }
  
  addAvocat(){

this.dossier.avocat=this.avocat;
this.updateDossier();



  }
  selectAvocat(event){
this.avocat=event
console.log(this.avocat);







  }



  updateDossier() {


    this.ds.updateDossier(this.dossier.id,this.dossier).subscribe(result => {

             
      },
      (err) => {
          


      },
    );
  }
  
  
 
}
