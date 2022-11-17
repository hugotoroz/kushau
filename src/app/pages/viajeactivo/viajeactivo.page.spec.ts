import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ViajeactivoPage } from './viajeactivo.page';

describe('ViajeactivoPage', () => {
  let component: ViajeactivoPage;
  let fixture: ComponentFixture<ViajeactivoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeactivoPage ],
      imports: [IonicModule.forRoot()],
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajeactivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //it('should create', () => {
  //  expect(component).toBeTruthy();
  //});
});
