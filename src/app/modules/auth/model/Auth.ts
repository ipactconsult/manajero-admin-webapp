import {Company} from './Company';

export class Auth {
  token: string;
  type = "Bearer";
  id: string;
  username: string;
  email: string;
  roles: string[];
  enable: boolean;
  locked: boolean;
  firstName: string;
  lastName: string;
  telephone: number;
  resetPassword:string;
  roomId :String[];
  matriculate:string;
  company:string;
  status:string;
}
