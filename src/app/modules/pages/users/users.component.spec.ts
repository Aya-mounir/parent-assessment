import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let store: MockStore;
  const initialState = { user: { user: { /* mock initial user state */ } } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [StoreModule.forRoot({})], // Initialize with empty state
      providers: [
        MessageService,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with addNewVisible set to false', () => {
    expect(component.addNewVisible).toBe(false);
  });

  it('should set user from store subscription', () => {
    const mockUser = { id: 1, name: 'Test User' };
    store.setState({ user: { user: mockUser } });

    fixture.detectChanges();

    expect(component.user).toEqual(mockUser);
  });

  it('should close add new user dialog', () => {
    component.addNewVisible = true;
    component.closeAddNew();
    expect(component.addNewVisible).toBe(false);
  });

  // Add more tests as needed
});
