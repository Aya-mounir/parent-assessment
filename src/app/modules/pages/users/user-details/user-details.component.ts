import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  // ======================== decoratores ============================
  @Input() userId: any;
  @Output() closeDetails = new EventEmitter<any>();

  // ================ Functions ===================
  // close Details
  closeDetailsSection() {
    this.closeDetails.emit(-1);
  }
}
