import { Routes } from '@angular/router';
import { MyProfileComponent } from './pages/my-profile/my-profile';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: MyProfileComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  }
];