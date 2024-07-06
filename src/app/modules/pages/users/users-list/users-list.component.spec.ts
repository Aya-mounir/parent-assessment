import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/core/services/features/users.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadUser } from 'src/app/core/store/actions';
import { of } from 'rxjs';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let store: MockStore;
  let usersService: UsersService; // Declare usersService for testing purposes
  const initialState = {
    user: {
      user: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [StoreModule.forRoot({})],
      providers: [
        UsersService,
        MessageService,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService); // Inject UsersService
    fixture.detectChanges();
  });

  afterEach(() => {
    component.closeDialog(); // Ensure dialog is closed after each test
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.users).toEqual([]);
    expect(component.currentPage).toBe(1);
    expect(component.perPage).toBe(5);
    expect(component.totalUsers).toBe(0);
    expect(component.loadMore).toBe(false);
    expect(component.dialogVisible).toBe(false);
    expect(component.isDeleteUser).toBe(false);
    expect(component.selectedUser).toBeUndefined();
  });

  it('should fetch users on ngOnInit()', () => {
    spyOn(component, 'getAllUsers');
    component.ngOnInit();
    expect(component.getAllUsers).toHaveBeenCalledWith(1, 5);
  });

  it('should fetch users and update state on getAllUsers()', fakeAsync(() => {
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    spyOn(usersService, 'getAllUsers').and.returnValue(of({ data: mockUsers, total: 2 }));

    component.getAllUsers(1, 5);
    tick(); // Simulate passage of time for async operation to complete

    expect(component.loadMore).toBe(false);
    expect(component.users).toEqual(mockUsers);
    expect(component.totalUsers).toBe(2);
  }));

  it('should dispatch loadUser action and update selectedUser on getuserDetails()', () => {
    const mockUser = { id: -1, first_name: '', last_name: '', email: '', avatar: '' };
    spyOn(store, 'dispatch');
    component.getuserDetails(mockUser);
    expect(store.dispatch).toHaveBeenCalledWith(loadUser({ user: mockUser }));
    expect(component.selectedUser).toEqual(mockUser);
  });

  it('should set dialogVisible and isDeleteUser to true on deleteUser()', () => {
    const mockUser = { id: -1, first_name: '', last_name: '', email: '', avatar: '' };
    spyOn(store, 'dispatch');
    component.deleteUser(mockUser);
    expect(store.dispatch).toHaveBeenCalledWith(loadUser({ user: mockUser }));
    expect(component.dialogVisible).toBe(true);
    expect(component.isDeleteUser).toBe(true);
  });

  it('should set dialogVisible and isDeleteUser to false on updateUser()', () => {
    const mockUser = { id: -1, first_name: '', last_name: '', email: '', avatar: '' };
    spyOn(store, 'dispatch');
    component.updateUser(mockUser);
    expect(store.dispatch).toHaveBeenCalledWith(loadUser({ user: mockUser }));
    expect(component.dialogVisible).toBe(true);
    expect(component.isDeleteUser).toBe(false);
  });

  it('should set dialogVisible to false on closeDialog()', () => {
    component.dialogVisible = true;
    component.closeDialog();
    expect(component.dialogVisible).toBe(false);
  });

  // Add more tests as needed
});
