import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Api } from '../Services/api';
import {
  City,
  DropdownItem,
  GetCitiesResponse,
  GetInsularResponse,
  GetStatesResponse,
  GetTownshipResponse,
  InsularArea,
  Township,
  State,
} from '../../datatype';

type GeoKey = 'cities' | 'township' | 'insular' | 'states';

@Component({
  selector: 'app-geo-location',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule],
  templateUrl: './geo-location.html',
  styleUrl: './geo-location.scss',
})
export class GeoLocationComponent implements OnInit {
  showPasteModal = false;
  pasteText = '';

  constructor(
    private router: Router,
    private api: Api,
  ) {}

  showGeoModal: boolean = false;
  geoModalType: 'cities' | 'township' | null = null;

  newGeoName: string = '';

  shouldShowAdd(key: string): boolean {
    return key === 'township' || key === 'cities';
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

  geoDropdowns: {
    township: {
      label: string;
      data: DropdownItem[];
      selected: DropdownItem[];
    };
    insular: {
      label: string;
      data: DropdownItem[];
      selected: DropdownItem[];
    };
    cities: {
      label: string;
      data: DropdownItem[];
      selected: DropdownItem[];
    };
    states: {
      label: string;
      data: DropdownItem[];
      selected: DropdownItem[];
    };
  } = {
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

  geoKeys: GeoKey[] = [];

  ngOnInit(): void {
    console.log('aagya hai data ');
    this.loadGeoData();
    this.geoKeys = Object.keys(this.geoDropdowns) as GeoKey[];
    console.log('jaldi aagya hai ');
  }

  loadGeoData() {
    // Cities
    this.api.getCities().subscribe((res: GetCitiesResponse) => {
      this.geoDropdowns.cities.data = res.usCities.map((item: City) => ({
        item_id: item.cityIndex,
        item_text: item.cityName.trim(),
      }));
    });

    // Township
    this.api.getTownShips().subscribe((res: GetTownshipResponse) => {
      this.geoDropdowns.township.data = res.usTownships.map((item: Township) => ({
        item_id: item.townshipIndex,
        item_text: item.townshipName.trim(),
      }));
    });

    // Insular
    this.api.getInsularAreas().subscribe((res: GetInsularResponse) => {
      this.geoDropdowns.insular.data = res.usInsularAreas.map((item: InsularArea) => ({
        item_id: item.areaIndex,
        item_text: item.areaName.trim(),
      }));
    });

    // States
    this.api.getStates().subscribe((res: GetStatesResponse) => {
      this.geoDropdowns.states.data = res.usStates.map((item: State) => ({
        item_id: item.stateIndex,
        item_text: item.stateName.trim(),
      }));
    });
  }

  goToFocusAreas() {
    this.router.navigate(['/focus-areas']);
  }

  goToCalenderArea() {
    this.router.navigate(['/calendar-details']);
  }

  closeGeoModal() {
    this.showGeoModal = false;
    this.geoModalType = null;
    this.newGeoName = '';
  }
  openGeoModal(type: GeoKey) {
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
      (item: DropdownItem) => item.item_text.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (exists) {
      alert(`${trimmedName} already exists!`);
      return;
    }

    const newItem = {
      item_id: Date.now(),
      item_text: trimmedName,
    };

    this.geoDropdowns[this.geoModalType].data.push(newItem);
    this.geoDropdowns[this.geoModalType].selected.push(newItem);
    console.log(`New ${this.geoModalType} added:`, newItem);
    this.closeGeoModal();
  }
  saveGeo(type: GeoKey) {
    const selectedItems = this.geoDropdowns[type].selected;
    if (!selectedItems || selectedItems.length === 0) {
      console.log(`${this.geoDropdowns[type].label} : No selection`);
      return;
    }
    // sirf names nikaal rahe hain
    const names = selectedItems.map((item: DropdownItem) => item.item_text);
    console.log(`${this.geoDropdowns[type].label} : ${names.join(', ')}`);
  }
  removeGeoItem(type: GeoKey, item: DropdownItem) {
    this.geoDropdowns[type].selected = this.geoDropdowns[type].selected.filter(
      (selectedItem: DropdownItem) => selectedItem.item_id !== item.item_id,
    );
  }

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
    console.log('Text processed:', text);
    this.showPasteModal = false;
  }

  clearAll() {
    (Object.keys(this.geoDropdowns) as (keyof typeof this.geoDropdowns)[]).forEach((key) => {
      this.geoDropdowns[key].selected = [];
    });
  }

  saveAll() {
    const result: Record<string, string[]> = {};
    (Object.keys(this.geoDropdowns) as GeoKey[]).forEach((key) => {
      const selected = this.geoDropdowns[key].selected;
      if (selected.length > 0) {
        result[key] = selected.map((item: DropdownItem) => item.item_text);
      }
    });
  }
}
