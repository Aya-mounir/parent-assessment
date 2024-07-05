import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/features/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  // Initialization
  loginForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _Router: Router,
    private _AuthService: AuthService,
    private _MessageService: MessageService
  ) {
    // remove token from local storage
    localStorage.removeItem('token');

    // create reactive form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // submit function to login
  onSubmit() {
    this.loading = true;
    // check if inputs is valid and not empty
    if (
      (this.loginForm.value.email != '' ||
        this.loginForm.value.password != '') &&
      this.loginForm.valid == true
    ) {
      // body of request
      const body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      // make a request
      this._AuthService.login(body).subscribe(
        (res: any) => {
          this.loading = false;

          // store token
          localStorage.setItem('token', res.token);
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Logged in Succefuly :)`,
          });
          this._Router.navigate(['pages/enquire']);
        },
        (err) => {
          this.loading = false;

          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.error ? err.error.error : 'Something went wrong!',
          });
        }
      );
    } else {
      // check if password field is empty
      if (this.loginForm.value.password == '') {
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Password is Missing!`,
        });
      }
      // check if email is empty
      if (this.loginForm.value.email == '') {
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Email is Missing!`,
        });
      }
    }
  }
}
