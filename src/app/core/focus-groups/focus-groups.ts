import { Component, OnInit, HostListener, ElementRef, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PLATFORM_ID } from '@angular/core';
import { Api } from '../Services/api';
import { forkJoin } from 'rxjs';
import { Subject, takeUntil } from 'rxjs';
import {
  Beneficiary,
  DropdownItem,
  Entity,
  GetBeneficiariesResponse,
  GetSelectedBeneficiariesResponse,
  GetSelectedSubEntitiesResponse,
  GetSubEntitiesResponse,
  InsertBeneficiariesPayload,
  InsertBeneficiaryRow,
  InsertSubEntityRow,
  SelectedBeneficiary,
  SelectedSubEntity,
  SubEntity,
  FocusGroupState,
} from '../../datatype';
import { Input } from '@angular/core';

@Component({
  selector: 'app-focus-groups',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule],
  templateUrl: './focus-groups.html',
  styleUrl: './focus-groups.scss',
})
export class FocusGroupsComponent implements OnInit {
  objectKeys = Object.keys;
  @ViewChild('editorOutlineElement')
  private editorOutline!: ElementRef<HTMLDivElement>;
  @ViewChild('editorWordCountElement')
  private editorWordCount!: ElementRef<HTMLDivElement>;
  @ViewChild('issueContainer') issueContainer!: ElementRef;
  @Input() grantId?: number;

