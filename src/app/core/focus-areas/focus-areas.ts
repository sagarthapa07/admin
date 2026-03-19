import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ISSUES, Issue, SubIssue } from '../edit/issues.data';

@Component({
  selector: 'app-focus-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './focus-areas.html',
  styleUrl: './focus-areas.scss',
})
export class FocusAreaComponent implements OnInit {
  @ViewChild('issueContainer') issueContainer!: ElementRef;

  issues: Issue[] = ISSUES;

  activeIssue: Issue | null = null;
  hoverTimer: any = null;

  selectedMap = new Map<number, number[]>();

  showPasteModal = false;
  pasteText = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // 👇 outside click close popup
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this.issueContainer) return;

    const clickedInside = this.issueContainer.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.activeIssue = null;
    }
  }

  // ========================
  // HOVER + CLICK
  // ========================

  onHoverIssue(issue: Issue) {
    this.hoverTimer = setTimeout(() => {
      this.activeIssue = issue;
    }, 500);
  }

  onLeaveIssue() {
    clearTimeout(this.hoverTimer);
  }

  onClickIssue(issue: Issue) {
    clearTimeout(this.hoverTimer);
    this.activeIssue = issue;
  }

  // ========================
  // SUB ISSUE LOGIC
  // ========================

  toggleSub(issue: Issue, sub: SubIssue) {
    const selected = this.selectedMap.get(issue.id) || [];

    if (selected.includes(sub.id)) {
      this.selectedMap.set(
        issue.id,
        selected.filter((id) => id !== sub.id),
      );
    } else {
      this.selectedMap.set(issue.id, [...selected, sub.id]);
    }
  }

  isSubSelected(issue: Issue, sub: SubIssue): boolean {
    return this.selectedMap.get(issue.id)?.includes(sub.id) || false;
  }

  toggleSelectAll(issue: Issue) {
    const allIds = issue.subIssues.map((s) => s.id);
    const selected = this.selectedMap.get(issue.id) || [];

    if (selected.length === allIds.length) {
      this.selectedMap.set(issue.id, []);
    } else {
      this.selectedMap.set(issue.id, allIds);
    }
  }

  isAllSelected(issue: Issue): boolean {
    return (this.selectedMap.get(issue.id)?.length || 0) === issue.subIssues.length;
  }

  clearIssue(issueId: number) {
    this.selectedMap.delete(issueId);

    if (this.activeIssue?.id === issueId) {
      this.activeIssue = null;
    }
  }
  hasAnySelected(issue: Issue): boolean {
    return (this.selectedMap.get(issue.id)?.length || 0) > 0;
  }

  // ========================
  // SAVE (GLOBAL)
  // ========================

  saveSelectedIssues() {
    const result: any = {};

    this.issues.forEach((issue) => {
      const selectedSubIds = this.selectedMap.get(issue.id) || [];

      if (selectedSubIds.length > 0) {
        result[issue.name] = issue.subIssues
          .filter((sub) => selectedSubIds.includes(sub.id))
          .map((sub) => sub.name);
      }
    });

    console.log('FOCUS AREA DATA:', result);

    this.activeIssue = null;
  }

  // ========================
  // SUMMARY
  // ========================

  get selectedEntries() {
    return Array.from(this.selectedMap.entries());
  }

  getIssueName(issueId: number): string {
    return this.issues.find((i) => i.id === issueId)?.name || '';
  }

  getSubIssueName(issueId: number, subId: number): string {
    const issue = this.issues.find((i) => i.id === issueId);
    return issue?.subIssues.find((s) => s.id === subId)?.name || '';
  }

  clearSingleSub(issueId: number, subId: number) {
    const selected = this.selectedMap.get(issueId) || [];
    const updated = selected.filter((id) => id !== subId);

    if (updated.length === 0) {
      this.selectedMap.delete(issueId);
    } else {
      this.selectedMap.set(issueId, updated);
    }
  }

  removeWholeIssue(issueId: number) {
    this.selectedMap.delete(issueId);
  }

  clearAll() {
    this.selectedMap.clear();
    this.activeIssue = null;
  }

  // ========================
  // NAVIGATION
  // ========================

  goToGeoLocation() {
    this.router.navigate(['/geo-location']);
  }

  goToFocusGroup() {
    this.router.navigate(['/focus-group']);
  }

  // ========================
  // PASTE MODAL
  // ========================

  openPasteModal() {
    this.pasteText = '';
    this.showPasteModal = true;
  }

  closePasteModal() {
    this.showPasteModal = false;
  }

  generateFromText() {
    if (!this.pasteText.trim()) {
      alert('Please paste some text');
      return;
    }

    const text = this.pasteText.toLowerCase();
    this.selectedMap.clear();

    this.issues.forEach((issue) => {
      const matched: number[] = [];

      issue.subIssues.forEach((sub) => {
        if (text.includes(sub.name.toLowerCase())) {
          matched.push(sub.id);
        }
      });

      if (matched.length > 0) {
        this.selectedMap.set(issue.id, matched);
      }
    });

    console.log('AUTO DATA:', this.selectedMap);
    this.showPasteModal = false;
  }


  
}
