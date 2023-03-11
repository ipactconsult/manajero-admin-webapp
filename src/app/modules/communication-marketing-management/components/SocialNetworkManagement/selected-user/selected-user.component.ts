import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig, NbToastrService, NbWindowService
} from "@nebular/theme";
import {Observable} from "rxjs";
import {PostData} from "../../../models/post-data";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Comment} from "../../../models/comment";
import {Like} from "../../../models/like";
import {PostDataService} from "../../../services/PostService/post-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {ExportService} from "../../../../../shared/exports/export.service";
import {TokenStorageService} from "../../../../auth/service/token/token.service";
import {AuthService} from "../../../../auth/service/auth.service";
import {CommentService} from "../../../services/comment.service";
import {LikeService} from "../../../services/like.service";
import {Auth} from "../../../../auth/model/Auth";

@Component({
  selector: 'ngx-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrls: ['./selected-user.component.scss']
})
export class SelectedUserComponent implements OnInit {

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
  myPostsData: PostData[] = [];
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
  Auth: Auth = new Auth();
  idE;
  fillColor = 0;
  disliked = 0;
  nb=0;
  userList2: Auth [] = [];
  constructor(private postDataService: PostDataService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private exportService: ExportService    ,  private tokenStorageService: TokenStorageService
    ,  private authService: AuthService , private commentService  :CommentService , private formBuilder: FormBuilder ,  private likeService  :LikeService ,   private activatedroute: ActivatedRoute  )
  {
    this.commentForm = new FormGroup({

      comment: new FormControl(''),


    });
  }

  dislike(event, post) {
    this.likeService.dislike(event.id).subscribe(
      () => {
        post.likes.splice(post.likes.indexOf(event), 1);
        this.showToast('danger', 'Post Disliked','Disliked !!');
      });
  }

  ngOnInit() {

    this.connectedUser = this.tokenStorageService.getUser();

    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;
    });

    this.authService.getUserById(this.router.url.replace("/communicationMarketing/SelectedUser/", "")).subscribe(data => {
      this.Auth = data;


      this.postDataService.getPosts().subscribe(
        (data: PostData[]) => {
          this.dataPostDatas = data;
          for (let i = 0; i < this.dataPostDatas.length; i++) {
            if (this.dataPostDatas[i].name === this.Auth.email) {
              this.myPostsData.push(this.dataPostDatas[i]);
            }
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
    }, error => {
      console.log(error)
    });

  }





  getAllPosts(){

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
      this.c.creatorName  = this.connectedUser.email ;
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

    this.postData = post
    this.connectedUser = this.tokenStorageService.getUser();

    this.likeData.creatorId    =   this.connectedUser.id ;
    this.likeData.creatorName  = this.connectedUser.name ;
    this.likeService.addLike(this.likeData).subscribe(data=>{
      console.log("This should be the response???: ", data);
      this.showToast("success", "Add ! ", " Like  Added !!");
      this.postData.likes.push(data);
      console.log(" new   ",  this.postData);
      this.postDataService.updatePost(this.postData).subscribe((ch) => {
        console.log("  cpmment post data   ",  this.postData.comments);
        this.refreshData.emit(data);
      });

    })


  }

}
