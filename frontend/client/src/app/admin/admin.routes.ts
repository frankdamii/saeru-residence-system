import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ApplicationListComponent } from './pages/application-list/application-list';
import { ApplicationDetailComponent } from './pages/application-detail/application-detail';
import { ResidentListComponent } from './pages/resident-list/resident-list';
import { ResidentDetailComponent } from './pages/resident-detail/resident-detail';
import { HabitationListComponent } from './pages/habitation-list/habitation-list';
import { AnnouncementsComponent } from './pages/announcements/announcements';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'applications', component: ApplicationListComponent },
      { path: 'applications/:id', component: ApplicationDetailComponent },
      { path: 'students', component: ResidentListComponent },
      { path: 'students/:id', component: ResidentDetailComponent },
      { path: 'announcements', component: AnnouncementsComponent },
      { path: 'habitations', component: HabitationListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];