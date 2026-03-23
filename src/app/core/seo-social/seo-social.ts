import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seo-social',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seo-social.html',
  styleUrl: './seo-social.scss',
})
export class SeoSocialComponent {
  opportunityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.opportunityForm = this.fb.group({
      linkUrl: [''],
      'M-title': [''],
      'M-author': [''],
      'M-keywords': [''],
      shortInfo: [''],
      'F-Handler': [''],
      'T-Handler:': [''],
      'G-Handler': [''],
      'I-Handler': [''],
    });
  }

  onSave() {
    console.log('SEO DATA:', this.opportunityForm.value);
  }

  goToCounties() {
    this.router.navigate(['/counties']);
  }

  goToCalenderArea() {
    this.router.navigate(['/calendar-details']);
  }
}
