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

  it('should make an API call', () => {
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
});
