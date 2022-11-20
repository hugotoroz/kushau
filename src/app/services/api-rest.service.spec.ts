import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiRestService } from './api-rest.service';

describe('ApiRestService', () => {
  let service: ApiRestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ApiRestService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

  });
  afterEach(()=>{
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia traer el usuario v.rosendo5', () => {
    const mockResponse = [
      {
        id:1,
        nombre: 'v.rosendo5',
        clave: 'J.12mm5',
        id_rol: 1,
      },
    ];

    service.getUsuarios().subscribe((res)=>{
      console.log('result', res);
      expect(res).toBeTruthy();
      expect(res).toHaveSize(1);
      const user = res[0];
      expect(user).toBe(mockResponse[0]);
    });
    const mockRequest = httpTestingController.expectOne(
      'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos'
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockResponse);
  });
  it('Deberia traer el auto audi', () => {
    const mockResponse = [
      {
        patente:'FF-HH-22',
        id_usuario: 1,
        marca: 'audi'
      },
    ];

    service.getAutitos().subscribe((res)=>{
      console.log('result', res);
      expect(res).toBeTruthy();
      expect(res).toHaveSize(1);
      const user = res[0];
      expect(user).toBe(mockResponse[0]);
    });
    const mockRequest = httpTestingController.expectOne(
      'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos'
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockResponse);
  });
  it('Deberia traer el auto BMW', () => {
    const mockResponse = [
      {
        patente:'GG-11-RR',
        id_usuario: 1,
        marca: 'BMW'
      },
    ];

    service.getAutitos().subscribe((res)=>{
      console.log('result', res);
      expect(res).toBeTruthy();
      expect(res).toHaveSize(1);
      const user = res[0];
      expect(user).toBe(mockResponse[0]);
    });
    const mockRequest = httpTestingController.expectOne(
      'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos'
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockResponse);
  });
});
