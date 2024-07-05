import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/core/services/features/users.service';
import { loadUser } from 'src/app/core/store/actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [MessageService],
})
export class UsersListComponent {
  // ======================= Initializations =============================
  users: any[] = [];
  currentPage: number = 1;
  perPage: number = 5;
  totalUsers: number = 0;
  loadMore: boolean = false;
  dialogVisible: boolean = false;
  isDeleteUser: boolean = false; //check if i want to delete or update
  selectedUser: any; //current user info

  constructor(
    private usersService: UsersService,
    private _MessageService: MessageService,
    private store: Store
  ) {
    store.subscribe((res: any) => {
      this.selectedUser = res.user.user;
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllUsers(1, 5);
  }

  // ================ Functions ===================
  // get All Users
  getAllUsers(page: number, perPage: number) {
    this.loadMore = true; //make loader visible
    let params = '?page=' + page + '&per_page=' + perPage;//set current page and users per page
    this.usersService.getAllUsers(params).subscribe(
      (res: any) => {
        this.loadMore = false;
        this.users = res.data;
        this.totalUsers = res.total;
      },
      (err) => {
        this.loadMore = false;
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error ? err.error.error : `Something went wrong!`,
        });
      }
    );
  }

  // get user details
  getuserDetails(user: any) {
    this.store.dispatch(loadUser({ user: user }));//change user info from store with new user
    this.selectedUser = user;
  }

  // delete user
  deleteUser(user: any) {
    this.store.dispatch(loadUser({ user: user })); //change user info from store with new user
    this.dialogVisible = true;
    this.isDeleteUser = true;
  }

  // update user
  updateUser(user: any) {
    this.store.dispatch(loadUser({ user: user }));//change user info from store with new user
    this.dialogVisible = true;
    this.isDeleteUser = false;
  }

  // close Update Dialog
  closeDialog() {
    this.dialogVisible = false;
  }
}
