import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
import { ApiUrls } from '../../config/api-urls';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Injector, UsersService],
    });

    const injector = TestBed.inject(Injector);
    service = new UsersService(injector);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    const dummyResponse = { data: 'test data' };
    const params = '?page=1';

    service.getAllUsers(params).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}${ApiUrls.users}${params}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should get a single user', () => {
    const dummyResponse = { data: 'test data' };
    const userId = '123';

    service.getUser(userId).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}${ApiUrls.users}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should add a user', () => {
    const dummyResponse = { data: 'test data' };
    const body = { key: 'value' };

    service.addUser(body).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}${ApiUrls.users}`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should update a user', () => {
    const dummyResponse = { data: 'test data' };
    const userId = '123';
    const body = { key: 'value' };

    service.updateUser(userId, body).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}${ApiUrls.users}/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyResponse);
  });

  it('should delete a user', () => {
    const dummyResponse = { data: 'test data' };
    const userId = '123';

    service.deleteUser(userId).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}${ApiUrls.users}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
});
