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
  selector: 'ngx-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

 
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
  public showScreen = true;

nb=0;
  constructor(private postDataService: PostDataService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private exportService: ExportService    ,  private tokenStorageService: TokenStorageService
            ,  private authService: AuthService , private commentService  :CommentService , private formBuilder: FormBuilder ,  private likeService  :LikeService ,
              ) {}







  ngOnInit(): void {


    this.getAllPosts();
    this.connectedUser = this.tokenStorageService.getUser();
    this.authService.getAllUsers().subscribe((data: Auth[]) => {
      this.userList = data;

    });
    console.log("connectedUser id ",   this.connectedUser.id);


  }




  getAllPosts(){
    this.postDataService.getPosts().subscribe(
      (data: PostData[]) => {
        this.dataPostDatas = data;

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


   


}
