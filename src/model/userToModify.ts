import { Authority } from "src/app/config/authority.constants";

export class UserToModify {

  uidUser! : number;
  activated!: true;
  roleUser!: Authority;
  email!: string;
  firstName!: string;
  //langKey!: "fr";
  lastName!: string;
  login!: string;
    
}
