import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-counties',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule],
  templateUrl: './counties.html',
  styleUrl: './counties.scss',
})
export class CountiesComponent {
  grantMode: 'single' | 'multiple' | 'all' = 'single';

  showPasteModal = false;
  pasteText = '';

  readonly multiSelectSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true,
  };

  readonly countieSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  countiesKeyDropDowns: any = {
    states: {
      label: 'Select States',
      data: [
        { item_id: 1, item_text: 'Alabama' },
        { item_id: 2, item_text: 'Alaska' },
        { item_id: 3, item_text: 'Arizona' },
        { item_id: 4, item_text: 'California' },
        { item_id: 5, item_text: 'Texas' },
      ],
      selected: [],
    },
  };

  countiySubCountyMap: Record<string, string[]> = {
    Alabama: ['Autauga', 'Baldwin', 'Barbour'],

    Alaska: ['Aleutians East Borough', 'Anchorage Municipality'],

    Arizona: ['Apache', 'Cochise', 'Coconino'],

    California: ['Los Angeles', 'San Diego', 'Orange'],

    Texas: ['Anderson', 'Andrews', 'Angelina'],
  };

  selectedState: string[] = [];

  selectedSubCounties: Record<string, string[]> = {};

  activeStatesForCounties: string | null = null;

  singleFullStateMode = false;

  setGrantMode(mode: 'single' | 'multiple' | 'all') {
    this.grantMode = mode;

    this.selectedState = [];
    this.selectedSubCounties = {};
  }

  onSingleStateChange() {
    const selected = this.countiesKeyDropDowns.states.selected;

    if (!selected || selected.length === 0) {
      this.activeStatesForCounties = null;
      return;
    }

    const stateName = selected[0].item_text;

    this.selectedState = [stateName];

    this.activeStatesForCounties = stateName;

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
  }

  toggleSelectAllCounties(state: string, checked: boolean) {
    if (checked) {
      this.selectedSubCounties[state] = [...(this.countiySubCountyMap[state] || [])];
    } else {
      this.selectedSubCounties[state] = [];
    }
  }

  removeState(stateName: string) {
    this.selectedState = this.selectedState.filter((s) => s !== stateName);

    delete this.selectedSubCounties[stateName];

    this.countiesKeyDropDowns.states.selected = this.countiesKeyDropDowns.states.selected.filter(
      (item: any) => item.item_text !== stateName,
    );
  }

  removeCountyFromState(state: string, county: string) {
    this.selectedSubCounties[state] = this.selectedSubCounties[state].filter((c) => c !== county);
  }

  openPasteModal() {
    this.showPasteModal = true;
  }

  closePasteModal() {
    this.showPasteModal = false;
  }

  saveStatesAndCounties() {
    const result = this.selectedState.map((state) => ({
      state: state,
      counties: this.selectedSubCounties[state] || [],
    }));

    console.log('Selected States & Counties:', result);
  }

  clearAllSelections() {
    this.selectedState = [];

    this.selectedSubCounties = {};

    this.countiesKeyDropDowns.states.selected = [];
  }
}
