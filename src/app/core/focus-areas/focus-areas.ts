import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ISSUES, Issue, SubIssue } from '../edit/issues.data';
import { Api } from '../Services/api';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-focus-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './focus-areas.html',
  styleUrl: './focus-areas.scss',
})
export class FocusAreaComponent implements OnInit {
  @ViewChild('issueContainer') issueContainer!: ElementRef;

  issues: any = ISSUES;

  activeIssue: Issue | null = null;
  hoverTimer: any = null;

  selectedMap = new Map<number, number[]>();

  showPasteModal = false;
  pasteText = '';

  constructor(
    private router: Router,
    private api: Api,
  ) {}

  ngOnInit(): void {
    this.loadFocusAreas();
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this.issueContainer) return;

    const clickedInside = this.issueContainer.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.activeIssue = null;
    }
  }

  onHoverIssue(issue: Issue) {
    this.hoverTimer = setTimeout(() => {
      this.activeIssue = issue;
    }, 500);
  }

  loadFocusAreas() {
    this.api.getFocusAreas().subscribe({
      next: async (res) => {
        if (res.successCode === 1) {
          this.issues = res.usFocusAreas.map((item: any) => ({
            id: item.issueIndex,
            name: item.issueName,
            subIssues: [],
          }));

          // 🔥 preload all subIssues
          for (const issue of this.issues) {
            try {
              const subRes: any = await lastValueFrom(this.api.getFocusSubAreas(issue.id));

              if (subRes.successCode === 1) {
                issue.subIssues = subRes.myList.map((sub: any) => ({
                  id: sub.subIssueIndex,
                  name: sub.subIssueName,
                }));
              }
            } catch (err) {
              console.error('SubIssue load error:', err);
            }
          }

          console.log('ALL DATA LOADED:', this.issues);
        }
      },
    });
  }
  onLeaveIssue() {
    clearTimeout(this.hoverTimer);
  }
  onClickIssue(issue: any) {
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
  hasAnySelected(issue: Issue): boolean {
    return (this.selectedMap.get(issue.id)?.length || 0) > 0;
  }

  saveSelectedIssues() {
    const payload: any[] = [];

    this.selectedMap.forEach((subIds, issueId) => {
      payload.push({
        issueIndex: issueId,
        subIssueIndexes: subIds,
      });
    });

    console.log('FINAL PAYLOAD:', payload);
    this.activeIssue = null;
  }

  get selectedEntries() {
    return Array.from(this.selectedMap.entries());
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

  goToGeoLocation() {
    this.router.navigate(['/geo-location']);
  }

  goToFocusGroup() {
    this.router.navigate(['/focus-group']);
  }

  openPasteModal() {
    this.pasteText = '';
    this.showPasteModal = true;
  }

  closePasteModal() {
    this.showPasteModal = false;
  }

  getIssueName(issueId: number): string {
    return this.issues.find((issue: any) => issue.id === issueId)?.name || '';
  }

  getSubIssueName(issueId: number, subId: number): string {
    const issue = this.issues.find((i: any) => i.id === issueId);
    return issue?.subIssues.find((s: any) => s.id === subId)?.name || '';
  }

  private isTextMatching(text: string, subName: string): boolean {
    const normalizedSubName: string = subName.toLowerCase();

    // Full match
    if (text.includes(normalizedSubName)) {
      return true;
    }

    // Partial word match
    const words: string[] = normalizedSubName.split(' ');
    return words.some((word: string) => text.includes(word));
  }
  async generateFromText(): Promise<void> {
    if (!this.pasteText.trim()) {
      alert('Please paste some text');
      return;
    }

    const text: string = this.pasteText.toLowerCase();
    this.selectedMap.clear();

    for (const issue of this.issues) {
      try {
        // Load subIssues if not already loaded
        if (!issue.subIssues || issue.subIssues.length === 0) {
          const res: any = await lastValueFrom(this.api.getFocusSubAreas(issue.id));

          if (res.successCode === 1) {
            issue.subIssues = res.myList.map((sub: any) => ({
              id: sub.subIssueIndex,
              name: sub.subIssueName,
            }));
          }
        }

        // 🔹 Find matching subIssues
        const matchedSubIds: number[] = issue.subIssues
          .filter((sub: any) => this.isTextMatching(text, sub.name))
          .map((sub: any) => sub.id);

        // 🔹 Save matches
        if (matchedSubIds.length > 0) {
          this.selectedMap.set(issue.id, matchedSubIds);
        }
      } catch (error) {
        console.error(`Error loading sub areas for issue ${issue.id}`, error);
      }
    }

    console.log('AUTO DATA:', this.selectedMap);
    this.showPasteModal = false;
  }
}
