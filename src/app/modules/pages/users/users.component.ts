import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  // ====================== Initializations ==================
  userId: any = -1;

  // ================ Functions ===================
  // get id from child list
  getUserId(event: any) {
    this.userId = event;
  }

  // close details
  closeDetails() {
    this.userId = -1;
  }
}
