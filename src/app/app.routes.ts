import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './core/dashboard/dashboard';
import { CalenderOpportunity } from './core/calender-opportunity/calender-opportunity';
import { Edit } from './core/edit/edit';
import { ForgetPass } from './auth/forget-pass/forget-pass';
import { Preview } from './core/preview/preview';
import { CalendarDetails } from './core/calendar-details/calendar-details';
import { GeoLocationComponent } from './core/geo-location/geo-location';
import { FocusAreaComponent } from './core/focus-areas/focus-areas';
import { FocusGroupsComponent } from './core/focus-groups/focus-groups';
import { CountiesComponent } from './core/counties/counties';
import { SeoSocialComponent } from './core/seo-social/seo-social';

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
    path: 'preview',
    component: Preview,
  },
  {
    path: 'calendar-details',
    component: CalendarDetails,
  },
  {
    path: 'geo-location',
    component: GeoLocationComponent,
  },
  {
    path: 'focus-area',
    component: FocusAreaComponent,
  },
  {
    path: 'focus-group',
    component: FocusGroupsComponent,
  },
  {
    path: 'counties',
    component: CountiesComponent,
  },
  {
    path: 'seo-social',
    component: SeoSocialComponent,
  },
];
