import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Consultation } from 'src/model/consultation';
import { Patient } from 'src/model/patient';
import { ConsultationService } from 'src/services/consultation.service';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {

  // Pagination parameters.
  p: number = 1;
  count: number = 5;
  consultations!: Consultation[];

  isRegister = false;

  isUpdate = false;

  isDelete = false;

  isError = false;

  consultation! : Consultation;

  patients!: Patient[];

  modalAddConsultation : Modal | undefined;

  modalUpdateConsultation : Modal | undefined;

  modalDeleteConsultation : Modal | undefined;

  updateConsultationForm!: FormGroup;

  //uidUser!: String;

  addConsultationForm = this.formBuilder.group({
    diagnosticConsultation:[''],
    typeConsultation:[''],
    uidPatient: [''],
    uidMedecin: [''],
  });

  uidConsultation!: String;

  constructor(private consultationService : ConsultationService, private formBuilder: FormBuilder,
      private patientService: PatientService) { 

        //this.uidUser = localStorage.getItem('uidUser') || '';

      }

  ngOnInit(): void {
    this.loadAllConsulationsForMedecin();
  }

  loadAllConsulationsForMedecin(){
    this.consultationService.getConsultationByMedecin().pipe().subscribe(
      consultations => {
        return this.consultations = consultations;
      });
  }

  loadAllPatientsForMedecin(){
    this.patientService.getPatientForMedecin().pipe().subscribe(
      patients => {
        return this.patients = patients;
      });
  }


  openDialogForAddConsulation(){
    this.loadAllPatientsForMedecin();
    this.modalAddConsultation = new bootstrap.Modal(document.getElementById('modalAddConsultation')!, {
      keyboard : false
    })

    this.modalAddConsultation?.show();

  }

   getEditFormData() {
    return this.updateConsultationForm?.controls;
  }


  openDialogForUpdateConsulation(consulation : Consultation){

    this.loadAllPatientsForMedecin();
    this.consultation = consulation;

    this.updateConsultationForm = this.formBuilder.group({
      diagnosticConsultation: this.consultation?.diagnosticConsultation,
      typeConsultation: this.consultation?.typeConsultation,
      uidPatient: this.consultation?.uidPatient,
      //uidMedecin: this.consultation?.uidMedecin,
      infosPatient: this.consultation?.infosPatient,
      uidConsultation: this.consultation?.uidConsultation,
      dateConsultation: this.consultation?.dateConsultation
    }); 

    this.modalUpdateConsultation = new bootstrap.Modal(document.getElementById('modalUpdateConsultation')!, {
      keyboard : false
    })

    this.modalUpdateConsultation?.show();
  }

  openDialogForDeleteConsulation(consulation : Consultation){
    this.uidConsultation = consulation?.uidConsultation;

    this.modalDeleteConsultation = new bootstrap.Modal(document.getElementById('modalDeleteConsultation')!, {
      keyboard : false
    })

    this.modalDeleteConsultation?.show();
  }

  saveConsultation(){
    this.consultation = this.addConsultationForm.value;
    this.consultationService.addConsulation(this.consultation)
            .pipe()
            .subscribe(
                () => {
                  this.isRegister = true;
                  setTimeout( () => {
                   console.log('hide');
                   this.isRegister = false; // here... this has different context
                  }, 2000);

                  this.loadAllConsulationsForMedecin();
                  this.modalAddConsultation?.hide();
                    
          },
                _error => {
                 
                  this.isError = true;
                  setTimeout( () => {
                   this.isError = false; // here... this has different context
                 }, 2000);

            this.loadAllConsulationsForMedecin();
            this.modalAddConsultation?.hide()
      }); 
  }

  updateConsultation(){

    this.consultation = this.updateConsultationForm.value;

    this.consultationService.updateConsulation(this.consultation)
            .pipe()
            .subscribe(
                () => {
                  this.isUpdate = true;
                  setTimeout( () => {
                   console.log('hide');
                   this.isUpdate = false; // here... this has different context
                  }, 2000);

                  this.loadAllConsulationsForMedecin();
                  this.modalUpdateConsultation?.hide();
                    
          },
                _error => {
                 
                  this.isError = true;
                  setTimeout( () => {
                   this.isError = false; // here... this has different context
                 }, 2000);

                 this.loadAllConsulationsForMedecin();
                 this.modalUpdateConsultation?.hide();
      }); 
  }

  deleteConsultation(uidConsulation: String){

    this.consultationService.deleteConsulation(uidConsulation)
    .pipe()
    .subscribe(
        () => {
          this.isDelete = true;
          setTimeout( () => {
            console.log('hide');
            this.isDelete = false; // here... this has different context
          }, 2000);

          this.loadAllConsulationsForMedecin();
          this.modalDeleteConsultation?.hide();
            
        },
        error => {
         
          this.isError = true;
          setTimeout( () => {
            console.log('hide');
            this.isError = false; // here... this has different context
          }, 2000);

          this.loadAllConsulationsForMedecin();
          this.modalDeleteConsultation?.hide();
        }); 
  }

}
