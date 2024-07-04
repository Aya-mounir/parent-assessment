import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  // decoratores
  @Input() navItems: any = [];

  // Initialization

  constructor(private _Router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    // check on nav items to fill current page item
    this.navItems.forEach((item: any) => {
      if (this._Router.url.includes(item.title)) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  }

  changeStatus(title: string) {
    this.navItems.forEach((item: any) => {
      if (title == item.title) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    // Here we can route to the new page

  }
}
