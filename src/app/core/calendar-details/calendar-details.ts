import { Component, ElementRef, ViewChild } from '@angular/core';
import { Header } from '../../shared/component/header/header';
import { CommonModule, } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ISSUES, Issue } from '../edit/issues.data';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoLink,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Style,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
  Undo,
  type EditorConfig,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
@Component({
  standalone: true,
  selector: 'app-calendar-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    Header
],
  templateUrl: './calendar-details.html',
  styleUrls: ['./calendar-details.scss'],
})

export class CalendarDetails {
  objectKeys = Object.keys;
  @ViewChild('editorOutlineElement') private editorOutline!: ElementRef<HTMLDivElement>;
  @ViewChild('editorWordCountElement') private editorWordCount!: ElementRef<HTMLDivElement>;
  @ViewChild('issueContainer') issueContainer!: ElementRef;
  key: any;

  // public Editor: any;
  public isBrowser = false;
  activeBtn: string = 'calendar';
  opportunityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
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
  saveForm() {
    console.log(this.opportunityForm.value);
  }

  onSave() {
    console.log('Save clicked', this.opportunityForm.value);
  }

  gotoPreview(){
    this.router.navigate(['/preview'])
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

  public Editor = ClassicEditor;
  public editorData = '';
  public config: EditorConfig = {
    licenseKey: 'GPL',

    plugins: [
      Essentials,
      Alignment,
      Autoformat,
      AutoLink,
      BlockQuote,
      Bold,
      Code,
      CodeBlock,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      Image,
      ImageCaption,
      ImageInsert,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      PageBreak,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Style,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TodoList,
      Underline,
      Undo,
    ],

    toolbar: {
      shouldNotGroupWhenFull: true,
      items: [
        // ROW 1
        'undo',
        'redo',
        '|',
        'heading',
        'style',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        '|',
        'outdent',
        'indent',
        'fontSize',
        'fontFamily',

        '-', //New line k liye use hoti h ye

        //ROW 2

        'fontColor',
        'fontBackgroundColor',
        '|',
        'highlight',
        '|',
        'blockQuote',
        '|',
        'insertTable',
        'imageInsert',
        'mediaEmbed',
        '|',
        'horizontalLine',
        'pageBreak',
        '|',
        'sourceEditing',
        'code',
        'codeBlock',
      ],
    },

    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
      ],
    },

    fontFamily: {
      options: [
        'default',
        'Arial, Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif',
      ],
      supportAllValues: true,
    },

    fontSize: {
      options: [8, 9, 10, 11, 12, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
      supportAllValues: true,
    },

    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'imageCaption',
        '|',
        'resizeImage',
      ],
    },

    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        '|',
        'tableProperties',
        'tableCellProperties',
        '|',
        'toggleTableCaption',
      ],
    },

    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },

    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
        openInNewTab: {
          mode: 'manual',
          label: 'Open in a new tab',
          defaultValue: true,
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
      },
    },

    htmlSupport: {
      allow: [{ name: /.*/, attributes: true, classes: true, styles: true }],
    },

    style: {
      definitions: [
        { name: 'Article category', element: 'h3', classes: ['category'] },
        { name: 'Info box', element: 'p', classes: ['info-box'] },
      ],
    },
  };

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
  public onReady(editor: ClassicEditor): void {
    Array.from(this.editorWordCount.nativeElement.children).forEach((child) => child.remove());

    const wordCount = editor.plugins.get('WordCount') as any;

    this.editorWordCount.nativeElement.appendChild(wordCount.wordCountContainer);
  }
}



