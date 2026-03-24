import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './core/dashboard/dashboard';
import { CalenderOpportunity } from './core/calender-opportunity/calender-opportunity';
import { Edit } from './core/edit/edit';
import { ForgetPass } from './auth/forget-pass/forget-pass';
import { Preview } from './core/preview/preview';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },


{
  path: 'dashboard',
  loadComponent: () => import('./core/dashboard/dashboard').then(m => m.Dashboard),
  canActivate: [AuthGuard]
},


  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar-opportunity',
    component: CalenderOpportunity,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: Edit,
    canActivate: [AuthGuard]
  },
  {
    path: 'forget',
    component: ForgetPass,
    canActivate: [AuthGuard]
  },
  {
    path: 'preview',
    component: Preview,
    canActivate: [AuthGuard]
  },
];
