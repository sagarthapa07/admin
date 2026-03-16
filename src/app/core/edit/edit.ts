import { Component, OnInit, HostListener, ElementRef, ViewChild, Inject } from '@angular/core';
import { Header } from '../../shared/component/header/header';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ISSUES, Issue, SubIssue } from '../edit/issues.data';
import { STATES_DATA } from '../edit/issues.data';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PLATFORM_ID } from '@angular/core';
interface Option {
  label: string;
  selected: boolean;
}
interface DropdownItem {
  item_id: number;
  item_text: string;
}
import { ChangeDetectorRef } from '@angular/core';

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

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzAzMzU5OTksImp0aSI6IjY4MzYwYjc2LTdhY2ItNGNhYy1iMjBjLWFjOWUyNzFhNWFmOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjRmYmQ2YzRlIn0.fdm8GCfvnbf490WhyKVgSBsXYQGdbCVW1lBLAYT8Xmc39IozMH4OAP7yGzcgTaVORs6peSFXNhVtCJzxJBY_LA';
/**
 * Unique ID that will be used to identify this document. E.g. you may use ID taken from your database.
 * Read more: https://ckeditor.com/docs/ckeditor5/latest/api/module_collaboration-core_config-RealTimeCollaborationConfig.html
 */
const DOCUMENT_ID = '<YOUR_DOCUMENT_ID>';

const CLOUD_SERVICES_TOKEN_URL =
  'https://ghkxwoq5q2i3.cke-cs.com/token/dev/a66de728e4b8fd2c64baa41ae41bd6db4f8460341372281942d9edd273ce?limit=10';

const DEFAULT_HEX_COLORS = [
  { color: '#000000', label: 'Black' },
  { color: '#4D4D4D', label: 'Dim grey' },
  { color: '#999999', label: 'Grey' },
  { color: '#E6E6E6', label: 'Light grey' },
  { color: '#FFFFFF', label: 'White', hasBorder: true },
  { color: '#E65C5C', label: 'Red' },
  { color: '#E69C5C', label: 'Orange' },
  { color: '#E6E65C', label: 'Yellow' },
  { color: '#C2E65C', label: 'Light green' },
  { color: '#5CE65C', label: 'Green' },
  { color: '#5CE6A6', label: 'Aquamarine' },
  { color: '#5CE6E6', label: 'Turquoise' },
  { color: '#5CA6E6', label: 'Light blue' },
  { color: '#5C5CE6', label: 'Blue' },
  { color: '#A65CE6', label: 'Purple' },
];

