import { Routes } from '@angular/router';
import { ApplicationFormComponent } from './pages/application-form/application-form';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { PublicLayoutComponent } from './components/public-layout/public-layout';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'apply', component: ApplicationFormComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];