  private destroy$ = new Subject<void>();
  public isBrowser = false;
  activeBtn: string = 'calendar';
  opportunityForm: FormGroup;

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (!this.issueContainer) return;
  }

  originalState: FocusGroupState = {
    beneficiaries: [],
    entities: {},
  };

  allSubEntities: Record<number, SubEntity[]> = {};
  subEntitiesList: SubEntity[] = [];
  hoverTimer: ReturnType<typeof setTimeout> | null = null;
  issueMap = new Map<number, string>();
  selectedMap = new Map<number, number[]>();
  activeEntityForSubGrid: string | null = null;
  showPasteModal = false;
  pasteText = '';
  isLoading = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
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
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  savedEntities: string[] = [];
  savedBeneficiaries: string[] = [];

  focusGroupKeyDropdowns: {
    beneficiaries: {
      label: string;
      data: DropdownItem[];
      selected: DropdownItem[];
    };
    entities: {
      label: string;
      data: DropdownItem[];
      selected: DropdownItem[];
    };
  } = {
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

  loadEntities() {
    this.api.getEntities().subscribe({
      next: (res) => {
        const mapped = res.usEntities.map((item: Entity) => ({
          item_id: item.entIndex,
          item_text: item.entName,
        }));

        this.focusGroupKeyDropdowns.entities.data = mapped;

        if (this.grantId) {
          this.loadSelectedFocusGroups(this.grantId);
        }
      },
    });
  }

  handleSelectedBeneficiaries(res: GetSelectedBeneficiariesResponse) {
    const data = res.tempUSGrantBeneficiaries;

    this.savedBeneficiaries = data.map((item) => item.beneficiaryName);

    this.focusGroupKeyDropdowns.beneficiaries.selected =
      this.focusGroupKeyDropdowns.beneficiaries.data.filter((item) =>
        this.savedBeneficiaries
          .map((x) => x.toLowerCase().trim())
          .includes(item.item_text.toLowerCase().trim()),
      );

    this.originalState.beneficiaries = [...this.savedBeneficiaries];
  }

  handleSelectedEntities(res: GetSelectedSubEntitiesResponse) {
    const data = res.tempUSGrantSubEnt;

    this.savedEntities = [];
    this.selectedSubEntities = {};

    data.forEach((item) => {
      const entity = item.entityName;
      const sub = item.subEntName;

      if (!this.savedEntities.includes(entity)) {
        this.savedEntities.push(entity);
      }

      if (!this.selectedSubEntities[entity]) {
        this.selectedSubEntities[entity] = [];
      }

      if (!this.selectedSubEntities[entity].includes(sub)) {
        this.selectedSubEntities[entity].push(sub);
      }
    });

    // dropdown selected sync
    this.focusGroupKeyDropdowns.entities.selected =
      this.focusGroupKeyDropdowns.entities.data.filter((item) =>
        this.savedEntities
          .map((x) => x.toLowerCase().trim())
          .includes(item.item_text.toLowerCase().trim()),
      );

    // original state set
    this.originalState.entities = JSON.parse(JSON.stringify(this.selectedSubEntities));
  }

  ngOnInit() {
    if (!this.grantId) {
      this.loadBeneficiaries();
      this.loadEntities();
      return;
    }

    forkJoin({
      beneficiaries: this.api.getBeneficiaries(),
      entities: this.api.getEntities(),
      selectedSubs: this.api.getSelectedFocusGroups(this.grantId),
      selectedBenef: this.api.getSelectedBeneficiaries(this.grantId),
    }).subscribe(({ beneficiaries, entities, selectedSubs, selectedBenef }) => {
      // 1. map dropdown data
      this.focusGroupKeyDropdowns.beneficiaries.data = beneficiaries.tempUSBeneficiaries.map(
        (b) => ({
          item_id: b.beneficiaryIndex,
          item_text: b.beneficiaryName,
        }),
      );

      this.focusGroupKeyDropdowns.entities.data = entities.usEntities.map((e) => ({
        item_id: e.entIndex,
        item_text: e.entName,
      }));

      // 2. map selected (same logic reuse kar)
      this.handleSelectedEntities(selectedSubs);
      this.handleSelectedBeneficiaries(selectedBenef);
    });
  }
  loadSelectedFocusGroups(grantId: number) {
    this.api.getSelectedFocusGroups(grantId).subscribe({
      next: (res: GetSelectedSubEntitiesResponse) => {
        const data = res.tempUSGrantSubEnt;

        this.savedEntities = [];
        this.selectedSubEntities = {};

        data.forEach((item: SelectedSubEntity) => {
          const entity = item.entityName;
          const sub = item.subEntName;

          if (!this.savedEntities.includes(entity)) {
            this.savedEntities.push(entity);
          }

          if (!this.selectedSubEntities[entity]) {
            this.selectedSubEntities[entity] = [];
          }

          if (!this.selectedSubEntities[entity].includes(sub)) {
            this.selectedSubEntities[entity].push(sub);
          }
        });

        this.focusGroupKeyDropdowns.entities.selected =
          this.focusGroupKeyDropdowns.entities.data.filter((item) =>
            this.savedEntities
              .map((x) => x.toLowerCase().trim())
              .includes(item.item_text.toLowerCase().trim()),
          );

        // ✅ FIX: yahi set karo (IMPORTANT)
        this.originalState.entities = JSON.parse(JSON.stringify(this.selectedSubEntities));
      },
    });

    // subEntities load same rahega
  }

  loadSelectedBeneficiaries(grantId: number) {
    this.api.getSelectedBeneficiaries(grantId).subscribe({
      next: (res: GetSelectedBeneficiariesResponse) => {
        const data = res.tempUSGrantBeneficiaries;

        this.savedBeneficiaries = data.map((item: SelectedBeneficiary) => item.beneficiaryName);

        this.focusGroupKeyDropdowns.beneficiaries.selected =
          this.focusGroupKeyDropdowns.beneficiaries.data.filter((item) =>
            this.savedBeneficiaries
              .map((x) => x.toLowerCase().trim())
              .includes(item.item_text.toLowerCase().trim()),
          );
        this.originalState.beneficiaries = [...this.savedBeneficiaries];
      },
    });
  }

  loadBeneficiaries() {
    this.api.getBeneficiaries().subscribe({
      next: (res: GetBeneficiariesResponse) => {
        const mapped = res.tempUSBeneficiaries.map((item: Beneficiary) => ({
          item_id: item.beneficiaryIndex,
          item_text: item.beneficiaryName,
        }));

        this.focusGroupKeyDropdowns.beneficiaries.data = mapped;

        // 🔥 IMPORTANT FIX
        if (this.grantId) {
          this.loadSelectedBeneficiaries(this.grantId);
        }
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
        (item: DropdownItem) => item.item_text !== name,
      );
  }

  onEntityChange() {
    const selected = this.focusGroupKeyDropdowns.entities.selected;

    if (!selected?.length) {
      this.activeEntityForSubGrid = null;
      this.subEntitiesList = [];
      return;
    }

    const entity = selected[0];
    const entId = entity.item_id;
    const entityName = entity.item_text;

    this.activeEntityForSubGrid = entityName;
    if (this.allSubEntities[entId]) {
      this.subEntitiesList = this.allSubEntities[entId];
      return;
    }

    this.api.getSubEntities(entId).subscribe((res) => {
      this.subEntitiesList = res.subEntities || [];
      this.allSubEntities[entId] = res.subEntities || [];
    });

    if (!this.selectedSubEntities[entityName]) {
      this.selectedSubEntities[entityName] = [];
    }
  }

  toggleSubEntity(entity: string, sub: string, checked: boolean) {
    if (!this.selectedSubEntities[entity]) {
      this.selectedSubEntities[entity] = [];
    }

    if (checked) {
      this.selectedSubEntities[entity] = [...this.selectedSubEntities[entity], sub];
    } else {
      this.selectedSubEntities[entity] = this.selectedSubEntities[entity].filter((s) => s !== sub);
    }

    // force new reference
    this.selectedSubEntities = { ...this.selectedSubEntities };
  }

  removeSubEntity(entity: string, sub: string) {
    this.selectedSubEntities[entity] = this.selectedSubEntities[entity].filter((s) => s !== sub);

    if (this.selectedSubEntities[entity].length === 0) {
      delete this.selectedSubEntities[entity];
      this.savedEntities = this.savedEntities.filter((e) => e !== entity);
    }
  }

  saveFocusGroup(type: string) {
    const selected: DropdownItem[] = this.focusGroupKeyDropdowns.entities.selected;

    if (!selected || selected.length === 0) {
      console.log('No selection');
      return;
    }

    if (type === 'beneficiaries') {
      this.savedBeneficiaries = selected.map((item: DropdownItem) => item.item_text);

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

    this.focusGroupKeyDropdowns.entities.selected =
      this.focusGroupKeyDropdowns.entities.selected.filter((item) => item.item_text !== entityName);
  }

  onBeneficiaryChange() {
    const selected = this.focusGroupKeyDropdowns.beneficiaries.selected;
    this.savedBeneficiaries = selected.map((item: DropdownItem) => item.item_text);
  }

  saveAllFocusGroup() {
    if (!this.hasChanges()) {
      console.log('❌ No changes detected — skipping API');
      return;
    }
    this.saveSubEntitiesToApi();
    this.saveBeneficiariesToApi();
    this.originalState.entities = JSON.parse(JSON.stringify(this.selectedSubEntities));
    this.originalState.beneficiaries = [...this.savedBeneficiaries];

    console.log('✅ Changes saved successfully');
  }

  clearFocusGroup() {
    this.savedBeneficiaries = [];
    this.savedEntities = [];
    this.selectedSubEntities = {};
    this.activeEntityForSubGrid = null;
    this.saveSubEntitiesToApi();
    this.saveBeneficiariesToApi();
  }
  saveSubEntitiesToApi() {
    const rows: InsertSubEntityRow[] = [];

    this.savedEntities.forEach((entityName) => {
      const entityObj = this.focusGroupKeyDropdowns.entities.data.find(
        (e) => e.item_text === entityName,
      );

      if (!entityObj) return;

      const entId = entityObj.item_id;
      const subList = this.selectedSubEntities[entityName] || [];

      subList.forEach((subName) => {
        const subObj = this.allSubEntities[entId]?.find((s) => s.subEntName === subName);

        if (!subObj) return;

        rows.push({
          entIndex: entId,
          entitiyName: entityName,
          subEntIndex: subObj.subEntIndex,
          subEntName: subName,
        });
      });
    });

    // ✅ ALWAYS CALL API (even if empty)
    const payload = {
      grantIndex: String(this.grantId),
      grantSubEntities: rows,
    };

    console.log('📤 SubEntities Payload:', payload);

    this.api.insertSubEntities(payload).subscribe({
      next: (res) => console.log('✅ SubEntities Saved', res),
    });
  }

  saveBeneficiariesToApi() {
    const rows: InsertBeneficiaryRow[] = this.focusGroupKeyDropdowns.beneficiaries.selected.map(
      (item) => ({
        beneficiaryIndex: item.item_id,
        beneficiaryName: item.item_text,
      }),
    );

    const payload: InsertBeneficiariesPayload = {
      grantIndex: String(this.grantId),
      grantBeneficiaries: rows,
    };

    this.api.insertBeneficiaries(payload).subscribe({
      next: (res) => console.log('Saved', res),
    });
  }

  normalize(obj: any) {
    return JSON.stringify(
      Object.keys(obj)
        .sort()
        .reduce((res, key) => {
          res[key] = [...obj[key]].sort();
          return res;
        }, {} as any),
    );
  }

  hasChanges(): boolean {
    const currentEntities = this.normalize(this.selectedSubEntities);
    const originalEntities = this.normalize(this.originalState.entities);

    const currentBeneficiaries = [...this.savedBeneficiaries].sort();
    const originalBeneficiaries = [...this.originalState.beneficiaries].sort();

    return (
      currentEntities !== originalEntities ||
      JSON.stringify(currentBeneficiaries) !== JSON.stringify(originalBeneficiaries)
    );
  }
}
