import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent {
  // initializations
  navItems: any = [
    { title: 'home', active: false },
    { title: 'about', active: false },
    { title: 'contact', active: false },
    { title: 'login', active: false },
  ];
}
