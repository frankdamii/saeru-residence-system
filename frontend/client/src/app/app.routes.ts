import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { studentGuard } from './core/guards/student-guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./admin/admin.routes').then(r => r.ADMIN_ROUTES)
  },
  {
    path: 'student',
    canActivate: [authGuard, studentGuard],
    loadChildren: () => import('./student/student.routes').then(r => r.STUDENT_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: '', // La ruta raíz ahora carga el módulo público
    loadChildren: () => import('./public/public.routes').then(r => r.PUBLIC_ROUTES)
  },
  {
    path: '**', // Cualquier otra ruta redirige a la home
    redirectTo: ''
  }
];