import { Component, ElementRef, ViewChild } from '@angular/core';
import { Header } from '../../shared/component/header/header';
import { CommonModule, } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor } from "../../shared/component/editor/editor";
@Component({
  standalone: true,
  selector: 'app-calendar-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
   
    Header,
    Editor
],
  templateUrl: './calendar-details.html',
  styleUrls: ['./calendar-details.scss'],
})

export class CalendarDetails {
  objectKeys = Object.keys;
  @ViewChild('editorOutlineElement') private editorOutline!: ElementRef<HTMLDivElement>;
  @ViewChild('editorWordCountElement') private editorWordCount!: ElementRef<HTMLDivElement>;
  @ViewChild('issueContainer') issueContainer!: ElementRef;
  key: any;

  // public Editor: any;
  public isBrowser = false;
  activeBtn: string = 'calendar';
  opportunityForm: FormGroup;

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
  saveForm() {
    console.log(this.opportunityForm.value);
  }

  onSave() {
    console.log('Save clicked', this.opportunityForm.value);
  }

  gotoPreview(){
    this.router.navigate(['/preview'])
  }

  menuItems = [ 
    'Calender Details',
    'Geo Location',
    'Focus Areas',
    'Focus Groups',
    'Counties',
    'Seo/Social Media',
  ];

  activeItem = 'Calender Details';

  setActive(item: string) {
    this.activeItem = item;
  }
  public editorData = '';
  goToGeoLocation() {
    this.activeItem = 'Geo Location';
  }
  goToFocusAreas() {
    this.activeItem = 'Focus Areas';
  }
  goToSeo() {
    this.activeItem = 'Seo/Social Media';
  }
  goToFocusGroup() {
    this.activeItem = 'Focus Groups';
  }
  goToCalenderArea() {
    this.activeItem = 'Calender Details';
  }
  goToCounties() {
    this.activeItem = 'Counties';
  }
}



