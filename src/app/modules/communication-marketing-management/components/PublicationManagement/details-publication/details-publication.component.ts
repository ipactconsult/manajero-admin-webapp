import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import {Publication} from "../../../models/publication";
import {PublicationService} from "../../../services/publication.service";

@Component({
  selector: 'ngx-details-publication',
  templateUrl: './details-publication.component.html',
  styleUrls: ['./details-publication.component.scss']
})
export class DetailsPublicationComponent implements OnInit {

  @Input() type: 'facebook' | 'twitter' |'intagram';
  @Input() shareUrl: string;
  navUrl: string;

  idE;
  publication: Publication = new Publication();

  link: string ;
 
  constructor(private publicationService: PublicationService, 
    
    private activatedroute: ActivatedRoute   ) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idE = result.get('id');
    });

    this.publicationService.getPublicationById(this.idE).subscribe(data => {
      this.publication = data;
    
 
      error => console.log(error);
    });
  //  this.share();
   // this.shareFacebook();
   this.link = 'https://nesrine.com'; 
  

  }
/*
  private createNavigationUrl() {
    let searchParams = new URLSearchParams();

    // TODO: zrobić map z tego manualnego dziugania

    switch (this.type) {
      case 'facebook':
        searchParams.set('u', this.shareUrl);
        this.navUrl =
          'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        break;
      case 'twitter':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://twitter.com/share?' + searchParams;
        break;
    }
  }*/
/*
  public share() {
    let searchParams = new URLSearchParams();
    searchParams.set('url', this.shareUrl);
    this.navUrl = 'https://twitter.com/share?' +  searchParams;
    return window.open(this.navUrl, '_blank');
  }

  public shareFacebook() {
   // this.share = this.publication.title ;

        let searchParams = new URLSearchParams();
    searchParams.set('u', this.shareUrl);
    this.navUrl ='https://www.facebook.com/sharer/sharer.php?' +  searchParams;
    return window.open(this.navUrl, '_blank');
  }*/


}
