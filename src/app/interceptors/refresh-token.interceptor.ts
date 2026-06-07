import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      // Si no es un error de autenticación,
      // dejamos que Angular lo gestione normalmente
      if (error.status !== 401) {

        return throwError(() => error);

      }

      // El access token ha expirado.
      // Intentamos obtener uno nuevo usando el refresh token.
      return authService.refreshToken().pipe(

        switchMap(response => {

          // Guardamos los nuevos tokens recibidos
          authService.saveTokens(
            response.accessToken,
            response.refreshToken
          );

          // Repetimos la petición original
          // con el nuevo access token.
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });

          return next(clonedRequest);

        }),

        catchError(refreshError => {

          // Si el refresh token también ha expirado,
          // cerramos la sesión.
          authService.logout();

          return throwError(() => refreshError);

        })

      );

    })

  );

};