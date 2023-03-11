import {Component, OnInit, Output, EventEmitter, TemplateRef, ElementRef, ViewChild, Input} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import { PostData } from '../../../models/post-data';
import { PostDataService} from './../../../services/PostService/post-data.service';
declare var require: any;
import { Like } from '../../../models/Like';
import {ExportService} from "../../../../../shared/exports/export.service";
import GoogleCountries from "../../../../humain-capital-management/services/googlecountries.json";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { Auth } from '../../../../auth/model/auth';
import { AuthService } from '../../../../auth/service/auth.service';
import { CommentService} from './../../../services/comment.service';
import { LikeService} from './../../../services/like.service';

import { Comment } from '../../../models/comment';
import { LeadingComment } from '@angular/compiler';

@Component({
  selector: 'ngx-current-user-profile',
  templateUrl: './current-user-profile.component.html',
  styleUrls: ['./current-user-profile.component.scss']
})
export class CurrentUserProfileComponent implements OnInit {
 
  countries : any [] = [];

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  config: NbToastrConfig;
  current: number=1;
  search: string="";
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  fb = '';
  downloadURL: Observable<string>;
  fillColor = 0;
  disliked = 0;
  dataPostDatas: PostData [] = [];
  PostGroup: FormGroup;
  postData : PostData = new PostData();
  commentData : Comment = new Comment();
  likeData : Like = new Like();
  commentForm: FormGroup;
  submitted: Boolean = false;
  public id = 0;
  @Output() addPostOutputEvent = new EventEmitter<PostData>();




  public currentUser;
  public connectedUser;
  public userList;
  public showScreen = true;

nb=0;
  constructor(private postDataService: PostDataService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private exportService: ExportService    ,  private tokenStorageService: TokenStorageService
            ,  private authService: AuthService , private commentService  :CommentService , private formBuilder: FormBuilder ,  private likeService  :LikeService ,
              ) {

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


get comment() {
  return this.commentForm.get('comment');
}




  ngOnInit(): void {

    this.createForm();
    this.getAllPosts();
    this.connectedUser = this.tokenStorageService.getUser();
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;

    });
    console.log("connectedUser id ",   this.connectedUser.id);


  }




  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }
 

  getAllPosts(){
    this.postDataService.findAllPostDesc().subscribe(
      (data: PostData[]) => {
        this.dataPostDatas = data;
        for (let i = 0; i < this.dataPostDatas.length; i++) {
          for (let j = 0; j < this.dataPostDatas[i].likes?.length; j++) {
            this.connectedUser = JSON.parse(sessionStorage.getItem('auth-user'));
            if (this.dataPostDatas[i].likes[j]?.creatorId === this.connectedUser.id) {
              this.fillColor = this.fillColor + 1;
              console.log("fill tzed");
            } else {
              this.disliked = this.disliked + 1;
              console.log("dislike tzed");
            }
          }
        }
      }
    );

 

  }

  
  getnbUsers(){
    this.authService.getnbUsers();
  }



  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Add a new Event',
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this Event ?'});

 
  }

  add_Event(e: PostData) {
    this.addPostOutputEvent.emit(e);
  }



  onDeleteConfirm(e : PostData) {
    this.postDataService.deletePost(e.id).subscribe(
      (result) => {

        window.location.reload();


      }
    )
  }



  addPostFunction() {
    this.postData.imageUrl = this.fb;
    this.connectedUser = this.tokenStorageService.getUser();
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;
      console.log("connectedUser name ",   this.connectedUser.name);
    });

    this.postData.creatorId= this.connectedUser.id ;
    console.log("this.postData.creatorId",  this.postData.creatorId);
    console.log("this.connectedUser.creatorId",  this.connectedUser.id);
    this.postData.name= this.connectedUser.email ;
   // console.log("this.postData.name",  this.postData.name);
    this.postDataService.addPost(this.postData).subscribe(result => {
      this.showToast("success", "Add ! ", " Post  Added !!");
     this.router.navigateByUrl('/communicationMarketing/SocialNetwork').then(() => {
        this.router.navigate(['/communicationMarketing/SocialNetwork']);
      });
    },
        (err) => {
            this.showToast("danger", "Add ! ", err.error.message);
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

            this.postData.imageUrl = this.fb;
          });
        })
      )
      .subscribe(url => {
        if (url) {

        }
      });
  }


    @Output() usercomment = new EventEmitter();
    
    c : Comment = new Comment();

    commentList: Array<Comment> = [];

    onSubmit() {
      this.submitted = true;
     if (this.commentForm.invalid) {
        return false;
      } else {
       this.connectedUser = this.tokenStorageService.getUser();
       this.c.creatorId  = this.connectedUser.id ;
       this.c.creatorName  = this.connectedUser.name ;
       this.c.content = this.commentForm.controls['comment'].value ;
       this.postData.comments.push(this.c);
       this.postDataService.updatePost(this.postData).subscribe((ch) => {
      this.usercomment.emit(this.c); 
       });
           
    console.log("comment push  ",    this.postData.comments);

  //      this.usercomment.emit(this.postData.comments);


    
      }
    }


    @Input() postD: PostData = null;
    @Output() refreshData = new EventEmitter<Comment>();
    // crate comment 
    create(post) {
      console.log(" current post    ",  post);
      this.postData = post
      this.connectedUser = this.tokenStorageService.getUser();
      this.commentData.creatorId  = this.connectedUser.id ;
      this.commentData.creatorName  = this.connectedUser.name ;
      this.commentData.content = this.commentForm.controls['comment'].value ;

      console.log(" content commet ",  this.commentForm.controls['comment'] );
      this.commentService.addComment(this.commentData).subscribe(data=>{
        
          //complete: () => {
            console.log("This should be the response???: ", data);
            this.showToast("success", "Add ! ", " Post  Added !!");
            
           this.postData.comments.push(data);
           console.log(" new   ",  this.postData);

            this.postDataService.updatePost(this.postData).subscribe((ch) => {
         //     console.log(" post data   ",  this.postData);
              console.log("  cpmment post data   ",  this.postData.comments);
              this.refreshData.emit(data); 
            });
            //}
            }) 
    }


    createLike(post) {
      /*  console.log("click");
        for( let i = 0 ; i< this.postData.likes?.length ; i++)
        {
          console.log("for");
           if(this.likeData[i].creatorName === this.connectedUser.name )
             {*/
  
              console.log(" wsit el for  ");
              this.postData = post ;
              this.connectedUser = this.tokenStorageService.getUser();
               
              this.likeData.creatorId    =   this.connectedUser.id ;
              this.likeData.creatorName  = this.connectedUser.email ;
              this.likeService.addLike(this.likeData).subscribe(data=>{
              console.log("This should be the response???: ", data);
              this.showToast("success", "Post Liked ! ", " Post Liked !!");
              this.postData.likes.push(data);
              console.log(" new   ",  this.postData);
              this.postDataService.updatePost(this.postData).subscribe((ch) => {
              console.log("  comment post data   ",  this.postData.comments);
                  this.refreshData.emit(data); 
                });
            
                })
  
  
              }

              dislike(event, post) {
                this.likeService.dislike(event.id).subscribe(
                  () => {
                    post.likes.splice(post.likes.indexOf(event), 1);
                    this.showToast('danger', 'Post Disliked','Disliked !!');
                  });
              }



}
