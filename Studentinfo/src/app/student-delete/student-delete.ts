import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StudentDeleteService } from '../services/student-delete-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-student-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-delete.html',
  styleUrls: ['./student-delete.css']
})
export class StudentDelete {

  rollNumber: number = 0;
  message: string = '';
  error: string = '';

  constructor(private studentService: StudentDeleteService, private cdr: ChangeDetectorRef) {}

  deleteStudent(): void {
    this.message = '';
    this.error = '';

    if (!this.rollNumber) {
      this.error = "Please enter Roll Number ❗";
      return;
    }

    this.studentService.deleteStudent(this.rollNumber).subscribe({
     next: (res: any) => {

  console.log(res);

  this.message =
  res.message;



    // ✅ CLEAR ERROR
    this.error = '';

  this.rollNumber = 0;
    this.cdr.detectChanges();
},
     error: (err: any) => {

      console.error(err);

      this.message = '';

      this.error =
      err?.error?.message ||
      "Student not found ❌";
        this.cdr.detectChanges();
    }
  });
  }
}