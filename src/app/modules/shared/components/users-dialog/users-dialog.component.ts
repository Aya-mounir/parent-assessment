import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/core/services/features/users.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss'],
  providers: [MessageService],
})
export class UsersDialogComponent {
  //  ========================= decorator ====================
  @Input() visible: boolean = false;
  @Input() userId: any = -1;
  @Output() close = new EventEmitter<boolean>();

  // ========================== Initialization ==================
  user: any;
  userForm: FormGroup;
  loading: boolean = false;

  constructor(
    private _UsersService: UsersService,
    private _MessageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    // create reactive form
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });
  }

  ngOnChanges(): void {
    // check if id found then update
    // so i get user by id to update on his data
    if (this.userId != -1) {
      this._UsersService.getAllUsers('/' + this.userId).subscribe(
        (res: any) => {
          console.log(res.data);
          this.userForm.value.name = res.data.first_name;
          this.userForm = this.formBuilder.group({
            name: [
              res.data.first_name + ' ' + res.data.last_name,
              [Validators.required],
            ],
            job: ['', [Validators.required]],
          });
        },
        (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.error ? err.error.error : `Something went wrong!`,
          });
        }
      );
    } else {
      this.userForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        job: ['', [Validators.required]],
      });
    }
  }

  //  ======================= Functions =======================
  cancel() {
    this.close.emit(false);
  }

  onSubmit() {
    if (this.userForm.valid) {
      // if form Valid
      const payload = {
        name: this.userForm.value.name,
        job: this.userForm.value.job,
      };
      if (this.userId == -1) {
        this.loading = true;
        // Add New User
        this._UsersService.addUser(payload).subscribe(
          (res: any) => {
            this._MessageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `User Created Successfuly!`,
            });
            // close dialog after success
            () => this.close.emit(false);
            //  reset Form
            this.resetForm();
          },
          (err) => {
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
        // Update User
        this._UsersService.updateUser(this.userId, payload).subscribe(
          (res: any) => {
            this._MessageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `User Updated Successfuly!`,
            });

            // close dialog after success
            this.close.emit(false);
            //  reset Form
            this.resetForm();
          },
          (err) => {
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

  // reset Form
  resetForm() {
    this.loading = false;
    this.userId = -1;
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });
  }
}
