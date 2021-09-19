import { Authority } from "src/app/config/authority.constants";

export class UserToModify {

  id! : number;
  activated!: true;
  roleUser!: Authority;
  email!: string;
  firstName!: string;
  langKey!: "fr";
  lastName!: string;
  login!: string;
    
}
