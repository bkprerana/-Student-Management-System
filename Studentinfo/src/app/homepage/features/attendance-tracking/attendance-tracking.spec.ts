import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTracking } from './attendance-tracking';

describe('AttendanceTracking', () => {
  let component: AttendanceTracking;
  let fixture: ComponentFixture<AttendanceTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceTracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceTracking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
