import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { BasededatosService } from './basededatos.service';

describe('BasededatosService', () => {
  let service: BasededatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SQLite]
    });
    service = TestBed.inject(BasededatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
