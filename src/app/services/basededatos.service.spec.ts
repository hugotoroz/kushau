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
  afterEach(()=>{
    localStorage.removeItem('si');
    service = null;
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return si empty', () => {
    expect(service.obtenerLS()).toEqual([]);
  });
  it('return one elemento si', () => {
    const arr= ['xd']
    localStorage.setItem('si', JSON.stringify(arr));
    expect(service.obtenerLS()).toEqual(arr);
    expect(service.obtenerLS()).toHaveSize(1);

  });
});
