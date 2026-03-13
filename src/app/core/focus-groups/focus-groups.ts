import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-focus-groups',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule],
  templateUrl: './focus-groups.html',
  styleUrl: './focus-groups.scss',
})
export class FocusGroupsComponent {
  readonly multiSelectSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true,
  };

  readonly entitySettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  savedEntities: string[] = [];
  savedBeneficiaries: string[] = [];

  activeEntityForSubGrid: string | null = null;

  focusGroupKeyDropdowns: any = {
    beneficiaries: {
      label: 'Beneficiaries',
      data: [
        { item_id: 1, item_text: 'Artists' },
        { item_id: 2, item_text: 'Children' },
        { item_id: 3, item_text: 'Businesses' },
      ],
      selected: [],
    },

    entities: {
      label: 'Entities',
      data: [
        { item_id: 1, item_text: 'Businesses' },
        { item_id: 2, item_text: 'Centres' },
        { item_id: 3, item_text: 'Individuals' },
        { item_id: 4, item_text: 'Organizations' },
      ],
      selected: [],
    },
  };

  entitySubEntityMap: Record<string, string[]> = {
    Organizations: ['Libraries', 'Schools', 'Municipalities'],

    Individuals: ['Academicians', 'Filmmakers', 'Institutions'],

    Centres: ['Community Centres'],

    Businesses: ['Small Business', 'Hotels'],
  };

  selectedSubEntities: Record<string, string[]> = {};

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

  removeBeneficiary(name: string) {
    this.savedBeneficiaries = this.savedBeneficiaries.filter((b) => b !== name);

    this.focusGroupKeyDropdowns.beneficiaries.selected =
      this.focusGroupKeyDropdowns.beneficiaries.selected.filter(
        (item: any) => item.item_text !== name,
      );
  }

  removeEntity(entityName: string) {
    this.savedEntities = this.savedEntities.filter((e) => e !== entityName);

    delete this.selectedSubEntities[entityName];

    const selected = this.focusGroupKeyDropdowns.entities.selected;

    if (selected.length && selected[0].item_text === entityName) {
      this.focusGroupKeyDropdowns.entities.selected = [];
    }
  }

  saveFocusGroup(type: string) {
    const selected = this.focusGroupKeyDropdowns[type].selected;

    if (!selected || selected.length === 0) return;

    if (type === 'beneficiaries') {
      this.savedBeneficiaries = selected.map((item: any) => item.item_text);
    }

    if (type === 'entities') {
      const entityName = selected[0].item_text;

      if (!this.savedEntities.includes(entityName)) {
        this.savedEntities.push(entityName);
      }
    }
  }

  clearFocusGroup() {
    this.savedBeneficiaries = [];
    this.savedEntities = [];
    this.selectedSubEntities = {};

    this.focusGroupKeyDropdowns.beneficiaries.selected = [];
    this.focusGroupKeyDropdowns.entities.selected = [];

    this.activeEntityForSubGrid = null;
  }
}
