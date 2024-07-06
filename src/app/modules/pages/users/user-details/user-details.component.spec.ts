import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { resetUser } from 'src/app/core/store/actions';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let store: MockStore;
  const initialState = { user: { user: { /* mock initial user state */ } } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [StoreModule.forRoot({})], // Initialize with empty state
      providers: [
        MessageService,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.closeDialog(); // Ensure dialog is closed after each test
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with dialogVisible set to false', () => {
    expect(component.dialogVisible).toBe(false);
  });

  it('should initialize with isDeleteUser set to false', () => {
    expect(component.isDeleteUser).toBe(false);
  });

  it('should set user from store subscription', () => {
    const mockUser = { id: 1, name: 'Test User' };
    store.setState({ user: { user: mockUser } });

    fixture.detectChanges();

    expect(component.user).toEqual(mockUser);
  });

  it('should dispatch resetUser action on closeDetailsSection()', () => {
    spyOn(store, 'dispatch');
    component.closeDetailsSection();
    expect(store.dispatch).toHaveBeenCalledWith(resetUser());
  });

  it('should set dialogVisible to true and isDeleteUser to true on deleteUser()', () => {
    component.deleteUser();
    expect(component.dialogVisible).toBe(true);
    expect(component.isDeleteUser).toBe(true);
  });

  it('should set dialogVisible to true and isDeleteUser to false on updateUser()', () => {
    component.updateUser();
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
