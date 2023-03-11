import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { Auth } from '../../../../auth/model/auth';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { PostData } from '../../../models/post-data';
import { Comment } from '../../../models/comment';
import { CommentService } from '../../../services/comment.service';
import { PostDataService } from '../../../services/PostService/post-data.service';
import { AuthService } from '../../../../auth/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {


  idE;
  postData: PostData = new PostData();
  public currentUser;
  public connectedUser;
  public userList;
  public showScreen = true;
  commentForm: FormGroup;
  commentEdit: FormGroup;
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


  commentData : Comment = new Comment();
  @Input() postD: PostData = null;
  @Output() refreshData = new EventEmitter<Comment>();

  @Output() editCommentOutputEvent = new EventEmitter<Comment>();
  existedComment: Comment = new Comment();
  deleteComment: Comment = new Comment();


  constructor(private postDataService: PostDataService, 
    private commentService  :CommentService ,
    private tokenStorageService: TokenStorageService ,
     private formBuilder: FormBuilder ,
     private authService: AuthService ,
     private router: Router,
     private toastrService: NbToastrService,
    private activatedroute: ActivatedRoute  , private windowService: NbDialogService   ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.editForm();

    this.activatedroute.paramMap.subscribe(result => {
      this.idE = result.get('id');
    });

    this.postDataService.getPostById(this.idE).subscribe(data => {
      this.postData = data;
      error => console.log(error);
    });


    this.connectedUser = this.tokenStorageService.getUser();
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;

    });
}


  get comment() {
    return this.commentForm.get('comment');
  }

  get commentt() {
    return this.commentEdit.get('comment');
  }
  
  
  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }



  editForm() {
    this.commentEdit = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }



// crate comment 
  create(event) {
    console.log(" current post    ",  event);
    this.postData = event
    this.connectedUser = this.tokenStorageService.getUser();
   
    this.commentData.creatorId  = this.connectedUser.id ;
    this.commentData.creatorName  = this.connectedUser.email ;
    this.commentData.content = this.commentForm.controls['comment'].value ;

    console.log(" content commet ",  this.commentForm.controls['comment'] );
   this.commentService.addComment(this.commentData).subscribe(data=>{
      
        //complete: () => {
          console.log("This should be the response???: ", data);
          this.showToast("success", "Add ! ", " coment  Added !!");
          this.postData.comments.push(data);
          console.log(" new   ",  this.postData);

          this.postDataService.updatePost(this.postData).subscribe((ch) => {
       //     console.log(" post data   ",  this.postData);
            console.log("  cpmment post data   ",  this.postData.comments);
            this.refreshData.emit(data); 
          /*  this.router.navigateByUrl('/communicationMarketing/SocialNetwork').then(() => {
              this.router.navigate(['/communicationMarketing/SocialNetwork']);
            });*/
          });
          //}
          }) 
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




  openWindow(dialog: TemplateRef<any>, commentId) {
    this.windowService.open(dialog);
    this.commentService.getCommentById(commentId).subscribe(comment => {
      this.existedComment = comment;
      console.log(" existedComment ",  this.existedComment);

    }, error => {
      console.log(error.error);
    })
  }








/*
     // pop up Add Document 
     openWindow(contentTemplate) {
      this.windowService.open(contentTemplate, {
        title: "Edit Comment ",
      });
    }*/



/*
  openDialog(dialog: TemplateRef<any>, commentId) {
  this.windowService.open(dialog);
  this.commentService.getCommentById(commentId).subscribe(comment => {
    this.existedComment = comment;
  }, error => {
    console.log(error.error);
  })
  console.log(" id ",  this.existedComment);

}
*/
  
      // Pop up Add
      EditComment(c: Comment) {
        this.editCommentOutputEvent.emit(c);
      }



      editComment(post , ref) {
        console.log(" current post    ",  post);
        this.postData = post ; 
        this.connectedUser = this.tokenStorageService.getUser();
        this.existedComment.creatorId  = this.connectedUser.id ;
        this.existedComment.creatorName  = this.connectedUser.name ;
        this.existedComment.content = this.commentEdit.controls['comment'].value ;
  
        console.log(" content commet ",  this.commentEdit.controls['comment'] );
        this.commentService.updateComment(this.existedComment).subscribe(data=>{
          for( let i = 0 ; i< this.postData.comments.length ; i++)
              {
                 if (this.postData.comments[i].id ===  this.existedComment.id)
                 {
                  this.postData.comments[i].content = this.existedComment.content

                 }


                }
           //complete: () => {
              console.log("This should be the response???: ", data);
              this.showToast("success", "Update ! ", " Post  Update !!");
              
              this.postData.comments.splice(this.postData.comments.indexOf(this.commentData),1);
              this.postData.comments.push(data);
             console.log(" new   ",  this.postData);
  
              this.postDataService.updatePost(this.postData).subscribe((ch) => {
                this.existedComment.content = data.content ;
           //     console.log(" post data   ",  this.postData);
                console.log("  cpmment post data   ",  this.postData.comments);
               //  this.refreshData.emit(data); 
                //this.commentForm.reset();
              });
              //}
              }) 

              ref.close();
      }




      onDeleteComment(commentId): void {
    
        this.commentService.getCommentById(commentId).subscribe(comment => {
          this.deleteComment = comment;
          console.log(" existedComment ",  this.deleteComment);
    
        }, error => {
          console.log(error.error);
        })
        Swal.fire({
          title: "<h1 style='color:black'> Delete Comment  </h1>",
          text: "Are you sure you would like to delete this Comment ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((category) => {
          if (category.isConfirmed) {

            for( let i = 0 ; i< this.postData.comments.length ; i++)
            {
               if (this.postData.comments[i].id ===  this.deleteComment.id)
               {
               
                this.postData.comments.splice(this.postData.comments.indexOf(this.postData.comments[i]) ,1 );

               }


              }

              this.commentService.deleteComment(this.deleteComment.id).subscribe(
              (GedDeleted) => {
                // tslint:disable-next-line:no-console

                console.log(GedDeleted);
                Swal.fire(
                  "<h1 style='color:black'> Deleted! </h1>",
                  "Comment  has been deleted!",
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

   this.deleteComment=null;


      }
      


}
