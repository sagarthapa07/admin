import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-seo-social',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seo-social.html',
  styleUrl: './seo-social.scss',
})
export class SeoSocialComponent {
  seoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.seoForm = this.fb.group({
      friendlyUrl: [''],
      metaTitle: [''],
      metaAuthor: [''],
      metaKeywords: [''],
      metaDescription: [''],
      facebookHandler: [''],
      twitterHandler: [''],
      googleHandler: [''],
      instagramHandler: [''],
    });
  }

  createByAI() {
    console.log('Generate SEO using AI');
  }

  saveSEO() {
    console.log('SEO Data', this.seoForm.value);
  }
}
