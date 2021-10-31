import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Patient } from 'src/model/patient';
import { RendezVous } from 'src/model/rendezVous';
import { User } from 'src/model/user';
import { PatientService } from 'src/services/patient.service';
import { RendezVousService } from 'src/services/rendez-vous.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit {

  rendezVous!: RendezVous[];

  isRegister = false;

  isUpdate = false;

  isDelete = false;

  isError = false;

  rendez_Vous! : RendezVous;

  modalAddRendezVous : Modal | undefined;

  modalUpdateRendezVous : Modal | undefined;

  modalDeleteRendezVous : Modal | undefined;

  users! : User[];

  patients!: Patient[];

  addRendezVousForm = this.formBuilder.group({
    dateRDV:[''],
    uidPatient: [''],
    uidMedecin: [''],
    heureRendezVous: [''],
  });

  modifRendezVousForm! : FormGroup;

  constructor(private rendezVouService : RendezVousService,  private formBuilder: FormBuilder,
              private userService: UsersService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadAllRendezVous();
  }

  loadAllRendezVous(){

    this.rendezVouService.getAllRendezVous().pipe().subscribe(
      rendezVous => {
        return this.rendezVous = rendezVous;
      });
  }

  getEditFormData() {
    return this.modifRendezVousForm?.controls;
  }

  loadAllMedecin(){

    this.userService.getAllUsers().pipe().subscribe(
      users => {
        return this.users = users;
      });
  }

  loadAllPatient(){

    this.patientService.getAllPatients().pipe().subscribe(
      patients => {
        return this.patients = patients;
      });
  }


  openDialogForAddRendezVous(){
    this.loadAllMedecin();
    this.loadAllPatient();
    this.modalAddRendezVous = new bootstrap.Modal(document.getElementById('modalAddRendezVous')!, {
      keyboard : false
    })

    this.modalAddRendezVous?.show();
  }

  openDialogForDeleteRendezVous(rendezVous: RendezVous){

  }

  openDialogForUpdateRendezVous(rendezVous: RendezVous){

    console.log("Dans le update Rendez Vous "+JSON.stringify(rendezVous))
    this.rendez_Vous = rendezVous;
    this.loadAllMedecin();
    this.loadAllPatient();
    this.modifRendezVousForm = this.formBuilder.group({
      dateRDV:[this.rendez_Vous?.dateRDV],
      uidPatient: [this.rendez_Vous?.uidPatient],
      uidMedecin: [this.rendez_Vous?.uidMedecin],
      heureRendezVous: [this.rendez_Vous?.heureRendezVous],
      uidRendezVous: [this.rendez_Vous?.uidRendezVous],
    }); 
   
    this.modalUpdateRendezVous = new bootstrap.Modal(document.getElementById('modalUpdateRendezVous')!, {
      keyboard : false
    })

    this.modalUpdateRendezVous?.show();

  }

  saveRendezVous(){

    this.rendez_Vous = this.addRendezVousForm.value;

    this.rendezVouService.addRendezVous(this.rendez_Vous)
            .pipe()
            .subscribe(
                () => {
                  this.isRegister = true;
                  setTimeout( () => {
                   console.log('hide');
                   this.isRegister = false; // here... this has different context
                  }, 2000);

                  this.loadAllRendezVous();
                  this.modalAddRendezVous?.hide();
                    
          },
                _error => {
                 
                  this.isError = true;
                  setTimeout( () => {
                   this.isError = false; // here... this has different context
                 }, 2000);

            this.loadAllRendezVous();
            this.modalAddRendezVous?.hide()
      }); 
  }

  modifRendezVous(){
    console.log("le rendez to update "+JSON.stringify(this.modifRendezVousForm.value))


    this.rendez_Vous = this.modifRendezVousForm.value;

    this.rendezVouService.updateRendezVous(this.rendez_Vous)
            .pipe()
            .subscribe(
                () => {
                  this.isUpdate = true;
                  setTimeout( () => {
                   console.log('hide');
                   this.isUpdate = false; // here... this has different context
                  }, 2000);

                  this.loadAllRendezVous();
                  this.modalUpdateRendezVous?.hide();
                    
          },
                _error => {
                 
                  this.isError = true;
                  setTimeout( () => {
                   this.isError = false; // here... this has different context
                 }, 2000);

            this.loadAllRendezVous();
            this.modalUpdateRendezVous?.hide()
      }); 
  }
}
