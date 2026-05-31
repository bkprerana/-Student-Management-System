import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreateStudentService } from './create-student-service';

describe('CreateStudentService', () => {
  let service: CreateStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(CreateStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});