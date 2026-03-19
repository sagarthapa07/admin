import { Component, OnInit, HostListener, ElementRef, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ISSUES, Issue } from '../edit/issues.data';
import { PLATFORM_ID } from '@angular/core';
import { Preview } from '../Services/preview';

@Component({
  selector: 'app-focus-groups',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule],
  templateUrl: './focus-groups.html',
  styleUrl: './focus-groups.scss',
})
export class FocusGroupsComponent implements OnInit {
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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private previewService: Preview,
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

  gotoPreview() {
    this.router.navigate(['/preview']);
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

  ngOnInit(): void {
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
  }

  goToGeoLocation() {
    this.router.navigate(['/geo-location']);
  }
  goToFocusGroup() {
    this.router.navigate(['/focus-group']);
  }
  goToCounties() {
    this.router.navigate(['/counties']);
  }

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
}
