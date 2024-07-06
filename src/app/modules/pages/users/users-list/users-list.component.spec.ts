import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UsersService } from 'src/app/core/services/features/users.service';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { loadUser } from 'src/app/core/store/actions';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let usersServiceMock: jasmine.SpyObj<UsersService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let storeMock: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    usersServiceMock = jasmine.createSpyObj('UsersService', ['getAllUsers']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'subscribe']);

    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [HttpClientModule, ToastModule],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: Store, useValue: storeMock }
      ]
    }).compileComponents();

    storeMock.subscribe.and.callFake((callback: any) => {
      return callback({ user: { user: {} } });
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const users = { data: [{ id: -1, first_name: '',last_name:"",email:"",avatar:"" }], total: 1 };
    usersServiceMock.getAllUsers.and.returnValue(of(users));

    component.ngOnInit();

    expect(usersServiceMock.getAllUsers).toHaveBeenCalledWith('?page=1&per_page=5');
    expect(component.users).toEqual(users.data);
    expect(component.totalUsers).toEqual(users.total);
  });

  it('should handle error when loading users', () => {
    usersServiceMock.getAllUsers.and.returnValue(throwError({ error: { error: 'Error occurred' } }));

    component.getAllUsers(1, 5);

    expect(component.loadMore).toBeFalse();
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Error occurred',
    });
  });

  it('should set selected user when getting user details', () => {
    const user = { id: -1, first_name: '',last_name:"",email:"",avatar:"" };

    component.getuserDetails(user);

    expect(storeMock.dispatch).toHaveBeenCalledWith(loadUser({ user }));
    expect(component.selectedUser).toEqual(user);
  });

  it('should open delete dialog when deleting user', () => {
    const user = { id: -1, first_name: '',last_name:"",email:"",avatar:"" };

    component.deleteUser(user);

    expect(storeMock.dispatch).toHaveBeenCalledWith(loadUser({ user }));
    expect(component.dialogVisible).toBeTrue();
    expect(component.isDeleteUser).toBeTrue();
  });

  it('should open update dialog when updating user', () => {
    const user = { id: -1, first_name: '',last_name:"",email:"",avatar:"" };

    component.updateUser(user);

    expect(storeMock.dispatch).toHaveBeenCalledWith(loadUser({ user }));
    expect(component.dialogVisible).toBeTrue();
    expect(component.isDeleteUser).toBeFalse();
  });

  it('should close dialog', () => {
    component.closeDialog();

    expect(component.dialogVisible).toBeFalse();
  });
});
