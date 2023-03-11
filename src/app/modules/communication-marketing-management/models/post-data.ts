import {Comment} from './comment' ;
import { Like } from './Like';

export class PostData {
  
  
  //comments:  Array<Comment> = [];
  comments :Comment[];
  likes : Like[];
  creatorId: string;
  imageUrl: string;
  id: string;
  description : string; 
  name : string ; 
  createdAt : Date;
  modifiedAt : Date;


}
