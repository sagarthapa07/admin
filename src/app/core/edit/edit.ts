import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoSocialComponent } from '../seo-social/seo-social';
import { CountiesComponent } from '../counties/counties';
import { FocusAreaComponent } from '../focus-areas/focus-areas';
import { GeoLocationComponent } from '../geo-location/geo-location';
import { Header } from '../../shared/component/header/header';
import { FocusGroupsComponent } from '../focus-groups/focus-groups';
import { CalendarDetails } from '../calendar-details/calendar-details';

@Component({
  standalone: true,
  selector: 'app-example',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SeoSocialComponent,
    CountiesComponent,
    FocusAreaComponent,
    GeoLocationComponent,
    Header,
    FocusGroupsComponent,
    CalendarDetails,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit {
  opportunityForm: FormGroup;

  menuItems = [
    'Calender Details',
    'Geo Location',
    'Focus Areas',
    'Focus Groups',
    'Counties',
    'Seo/Social Media',
  ];

  activeItem = 'Calender Details';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.opportunityForm = this.fb.group({
      title: [''],
      linkUrl: [''],
      postDate: [''],
      deadlineDate: [''],
      isOngoing: [false],
      shortInfo: [''],
      donorType: ['US Donors'],
      donorAgency: [''],
      donorAgencyOther: [''],
      grantType: [''],
      grantDuration: [''],
      grantSize: [''],
      status: ['Draft'],
      letterText: [''],
    });
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  onSave() {
    console.log(this.opportunityForm.value);
  }

  gotoPreview() {
    this.router.navigate(['/preview']);
  }

  goToGeoLocation() {
    this.activeItem = 'Geo Location';
  }
}
