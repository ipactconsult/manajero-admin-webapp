import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

import {PostDataService} from '../../../services/PostService/post-data.service';

import { PostData } from '../../../models/post-data';

@Component({
  selector: 'ngx-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.scss']
})
export class UpdatepostComponent implements OnInit {

  postData: PostData = new PostData();
  PostDataGroup: FormGroup;
  idUri ;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  //existedPostData: postData;
  countries : any [] = [];

  dataPostDatas: PostData [] = [];
  PostGroup: FormGroup;
  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;


  constructor(private router: Router, private postDataService: PostDataService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
              private windowService: NbWindowService) {
    this.PostGroup = new FormGroup({

      description: new FormControl(''),
      imageUrl: new FormControl('') ,


    });
  }




  get description() {
    return this.PostGroup.get('description');
  }

  get imageUrl() {
    return this.PostGroup.get('imageUrl');
  }





  ngOnInit(): void {


    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    this.postDataService.getPostById(this.idUri).subscribe(data => {
      this.postData = data;

      error => console.log(error);


    });
  }



  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `SocialNetwork/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`SocialNetwork/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log('fb', this.fb);
            this.postData.imageUrl = this.fb;

          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url', url);
        }
      });
  }

  updatePostFunction() {
    this.postDataService.updatePost(this.postData).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Event Updated !!');

        this.router.navigateByUrl('/CommunicationMarketing/PostDetails/'+this.idUri, {skipLocationChange:true});
      },
      (err) => {


      },
    );
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
