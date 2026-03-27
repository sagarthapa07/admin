import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Editor } from '../../shared/component/editor/editor';
import { Api } from '../Services/api';
@Component({
  standalone: true,
  selector: 'app-calendar-details',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Editor],
  templateUrl: './calendar-details.html',
  styleUrls: ['./calendar-details.scss'],
})
export class CalendarDetails {
  objectKeys = Object.keys;
  @ViewChild('editorOutlineElement') private editorOutline!: ElementRef<HTMLDivElement>;
  @ViewChild('editorWordCountElement') private editorWordCount!: ElementRef<HTMLDivElement>;
  @ViewChild('issueContainer') issueContainer!: ElementRef;
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  key: any;

  // public Editor: any;
  public isBrowser = false;
  activeBtn: string = 'calendar';

  donorList: any[] = [];
  showDropdown = false;

  opportunityForm: FormGroup;

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.dropdownContainer && !this.dropdownContainer.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: Api,
  ) {
    this.opportunityForm = this.fb.group({
      title: ['', Validators.required],
      friendlyURL: ['', Validators.required],
      linkUrl: ['', Validators.required],
      postDate: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      isOngoing: [false],
      shortInfo: ['', Validators.required],
      donorType: ['US Donors'],
      donorAgency: ['', Validators.required],
      donorAgencyOther: [''],
      grantType: ['', Validators.required],
      grantDuration: ['', Validators.required],
      grantSize: ['', Validators.required],
      status: [''],
      letterText: ['', Validators.required],
      img: ['', Validators.required],
    });
  }
  saveForm() {
    console.log(this.opportunityForm.value);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.opportunityForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSave() {
    console.log('Save clicked', this.opportunityForm.value);
  }

  gotoPreview() {
    this.router.navigate(['/preview']);
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
  onSearchDonor(event: any) {
    const value = event.target.value;

    if (!value) {
      this.showDropdown = false;
      return;
    }

    this.api.searchDonors('DU', value).subscribe((res) => {
      console.log(res);

      // 🔥 correct field
      this.donorList = res?.donorsList?.slice(0, 10) || [];

      this.showDropdown = true;
    });
  }
  selectDonor(item: any) {
    this.opportunityForm.patchValue({
      donorAgency: item.donorName,
      donorAgencyOther: item.donorName 
    });

    this.donorList = [];
    this.showDropdown = false;
  }
  
}
