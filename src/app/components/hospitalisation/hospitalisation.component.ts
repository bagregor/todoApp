import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import Hospitalisation from 'src/model/hospitalisation';
import { Lit } from 'src/model/lit';
import { Patient } from 'src/model/patient';
import { HospitalisationService } from 'src/services/hospitalisation.service';
import { LitService } from 'src/services/lit.service';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'app-hospitalisation',
  templateUrl: './hospitalisation.component.html',
  styleUrls: ['./hospitalisation.component.scss']
})
export class HospitalisationComponent implements OnInit {

  isRegister = false;

  isUpdate = false;

  isDelete = false;

  isError = false;

  hospitalisations!: Hospitalisation[];

  lits!: Lit[];

  patients!: Patient[];

  hospitalisation!: Hospitalisation;

  modalAddHospitalisation : Modal | undefined;

  modalUpdateHospitalisation : Modal | undefined;

  modalDeleteHospitalisation : Modal | undefined;

  modalRemoveHospitalisation : Modal | undefined;

  addHospitalisationForm = this.formBuilder.group({
    dateAdmission:[''],
    motifAdmission: [''],
    dateSortie: ['', Validators.required, Validators.email],
    motifSortie: [''],
    infosAccompagnant: [''],
    dateDeces: [''],
    causeDeces:  [''],
    uidLit:  [''],
    numeroTelephoneICE: [''],
    uidPatient: [''],
  });

  constructor(private hospitalisationService: HospitalisationService, private formBuilder: FormBuilder,
              private litService :  LitService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadAllHospitalisationForMedecin();
    //this.loadAllLitsDisponibles();
  }

  loadAllHospitalisationForMedecin(){
    this.hospitalisationService.getAllHospitalisaForMedecin().pipe().subscribe(
      hospitalisations => {
        return this.hospitalisations = hospitalisations;

      }
    )
  }

  loadAllLitsDisponibles(){
    this.litService.getAllitsDisponibles().pipe().subscribe(
      lits => {
        return this.lits = lits;
      }
    )
  }

  loadAllPatientsForMedecin(){
    this.patientService.getPatientForMedecin().pipe().subscribe(
      patients => {
        return this.patients = patients;
      }
    )
  }

  openDialogForAddHospitalisation() {
    this.loadAllLitsDisponibles();
    this.loadAllPatientsForMedecin();
    this.modalAddHospitalisation = new bootstrap.Modal(document.getElementById('modalAddHospitalisation')!, {
      keyboard : false
    })

    this.modalAddHospitalisation?.show();
  }

  openDialogForDeleteHospitalisation(hospitalisations: Hospitalisation) {
    this.hospitalisation = hospitalisations;

    this.modalRemoveHospitalisation = new bootstrap.Modal(document.getElementById("modalRemoveHospitalisation")!, {
      keyboard : false
    })

    this.modalRemoveHospitalisation?.show();

  }

  openDialogForHospitalisation(hospitalisations: Hospitalisation) {

  }

  saveHospitalisation(){

    this.hospitalisation = this.addHospitalisationForm.value;

    this.hospitalisationService.addHospitalisation(this.hospitalisation).pipe().subscribe(
      ()=> {
        this.isRegister = true;
        setTimeout( ()=> {
          this.isRegister = false;
        }, 2000);

        this.loadAllHospitalisationForMedecin();
        this.modalAddHospitalisation?.hide();
      },
      _error => {
        this.isError = true;
        setTimeout( ()=> {
          this.isError = false;
        }, 2000);
        this.loadAllHospitalisationForMedecin();
        this.modalAddHospitalisation?.hide();
      }
    )
  }

  removeHospitalisation(hospitalisation: Hospitalisation){
    console.log("le removeHospitalisation "+JSON.stringify(this.hospitalisation))
  }
}
