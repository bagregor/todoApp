import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import Hospitalisation from 'src/model/hospitalisation';
import { Patient } from 'src/model/patient';
import { HospitalisationService } from 'src/services/hospitalisation.service';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {

  isRegister = false;

  isUpdate = false;

  isDelete = false;

  isError = false;

  patients! : Patient[];

  hospitalisations! : Hospitalisation[];


  patient! : Patient;

  modalAddPatient : Modal | undefined;

  modalUpdatePatient : Modal | undefined;

  modalDeletePatient : Modal | undefined;

  addPatientForm = this.formBuilder.group({
    nomPatient:[''],
    prenomPatient: [''],
    emailPatient: ['', Validators.required, Validators.email],
    numeroTelephonePatient: [''],
    situationMatrimoniale: [''],
    assuranceMedicale: [''],
    codeAssurance:  [''],
    nomAndPrenomICE:  [''],
    numeroTelephoneICE:  [''],

  });

  modifPatientForm! : FormGroup;
  
  patientToModify! : Patient;

  externalid! : String ;

  role_user!: string;

  uidlit = "8lbp-pp7b-c1la-ntld-m7t1-maog-da64-jk8p";

  constructor(private patientService: PatientService,  private formBuilder: FormBuilder,
              private hospitalisatioService : HospitalisationService) {
     this.role_user = localStorage.getItem('role_user') || '';
     //this.uidUser = localStorage.getItem('uidUser') || '';
     //console.log("le role est le "+this.role_user)
   }

  ngOnInit(): void {
    if(this.role_user === 'ROLE_MEDECIN') {
      this.loadAllPatientsForMedecin();
    } else {
      this.loadAllPatients();
    }

    this.getHospitalisationByPatient();
    
  }

  getHospitalisationByPatient(){
    console.log("Mes hospitalisations "+this.uidlit)
    this.hospitalisatioService.getHospitalisationByPatient(this.uidlit).pipe().subscribe(
      hospitalisations => {
           this.hospitalisations = hospitalisations;
           return this.hospitalisations;
      });
  }

  loadAllPatients(){
    this.patientService.getAllPatients().pipe().subscribe(
        patients => {
             this.patients = patients;
             return this.patients;
        });
  }

  loadAllPatientsForMedecin(){
    this.patientService.getPatientForMedecin().pipe().subscribe(
        patients => {
             this.patients = patients;
             return this.patients;
        });
  }


  getEditFormData() {
    return this.modifPatientForm?.controls;
  }

  openDialogForAddPatient(){
      this.modalAddPatient = new bootstrap.Modal(document.getElementById('modalAddPatient')!, {
        keyboard : false
      })
  
      this.modalAddPatient?.show();
  }

  openDialogForUpdate(patient: Patient){
    this.patientToModify = patient;

    this.modifPatientForm = this.formBuilder.group({
      nomPatient:[this.patientToModify?.nomPatient],
      prenomPatient: [this.patientToModify?.prenomPatient],
      emailPatient: [this.patientToModify?.emailPatient],
      numeroTelephonePatient: [this.patientToModify?.numeroTelephonePatient],
      situationMatrimoniale: [this.patientToModify?.situationMatrimoniale],
      assuranceMedicale: [this.patientToModify?.assuranceMedicale],
      codeAssurance:  [this.patientToModify?.codeAssurance],
      nomAndPrenomICE:  [this.patientToModify?.nomAndPrenomICE],
      numeroTelephoneICE:  [this.patientToModify?.numeroTelephoneICE],
      externalid: [this.patientToModify?.externalid],
  
    }); 
   
    this.modalUpdatePatient = new bootstrap.Modal(document.getElementById('modalUpdatePatient')!, {
      keyboard : false
    })

    this.modalUpdatePatient?.show();
  }

  openDialogForDeletePatient(patient: Patient){
    this.patient = patient;

    this.externalid = patient?.externalid;

    this.modalDeletePatient = new bootstrap.Modal(document.getElementById('modalDeletePatient')!, {
      keyboard : false
    })

    this.modalDeletePatient?.show();
  }

  savePatient(){
    this.patient = this.addPatientForm.value;

    this.patientService.addPatient(this.patient)
            .pipe()
            .subscribe(
                () => {
                  this.isRegister = true;
                  setTimeout( () => {
                   console.log('hide');
                   this.isRegister = false; // here... this has different context
                  }, 2000);

                  this.loadAllPatients();
                  this.modalAddPatient?.hide();
                    
                },
                _error => {
                 
                  this.isError = true;
                  setTimeout( () => {
                   this.isError = false; // here... this has different context
                  }, 2000);

                  this.loadAllPatients();
                  this.modalAddPatient?.hide()
                }); 
  }


  modifPatient(){

    this.patient = this.modifPatientForm.value;

    this.patientService.update(this.patient)
            .pipe()
            .subscribe(
                () => {
                  this.isUpdate = true;

                  this.loadAllPatients();
                  this.modalUpdatePatient?.hide();
                  setTimeout( () => {
                   console.log('hide');
                   this.isUpdate = false; // here... this has different context
                  }, 2000);
  
                },
                _error => {
                  this.modalAddPatient?.hide()
                  this.isError = true;
                  setTimeout( () => {
                   this.isError = false; // here... this has different context
                  }, 2000);

                  this.loadAllPatients();
                 
    }); 
  }


  deletePatient(externalid : String){

    this.patientService.deletePatient(externalid)
            .pipe()
            .subscribe(
                () => {
                  this.isDelete = true;

                  this.loadAllPatients();
                  this.modalDeletePatient?.hide();
                  setTimeout( () => {
                   console.log('hide');
                   this.isDelete = false; // here... this has different context
                  }, 2000);
  
                },
                _error => {
                  this.modalDeletePatient?.hide()
                  this.isError = true;
                  setTimeout( () => {
                   this.isError = false; // here... this has different context
                  }, 2000);

                  this.loadAllPatients();
                 
    }); 
  }
}
