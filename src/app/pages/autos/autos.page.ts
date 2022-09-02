import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})
export class AutosPage implements OnInit {
  u:string="";
  ap:string="";
  num1: number= 2000;
  num2: number= 5000;
  constructor(private activedRouter: ActivatedRoute, private router: Router ) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.u= this.router.getCurrentNavigation().extras.state.usu;
        this.ap= this.router.getCurrentNavigation().extras.state.app;
        
      }
    })
   }

  ngOnInit() {
  }

}

