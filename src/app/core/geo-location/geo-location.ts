import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/component/header/header';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-geo-location',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule, Header],
  templateUrl: './geo-location.html',
  styleUrl: './geo-location.scss',
})
export class GeoLocationComponent implements OnInit {
  showPasteModal = false;
  pasteText = '';

  constructor(private router: Router) {}

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

    this.geoDropdowns[this.geoModalType].data.push(newItem);
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
    Object.keys(this.geoDropdowns).forEach((key) => {
      this.geoDropdowns[key].selected = [];
    });
  }

  saveAll() {
    const result: any = {};
    Object.keys(this.geoDropdowns).forEach((key) => {
      const selected = this.geoDropdowns[key].selected;
      if (selected.length > 0) {
        result[key] = selected.map((item: any) => item.item_text);
      }
    });
    console.log('SAVE DATA:', result);
  }
}
