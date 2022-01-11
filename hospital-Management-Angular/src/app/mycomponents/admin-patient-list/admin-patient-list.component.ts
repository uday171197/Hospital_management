import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-patient-list',
  templateUrl: './admin-patient-list.component.html',
  styleUrls: ['./admin-patient-list.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/hospitalmain.css']
})
export class AdminPatientListComponent implements OnInit {
  Patients=[
    {
      _id:1,
      name:'Uday',
      email:'uday@gmail',

    },
    {
      _id:2,
      name:'Uday',
      email:'uday@gmail',

    },
    {
      _id:3,
      name:'Uday',
      email:'uday@gmail',

    },
    {
      _id:4,
      name:'Uday',
      email:'uday@gmail',

    }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
