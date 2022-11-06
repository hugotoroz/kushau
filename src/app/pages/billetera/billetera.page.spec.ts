import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { BilleteraPage } from './billetera.page';

describe('BilleteraPage', () => {
  let component: BilleteraPage;
  let fixture: ComponentFixture<BilleteraPage>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
