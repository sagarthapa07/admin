import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ClassicEditor, Essentials, Bold, Italic, Paragraph, Undo } from 'ckeditor5';

@Component({
  selector: 'app-calendar-details',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CKEditorModule],
  templateUrl: './calendar-details.html',
  styleUrl: './calendar-details.scss',
})
export class CalendarDetails {
  opportunityForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  public Editor = ClassicEditor;

  public editorData = '';

  onSave() {
    console.log(this.opportunityForm.value);
  }
}
