import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TabconductorPage } from './tabconductor.page';

describe('TabconductorPage', () => {
  let component: TabconductorPage;
  let fixture: ComponentFixture<TabconductorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabconductorPage ],
      imports: [IonicModule.forRoot()],
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(TabconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //it('should create', () => {
  //  expect(component).toBeTruthy();
  //});
});
