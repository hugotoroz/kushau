import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ViajeactivoCondPage } from './viajeactivo-cond.page';

describe('ViajeactivoCondPage', () => {
  let component: ViajeactivoCondPage;
  let fixture: ComponentFixture<ViajeactivoCondPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeactivoCondPage ],
      imports: [IonicModule.forRoot()],
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajeactivoCondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
