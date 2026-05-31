import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitStudentModal } from './submit-student-modal';

describe('SubmitStudentModal', () => {
  let component: SubmitStudentModal;
  let fixture: ComponentFixture<SubmitStudentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitStudentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitStudentModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
