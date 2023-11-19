import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const logoutGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('access_token')) {
    inject(Router).navigateByUrl("/").then(r => {
    })
    return false;
  }

  return true;
};
