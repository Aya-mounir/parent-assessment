import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/core/services/features/users.service';
import { resetUser } from 'src/app/core/store/actions';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss'],
  providers: [MessageService],
})
export class UsersDialogComponent {
  //  ========================= decorator ====================
  @Input() visible: boolean = false;
  @Input() isDelete: boolean = false;
  @Input() isUpdate: boolean = false;
  @Input() isAdd: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  // ========================== Initialization ==================
  userForm: FormGroup;
  loading: boolean = false;
  user: any;
  constructor(
    private _UsersService: UsersService,
    private _MessageService: MessageService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    // get user value
    this.store.subscribe((res: any) => {
      this.user = res.user.user;
    });
    // create reactive form
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });
  }

  ngOnChanges(): void {
    // check if id found then update
    // so i get user by id to update on his data
    if (this.isUpdate) {
      // in update set user info into inputs
      this.userForm = this.formBuilder.group({
        name: [
          this.user.first_name + ' ' + this.user.last_name,
          [Validators.required],
        ],
        job: ['', [Validators.required]],
      });
    }
  }

  //  ======================= Functions =======================
  // emit to close dialog
  cancel() {
    // reset form
    this.resetForm();
    this.close.emit(false);
  }

  onSubmit() {
    if (this.userForm.value.name == '') {
      this._MessageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Name Field is Required!`,
      });
    }
    if (this.userForm.value.job == '') {
      this._MessageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Job Field is Required!`,
      });
    }

    // if fields is not empty
    if (this.userForm.value.name != '' && this.userForm.value.job != '') {
      // Add loader
      this.loading = true;

      if (this.userForm.valid) {
        // if form Valid

        // body of request data
        const body = {
          name: this.userForm.value.name,
          job: this.userForm.value.job,
        };
        if (this.isUpdate) {
          // Update User
          this._UsersService.updateUser(this.user.id, body).subscribe(
            (res: any) => {
              this._MessageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `User Updated Successfuly!`,
              });

              // close dialog after success
              this.close.emit(false);
              //  stop loader
              this.loading = false;
            },
            (err) => {
              //  stop loader
              this.loading = false;
              this._MessageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err.error.error
                  ? err.error.error
                  : `Something went wrong!`,
              });
            }
          );
        } else {
          // Add User
          this._UsersService.updateUser(this.user.id, body).subscribe(
            (res: any) => {
              this._MessageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `User Added Successfuly!`,
              });
              // close dialog after success
              this.close.emit(false);
              //  stop loader
              this.loading = false;

              // reset form
              this.resetForm();
            },
            (err) => {
              console.log(err);

              //  stop loader
              this.loading = false;
              this._MessageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err.error.error
                  ? err.error.error
                  : `Something went wrong!`,
              });
            }
          );
        }
      } else {
        // if form does not valid
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Some thing went wrong!`,
        });
      }
    }
  }

  // reset Form
  resetForm() {
    this.store.dispatch(resetUser()); //reset
    //reset form
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });
  }

  // delete user
  deleteUser() {
    this.loading = true;
    this._UsersService.deleteUser(this.user.id).subscribe(
      (res: any) => {
        // close dialog after success
        this.close.emit(false);
        //  stop loader
        this.loading = false;
        this._MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User Deleted Successfuly!`,
        });
      },
      (err) => {
        // close dialog after success
        this.close.emit(false);
        //  stop loader
        this.loading = false;
        this._MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User Deleted Successfuly!`,
        });
      }
    );
  }
}
