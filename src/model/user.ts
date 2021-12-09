import { EmailValidator } from '@angular/forms';

export class User {
    id!: number;
    username!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    //id_token?: string;
    email!: EmailValidator;
    login!: string;
    authorities!: [];
    roles!: string;
    //activated!: boolean;
    numeroTelephone!: number;
    uidUser!: string;


}