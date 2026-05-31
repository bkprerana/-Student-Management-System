// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { StudentListService } from '../services/student-list-service';

// @Component({
//   selector: 'app-student-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './student-list.html'
// })
// export class StudentList {

//   rollNumber: number = 0;
//   student: any = null;

//   constructor(private studentService: StudentListService) {}

//   getStudent(): void {

//     if (!this.rollNumber) {
//       alert("Please enter Roll Number");
//       return;
//     }

//     this.studentService.getStudentById(this.rollNumber).subscribe({
//       next: (res: any) => {
//         console.log("✅ Data:", res);
//         this.student = res;
//       },
//       error: (err: any) => {
//         console.error(err);
//         alert("Student not found ❌");
//         this.student = null;
//       }
//     });
//   }
// }
import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  StudentListService
} from '../services/student-list-service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})

export class StudentList implements OnInit {

  // =========================
  // VARIABLES
  // =========================

  rollNumber: number | null = null;

  student: any = null;

students: any[] = [];

  searched = false;

  constructor(
    private studentService: StudentListService
  ) {}

  // =========================
  // PAGE LOAD
  // =========================

  ngOnInit(): void {

    setTimeout(() => {

      this.loadAllStudents();

    }, 100);
  }

  // =========================
  // SEARCH STUDENT
  // =========================

  getStudent(): void {

  // RESET OLD DATA
  this.student = null;

  this.searched = false;

  // VALIDATION
  if (
    this.rollNumber === null ||
    this.rollNumber === undefined ||
    this.rollNumber <= 0
  ) {

    return;
  }

  this.studentService
    .getStudentById(this.rollNumber)
    .subscribe({

      next: (res: any) => {

        console.log("✅ Student Response:", res);

        // IMPORTANT FIX
        if (res) {

          this.student = res;

          this.searched = false;

        } else {

          this.student = null;

          this.searched = true;
        }
      },

      error: (err: any) => {

        console.error(err);

        this.student = null;

        this.searched = true;
      }
    });
}
  // =========================
  // LOAD ALL STUDENTS
  // =========================

  loadAllStudents(): void {

    this.studentService
      .getAllStudents()
      .subscribe({

      next: (res: any) => {

        console.log("All Students:", res);

        this.students = [...res];
      },

      error: (err: any) => {

        console.error(err);
      }
    });
  }

  // =========================
  // CLEAR SEARCH
  // =========================

  clearSearch(): void {

    this.rollNumber = null;

    this.student = null;

    this.searched = false;
  }

  // =========================
  // AUTO CLEAR INPUT
  // =========================
onInputChange(): void {

  // EMPTY INPUT
  if (!this.rollNumber) {

    this.student = null;

    this.searched = false;

    return;
  }

  // FIND STUDENT IN EXISTING TABLE
this.student = this.students.find(
  (s: any) => s.RollNumber == this.rollNumber
);

}
}