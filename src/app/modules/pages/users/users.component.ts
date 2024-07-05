import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  // ====================== Initializations ==================
  user: any = {id:-1};
  addNewVisible: boolean = false;

  // ================ Functions ===================
  // get id from child list
  getUserId(event: any) {
    this.user = event;
  }

  // close details
  closeDetails() {
    this.user = {id:-1};
  }
  closeAddNew() {
    this.addNewVisible = false;
  }
}
