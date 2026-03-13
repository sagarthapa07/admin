import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ISSUES, Issue, SubIssue } from '../edit/issues.data';

@Component({
  selector: 'app-focus-areas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './focus-areas.html',
  styleUrl: './focus-areas.scss',
})
export class FocusAreasComponent {
  @ViewChild('issueContainer') issueContainer!: ElementRef;

  issues: Issue[] = ISSUES;

  activeIssue: Issue | null = null;

  hoverTimer: any = null;

  selectedMap = new Map<number, number[]>();

  showPasteModal = false;

  pasteText = '';

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this.issueContainer) return;

    const clickedInside = this.issueContainer.nativeElement.contains(event.target);

    if (!clickedInside && this.activeIssue !== null) {
      setTimeout(() => {
        this.activeIssue = null;
      });
    }
  }

  onHoverIssue(issue: Issue) {
    this.hoverTimer = setTimeout(() => {
      this.activeIssue = issue;
    }, 2000);
  }

  onLeaveIssue() {
    clearTimeout(this.hoverTimer);
  }

  onClickIssue(issue: Issue) {
    clearTimeout(this.hoverTimer);

    this.activeIssue = issue;
  }

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

  clearSingleSub(issueId: number, subId: number) {
    const selected = this.selectedMap.get(issueId) || [];

    const updated = selected.filter((id) => id !== subId);

    if (updated.length === 0) {
      this.selectedMap.delete(issueId);
    } else {
      this.selectedMap.set(issueId, updated);
    }
  }

  hasAnySelected(issue: Issue): boolean {
    return (this.selectedMap.get(issue.id)?.length || 0) > 0;
  }

  saveSelectedIssues() {
    const result = this.issues
      .map((issue) => {
        const selectedSubIds = this.selectedMap.get(issue.id) || [];

        if (selectedSubIds.length === 0) return null;

        return {
          issueId: issue.id,
          issueName: issue.name,
          subIssues: issue.subIssues.filter((sub) => selectedSubIds.includes(sub.id)),
        };
      })
      .filter(Boolean);

    console.log('Selected Issues:', result);

    this.activeIssue = null;
  }

  get selectedEntries() {
    return Array.from(this.selectedMap.entries());
  }

  getIssueName(issueId: number): string {
    return this.issues.find((issue) => issue.id === issueId)?.name || '';
  }

  getSubIssueName(issueId: number, subId: number): string {
    const issue = this.issues.find((i) => i.id === issueId);

    return issue?.subIssues.find((s) => s.id === subId)?.name || '';
  }

  removeWholeIssue(issueId: number) {
    this.selectedMap.delete(issueId);
  }

  clearAll() {
    this.selectedMap.clear();

    this.activeIssue = null;
  }

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
      const matchedSubIds: number[] = [];

      issue.subIssues.forEach((sub) => {
        if (text.includes(sub.name.toLowerCase())) {
          matchedSubIds.push(sub.id);
        }
      });

      if (matchedSubIds.length > 0) {
        this.selectedMap.set(issue.id, matchedSubIds);
      }
    });

    this.showPasteModal = false;
  }
}
