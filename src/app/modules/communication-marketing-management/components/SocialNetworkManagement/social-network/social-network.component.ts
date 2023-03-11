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
import {ActivatedRoute, Router} from '@angular/router';
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
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.scss']
})
export class SocialNetworkComponent implements OnInit {
  
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
  loading = false;

    nb=0;
    like =0 ; 
  constructor(private postDataService: PostDataService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService, private storage: AngularFireStorage,   private activatedroute: ActivatedRoute  ,
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



idE;
  fillColor = 0;
  disliked = 0;
  ngOnInit(): void {

    this.createForm();
    this.getAllPosts();
    this.connectedUser = JSON.parse(sessionStorage.getItem('auth-user'));
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;

    });
    console.log("lastName ",   this.connectedUser.lastName);







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




  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this Event ?'});

 
  }

  add_Event(e: PostData) {
    this.addPostOutputEvent.emit(e);
  }



  onDeleteConfirm(event) {
    this.postDataService.deletePost(event.id).subscribe(
      (result) => {

        window.location.reload();


      }
    )
  }



  onDeletePostConfirm(event){
    this.postDataService.deletePost(event).subscribe(
        () => {
          this.showToast('success', 'Deleted','Post deleted !!');
          this.router.navigateByUrl('/communicatiomMarketing/Parternership',
            {skipLocationChange: true}).then(() => {
            this.router.navigate(['/communicatiomMarketing/Parternership']);
          });
        
          }
          );
  }
  





  addPostFunction() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    this.postData.imageUrl = this.fb;
    this.connectedUser = this.tokenStorageService.getUser();
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;
      console.log("connectedUser name ",   this.connectedUser.email);
    });

 
  //  console.log("this.postData.creatorId",  this.postData.creatorId);
    //console.log("this.connectedUser.creatorId",  this.connectedUser.id);
    this.postData.name= this.connectedUser.email ;
    this.postData.creatorId= this.connectedUser.id ;
    this.postData.description = this.PostGroup.controls['description'].value;
   // console.log("this.postData.name",  this.postData.name);
    this.postDataService.addPost(this.postData).subscribe(result => {
      this.showToast("success", "Add ! ", " Post  Added !!");
      this.dataPostDatas.unshift(result);
      this.PostGroup.reset();
      this.ngOnInit();
   /*  this.router.navigateByUrl('/communicationMarketing/SocialNetwork').then(() => {
        this.router.navigate(['/communicationMarketing/SocialNetwork']);
      });*/
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
            //  this.refreshData.emit(data); 
              //this.commentForm.reset();
            });
            //}
            }) 
    }



    // crate comment 
    editComment(post) {
      console.log(" current post    ",  post);
      this.postData = post
      this.connectedUser = this.tokenStorageService.getUser();
      this.commentData.creatorId  = this.connectedUser.id ;
      this.commentData.creatorName  = this.connectedUser.name ;
      this.commentData.content = this.commentForm.controls['comment'].value ;

      console.log(" content commet ",  this.commentForm.controls['comment'] );
      this.commentService.updateComment(this.commentData).subscribe(data=>{
        
          //complete: () => {
            console.log("This should be the response???: ", data);
            this.showToast("success", "Edit ! ", " Ccomment  Edited !!");
            this.postData.comments.splice(this.postData.comments.indexOf(this.commentData),1);
           this.postData.comments.push(data);
           console.log(" new   ",  this.postData);

            this.postDataService.updatePost(this.postData).subscribe((ch) => {
         //     console.log(" post data   ",  this.postData);
              console.log("  cpmment post data   ",  this.postData.comments);
            //  this.refreshData.emit(data); 
              //this.commentForm.reset();
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


        /*    else {

              console.log(" ERROR ");

            

            }*/

      


    


    


    dislike(event, post) {
      this.likeService.dislike(event.id).subscribe(
        () => {
          post.likes.splice(post.likes.indexOf(event), 1);
          this.showToast('danger', 'Post Disliked','Disliked !!');
        });
    }


    deletePost: PostData = new PostData();

    onDeletePost(postId): void {


      this.postDataService.getPostById(postId).subscribe(comment => {
        this.deletePost = comment;
        console.log(" existedComment ",  this.deletePost);
  
      }, error => {
        console.log(error.error);
      })
      Swal.fire({
        title: "<h1 style='color:black'> Delete Post  </h1>",
        text: "Are you sure you would like to delete this Post ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((category) => {
        if (category.isConfirmed) {


          for( let i = 0 ; i< this.dataPostDatas.length ; i++)
          {
             if (this.dataPostDatas[i].id ===  this.deletePost.id)
             {
             
              this.dataPostDatas.splice(this.dataPostDatas.indexOf(this.dataPostDatas[i]) ,1 );

             }


          }



          this.postDataService.deletePost(this.deletePost.id).subscribe(
            (GedDeleted) => {
              // tslint:disable-next-line:no-console
              console.log(GedDeleted);
              Swal.fire(
                "<h1 style='color:black'> Deleted! </h1>",
                "Post  has been deleted!",
                "success"
              ).then(() => {
                window.location.reload();
              });
            },
            (errorDeleting) => {
              // tslint:disable-next-line:no-console
          //    console.log(errorDeleting);
            }
          );
        }
      });

      this.deletePost=null;

    }



    selectedPartnerName = '';
    selectedPartner;
    comments: Comment ;
    selectedComment: Comment;
  

  

  }
  
  
 

    