@Component({
  standalone: true,
  selector: 'app-example',
  imports: [
    Header,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    CKEditorModule,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit implements OnInit {
  objectKeys = Object.keys;
  @ViewChild('editorOutlineElement') private editorOutline!: ElementRef<HTMLDivElement>;
  @ViewChild('editorWordCountElement') private editorWordCount!: ElementRef<HTMLDivElement>;
  @ViewChild('issueContainer') issueContainer!: ElementRef;
  key: any;

  // public Editor: any;
  public isBrowser = false;
  activeBtn: string = 'calendar';
  opportunityForm: FormGroup;

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this.issueContainer) return;

    const clickedInside = this.issueContainer.nativeElement.contains(event.target);

    // FIX: prevent unnecessary change detection loop
    if (!clickedInside && this.activeIssue !== null) {
      setTimeout(() => {
        this.activeIssue = null;
      });
    }
  }

  issues: Issue[] = ISSUES;
  activeIssue: Issue | null = null;
  hoverTimer: any = null;
  issueMap = new Map<number, string>();
  selectedMap = new Map<number, number[]>();
  activeEntityForSubGrid: string | null = null;
  showPasteModal = false;
  pasteText = '';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
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

  showGeoModal: boolean = false;
  geoModalType: 'cities' | 'township' | null = null;
  newGeoName: string = '';

  shouldShowAdd(key: string): boolean {
    return key === 'township' || key === 'cities';
  }

  saveForm() {
    console.log(this.opportunityForm.value);
  }

  onSave() {
    console.log('Save clicked', this.opportunityForm.value);
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

  readonly multiSelectSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true,
    enableCheckAll: false,
  };

  geoDropdowns: any = {
    township: {
      label: 'Town Ship',
      data: [],
      selected: [],
    },
    insular: {
      label: 'Insular Areas',
      data: [],
      selected: [],
    },
    cities: {
      label: 'Cities',
      data: [],
      selected: [],
    },
    states: {
      label: 'States',
      data: [],
      selected: [],
    },
  };

  geoKeys: string[] = [];

  // Use for Focus Group
  readonly entitySettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  savedEntities: string[] = [];
  savedBeneficiaries: string[] = [];

  focusGroupKeyDropdowns: any = {
    beneficiaries: {
      label: 'Beneficiaries',
      data: [],
      selected: [],
    },
    entities: {
      label: 'Entities',
      data: [],
      selected: [],
    },
  };

  // Use for Counties SElection
  countieSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  grantMode: 'single' | 'multiple' | 'all' = 'single';
  countiesGroupKey: string[] = [];
  states = STATES_DATA;
  counties: any[] = [];
  selectedStates: any[] = [];
  multipleStateCounties: any[] = [];
  savedStates: string[] = [];
  activeStateForCountyGrid: string | null = null;
  activeStatesForCounties: string | null = null;

  singleFullStateMode = false;
  statesWithSelectedCounties: string[] = [];
  selectedState: string[] = [];
  selectedCounty: string[] = [];

  countiesKeyDropDowns: any = {
    states: {
      label: 'Select States',
      data: [],
      selected: [],
    },
  };

  // MULTIPLE MODE STATE STORAGE
  multipleStatesDropdown = {
    data: [],
    selected: [],
  };

  multipleSelectedStates: string[] = [];

  multipleSelectedCounties: Record<string, string[]> = {};

  multipleActiveState: string | null = null;

  multipleFullStateMode = false;

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
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'style',
        '|',
        'findAndReplace',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        '-',
        'alignment',
        '|',
        'removeFormat',
        '|',
        'specialCharacters',
        '|',
        'blockQuote',
        '|',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'highlight',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        '|',
        'outdent',
        'indent',
        '-',
        'insertImage',
        'imageInsert',
        '|',
        'insertTable',
        '|',
        'mediaEmbed',
        '|',
        'horizontalLine',
        '|',
        'pageBreak',
        '|',
        'sourceEditing',
        '|',
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

  ngOnInit(): void {
    // Township
    this.geoDropdowns.township.data = [
      { item_id: 1, item_text: 'Roxbury' },
      { item_id: 2, item_text: 'Champion' },
      { item_id: 3, item_text: 'Stockholm' },
      { item_id: 4, item_text: 'Baltimore' },
      { item_id: 5, item_text: 'Acoma' },
      { item_id: 6, item_text: 'Acton' },
      { item_id: 7, item_text: 'Acushnet' },
      { item_id: 8, item_text: 'Addison' },
      { item_id: 9, item_text: 'Adirondack' },
      { item_id: 10, item_text: 'Alloway' },
    ];

    // Insular Areas
    this.geoDropdowns.insular.data = [
      { item_id: 1, item_text: 'American Samoa' },
      { item_id: 2, item_text: 'Baker Island' },
      { item_id: 3, item_text: 'Commonwealth of Puerto Rico' },
      { item_id: 4, item_text: 'Commonwealth of Northern Mariana Islands' },
      { item_id: 5, item_text: 'Federated States of Micronesia' },
      { item_id: 6, item_text: 'Guam' },
      { item_id: 7, item_text: 'Howland Island' },
      { item_id: 8, item_text: 'Jarvis Island' },
      { item_id: 9, item_text: 'Johnston Atoll' },
      { item_id: 10, item_text: 'Kingman Reef' },
    ];

    // Cities
    this.geoDropdowns.cities.data = [
      { item_id: 1, item_text: 'Antioch' },
      { item_id: 2, item_text: 'Benicia' },
      { item_id: 3, item_text: 'Boca Raton' },
      { item_id: 4, item_text: 'Bridgewater' },
      { item_id: 5, item_text: 'Cannon Falls' },
      { item_id: 6, item_text: 'Concord' },
      { item_id: 7, item_text: 'East St. Louis' },
      { item_id: 8, item_text: 'Eastham' },
      { item_id: 9, item_text: 'Fort Wayne' },
      { item_id: 10, item_text: 'Fortuna' },
    ];

    // States
    this.geoDropdowns.states.data = [
      { item_id: 1, item_text: 'Alaska' },
      { item_id: 2, item_text: 'Arizona' },
      { item_id: 3, item_text: 'New Jersey' },
      { item_id: 4, item_text: 'North Carolina' },
      { item_id: 5, item_text: 'Ohio' },
      { item_id: 6, item_text: 'Oregon' },
      { item_id: 7, item_text: 'Rhode Island' },
      { item_id: 8, item_text: 'Tennessee' },
      { item_id: 9, item_text: 'Utah' },
      { item_id: 10, item_text: 'Virginia' },
    ];

    this.geoKeys = Object.keys(this.geoDropdowns);

    // console.log('Geo dropdowns:', this.geoDropdowns);

    this.focusGroupKeyDropdowns.beneficiaries.data = [
      { item_id: 1, item_text: 'Alaskan Natives' },
      { item_id: 2, item_text: 'American Indians' },
      { item_id: 3, item_text: 'Artists' },
      { item_id: 4, item_text: 'Asian American Or Pacific Islander' },
      { item_id: 5, item_text: 'Autistic Children' },
      { item_id: 6, item_text: 'BIPOC' },
      { item_id: 7, item_text: 'Bisexuals' },
      { item_id: 8, item_text: 'Blacks' },
      { item_id: 9, item_text: 'Business' },
      { item_id: 10, item_text: 'Children' },
    ];

    this.focusGroupKeyDropdowns.entities.data = [
      { item_id: 1, item_text: 'Businesses' },
      { item_id: 2, item_text: 'Centres' },
      { item_id: 3, item_text: 'Individuals' },
      { item_id: 4, item_text: 'Organizations' },
    ];

    this.issues.forEach((i) => {
      this.issueMap.set(i.id, i.name);
    });

    // USe For Counties Selection
    this.countiesKeyDropDowns.states.data = [
      { item_id: 1, item_text: 'Alabama' },
      { item_id: 2, item_text: 'Alaska' },
      { item_id: 3, item_text: 'Arizona' },
      { item_id: 4, item_text: 'Arkansas' },
      { item_id: 5, item_text: 'California' },
      { item_id: 6, item_text: 'Colorado' },
      { item_id: 7, item_text: 'Connecticut' },
      { item_id: 8, item_text: 'Delaware' },
      { item_id: 9, item_text: 'Florida' },
      { item_id: 10, item_text: 'Georgia' },
      { item_id: 11, item_text: 'Hawaii' },
      { item_id: 12, item_text: 'Idaho' },
      { item_id: 13, item_text: 'Illinois' },
      { item_id: 14, item_text: 'Indiana' },
      { item_id: 15, item_text: 'Iowa' },
      { item_id: 16, item_text: 'Kansas' },
      { item_id: 17, item_text: 'Kentucky' },
      { item_id: 18, item_text: 'Louisiana' },
      { item_id: 19, item_text: 'Maine' },
      { item_id: 20, item_text: 'Maryland' },
      { item_id: 21, item_text: 'Massachusetts' },
      { item_id: 22, item_text: 'Michigan' },
      { item_id: 23, item_text: 'Minnesota' },
      { item_id: 24, item_text: 'Mississippi' },
      { item_id: 25, item_text: 'Missouri' },
      { item_id: 26, item_text: 'Montana' },
      { item_id: 27, item_text: 'Nebraska' },
      { item_id: 28, item_text: 'Nevada' },
      { item_id: 29, item_text: 'New Hampshire' },
      { item_id: 30, item_text: 'New Jersey' },
      { item_id: 31, item_text: 'New Mexico' },
      { item_id: 32, item_text: 'New York' },
      { item_id: 33, item_text: 'North Carolina' },
      { item_id: 34, item_text: 'North Dakota' },
      { item_id: 35, item_text: 'Ohio' },
      { item_id: 36, item_text: 'Oklahoma' },
      { item_id: 37, item_text: 'Oregon' },
      { item_id: 38, item_text: 'Pennsylvania' },
      { item_id: 39, item_text: 'Rhode Island' },
      { item_id: 40, item_text: 'South Carolina' },
      { item_id: 41, item_text: 'South Dakota' },
      { item_id: 42, item_text: 'Tennessee' },
      { item_id: 43, item_text: 'Texas' },
      { item_id: 44, item_text: 'Utah' },
      { item_id: 45, item_text: 'Vermont' },
      { item_id: 46, item_text: 'Virginia' },
      { item_id: 47, item_text: 'Washington' },
      { item_id: 48, item_text: 'West Virginia' },
      { item_id: 49, item_text: 'Wisconsin' },
      { item_id: 50, item_text: 'Wyoming' },
    ];
    this.countiesGroupKey = Object.keys(this.countiesKeyDropDowns);
    this.multipleStatesDropdown.data = this.countiesKeyDropDowns.states.data;
  }
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
  closeGeoModal() {
    this.showGeoModal = false;
    this.geoModalType = null;
    this.newGeoName = '';
  }
  openGeoModal(type: string) {
    if (type !== 'cities' && type !== 'township') {
      return;
    }
    this.geoModalType = type as 'cities' | 'township';
    this.showGeoModal = true;
  }
  saveGeoItem() {
    if (!this.newGeoName.trim() || !this.geoModalType) {
      return;
    }

    const trimmedName = this.newGeoName.trim();

    // Duplicate Check (case-insensitive)
    const exists = this.geoDropdowns[this.geoModalType].data.some(
      (item: any) => item.item_text.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (exists) {
      alert(`${trimmedName} already exists!`);
      return;
    }

    const newItem = {
      item_id: Date.now(),
      item_text: trimmedName,
    };

    //  Add new item
    this.geoDropdowns[this.geoModalType].data.push(newItem);

    //  Optional: auto select new item
    this.geoDropdowns[this.geoModalType].selected.push(newItem);

    console.log(`New ${this.geoModalType} added:`, newItem);

    this.closeGeoModal();
  }
  saveGeo(type: string) {
    const selectedItems = this.geoDropdowns[type].selected;
    if (!selectedItems || selectedItems.length === 0) {
      console.log(`${this.geoDropdowns[type].label} : No selection`);
      return;
    }
    // sirf names nikaal rahe hain
    const names = selectedItems.map((item: any) => item.item_text);
    console.log(`${this.geoDropdowns[type].label} : ${names.join(', ')}`);
  }
  removeGeoItem(type: string, item: any) {
    this.geoDropdowns[type].selected = this.geoDropdowns[type].selected.filter(
      (selectedItem: any) => selectedItem.item_id !== item.item_id,
    );
  }

  // Focus Group k Sub entities

  entitySubEntityMap: Record<string, string[]> = {
    Organizations: [
      'Arts and Culture Organization',
      'Community Foundation',
      'For-Profit Organisation',
      'Hispanic Organizations',
      'Hotels and Restaurants',
      'Libraries',
      "Media or Journalists' Organization",
      'Municipalities',
      'Neighborhood Groups',
      'Nonprofits with 501(c)(11)',
      'Nonprofits with 501(c)(19)',
      'Schools',
      'Tribal Government',
      'Youth Organizations',
    ],
    Individuals: [
      'Academicians',
      'Faculty Members',
      'Filmmakers/Directors',
      'Hispanic',
      'Immigrants',
      'Institutions',
    ],
    Centres: ['Centres'],
    Businesses: ['Business'],
  };
  selectedSubEntities: Record<string, string[]> = {};

  removeBeneficiary(name: string) {
    // niche se remove
    this.savedBeneficiaries = this.savedBeneficiaries.filter((b) => b !== name);

    // dropdown se bhi remove
    this.focusGroupKeyDropdowns.beneficiaries.selected =
      this.focusGroupKeyDropdowns.beneficiaries.selected.filter(
        (item: any) => item.item_text !== name,
      );
  }

  onEntityChange() {
    const selected = this.focusGroupKeyDropdowns.entities.selected;

    if (!selected || selected.length === 0) {
      this.activeEntityForSubGrid = null;
      return;
    }

    const currentEntity = selected[0].item_text;

    this.activeEntityForSubGrid = currentEntity;

    if (!this.selectedSubEntities[currentEntity]) {
      this.selectedSubEntities[currentEntity] = [];
    }
  }

  toggleSubEntity(entity: string, sub: string, checked: boolean) {
    if (!this.selectedSubEntities[entity]) {
      this.selectedSubEntities[entity] = [];
    }

    if (checked) {
      if (!this.selectedSubEntities[entity].includes(sub)) {
        this.selectedSubEntities[entity].push(sub);
      }

      // Agar entity saved me nahi hai to add karo
      if (!this.savedEntities.includes(entity)) {
        this.savedEntities.push(entity);
      }
    } else {
      this.selectedSubEntities[entity] = this.selectedSubEntities[entity].filter((s) => s !== sub);
    }
  }

  removeSubEntity(entity: string, sub: string) {
    this.selectedSubEntities[entity] = this.selectedSubEntities[entity].filter((s) => s !== sub);
  }

  saveFocusGroup(type: string) {
    const selected = this.focusGroupKeyDropdowns[type].selected;

    if (!selected || selected.length === 0) {
      console.log('No selection');
      return;
    }

    if (type === 'beneficiaries') {
      this.savedBeneficiaries = selected.map((item: any) => item.item_text);

      console.log('Selected Beneficiaries:', this.savedBeneficiaries);
    }

    if (type === 'entities') {
      const entityName = selected[0].item_text;

      if (!this.savedEntities.includes(entityName)) {
        this.savedEntities.push(entityName);
      }

      console.log('Selected Entity:', entityName);
      console.log('Selected Sub Entities:', this.selectedSubEntities[entityName] || []);
    }
  }

  removeEntity(entityName: string) {
    this.savedEntities = this.savedEntities.filter((e) => e !== entityName);
    delete this.selectedSubEntities[entityName];
    const selected = this.focusGroupKeyDropdowns.entities.selected;
    if (selected.length && selected[0].item_text === entityName) {
      this.focusGroupKeyDropdowns.entities.selected = [];
    }
  }

  onBeneficiaryChange() {
    const selected = this.focusGroupKeyDropdowns.beneficiaries.selected;
    this.savedBeneficiaries = selected.map((item: any) => item.item_text);
  }

  saveAllFocusGroup() {
    const beneficiaries = this.savedBeneficiaries;

    const entities = this.savedEntities.map((entity) => ({
      entityName: entity,
      subEntities: this.selectedSubEntities[entity] || [],
    }));

    const finalData = {
      beneficiaries: beneficiaries,
      entities: entities,
    };

    console.log('Final Focus Group Data:', finalData);
  }

  clearFocusGroup() {
    //  Beneficiaries clear
    this.savedBeneficiaries = [];
    this.focusGroupKeyDropdowns.beneficiaries.selected = [];

    // Entities clear
    this.savedEntities = [];
    this.focusGroupKeyDropdowns.entities.selected = [];

    // SubEntities clear
    this.selectedSubEntities = {};

    // Sub grid hide
    this.activeEntityForSubGrid = null;

    console.log('Focus Group cleared successfully');
  }

  // Focus Group End

  // yha se Focus AReas k liyee
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

  closePopup() {
    this.activeIssue = null;
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

    if (this.activeIssue?.id === issueId) {
      this.activeIssue = null;
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

    console.log('Selected Issues & Sub Issues:', result);

    this.activeIssue = null;
  }

  get selectedEntries() {
    return Array.from(this.selectedMap.entries());
  }

  getIssueName(issueId: number): string {
    return this.issues.find((issue) => issue.id === issueId)?.name || '';
  }

  removeWholeIssue(issueId: number) {
    this.selectedMap.delete(issueId);

    // agar active issue hi remove ho gaya
    if (this.activeIssue?.id === issueId) {
      this.activeIssue = null;
    }
  }
  getSubIssueName(issueId: number, subId: number): string {
    const issue = this.issues.find((i) => i.id === issueId);
    return issue?.subIssues.find((s) => s.id === subId)?.name || '';
  }

  clearAll() {
    this.selectedMap.clear();
    this.activeIssue = null;
    console.log('All issues & sub-issues cleared');
  }

  // Paste Here walaa Popup

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
    // clear previous selections (optional)
    this.selectedMap.clear();

    // this.issues.forEach((issue) => {
    //   const matchedSubIds: number[] = [];

    //   issue.subIssues.forEach((sub) => {
    //     const subName = sub.name.toLowerCase();

    //     if (text.includes(subName)) {
    //       matchedSubIds.push(sub.id);
    //     }
    //   });

    //   if (matchedSubIds.length > 0) {
    //     this.selectedMap.set(issue.id, matchedSubIds);
    //   }
    // });

    console.log('Auto-generated selection:', this.selectedMap);

    // close modal
    this.showPasteModal = false;
  }

  // Select Counties k liye code start

  setGrantMode(mode: 'single' | 'multiple' | 'all') {
    this.grantMode = mode;

    // Reset previous
    this.selectedState = [];
    this.selectedSubCounties = {};
    this.multipleSelectedStates = [];
    this.multipleSelectedCounties = {};
    this.countiesKeyDropDowns.states.selected = [];
    this.multipleStatesDropdown.selected = [];

    // =====  ALL MODE LOGIC ======

    if (mode === 'all') {
      const allStates = Object.keys(this.countiySubCountyMap);

      // Set Multiple States
      this.multipleSelectedStates = [...allStates];

      // Select All Counties for Every State
      allStates.forEach((state) => {
        this.multipleSelectedCounties[state] = [...this.countiySubCountyMap[state]];
      });

      // Update Dropdown
      this.multipleStatesDropdown.selected = this.multipleStatesDropdown.data.filter((item: any) =>
        allStates.includes(item.item_text),
      );

      console.log('All States & Counties Selected Automatically');
    }
  }

  onStateChange() {
    const selected = this.countiesKeyDropDowns.states.selected;
    if (!selected || selected.length === 0) {
      this.activeStatesForCounties = null;
      return;
    }

    const currentStates = selected[0].item_text;
    this.activeStatesForCounties = currentStates;
    if (!this.selectedSubCounties[currentStates]) {
      this.selectedSubCounties[currentStates] = [];
    }
  }

  countiySubCountyMap: Record<string, string[]> = {
    Alabama: [
      'Autauga',
      'Baldwin',
      'Barbour',
      'Bibb',
      'Blount',
      'Bullock',
      'Butler',
      'Calhoun',
      'Chambers',
      'Cherokee',
      'Chilton',
      'Choctaw',
      'Clarke',
      'Clay',
      'Cleburne',
    ],

    Alaska: [
      'Aleutians East Borough',
      'Anchorage Municipality',
      'Bristol Bay Borough',
      'Denali Borough',
      'Fairbanks North Star Borough',
      'Haines Borough',
      'Juneau City and Borough',
      'Kenai Peninsula Borough',
      'Ketchikan Gateway Borough',
      'Kodiak Island Borough',
      'Lake and Peninsula Borough',
      'Matanuska-Susitna Borough',
      'Nome Census Area',
      'North Slope Borough',
      'Sitka City and Borough',
    ],

    Arizona: [
      'Apache',
      'Cochise',
      'Coconino',
      'Gila',
      'Graham',
      'Greenlee',
      'La Paz',
      'Maricopa',
      'Mohave',
      'Navajo',
      'Pima',
      'Pinal',
      'Santa Cruz',
      'Yavapai',
      'Yuma',
    ],

    Arkansas: [
      'Arkansas',
      'Ashley',
      'Baxter',
      'Benton',
      'Boone',
      'Bradley',
      'Calhoun',
      'Carroll',
      'Chicot',
      'Clark',
      'Clay',
      'Cleburne',
      'Cleveland',
      'Columbia',
      'Conway',
    ],

    California: [
      'Los Angeles',
      'San Diego',
      'Orange',
      'Riverside',
      'San Bernardino',
      'Santa Clara',
      'Alameda',
      'Sacramento',
      'Contra Costa',
      'Fresno',
      'Kern',
      'San Francisco',
      'Ventura',
      'San Mateo',
      'Santa Barbara',
    ],

    Colorado: [
      'Adams',
      'Arapahoe',
      'Boulder',
      'Broomfield',
      'Denver',
      'Douglas',
      'El Paso',
      'Jefferson',
      'Larimer',
      'Mesa',
      'Pueblo',
      'Weld',
      'Garfield',
      'Eagle',
      'Pitkin',
    ],

    Connecticut: [
      'Fairfield',
      'Hartford',
      'Litchfield',
      'Middlesex',
      'New Haven',
      'New London',
      'Tolland',
      'Windham',
      'Bridgeport',
      'Stamford',
      'Waterbury',
      'Norwalk',
      'Danbury',
      'Greenwich',
      'Westport',
    ],

    Delaware: [
      'New Castle',
      'Kent',
      'Sussex',
      'Wilmington',
      'Dover',
      'Newark',
      'Middletown',
      'Smyrna',
      'Milford',
      'Seaford',
    ],

    Florida: [
      'Miami-Dade',
      'Broward',
      'Palm Beach',
      'Hillsborough',
      'Orange',
      'Pinellas',
      'Duval',
      'Lee',
      'Polk',
      'Collier',
      'Marion',
      'Volusia',
      'Pasco',
      'Seminole',
      'Sarasota',
    ],

    Georgia: [
      'Fulton',
      'Gwinnett',
      'Cobb',
      'DeKalb',
      'Chatham',
      'Clayton',
      'Cherokee',
      'Henry',
      'Hall',
      'Forsyth',
      'Richmond',
      'Muscogee',
      'Bibb',
      'Dougherty',
      'Lowndes',
    ],

    Hawaii: [
      'Honolulu',
      'Hawaii',
      'Maui',
      'Kauai',
      'Kalawao',
      'Oahu',
      'Molokai',
      'Lanai',
      'Hilo',
      'Kailua',
    ],

    Idaho: [
      'Ada',
      'Adams',
      'Bannock',
      'Bear Lake',
      'Benewah',
      'Bingham',
      'Blaine',
      'Boise',
      'Bonner',
      'Bonneville',
      'Boundary',
      'Butte',
      'Camas',
      'Canyon',
      'Caribou',
    ],

    Illinois: [
      'Cook',
      'DuPage',
      'Lake',
      'Will',
      'Kane',
      'McHenry',
      'Winnebago',
      'Madison',
      'St. Clair',
      'Sangamon',
      'Peoria',
      'Champaign',
      'Rock Island',
      'Tazewell',
      'Kendall',
    ],

    Indiana: [
      'Marion',
      'Lake',
      'Allen',
      'Hamilton',
      'St. Joseph',
      'Elkhart',
      'Tippecanoe',
      'Vanderburgh',
      'Johnson',
      'Monroe',
      'Delaware',
      'Madison',
      'LaPorte',
      'Porter',
      'Hendricks',
    ],

    Iowa: [
      'Polk',
      'Linn',
      'Scott',
      'Johnson',
      'Black Hawk',
      'Woodbury',
      'Dubuque',
      'Story',
      'Pottawattamie',
      'Dallas',
      'Warren',
      'Clinton',
      'Muscatine',
      'Marshall',
      'Jasper',
    ],

    Kansas: [
      'Johnson',
      'Sedgwick',
      'Shawnee',
      'Wyandotte',
      'Douglas',
      'Riley',
      'Saline',
      'Leavenworth',
      'Ford',
      'Butler',
      'Finney',
      'Crawford',
      'Harvey',
      'Barton',
      'Geary',
    ],

    Kentucky: [
      'Jefferson',
      'Fayette',
      'Kenton',
      'Boone',
      'Warren',
      'Hardin',
      'Campbell',
      'Madison',
      'Daviess',
      'Bullitt',
      'Oldham',
      'Boyd',
      'Jessamine',
      'Christian',
      'Scott',
    ],

    Louisiana: [
      'Orleans',
      'Jefferson',
      'East Baton Rouge',
      'Caddo',
      'St. Tammany',
      'Lafayette',
      'Calcasieu',
      'Ouachita',
      'Livingston',
      'Tangipahoa',
      'Rapides',
      'Terrebonne',
      'Bossier',
      'Ascension',
      'Iberia',
    ],

    Maine: [
      'Cumberland',
      'York',
      'Penobscot',
      'Kennebec',
      'Androscoggin',
      'Aroostook',
      'Oxford',
      'Sagadahoc',
      'Lincoln',
      'Knox',
      'Waldo',
      'Hancock',
      'Washington',
      'Piscataquis',
      'Franklin',
    ],

    Maryland: [
      'Montgomery',
      'Prince George’s',
      'Baltimore',
      'Anne Arundel',
      'Howard',
      'Frederick',
      'Harford',
      'Carroll',
      'Charles',
      'Washington',
      'Calvert',
      'St. Mary’s',
      'Allegany',
      'Cecil',
      'Wicomico',
    ],

    Massachusetts: [
      'Middlesex',
      'Worcester',
      'Essex',
      'Suffolk',
      'Norfolk',
      'Bristol',
      'Plymouth',
      'Hampden',
      'Hampshire',
      'Barnstable',
      'Berkshire',
      'Franklin',
      'Dukes',
      'Nantucket',
    ],

    Michigan: [
      'Wayne',
      'Oakland',
      'Macomb',
      'Kent',
      'Genesee',
      'Washtenaw',
      'Ingham',
      'Ottawa',
      'Kalamazoo',
      'Saginaw',
      'Livingston',
      'Jackson',
      'Muskegon',
      'Monroe',
      'Berrien',
    ],

    Minnesota: [
      'Hennepin',
      'Ramsey',
      'Dakota',
      'Anoka',
      'Washington',
      'St. Louis',
      'Olmsted',
      'Stearns',
      'Scott',
      'Wright',
      'Carver',
      'Blue Earth',
      'Rice',
      'Crow Wing',
      'Beltrami',
    ],

    Mississippi: [
      'Hinds',
      'Harrison',
      'DeSoto',
      'Rankin',
      'Jackson',
      'Madison',
      'Lee',
      'Lafayette',
      'Jones',
      'Forrest',
      'Lowndes',
      'Warren',
      'Adams',
      'Panola',
      'Marshall',
    ],

    Missouri: [
      'St. Louis',
      'Jackson',
      'St. Charles',
      'Greene',
      'Clay',
      'Jefferson',
      'Boone',
      'Cass',
      'Platte',
      'Jasper',
      'Cole',
      'Cape Girardeau',
      'Franklin',
      'Buchanan',
      'Christian',
    ],

    Montana: [
      'Yellowstone',
      'Missoula',
      'Gallatin',
      'Flathead',
      'Cascade',
      'Lewis and Clark',
      'Ravalli',
      'Silver Bow',
      'Lake',
      'Hill',
      'Park',
      'Carbon',
      'Custer',
      'Fergus',
      'Roosevelt',
    ],

    Nebraska: [
      'Douglas',
      'Lancaster',
      'Sarpy',
      'Hall',
      'Buffalo',
      'Dodge',
      'Madison',
      'Scotts Bluff',
      'Lincoln',
      'Saunders',
      'Gage',
      'Platte',
      'Adams',
      'York',
      'Washington',
    ],

    Nevada: [
      'Clark',
      'Washoe',
      'Carson City',
      'Elko',
      'Douglas',
      'Nye',
      'Lyon',
      'Churchill',
      'Humboldt',
      'White Pine',
      'Pershing',
      'Storey',
      'Mineral',
      'Esmeralda',
      'Lincoln',
    ],

    NewYork: [
      'Kings',
      'Queens',
      'New York',
      'Suffolk',
      'Bronx',
      'Nassau',
      'Westchester',
      'Erie',
      'Monroe',
      'Richmond',
      'Onondaga',
      'Orange',
      'Albany',
      'Dutchess',
      'Rockland',
    ],

    Texas: [
      'Anderson',
      'Andrews',
      'Angelina',
      'Aransas',
      'Archer',
      'Armstrong',
      'Atascosa',
      'Austin',
      'Bailey',
      'Bandera',
      'Bastrop',
      'Baylor',
      'Bee',
      'Bell',
      'Bexar',
      'Blanco',
      'Borden',
      'Bosque',
      'Bowie',
      'Brazoria',
      'Brazos',
      'Brewster',
      'Briscoe',
      'Brooks',
      'Brown',
      'Burleson',
      'Burnet',
      'Caldwell',
      'Calhoun',
      'Callahan',
      'Cameron',
      'Camp',
      'Carson',
      'Cass',
      'Castro',
      'Chambers',
      'Cherokee',
      'Childress',
      'Clay',
      'Cochran',
      'Coke',
      'Coleman',
      'Collin',
      'Collingsworth',
      'Colorado',
      'Comal',
      'Comanche',
      'Concho',
      'Cooke',
      'Coryell',
      'Cottle',
      'Crane',
      'Crockett',
      'Crosby',
      'Culberson',
      'Dallam',
      'Dallas',
      'Dawson',
      'Deaf Smith',
      'Delta',
      'Denton',
      'DeWitt',
      'Dickens',
      'Dimmit',
      'Donley',
      'Duval',
      'Eastland',
      'Ector',
      'Edwards',
      'Ellis',
      'El Paso',
      'Erath',
      'Falls',
      'Fannin',
      'Fayette',
      'Fisher',
      'Floyd',
      'Foard',
      'Fort Bend',
      'Franklin',
      'Freestone',
      'Frio',
      'Gaines',
      'Galveston',
      'Garza',
      'Gillespie',
      'Glasscock',
      'Goliad',
      'Gonzales',
      'Gray',
      'Grayson',
      'Gregg',
      'Grimes',
      'Guadalupe',
      'Hale',
      'Hall',
      'Hamilton',
      'Hansford',
      'Hardeman',
      'Hardin',
      'Harris',
      'Harrison',
      'Hartley',
      'Haskell',
      'Hays',
      'Hemphill',
      'Henderson',
      'Hidalgo',
      'Hill',
      'Hockley',
      'Hood',
      'Hopkins',
      'Houston',
      'Howard',
      'Hudspeth',
      'Hunt',
      'Hutchinson',
      'Irion',
      'Jack',
      'Jackson',
      'Jasper',
      'Jeff Davis',
      'Jefferson',
      'Jim Hogg',
      'Jim Wells',
      'Johnson',
      'Jones',
      'Karnes',
      'Kaufman',
      'Kendall',
      'Kenedy',
      'Kent',
      'Kerr',
      'Kimble',
      'King',
      'Kinney',
      'Kleberg',
      'Knox',
      'La Salle',
      'Lamar',
      'Lamb',
      'Lampasas',
      'Lavaca',
      'Lee',
      'Leon',
      'Liberty',
      'Limestone',
      'Lipscomb',
      'Live Oak',
      'Llano',
      'Loving',
      'Lubbock',
      'Lynn',
      'Madison',
      'Marion',
      'Martin',
      'Mason',
      'Matagorda',
      'Maverick',
      'McCulloch',
      'McLennan',
      'McMullen',
      'Medina',
      'Menard',
      'Midland',
      'Milam',
      'Mills',
      'Mitchell',
      'Montague',
      'Montgomery',
      'Moore',
      'Morris',
      'Motley',
      'Nacogdoches',
      'Navarro',
      'Newton',
      'Nolan',
      'Nueces',
      'Ochiltree',
      'Oldham',
      'Orange',
      'Palo Pinto',
      'Panola',
      'Parker',
      'Parmer',
      'Pecos',
      'Polk',
      'Potter',
      'Presidio',
      'Rains',
      'Randall',
      'Reagan',
      'Real',
      'Red River',
      'Reeves',
      'Refugio',
      'Roberts',
      'Robertson',
      'Rockwall',
      'Runnels',
      'Rusk',
      'Sabine',
      'San Augustine',
      'San Jacinto',
      'San Patricio',
      'San Saba',
      'Schleicher',
      'Scurry',
      'Shackelford',
      'Shelby',
      'Sherman',
      'Smith',
      'Somervell',
      'Starr',
      'Stephens',
      'Sterling',
      'Stonewall',
      'Sutton',
      'Swisher',
      'Tarrant',
      'Taylor',
      'Terrell',
      'Terry',
      'Throckmorton',
      'Titus',
      'Tom Green',
      'Travis',
      'Trinity',
      'Tyler',
      'Upshur',
      'Upton',
      'Uvalde',
      'Val Verde',
      'Van Zandt',
      'Victoria',
      'Walker',
      'Waller',
      'Ward',
      'Washington',
      'Webb',
      'Wharton',
      'Wheeler',
      'Wichita',
      'Wilbarger',
      'Willacy',
      'Williamson',
      'Wilson',
      'Winkler',
      'Wise',
      'Wood',
      'Yoakum',
      'Young',
      'Zapata',
      'Zavala',
    ],

    Washington: [
      'King',
      'Pierce',
      'Snohomish',
      'Spokane',
      'Clark',
      'Thurston',
      'Kitsap',
      'Yakima',
      'Whatcom',
      'Benton',
      'Skagit',
      'Cowlitz',
      'Chelan',
      'Grant',
      'Franklin',
    ],

    Wisconsin: [
      'Milwaukee',
      'Dane',
      'Waukesha',
      'Brown',
      'Racine',
      'Outagamie',
      'Winnebago',
      'Rock',
      'Kenosha',
      'Washington',
      'Marathon',
      'Sheboygan',
      'La Crosse',
      'Eau Claire',
      'Fond du Lac',
    ],

    Wyoming: [
      'Laramie',
      'Natrona',
      'Campbell',
      'Sweetwater',
      'Fremont',
      'Albany',
      'Park',
      'Sheridan',
      'Uinta',
      'Carbon',
      'Lincoln',
      'Johnson',
      'Converse',
      'Goshen',
      'Washakie',
    ],
  };
  selectedSubCounties: Record<string, string[]> = {};

  onCountyStateChange() {
    const selected = this.countiesKeyDropDowns.states.selected;

    if (!selected || selected.length === 0) {
      this.activeStatesForCounties = null;
      this.selectedState = [];
      this.selectedCounty = [];
      return;
    }

    const stateName = selected[0].item_text;

    // THIS LINE IS MOST IMPORTANT
    this.activeStatesForCounties = stateName;

    this.selectedState = selected.map((item: any) => item.item_text);

    if (!this.selectedSubCounties[stateName]) {
      this.selectedSubCounties[stateName] = [];
    }
  }

  toggleCounty(state: string, county: string, checked: boolean) {
    if (!this.selectedSubCounties[state]) {
      this.selectedSubCounties[state] = [];
    }

    if (checked) {
      if (!this.selectedSubCounties[state].includes(county)) {
        this.selectedSubCounties[state].push(county);
      }
    } else {
      this.selectedSubCounties[state] = this.selectedSubCounties[state].filter((c) => c !== county);
    }

    console.log(this.selectedSubCounties);
  }

  removeState(stateName: string) {
    // remove from selectedState array
    this.selectedState = this.selectedState.filter((s) => s !== stateName);

    // remove all counties of this state from selectedCounty
    if (this.selectedSubCounties[stateName]) {
      const countiesToRemove = this.selectedSubCounties[stateName];

      this.selectedCounty = this.selectedCounty.filter(
        (county) => !countiesToRemove.includes(county),
      );
    }

    // delete state entry from selectedSubCounties map
    delete this.selectedSubCounties[stateName];

    // remove from dropdown selected list
    this.countiesKeyDropDowns.states.selected = this.countiesKeyDropDowns.states.selected.filter(
      (item: any) => item.item_text !== stateName,
    );

    // hide grid if active state was removed
    if (this.activeStatesForCounties === stateName) {
      this.activeStatesForCounties = null;
    }

    console.log('Updated States:', this.selectedState);
    console.log('Updated Counties:', this.selectedCounty);
  }

  isMultipleMode = false;

  onMultipleToggleChange(event: any) {
    this.multipleFullStateMode = event.target.checked;

    if (this.multipleFullStateMode) {
      // 🔥 Full state → auto select all counties for all selected states
      this.multipleSelectedStates.forEach((state) => {
        this.multipleSelectedCounties[state] = [...(this.countiySubCountyMap[state] || [])];
      });
    } else {
      // With counties mode → clear counties
      this.multipleSelectedStates.forEach((state) => {
        this.multipleSelectedCounties[state] = [];
      });
    }

    console.log('Full State Mode:', this.multipleFullStateMode);
    this.updateStatesWithSelectedCounties();
  }

  removeCounty(countyName: string) {
    // remove from selectedCounty array
    this.selectedCounty = this.selectedCounty.filter((c) => c !== countyName);

    // remove from selectedSubCounties map
    Object.keys(this.selectedSubCounties).forEach((state) => {
      this.selectedSubCounties[state] = this.selectedSubCounties[state].filter(
        (c) => c !== countyName,
      );
    });

    console.log('Updated Counties:', this.selectedCounty);
  }
  onMultipleStateSelect() {
    const selected = this.countiesKeyDropDowns.states.selected;

    // pehle selectedState update karo
    this.selectedState = selected.map((item: any) => item.item_text);

    // phir active state set karo
    if (this.selectedState.length > 0) {
      this.activeStatesForCounties = this.selectedState[0];
    } else {
      this.activeStatesForCounties = null;
    }

    // counties logic
    this.selectedState.forEach((state) => {
      if (this.isMultipleMode) {
        // FULL STATE MODE → auto select all counties
        this.selectedSubCounties[state] = [...(this.countiySubCountyMap[state] || [])];
      } else {
        // WITH COUNTIES MODE → empty initially
        if (!this.selectedSubCounties[state]) {
          this.selectedSubCounties[state] = [];
        }
      }
    });
  }

  removeCountyFromState(state: string, county: string) {
    this.selectedSubCounties[state] = this.selectedSubCounties[state].filter((c) => c !== county);
  }

  setActiveState(state: string) {
    this.activeStatesForCounties = state;
  }

  isAllCountiesSelected(state: string): boolean {
    const all = this.countiySubCountyMap[state] || [];
    const selected = this.selectedSubCounties[state] || [];

    return all.length > 0 && all.length === selected.length;
  }

  toggleSelectAllCounties(state: string, checked: boolean) {
    if (checked) {
      // select all
      this.selectedSubCounties[state] = [...(this.countiySubCountyMap[state] || [])];
    } else {
      // unselect all
      this.selectedSubCounties[state] = [];
    }
  }

  onMultipleStateChange() {
    const selected = this.multipleStatesDropdown.selected;
    const newSelectedStates = selected.map((item: any) => item.item_text);

    // FULL STATE MODE
    if (this.multipleFullStateMode) {
      this.multipleSelectedStates = newSelectedStates;

      this.multipleSelectedStates.forEach((state) => {
        // 🔥 Auto select all counties
        this.multipleSelectedCounties[state] = [...(this.countiySubCountyMap[state] || [])];
      });
    } else {
      // NORMAL MODE (with counties logic)
      const validStates = newSelectedStates.filter((state) => {
        if ((this.multipleSelectedCounties[state]?.length || 0) > 0) {
          return true;
        }

        if (state === newSelectedStates[newSelectedStates.length - 1]) {
          return true;
        }

        return false;
      });

      this.multipleSelectedStates = validStates;

      this.multipleStatesDropdown.selected = this.multipleStatesDropdown.selected.filter(
        (item: any) => validStates.includes(item.item_text),
      );

      this.multipleSelectedStates.forEach((state) => {
        if (!this.multipleSelectedCounties[state]) {
          this.multipleSelectedCounties[state] = [];
        }
      });
    }

    // Set active state
    if (this.multipleSelectedStates.length > 0) {
      this.multipleActiveState =
        this.multipleSelectedStates[this.multipleSelectedStates.length - 1];
    } else {
      this.multipleActiveState = null;
    }
  }

  toggleMultipleCounty(state: string, county: string, checked: boolean) {
    if (!this.multipleSelectedCounties[state]) {
      this.multipleSelectedCounties[state] = [];
    }

    if (checked) {
      if (!this.multipleSelectedCounties[state].includes(county)) {
        this.multipleSelectedCounties[state].push(county);
      }
    } else {
      this.multipleSelectedCounties[state] = this.multipleSelectedCounties[state].filter(
        (c) => c !== county,
      );
    }

    if ((this.multipleSelectedCounties[state]?.length || 0) === 0) {
      this.multipleSelectedStates = this.multipleSelectedStates.filter((s) => s !== state);

      delete this.multipleSelectedCounties[state];

      if (this.multipleSelectedStates.length > 0) {
        this.multipleActiveState =
          this.multipleSelectedStates[this.multipleSelectedStates.length - 1];
      } else {
        this.multipleActiveState = null;
      }
    }
    this.updateStatesWithSelectedCounties();
  }

  removeMultipleState(state: string) {
    this.multipleSelectedStates = this.multipleSelectedStates.filter((s) => s !== state);
    delete this.multipleSelectedCounties[state];
    if (this.multipleSelectedStates.length > 0) {
      this.multipleActiveState =
        this.multipleSelectedStates[this.multipleSelectedStates.length - 1];
    } else {
      this.multipleActiveState = null;
    }
    this.updateStatesWithSelectedCounties();
  }
  removeMultipleCounty(state: string, county: string) {
    this.multipleSelectedCounties[state] = this.multipleSelectedCounties[state].filter(
      (c) => c !== county,
    );
    this.updateStatesWithSelectedCounties();
  }

  isAllMultipleCountiesSelected(state: string): boolean {
    const all = this.countiySubCountyMap[state] || [];
    const selected = this.multipleSelectedCounties[state] || [];
    return all.length > 0 && all.length === selected.length;
  }

  toggleSelectAllMultiple(state: string, checked: boolean) {
    if (checked) {
      this.multipleSelectedCounties[state] = [...(this.countiySubCountyMap[state] || [])];
    } else {
      this.multipleSelectedCounties[state] = [];
    }
  }

  isStateMarked(state: string): boolean {
    return (this.multipleSelectedCounties[state]?.length || 0) > 0;
  }

  updateStatesWithSelectedCounties() {
    this.statesWithSelectedCounties = this.multipleSelectedStates.filter(
      (state) => (this.multipleSelectedCounties[state]?.length || 0) > 0,
    );
  }

  onSingleStateChange() {
    const selected = this.countiesKeyDropDowns.states.selected;
    if (!selected || selected.length === 0) {
      this.activeStatesForCounties = null;
      this.selectedState = [];
      this.selectedSubCounties = {};
      return;
    }
    const stateName = selected[0].item_text;
    this.selectedState = [stateName];
    this.activeStatesForCounties = stateName;
    if (this.singleFullStateMode) {
      this.selectedSubCounties[stateName] = [...(this.countiySubCountyMap[stateName] || [])];
    } else {
      this.selectedSubCounties[stateName] = [];
    }
  }

  onSingleToggleChange(event: any) {
    this.singleFullStateMode = event.target.checked;

    const state = this.activeStatesForCounties;
    if (!state) return;

    if (this.singleFullStateMode) {
      this.selectedSubCounties[state] = [...(this.countiySubCountyMap[state] || [])];
    } else {
      this.selectedSubCounties[state] = [];
    }
  }

  saveMultipleSelection() {
    const result = this.statesWithSelectedCounties.map((state) => ({
      state: state,
      counties: this.multipleSelectedCounties[state] || [],
    }));

    console.log('Multiple Section Data:', result);
  }

  saveSingleSelection() {
    if (!this.selectedState.length) {
      console.log('Single Section: No state selected');
      return;
    }
    const state = this.selectedState[0];
    const counties = this.selectedSubCounties[state] || [];
    const result = {
      state: state,
      counties: counties,
    };
    console.log('Single Section Data:', result);
  }

  clearAllSelections() {
    // ----- Focus Group -----
    this.savedBeneficiaries = [];
    this.savedEntities = [];
    this.selectedSubEntities = {};
    this.focusGroupKeyDropdowns.beneficiaries.selected = [];
    this.focusGroupKeyDropdowns.entities.selected = [];
    this.activeEntityForSubGrid = null;

    // ----- Single Mode -----
    this.selectedState = [];
    this.selectedSubCounties = {};
    this.countiesKeyDropDowns.states.selected = [];
    this.activeStatesForCounties = null;

    // ----- Multiple Mode -----
    this.multipleSelectedStates = [];
    this.multipleSelectedCounties = {};
    this.multipleStatesDropdown.selected = [];
    this.multipleActiveState = null;

    console.log('All selections cleared successfully');
  }

  saveEverything() {
    const focusGroupData = {
      beneficiaries: this.savedBeneficiaries,
      entities: this.savedEntities.map((entity) => ({
        entityName: entity,
        subEntities: this.selectedSubEntities[entity] || [],
      })),
    };

    const singleData = this.selectedState.length
      ? {
          state: this.selectedState[0],
          fullState: this.singleFullStateMode,
          counties: this.singleFullStateMode
            ? this.countiySubCountyMap[this.selectedState[0]] || []
            : this.selectedSubCounties[this.selectedState[0]] || [],
        }
      : null;

    const multipleData = this.multipleSelectedStates.map((state) => ({
      state: state,
      fullState: this.multipleFullStateMode,
      counties: this.multipleSelectedCounties[state] || [],
    }));

    const finalPayload = {
      focusGroup: focusGroupData,
      singleMode: singleData,
      multipleMode: multipleData,
    };

    console.log('FINAL SELECTED DATA:', finalPayload);
  }

  saveStatesAndCounties() {
    // SINGLE MODE
    if (this.grantMode === 'single') {
      if (!this.selectedState.length) {
        console.log('Single Mode: No state selected');
        return;
      }

      const state = this.selectedState[0];

      const counties = this.singleFullStateMode
        ? this.countiySubCountyMap[state] || []
        : this.selectedSubCounties[state] || [];

      console.log('Single Mode Data:', {
        state: state,
        counties: counties,
      });

      return;
    }

    // MULTIPLE MODE
    if (this.grantMode === 'multiple') {
      const result = this.multipleSelectedStates.map((state) => ({
        state: state,
        counties: this.multipleFullStateMode
          ? this.countiySubCountyMap[state] || []
          : this.multipleSelectedCounties[state] || [],
      }));

      console.log('Multiple Mode Data:', result);

      return;
    }

    // ALL MODE (optional)
    if (this.grantMode === 'all') {
      const result = Object.keys(this.countiySubCountyMap).map((state) => ({
        state: state,
        counties: this.countiySubCountyMap[state],
      }));

      console.log('All States & Counties Data:', result);

      return;
    }
  }

  generateCountiesFromText() {
    if (!this.pasteText.trim()) {
      alert('Please paste some text');
      return;
    }

    const text = this.pasteText.toLowerCase();
    const detectedStates: string[] = [];

    Object.keys(this.countiySubCountyMap).forEach((state) => {
      if (text.includes(state.toLowerCase())) {
        detectedStates.push(state);
      }
    });

    if (detectedStates.length === 0) {
      alert('Please mention at least one state name.');
      return;
    }

    if (this.grantMode === 'single') {
      const state = detectedStates[0];

      this.selectedState = [state];
      this.activeStatesForCounties = state;

      this.countiesKeyDropDowns.states.selected = this.countiesKeyDropDowns.states.data.filter(
        (item: any) => item.item_text === state,
      );

      if (!this.selectedSubCounties[state]) {
        this.selectedSubCounties[state] = [];
      }

      let countyFound = false;

      this.countiySubCountyMap[state].forEach((county) => {
        const regex = new RegExp(`\\b${county.toLowerCase()}\\b`, 'i');

        if (regex.test(text)) {
          countyFound = true;

          if (!this.selectedSubCounties[state].includes(county)) {
            this.selectedSubCounties[state].push(county);
          }
        }
      });

      //  county found FULL STATE AUTO SELECT
      if (!countyFound) {
        this.selectedSubCounties[state] = [...this.countiySubCountyMap[state]];
        this.singleFullStateMode = true;
      }
    }

    if (this.grantMode === 'multiple') {
      detectedStates.forEach((state) => {
        if (!this.multipleSelectedStates.includes(state)) {
          this.multipleSelectedStates.push(state);
        }

        if (!this.multipleSelectedCounties[state]) {
          this.multipleSelectedCounties[state] = [];
        }

        let countyFound = false;

        this.countiySubCountyMap[state].forEach((county) => {
          const regex = new RegExp(`\\b${county.toLowerCase()}\\b`, 'i');

          if (regex.test(text)) {
            countyFound = true;

            if (!this.multipleSelectedCounties[state].includes(county)) {
              this.multipleSelectedCounties[state].push(county);
            }
          }
        });

        // 🔥 If no county found → FULL STATE AUTO SELECT
        if (!countyFound) {
          this.multipleSelectedCounties[state] = [...this.countiySubCountyMap[state]];
          this.multipleFullStateMode = true;
        }
      });

      this.multipleActiveState = detectedStates[0];
    }
    this.multipleStatesDropdown.selected = this.multipleStatesDropdown.data.filter((item: any) =>
      this.multipleSelectedStates.includes(item.item_text),
    );

    this.showPasteModal = false;

    console.log('Smart Auto Selection Completed');
  }

  public onReady(editor: ClassicEditor): void {
    Array.from(this.editorWordCount.nativeElement.children).forEach((child) => child.remove());

    const wordCount = editor.plugins.get('WordCount') as any;

    this.editorWordCount.nativeElement.appendChild(wordCount.wordCountContainer);
  }
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config: any) {
  if ((configUpdateAlert as any).configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (currentValue: string | undefined, forbiddenValue: string) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  (configUpdateAlert as any).configUpdateAlertShown = true;

  if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
    valuesToUpdate.push('LICENSE_KEY');
  }

  if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>')) {
    valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'to receive full access to Premium Features:',
        '',
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join('\n'),
    );
  }
}
