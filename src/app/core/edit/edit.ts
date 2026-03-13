import { Component, OnInit, HostListener, ElementRef, ViewChild,Inject } from '@angular/core';
import { Header } from '../../shared/component/header/header';
import { CalendarDetails } from '../calendar-details/calendar-details';
import { GeoLocationComponent } from '../geo-location/geo-location';
import { NgForOf } from "@angular/common";
import { FocusAreasComponent } from "../focus-areas/focus-areas";
import { FocusGroupsComponent } from "../focus-groups/focus-groups";
import { CountiesComponent } from "../counties/counties";
import { SeoSocialComponent } from "../seo-social/seo-social";


@Component({
  standalone: true,
  selector: 'app-edit',
  imports: [
    Header,
    CalendarDetails,
    GeoLocationComponent,
    NgForOf,
    FocusAreasComponent,
    FocusGroupsComponent,
    CountiesComponent,
    SeoSocialComponent
],
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})
export class Edit {

  menuItems = [
    'Calenda Details',
    'Geo Location',
    'Focus Areas',
    'Focus Groups',
    'Counties',
    'Seo/Social Media'
  ];



  activeItem = 'Calendar Details';
  setActive(item: string) {
    this.activeItem = item;
  }
}