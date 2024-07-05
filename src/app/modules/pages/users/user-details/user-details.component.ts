import { MessageService } from 'primeng/api';
import { UsersService } from './../../../../core/services/features/users.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [MessageService],
})
export class UserDetailsComponent {
  // ======================== decoratores ============================
  @Input() user: any;
  @Output() closeDetails = new EventEmitter<any>();
  // ======================== Initializations ============================
  updateVisible: boolean = false;
  isDeleteUser: boolean = false;
  // ================ Functions ===================
  // close Details
  closeDetailsSection() {
    this.closeDetails.emit(-1);
  }

  // Delete user
  deleteUser() {
    this.updateVisible = true;
    this.isDeleteUser = true;
  }
  // Update user
  updateUser() {
    this.updateVisible = true;
    this.isDeleteUser = false;
  }

  // close Update
  closeUpdate() {
    this.updateVisible = false;
  }
}
