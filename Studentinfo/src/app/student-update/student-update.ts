import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StudentUpdateService } from '../services/student-update-service';

@Component({
  selector: 'app-student-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-update.html',
  styleUrls: ['./student-update.css']
})
export class StudentUpdate {

  rollNumber: number = 0;
  student: any = null;
  searched: boolean = false;

  constructor(private studentService: StudentUpdateService) {}

  // 🔍 GET STUDENT
  getStudent(): void {
    if (!this.rollNumber) {
      alert("Enter Roll Number");
      return;
    }

    this.studentService.getStudentById(this.rollNumber).subscribe({
      next: (res: any) => {
        this.student = res;
        this.searched = true;
      },
      error: (err: any) => {
        console.error(err);
        this.student = null;
        this.searched = true;
      }
    });
  }

  // ✏️ UPDATE STUDENT
  updateStudent(): void {
    this.studentService.updateStudent(this.rollNumber, this.student).subscribe({
      next: (res: any) => {
        alert("Student updated successfully ✅");
      },
      error: (err: any) => {
        console.error(err);
        alert("Update failed ❌");
      }
    });
  }
}