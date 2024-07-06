import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { ApiUrls } from '../../config/api-urls';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Injector, AuthService],
    });

    const injector = TestBed.inject(Injector);
    service = new AuthService(injector);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login', () => {
    const dummyResponse = { token: 'dummy-token' };
    const loginData = { username: 'testuser', password: 'testpassword' };

    service.login(loginData).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/${ApiUrls.auth.login}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData); // Check if request body matches
    req.flush(dummyResponse); // Simulate server response
  });
});
