import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetUser } from 'src/app/core/store/actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [MessageService],
})
export class UserDetailsComponent {
  // ======================== Initializations ============================
  dialogVisible: boolean = false; //check dialog visibality
  isDeleteUser: boolean = false; //check if i want to delete or update
  user: any; //current user info

  constructor(private store: Store) {
    this.store.subscribe((res: any) => {
      this.user = res.user.user; //gt user info from store
    });
  }

  // ================ Functions ===================
  // close Details section
  closeDetailsSection() {
    this.store.dispatch(resetUser()); //reset user in store
  }

  // Delete user
  deleteUser() {
    this.dialogVisible = true;
    this.isDeleteUser = true;
  }
  // Update user
  updateUser() {
    this.dialogVisible = true;
    this.isDeleteUser = false;
  }

  // close Update and delete dialog
  closeDialog() {
    this.dialogVisible = false;
  }
}
