import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('access_token');
  if (token) {

    req = req.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(req).pipe(catchError(err => {
    if (err.status === 403) {
      // auto logout if 401 response returned from api
      localStorage.removeItem('access_token');
      location.reload();
    }

    const error = err.error.message || err.statusText;
    return throwError(error);
  }));
};
