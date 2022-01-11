import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls:['./header-admin.component.css','../../../assets/css/bootstrap.min.css','../../../assets/css/hospitalmain.css'],
})

export class HeaderAdminComponent implements OnInit {
  tabname:string ='';

  constructor() { }

  ngOnInit(): void {
  }
  openTab(tabname:string){
   console.log(tabname)
  }
}
