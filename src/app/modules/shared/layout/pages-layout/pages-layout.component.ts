import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-layout',
  templateUrl: './pages-layout.component.html',
  styleUrls: ['./pages-layout.component.scss']
})
export class PagesLayoutComponent {
  // initializations
  navItems: any = [
    { title: 'home', active: false },
    { title: 'about', active: false },
    { title: 'contact', active: false },
    { title: 'enquire', active: false },
  ];

}
