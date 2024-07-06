import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/features/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastModule } from 'primeng/toast'; // Import ToastModule from PrimeNG


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let messageService: MessageService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule,ToastModule],
      declarations: [LoginComponent],
      providers: [FormBuilder, MessageService, AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    messageService = TestBed.inject(MessageService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle form submission with valid credentials', () => {
    spyOn(authService, 'login').and.returnValue(of({ token: 'dummy-token' }));
    spyOn(router, 'navigateByUrl');

    component.loginForm.setValue({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });

    component.onSubmit();

  });

  it('should handle form submission with missing password', () => {
    spyOn(messageService, 'add');

    component.loginForm.setValue({
      email: 'test@example.com',
      password: '', // Simulate missing password
    });

    component.onSubmit();

  });

  it('should handle form submission with missing email', () => {
    spyOn(messageService, 'add');

    component.loginForm.setValue({
      email: '',
      password: 'password',
    });

    component.onSubmit();

  });

  it('should handle form submission with empty form', () => {
    spyOn(messageService, 'add');

    component.onSubmit();

  });
});
