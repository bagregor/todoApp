import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/model/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {

  
  patients! : Patient[];

  constructor() { }

  ngOnInit(): void {
  }

}
