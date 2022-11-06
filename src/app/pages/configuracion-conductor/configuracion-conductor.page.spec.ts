import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ConfiguracionConductorPage } from './configuracion-conductor.page';

describe('ConfiguracionConductorPage', () => {
  let component: ConfiguracionConductorPage;
  let fixture: ComponentFixture<ConfiguracionConductorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionConductorPage ],
      imports: [IonicModule.forRoot()],
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //it('should create', () => {
   // expect(component).toBeTruthy();
  //});
});
