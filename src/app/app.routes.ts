import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './core/dashboard/dashboard';
import { CalenderOpportunity } from './core/calender-opportunity/calender-opportunity';
import { Edit } from './core/edit/edit';
import { ForgetPass } from './auth/forget-pass/forget-pass';
import { CalendarDetails } from './core/calendar-details/calendar-details';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'calendar-opportunity',
    component: CalenderOpportunity,
  },
  {
    path: 'edit',
    component: Edit,
  },
  {
    path: 'forget',
    component: ForgetPass,
  },
  {
    path: 'calender -details',
    component: CalendarDetails,
  },
];
