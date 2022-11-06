import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ConfiguracionAutoPage } from './configuracion-auto.page';

describe('ConfiguracionAutoPage', () => {
  let component: ConfiguracionAutoPage;
  let fixture: ComponentFixture<ConfiguracionAutoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionAutoPage ],
      imports: [IonicModule.forRoot()],
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
