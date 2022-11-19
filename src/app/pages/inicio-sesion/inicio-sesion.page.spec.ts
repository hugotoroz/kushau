import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { InicioSesionPage } from './inicio-sesion.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('InicioSesionPage', () => {
  let component: InicioSesionPage;
  let fixture: ComponentFixture<InicioSesionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioSesionPage ],
      imports: [IonicModule.forRoot()],
      providers:[Geolocation, SQLite, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  
  //it('should create', () => {
  //  expect(component).toBeTruthy();
  //});

  
});
