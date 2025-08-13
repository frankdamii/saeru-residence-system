import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth';

export const studentGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUserRole() === 'student') {
    return true;
  }

  // Si no es estudiante, lo redirige (por seguridad, al login)
  return router.parseUrl('/auth');
};