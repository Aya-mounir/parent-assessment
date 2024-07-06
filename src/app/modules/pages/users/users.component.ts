import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]
})
export class UsersComponent {
  // ====================== Initializations ==================
  addNewVisible: boolean = false;
  user: any;

  constructor(private store: Store) {
    this.store.subscribe((res: any) => {
      this.user = res.user.user;
    });
  }

  // ================ Functions ===================
  // close add new user dialog
  closeAddNew() {
    this.addNewVisible = false;
  }
}
