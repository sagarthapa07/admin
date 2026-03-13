import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Counties } from './counties';

describe('Counties', () => {
  let component: Counties;
  let fixture: ComponentFixture<Counties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Counties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
