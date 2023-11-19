import {Routes} from '@angular/router';
import {AuthComponent} from "./layouts/auth/auth.component";
import {MainComponent} from "./layouts/main/main.component";
import {authGuard} from "./middlwares/auth.guard";
import {logoutGuard} from "./middlwares/logout.guard";

export const routes: Routes = [
  {
    path: "account",
    component: AuthComponent,
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    canActivate: [logoutGuard],
  },
  {
    path: "",
    component: MainComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [authGuard],

  },
  {
    path: "**",
    redirectTo: "/account/login"
  }
];
