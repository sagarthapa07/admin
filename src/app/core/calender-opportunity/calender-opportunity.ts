import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterLink } from "@angular/router";
import { Header } from '../../shared/component/header/header';


@Component({
  selector: 'app-calender-opportunity',
  imports: [
    FormsModule, NgbDatepickerModule, CommonModule, Header, RouterLink
  ],
  templateUrl: './calender-opportunity.html',
  styleUrl: './calender-opportunity.scss',
})
export class CalenderOpportunity {
  searchText = '';
  // NEw oneee
  open = false;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  minToDate: NgbDateStruct | null = null;
  constructor(public formatter: NgbDateParserFormatter) {}

  toggle() {
    this.open = !this.open;
  }

  onFromSelect(date: NgbDate) {
    this.fromDate = date;

    this.minToDate = {
      year: date.year,
      month: date.month,
      day: date.day,
    };

    // agar toDate pehle se chhoti hai → reset
    if (this.toDate && this.toDate.before(date)) {
      this.toDate = null;
    }
  }

  onToSelect(date: NgbDate) {
    this.toDate = date;
    this.open = false;
  }

  get displayValue(): string {
    return this.fromDate && this.toDate
      ? `${this.formatter.format(this.fromDate)} to ${this.formatter.format(this.toDate)}`
      : '';
  }

  clear() {
    this.fromDate = null;
    this.toDate = null;
    this.minToDate = null;
    this.open = false;
  }

  menuItems = [
    { title: 'Dashboard', icon: 'fa-house', key: 'dashboard' },
    { title: 'Components', icon: 'fa-puzzle-piece', key: 'components' },
    { title: 'Online Resources', icon: 'fa-globe', key: 'resources' },
    { title: 'Premium Members', icon: 'fa-people-group', key: 'premium' },
  ];

  get filteredMenu() {
    if (!this.searchText) return this.menuItems;

    return this.menuItems.filter((item) =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}