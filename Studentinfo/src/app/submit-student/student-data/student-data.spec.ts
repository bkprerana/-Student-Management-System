import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentData } from './student-data';

describe('StudentData', () => {
  let component: StudentData;
  let fixture: ComponentFixture<StudentData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
