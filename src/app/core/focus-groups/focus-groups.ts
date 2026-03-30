import { Component, OnInit, HostListener, ElementRef, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ISSUES, Issue } from '../edit/issues.data';
import { PLATFORM_ID } from '@angular/core';
import { Preview } from '../Services/preview';
import { Api } from '../Services/api';

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
  isLoading = true;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private previewService: Preview,
    private api: Api,
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
    this.loadBeneficiaries();
    this.loadEntities();
    this.api.getBeneficiaries().subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  loadBeneficiaries() {
    this.isLoading = true; // 🔥 start loader

    this.api.getBeneficiaries().subscribe({
      next: (res) => {
        this.isLoading = false; // ✅ stop loader

        console.log(res);

        this.focusGroupKeyDropdowns.beneficiaries.data = res.map((item: any) => ({
          item_id: item.id,
          item_text: item.name,
        }));
      },
      error: (err) => {
        this.isLoading = false; // ❌ error me bhi stop
        console.error(err);
      },
    });
  }

  loadEntities() {
    this.api.getEntities().subscribe({
      next: (res: any) => {
        console.log('Entities API:', res);

        this.focusGroupKeyDropdowns.entities.data = res.map((item: any) => ({
          item_id: item.id || item.entityId,
          item_text: item.name || item.entityName,
        }));
      },
      error: (err) => {
        console.error('Entities API Error:', err);
      },
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
