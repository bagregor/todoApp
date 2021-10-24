import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Patient } from 'src/model/patient';
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

  constructor(private patientService: PatientService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadAllPatients();
  }


  loadAllPatients(){
    this.patientService.getAllPatients().pipe().subscribe(
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
