import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusGroups } from './focus-groups';

describe('FocusGroups', () => {
  let component: FocusGroups;
  let fixture: ComponentFixture<FocusGroups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusGroups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FocusGroups);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
