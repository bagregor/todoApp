import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import Facture from 'src/model/facture';
import { Patient } from 'src/model/patient';
import { FactureService } from 'src/services/facture.service';
import { PatientService } from 'src/services/patient.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

p: number = 1;
count: number = 5;
  
isRegister = false;

isUpdate = false;

isDelete = false;

isError = false;

factures! : Facture[];

patients! : Patient[];

//reponses! : Array<String>[];

facture! : Facture;

modalAddFacture : Modal | undefined;

modalUpdateFacture : Modal | undefined;

modalDeleteFacture : Modal | undefined;

factureToModify!: Facture;

modifFactureForm! : FormGroup;

addFactureForm = this.formBuilder.group({
  datePaiement:[''],
  etatFacture: [''],
  montantFacture: [''],
  uidFacture: [''],
  uidPatient: [''],
});

  constructor(private factureService : FactureService, private formBuilder : FormBuilder, private patientService: PatientService ) { }

  ngOnInit(): void {
    this.loadAllFacture();
  }

  loadAllFacture() {
    this.factureService.getAllFactures().pipe().subscribe(
      factures => {
        this.factures = factures;
        return this.factures;
      }
    )
  }

  loadAllPatients(){
    this.patientService.getAllPatients().pipe().subscribe(
      patients => {
        return this.patients = patients;
      }
    )
  }


  openDialogForAddFacture(){

    this.modalAddFacture = new bootstrap.Modal(document.getElementById('modalAddFacture')!, {
      keyboard : false
    })
  
    this.modalAddFacture?.show();
    this.loadAllPatients();
  }

  openDialogForDeleteFacture(factures: Facture){
    this.factureToModify = factures;

    this.modifFactureForm = this.formBuilder.group({
      infospatients:[this.factureToModify?.infosPatients],
      datePaiement: [this.factureToModify?.datePaiement],
      montantFacture: [this.factureToModify?.montantFacture],
      uidFacture: [this.factureToModify?.uidFacture],
    }); 
   
    this.modalUpdateFacture = new bootstrap.Modal(document.getElementById('modalUpdateFacture')!, {
      keyboard : false
    })

    this.modalUpdateFacture?.show();
  }

  getEditFormData() {
    return this.modifFactureForm?.controls;
  }

  openDialogForUpdateFacture(factures: Facture){

    this.factureToModify = factures
    this.modifFactureForm = this.formBuilder.group({
      infospatients:[this.factureToModify?.infosPatients],
      datePaiement: [this.factureToModify?.datePaiement],
      montantFacture: [this.factureToModify?.montantFacture],
      uidFacture: [this.factureToModify?.uidFacture],
      etatFacture: [this.factureToModify?.estReglee],
      uidPatient: [this.factureToModify?.uidPatient],
    }); 
   
    this.modalUpdateFacture = new bootstrap.Modal(document.getElementById('modalUpdateFacture')!, {
      keyboard : false
    })

    this.modalUpdateFacture?.show();

  }

  saveFacture() {
     this.facture = this.addFactureForm.value;

     this.factureService.addFature(this.facture).pipe().subscribe(
       () => {
        this.isRegister = true;
        setTimeout( () => {
         console.log('hide');
         this.isRegister = false; // here... this has different context
        }, 2000);

        this.loadAllFacture();
        this.modalAddFacture?.hide();
          
      },
      _error => {
       
        this.isError = true;
        setTimeout( () => {
         this.isError = false; // here... this has different context
        }, 2000);

        this.loadAllFacture();
        this.modalAddFacture?.hide()
       });
  }

  updateFacture() {

    this.facture = this.modifFactureForm.value;
  }
}
