import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './modules/shared/layout/auth-layout/auth-layout.component';
import { PagesLayoutComponent } from './modules/shared/layout/pages-layout/pages-layout.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'pages',
    component: PagesLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/pages/pages.module').then((m) => m.PagesModule),
      },

    ],
    // canActivate: [authGuard],
  },
  {path: '**', redirectTo: 'auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
