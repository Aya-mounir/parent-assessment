import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersDialogComponent } from './users-dialog.component';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/core/services/features/users.service';
import { of } from 'rxjs';
import { resetUser } from 'src/app/core/store/actions';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

describe('UsersDialogComponent', () => {
  let component: UsersDialogComponent;
  let fixture: ComponentFixture<UsersDialogComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const storeSpyObj = jasmine.createSpyObj('Store', ['subscribe', 'dispatch']);
    const usersServiceSpyObj = jasmine.createSpyObj('UsersService', ['updateUser', 'deleteUser']);

    await TestBed.configureTestingModule({
      declarations: [UsersDialogComponent],
      imports: [ReactiveFormsModule,ToastModule,DialogModule],
      providers: [
        { provide: Store, useValue: storeSpyObj },
        { provide: UsersService, useValue: usersServiceSpyObj },
        MessageService, // You may mock this if needed
      ],
    }).compileComponents();

    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    usersServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;

    fixture = TestBed.createComponent(UsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form and dispatch resetUser action', () => {
    const resetUserAction = resetUser();

    spyOn(component.userForm, 'reset');
    component.resetForm();

  });

  it('should update user when isUpdate is true', () => {
    const body = { name: 'Test User', job: 'Tester' };
    component.isUpdate = true;

    usersServiceSpy.updateUser.and.returnValue(of({}));

    component.onSubmit();

  });


  it('should delete user', () => {
    component.user = { id: 1 };

    usersServiceSpy.deleteUser.and.returnValue(of({}));

    component.deleteUser();

    expect(usersServiceSpy.deleteUser).toHaveBeenCalledWith(component.user.id);
    expect(component.loading).toBe(false);
  });
});
