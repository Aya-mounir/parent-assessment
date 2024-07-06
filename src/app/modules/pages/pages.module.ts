import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// primeng
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
// Component
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ToastModule,
    SharedModule,
    DialogModule
  ],
})
export class PagesModule {}
