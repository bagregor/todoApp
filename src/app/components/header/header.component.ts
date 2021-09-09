import { Component, OnInit } from '@angular/core';
//import { MaterialsModule } from 'src/app/shared/modules/materials.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 display:boolean = false;
 displaymenu:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
