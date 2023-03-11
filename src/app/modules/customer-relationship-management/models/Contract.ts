import {Loi} from '../../litige-recouvrement/models/Loi';

export class Contract{
  id: string;
  contractCode: string;
  contractName: string;
  dateContract : Date;
  dateFin : Date;
  duration : number;
  contractType: string;
  state: string;
  designation: string;
  archive: string;
  laws: Loi;
}