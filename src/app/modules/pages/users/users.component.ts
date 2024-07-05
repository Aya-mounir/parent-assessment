import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUser } from 'src/app/core/store/actions';
import { selectUser } from 'src/app/core/store/selectors';
import { User } from 'src/app/core/store/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
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

  closeAddNew() {
    this.addNewVisible = false;
  }
}
