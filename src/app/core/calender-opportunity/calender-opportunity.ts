import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterLink } from '@angular/router';
import { Header } from '../../shared/component/header/header';
import { Api } from '../Services/api';

@Component({
  selector: 'app-calender-opportunity',
  imports: [FormsModule, NgbDatepickerModule, CommonModule, Header, RouterLink],
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

  grants: any[] = [];
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;

  selectAll = false;

  constructor(
    public formatter: NgbDateParserFormatter,
    private api: Api,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    const payload = {
      memberId: '',
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      platform: '',
      searchText: this.searchText,
      searchType: '',
      fromDate: this.fromDate ? this.formatter.format(this.fromDate) : null,
      toDate: this.toDate ? this.formatter.format(this.toDate) : null,
      userIP: '',
      viewType: '',
    };
    this.api.getGrants(payload).subscribe({
      next: (res) => {
        console.log('API RESPONSE', res);

        this.grants = res.pageUSGrants || [];
        this.totalCount = res.recCount || 0;

        this.selectAll = false;
        this.grants.forEach((item) => {
          item.selected = false;
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('API ERROR', err);
      },
    });
  }

  toggle() {
    this.open = !this.open;
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  // visible pages (max 5 dikhane ke liye)
  get visiblePages(): number[] {
    const pages = [];
    let start = Math.max(this.pageIndex - 2, 1);
    let end = Math.min(start + 4, this.totalPages);

    if (end - start < 4) {
      start = Math.max(end - 4, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageIndex = page;
    this.getData();
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

  menuItems = [
    { title: 'Dashboard', icon: 'fa-house', key: 'dashboard' },
    { title: 'Components', icon: 'fa-puzzle-piece', key: 'components' },
    { title: 'Online Resources', icon: 'fa-globe', key: 'resources' },
    { title: 'Premium Members', icon: 'fa-people-group', key: 'premium' },
  ];

  get filteredMenu() {
    if (!this.searchText) return this.menuItems;

    return this.menuItems.filter((item) =>
      item.title.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  toggleSelectAll(event: any) {
    console.log('CLICK HUA ✅', event.target.checked);

    this.selectAll = event.target.checked;

    this.grants.forEach((item) => {
      item.selected = this.selectAll;
    });
  }
  onItemChange() {
    this.selectAll = this.grants.every((item) => item.selected);
  }
}
