import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { Auth } from 'app/modules/auth/model/auth';
import { AuthService } from 'app/modules/auth/service/auth.service';
import { TokenStorageService } from 'app/modules/auth/service/token/token.service';
import { PostData } from 'app/modules/communication-marketing-management/models/post-data';
import { CommentService } from 'app/modules/communication-marketing-management/services/comment.service';
import { PostDataService } from 'app/modules/communication-marketing-management/services/PostService/post-data.service';
import { Comment } from 'app/modules/communication-marketing-management/models/comment';

@Component({
  selector: 'ngx-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  @Input() id ;
  commentForm: FormGroup;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;
  
  public currentUser;
  public connectedUser;
  public userList;
  public showScreen = true;
  idUri ;
  postData : PostData = new PostData();
  commentData : Comment = new Comment();
  @Output() EditCommetnOutputEvent = new EventEmitter<Comment>();
  existedComment: Comment = new Comment();


  constructor(private formBuilder: FormBuilder  
    ,private commentService  :CommentService,   
    private toastrService: NbToastrService  , private postDataService: PostDataService ,    private tokenStorageService: TokenStorageService  ,   private authService: AuthService ) { }

  ngOnInit(): void {
    this.createForm();
    this.connectedUser = this.tokenStorageService.getUser();
   
    this.commentService.getCommentById(this.id).subscribe(data => {
      this.commentData = data;
      
      error => console.log(error);
  
  
    });

    console.log(" id ",  this.commentData.id);


  }


  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }
 
  get comment() {
    return this.commentForm.get('comment');
  }

  add_Comment(e: Comment) {
    this.EditCommetnOutputEvent.emit(e);
  }


  
    // crate comment 
    editComment(post) {
      console.log(" current post    ",  post);
      this.postData = post ; 
      this.connectedUser = this.tokenStorageService.getUser();
      this.commentData.creatorId  = this.connectedUser.id ;
      this.commentData.creatorName  = this.connectedUser.name ;
      this.commentData.content = this.commentForm.controls['comment'].value ;

      console.log(" content commet ",  this.commentForm.controls['comment'] );
      this.commentService.updateComment(this.commentData).subscribe(data=>{
        
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
