import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../../../core/services/global/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {
    console.log(loader.getLoading());
  }
}
