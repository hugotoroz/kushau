import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { BilleteraPage } from './billetera.page';
import { BasededatosService } from 'src/app/services/basededatos.service';

describe('BilleteraPage', () => {
  let component: BilleteraPage;
  let fixture: ComponentFixture<BilleteraPage>;
  let service:BasededatosService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraPage ],
      imports: [IonicModule.forRoot()],
      providers:[SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(BilleteraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //it('should create', () => {
  //  expect(component).toBeTruthy();
  //});
});
