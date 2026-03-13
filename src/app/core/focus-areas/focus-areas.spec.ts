import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusAreas } from './focus-areas';

describe('FocusAreas', () => {
  let component: FocusAreas;
  let fixture: ComponentFixture<FocusAreas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusAreas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FocusAreas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
