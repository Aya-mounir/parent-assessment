import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    PagesLayoutComponent,
    NavBarComponent,
    UsersDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DialogModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports: [
    UsersDialogComponent,
  ]
})
export class SharedModule { }
