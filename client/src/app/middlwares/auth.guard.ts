import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('access_token')) {
    inject(Router).navigateByUrl("/account/login").then(r => {
    })
    return false;
  }

  return true;
};
