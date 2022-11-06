import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { TomarautoPage } from './tomarauto.page';

describe('TomarautoPage', () => {
  let component: TomarautoPage;
  let fixture: ComponentFixture<TomarautoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TomarautoPage ],
      imports: [IonicModule.forRoot()],
      providers:[SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(TomarautoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
