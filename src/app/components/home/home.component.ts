import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/model/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users!: User[];

  //medecins!: User[];

  searchMedecins = this.formBuilder.group({
    location:[''],
    specialite: [''],
  });

  constructor(private userService : UsersService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.getAllMedecins();
  }

  getAllMedecins() {
    this.userService.getAllMedecins().subscribe(
      medecins => {
        return this.users = medecins;
      }
    )
  }

  getAllMedecinsByLoacaliteOrSpecialite(location, specialite) {

    if(specialite == undefined || specialite == null) {
      //Change alert to sweetalert component for later, Im busy now
      alert("Le specialite du medecin est requis");
    }

    this.userService.getAllMedecinsByLoacaliteOrSpecialite(location, specialite).pipe().subscribe(
      medecins => {
        return this.users = medecins;
      }
    )

  }

  searchMedecinsByLoacaliteOrSpecialite() {
    if(this.searchMedecins.value.specialite === '' || this.searchMedecins.value.specialite === null) {
      //Change alert to sweetalert component for later, Im busy now
      alert("Le specialite du medecin est requis");
    } else {
      this.getAllMedecinsByLoacaliteOrSpecialite(this.searchMedecins.value.location, this.searchMedecins.value.specialite);
    }
    

  }

}
