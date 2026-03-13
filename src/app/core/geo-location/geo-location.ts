import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-geo-location',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './geo-location.html',
  styleUrl: './geo-location.scss',
})
export class GeoLocationComponent implements OnInit {

  showPasteModal = false;
  pasteText = '';

  showGeoModal = false;
  geoModalType: 'cities' | 'township' | null = null;
  newGeoName = '';

  geoDropdowns: any = {
    township: {
      label: 'Town Ship',
      data: [],
      selected: []
    },
    insular: {
      label: 'Insular Areas',
      data: [],
      selected: []
    },
    cities: {
      label: 'Cities',
      data: [],
      selected: []
    },
    states: {
      label: 'States',
      data: [],
      selected: []
    }
  };

  geoKeys: string[] = [];

  readonly multiSelectSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true,
    enableCheckAll: false
  };

  ngOnInit(): void {

    this.geoDropdowns.township.data = [
      { item_id: 1, item_text: 'Roxbury' },
      { item_id: 2, item_text: 'Champion' },
      { item_id: 3, item_text: 'Stockholm' }
    ];

    this.geoDropdowns.insular.data = [
      { item_id: 1, item_text: 'American Samoa' },
      { item_id: 2, item_text: 'Guam' }
    ];

    this.geoDropdowns.cities.data = [
      { item_id: 1, item_text: 'Antioch' },
      { item_id: 2, item_text: 'Benicia' }
    ];

    this.geoDropdowns.states.data = [
      { item_id: 1, item_text: 'Alaska' },
      { item_id: 2, item_text: 'Arizona' }
    ];

    this.geoKeys = Object.keys(this.geoDropdowns);
  }

  shouldShowAdd(key: string): boolean {
    return key === 'township' || key === 'cities';
  }

  openGeoModal(type: string) {

    if (type !== 'cities' && type !== 'township') return;

    this.geoModalType = type as 'cities' | 'township';
    this.showGeoModal = true;
  }

  closeGeoModal() {
    this.showGeoModal = false;
    this.geoModalType = null;
    this.newGeoName = '';
  }

  saveGeoItem() {

    if (!this.newGeoName.trim() || !this.geoModalType) return;

    const newItem = {
      item_id: Date.now(),
      item_text: this.newGeoName.trim()
    };

    this.geoDropdowns[this.geoModalType].data.push(newItem);
    this.geoDropdowns[this.geoModalType].selected.push(newItem);

    this.closeGeoModal();
  }

  removeGeoItem(type: string, item: any) {

    this.geoDropdowns[type].selected =
      this.geoDropdowns[type].selected.filter(
        (selectedItem: any) => selectedItem.item_id !== item.item_id
      );
  }

  saveGeo(type: string) {

    const selectedItems = this.geoDropdowns[type].selected;

    if (!selectedItems || selectedItems.length === 0) return;

    const names = selectedItems.map((item: any) => item.item_text);

    console.log(`${this.geoDropdowns[type].label}:`, names);
  }

  openPasteModal() {
    this.showPasteModal = true;
  }

  closePasteModal() {
    this.showPasteModal = false;
  }

  generateFromText() {
    console.log("Generate clicked", this.pasteText);
    this.showPasteModal = false;
  }

}