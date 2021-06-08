import Address from './Address';
import Enroll from './Enroll';

class User {
  id?: number;

  name!: string;

  born!: Date;

  genere!: string;
  
  ra!: number;
  
  address!: Address;

  enroll?: Enroll;

  createdAt!: Date;
}

export default User;