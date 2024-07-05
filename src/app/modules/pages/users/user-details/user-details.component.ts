import { MessageService } from 'primeng/api';
import { UsersService } from './../../../../core/services/features/users.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [MessageService],
})
export class UserDetailsComponent {
  // ======================== decoratores ============================
  @Input() userId: any;
  @Output() closeDetails = new EventEmitter<any>();
  // ======================== Initializations ============================
  user: any;
  constructor(
    private _UsersService: UsersService,
    private _MessageService: MessageService
  ) {
    console.log(this.userId);
  }
  ngonInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this._UsersService.getAllUsers(this.userId).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.error ? err.error.error : `Something went wrong!`,
        });
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.userId);
    this._UsersService.getAllUsers('/' + this.userId).subscribe(
      (res: any) => {
        console.log(res);
        this.user = res.data;
      },
      (err) => {
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.error ? err.error.error : `Something went wrong!`,
        });
      }
    );
    // this._UsersService.getUser(this.userId).subscribe(
    //   (res: any) => {
    //     this.user = res.data;
    //   },
    //   (err) => {
    //     this._MessageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: err.error.error ? err.error.error : `Something went wrong!`,
    //     });
    //   }
    // );
  }

  // ================ Functions ===================
  // close Details
  closeDetailsSection() {
    this.closeDetails.emit(-1);
  }
}
