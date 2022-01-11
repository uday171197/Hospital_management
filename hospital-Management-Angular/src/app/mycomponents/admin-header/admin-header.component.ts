import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/hospitalmain.css']
})
export class AdminHeaderComponent implements OnInit {
   role:string = 'admin'
  constructor() { }

  ngOnInit(): void {
  }

}
