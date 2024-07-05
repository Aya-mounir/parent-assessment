import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  updateVisible: boolean = false;
  userUpdate: any = { id: -1 };
  isDeleteUser: boolean = false;
  selectUser: any;

  constructor(
    private usersService: UsersService,
    private _MessageService: MessageService,
    private store: Store
  ) {
    store.subscribe((res: any) => {
      this.selectUser = res.user.user;
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
    this.loadMore = true;
    let params = '?page=' + page + '&per_page=' + perPage;
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

  // add new
  getuserDetails(user: any) {
    this.store.dispatch(loadUser({ user: user }));
    this.selectUser = user;
  }

  // delete
  deleteUser(user: any) {
    this.store.dispatch(loadUser({ user: user }));
    this.updateVisible = true;
    this.isDeleteUser = true;
    this.selectUser = user;
  }

  // update
  updateUser(user: any) {
    this.store.dispatch(loadUser({ user: user }));
    this.updateVisible = true;
    this.isDeleteUser = false;
    this.selectUser = user;
  }

  // close Update
  closeUpdate() {
    this.updateVisible = false;
  }
}
