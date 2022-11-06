import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainconductorPage } from './mainconductor.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ActivatedRoute } from '@angular/router';

describe('MainconductorPage', () => {
  let component: MainconductorPage;
  let fixture: ComponentFixture<MainconductorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainconductorPage ],
      imports: [IonicModule.forRoot()],
      providers:[Geolocation, ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(MainconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
