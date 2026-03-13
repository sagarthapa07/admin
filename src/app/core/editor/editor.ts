import { Component,signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  type EditorConfig
} from 'ckeditor5';
import {ViewEncapsulation} from'@angular/core';

@Component({
  selector: 'app-editor',
  imports: [CKEditorModule, FormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  public Editor = ClassicEditor;
  public editorData = "";

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
        'undo', 'redo',
        '|', 'heading',
        '|', 'style',
        '|', 'findAndReplace',
        '|', 'bold', 'italic', 'underline',
        '|', 'link',
        '-',
        'alignment',
        '|', 'removeFormat',
        '|', 'specialCharacters',
        '|', 'blockQuote',
        '|', 'fontColor', 'fontBackgroundColor',
        '|', 'highlight',
        '|', 'fontSize', 'fontFamily',
        '|', 'bulletedList', 'numberedList', 'todoList',
        '|', 'outdent', 'indent',
        '-',
        'insertImage', 'imageInsert',
        '|', 'insertTable',
        '|', 'mediaEmbed',
        '|', 'horizontalLine',
        '|', 'pageBreak',
        '|', 'sourceEditing',
        '|', 'code', 'codeBlock',
      ]
    },

    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
      ]
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
        'Verdana, Geneva, sans-serif'
      ],
      supportAllValues: true
    },

    fontSize: {
      options: [8, 9, 10, 11, 12, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
      supportAllValues: true
    },

    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'imageCaption',
        '|',
        'resizeImage'
      ]
    },

    table: {
      contentToolbar: [
        'tableColumn', 'tableRow', 'mergeTableCells',
        '|',
        'tableProperties', 'tableCellProperties',
        '|',
        'toggleTableCaption'
      ]
    },

    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },

    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        },
        openInNewTab: {
          mode: 'manual',
          label: 'Open in a new tab',
          defaultValue: true,
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }
      }
    },

    htmlSupport: {
      allow: [
        { name: /.*/, attributes: true, classes: true, styles: true }
      ]
    },

    style: {
      definitions: [
        { name: 'Article category', element: 'h3', classes: ['category'] },
        { name: 'Info box', element: 'p', classes: ['info-box'] },
      ]
    }
  };


  protected readonly title = signal('admin');

  showHeader = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('login');
      }
    });
  }
}
