import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    PagesLayoutComponent,
    SpinnerComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
  ]
})
export class SharedModule { }
