import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ConfiguracionPage } from './configuracion.page';

describe('ConfiguracionPage', () => {
  let component: ConfiguracionPage;
  let fixture: ComponentFixture<ConfiguracionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionPage ],
      imports: [IonicModule.forRoot()],
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  
//  it('should create', () => {
//  expect(component).toBeTruthy();
//  });
});
