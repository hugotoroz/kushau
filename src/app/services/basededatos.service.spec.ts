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
    localStorage.removeItem('todos');
    service = null;
  })

  it('Servicio se crea exitosamente', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia retornar un array vacio', () => {
    expect(service.getTodos()).toEqual([]);
  });

  it('retorna un array con un objeto', () => {
    const arr = ['First Todo'];
    localStorage.setItem('todos', JSON.stringify(arr));
    expect(service.getTodos()).toEqual(arr);
    expect(service.getTodos()).toHaveSize(1);
  });
});
