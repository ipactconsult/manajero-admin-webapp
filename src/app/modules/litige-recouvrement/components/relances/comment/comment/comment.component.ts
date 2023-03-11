import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Relance } from '../../../../models/Relance';
import { RelanceService } from '../../../../services/relance.service';

@Component({
  selector: 'ngx-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {


  @Input() relance: Relance = new Relance();
  createProjectCharterform: FormGroup;
  flippedState: boolean = false;


  constructor(
    private re:RelanceService,
    private fb: FormBuilder,


  ) { 
    
  }

  ngOnInit(): void {

    const formcontrols = {
      commentaire: new FormControl("",),
    

    };
    this.createProjectCharterform = this.fb.group(formcontrols);
  }

  create() {
    const data = this.createProjectCharterform.value;

  this.updateRelancee(data)

}
flippe(): void {
  this.flippedState = !this.flippedState;
}

  updateRelancee(comment:Comment){
    
    this.relance.comment.push(comment);
    console.log(this.relance.comment);
    this.re.updateRelance(this.relance.id,this.relance).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{console.log(err)},
     
    
    
    
    });
    
        
      }

}
