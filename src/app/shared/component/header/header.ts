import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, RouterModule,FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  isCollapsed = true;
  isSidebarClosed = true;

  constructor(private route: Router) {}

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;

    if (this.isSidebarClosed) {
      this.isCollapsed = false;
    }
  }

  activeCollapse: string | null = null;

  toggleCollapse(key: string, event: Event) {
    event.preventDefault();
    this.activeCollapse = this.activeCollapse === key ? null : key;
  }

  isOpen(key: string): boolean {
    return this.activeCollapse === key;
  }
}