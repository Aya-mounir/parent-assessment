import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { IHttpResponse } from 'src/app/core/interfaces/http-response.interface';

describe('BaseService', () => {
  let service: BaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Injector, BaseService],
    });

    const injector = TestBed.inject(Injector);
    service = new BaseService(injector);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request', () => {
    const dummyResponse = { data: 'test data' };
    const url = 'test-endpoint';

    service.get(url).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/${url}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should perform POST request', () => {
    const dummyResponse = { data: 'test data' };
    const url = 'test-endpoint';
    const body = { key: 'value' };

    service.post(url, body).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/${url}`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should perform PUT request', () => {
    const dummyResponse: IHttpResponse<any> = {
      content: 'test data',
      errorMessage: '',
      success: false,
      statusCode: 0
    };
    const url = 'test-endpoint';
    const body = { key: 'value' };

    service.put(url, body).subscribe((res) => {
      expect(res).toEqual(dummyResponse.content);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/${url}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyResponse);
  });

  it('should perform DELETE request', () => {
    const dummyResponse: IHttpResponse<any> = {
      content: 'test data',
      errorMessage: '',
      success: false,
      statusCode: 0
    };
    const url = 'test-endpoint';

    service.delete(url).subscribe((res) => {
      expect(res).toEqual(dummyResponse.content);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/${url}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });

  it('should convert object to query string', () => {
    const obj = { key1: 'value1', key2: 'value2', key3: undefined };
    const queryString = service.toQueryString(obj);
    expect(queryString).toBe('key1=value1&key2=value2');
  });
});
