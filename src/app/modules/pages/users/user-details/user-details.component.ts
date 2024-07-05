import { MessageService } from 'primeng/api';
import { UsersService } from './../../../../core/services/features/users.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/store/user.model';
import { Store } from '@ngrx/store';
import { resetUser, updateUser } from 'src/app/core/store/actions';
import { selectUser } from 'src/app/core/store/selectors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [MessageService],
})
export class UserDetailsComponent {
  // ======================== Initializations ============================
  updateVisible: boolean = false;
  isDeleteUser: boolean = false;
  user: any;

  constructor(private store: Store) {
    this.store.subscribe((res:any)=>{
      this.user = res.user.user;
    })
  }

  // ================ Functions ===================
  // close Details
  closeDetailsSection() {
    this.store.dispatch(resetUser());


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
