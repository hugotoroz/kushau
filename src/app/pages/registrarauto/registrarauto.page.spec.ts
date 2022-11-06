import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

import { RegistrarautoPage } from './registrarauto.page';

describe('RegistrarautoPage', () => {
  let component: RegistrarautoPage;
  let fixture: ComponentFixture<RegistrarautoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarautoPage ],
      imports: [IonicModule.forRoot()],
      providers:[SQLite, ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarautoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });
});
