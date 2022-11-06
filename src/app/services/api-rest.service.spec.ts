import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiRestService } from './api-rest.service';

describe('ApiRestService', () => {
  let service: ApiRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler]
    });
    service = TestBed.inject(ApiRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
